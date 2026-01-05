import { cn } from "@/lib/utils";

export default function InsightCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendDirection,
  accentColor = "bg-slate-900" 
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-semibold text-slate-900 tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", accentColor)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className={cn(
            "text-sm font-medium",
            trendDirection === "up" ? "text-emerald-600" : 
            trendDirection === "down" ? "text-rose-600" : "text-slate-500"
          )}>
            {trendDirection === "up" ? "↑" : trendDirection === "down" ? "↓" : "→"} {trend}
          </span>
        </div>
      )}
    </div>
  );
}