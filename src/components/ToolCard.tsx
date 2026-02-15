import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export function ToolCard({ title, description, href, icon: Icon, badge }: ToolCardProps) {
  return (
    <Link href={href} className="tool-card group block">
      {/* Mobile: vertical compact layout */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 text-center sm:text-left">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
          <Icon size={18} className="sm:hidden" />
          <Icon size={22} className="hidden sm:block" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-0.5 sm:mb-1">
            <h3 className="font-semibold text-xs sm:text-base text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
              {title}
            </h3>
            {badge && (
              <span className="badge bg-emerald-50 text-emerald-700 text-[9px] sm:text-xs !px-1.5 sm:!px-2.5">{badge}</span>
            )}
          </div>
          <p className="hidden sm:block text-sm text-gray-500 leading-relaxed line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  );
}
