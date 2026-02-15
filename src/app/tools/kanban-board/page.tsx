'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/ToolLayout';

interface Task { id: string; title: string; column: 'todo' | 'doing' | 'done'; }

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Plan project structure', column: 'todo' },
    { id: '2', title: 'Design UI mockups', column: 'todo' },
    { id: '3', title: 'Set up development environment', column: 'doing' },
    { id: '4', title: 'Write documentation', column: 'done' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [dragging, setDragging] = useState<string | null>(null);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask, column: 'todo' }]);
    setNewTask('');
  };

  const moveTask = (id: string, column: Task['column']) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, column } : t));
  };

  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  const columns: { key: Task['column']; label: string; color: string }[] = [
    { key: 'todo', label: '📋 To Do', color: 'bg-gray-50 border-gray-200' },
    { key: 'doing', label: '🔨 In Progress', color: 'bg-blue-50 border-blue-200' },
    { key: 'done', label: '✅ Done', color: 'bg-emerald-50 border-emerald-200' },
  ];

  return (
    <ToolLayout title="Kanban Board" description="Simple drag-and-drop Kanban board for task management.">
      <div className="flex gap-3 mb-6">
        <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} className="tool-input flex-1" placeholder="New task..." onKeyDown={e => e.key === 'Enter' && addTask()} />
        <button onClick={addTask} className="tool-btn">Add</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => (
          <div key={col.key} className={`rounded-xl border-2 ${col.color} p-4 min-h-[200px]`}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); if (dragging) moveTask(dragging, col.key); setDragging(null); }}>
            <h3 className="font-semibold text-gray-800 mb-3">{col.label} <span className="text-gray-400 text-sm">({tasks.filter(t => t.column === col.key).length})</span></h3>
            <div className="space-y-2">
              {tasks.filter(t => t.column === col.key).map(task => (
                <div key={task.id} draggable onDragStart={() => setDragging(task.id)} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-move hover:shadow-md transition-shadow group">
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-700">{task.title}</span>
                    <button onClick={() => deleteTask(task.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs ml-2">✕</button>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {columns.filter(c => c.key !== col.key).map(c => (
                      <button key={c.key} onClick={() => moveTask(task.id, c.key)} className="text-xs text-gray-400 hover:text-primary-600">→ {c.label.split(' ')[1]}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
