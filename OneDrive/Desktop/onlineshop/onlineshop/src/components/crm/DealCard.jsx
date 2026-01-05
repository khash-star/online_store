import { useState } from "react";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";
import { 
  Building2, 
  User, 
  Calendar, 
  Flame, 
  Snowflake, 
  Sun,
  AlertTriangle,
  MoreHorizontal,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const momentumConfig = {
  hot: { 
    icon: Flame, 
    color: "text-orange-500", 
    bg: "bg-orange-50", 
    border: "border-orange-200",
    label: "Hot"
  },
  warm: { 
    icon: Sun, 
    color: "text-amber-500", 
    bg: "bg-amber-50", 
    border: "border-amber-200",
    label: "Warm"
  },
  cold: { 
    icon: Snowflake, 
    color: "text-blue-500", 
    bg: "bg-blue-50", 
    border: "border-blue-200",
    label: "Cold"
  },
  stale: { 
    icon: AlertTriangle, 
    color: "text-slate-400", 
    bg: "bg-slate-50", 
    border: "border-slate-200",
    label: "Stale"
  }
};

export default function DealCard({ deal, onEdit, onMove, stages }) {
  const momentum = momentumConfig[deal.momentum] || momentumConfig.warm;
  const MomentumIcon = momentum.icon;
  
  const daysUntilClose = deal.expected_close_date 
    ? differenceInDays(new Date(deal.expected_close_date), new Date())
    : null;

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className={cn(
      "bg-white rounded-xl p-4 border-l-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group",
      momentum.border
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn("p-1.5 rounded-lg", momentum.bg)}>
            <MomentumIcon className={cn("w-3.5 h-3.5", momentum.color)} />
          </div>
          <span className="text-lg font-semibold text-slate-900">
            {formatCurrency(deal.value)}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(deal)}>
              Edit Deal
            </DropdownMenuItem>
            {stages?.filter(s => s.id !== deal.stage).map(stage => (
              <DropdownMenuItem 
                key={stage.id}
                onClick={() => onMove(deal, stage.id)}
              >
                Move to {stage.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="font-medium text-slate-900 mb-1 line-clamp-1">
        {deal.company_name}
      </h3>

      {deal.contact_name && (
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-2">
          <User className="w-3.5 h-3.5" />
          <span className="truncate">{deal.contact_name}</span>
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="w-3 h-3" />
          {daysUntilClose !== null ? (
            <span className={cn(
              daysUntilClose < 0 ? "text-rose-500" :
              daysUntilClose <= 7 ? "text-amber-500" : "text-slate-400"
            )}>
              {daysUntilClose < 0 
                ? `${Math.abs(daysUntilClose)}d overdue` 
                : daysUntilClose === 0 
                ? "Today"
                : `${daysUntilClose}d`}
            </span>
          ) : (
            <span>No date</span>
          )}
        </div>
        {deal.probability && (
          <span className="text-xs font-medium text-slate-500">
            {deal.probability}%
          </span>
        )}
      </div>
    </div>
  );
}