import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 bg-white rounded-2xl border border-purple-100 max-w-lg mx-auto my-6 shadow-sm">
      {icon && (
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-50 flex items-center justify-center text-primary-700">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}
