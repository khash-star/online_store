import { cn } from "@/lib/utils";
import DealCard from "./DealCard";

const stageStyles = {
  lead: { color: "bg-slate-500", lightBg: "bg-slate-50" },
  qualified: { color: "bg-blue-500", lightBg: "bg-blue-50" },
  proposal: { color: "bg-violet-500", lightBg: "bg-violet-50" },
  negotiation: { color: "bg-amber-500", lightBg: "bg-amber-50" },
  closed_won: { color: "bg-emerald-500", lightBg: "bg-emerald-50" },
  closed_lost: { color: "bg-rose-500", lightBg: "bg-rose-50" }
};

export default function PipelineColumn({ 
  stage, 
  deals, 
  onEditDeal, 
  onMoveDeal,
  allStages 
}) {
  const style = stageStyles[stage.id] || stageStyles.lead;
  const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
  
  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="flex-shrink-0 w-72 flex flex-col">
      {/* Column Header */}
      <div className={cn("rounded-t-xl p-4", style.lightBg)}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", style.color)} />
            <h3 className="font-semibold text-slate-900">{stage.label}</h3>
          </div>
          <span className="text-sm font-medium text-slate-500 bg-white px-2 py-0.5 rounded-full">
            {deals.length}
          </span>
        </div>
        <p className="text-sm font-medium text-slate-600">
          {formatCurrency(totalValue)}
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex-1 bg-slate-50/50 rounded-b-xl p-3 space-y-3 min-h-[200px] max-h-[calc(100vh-400px)] overflow-y-auto">
        {deals.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-sm text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
            No deals
          </div>
        ) : (
          deals.map(deal => (
            <DealCard 
              key={deal.id} 
              deal={deal}
              onEdit={onEditDeal}
              onMove={onMoveDeal}
              stages={allStages}
            />
          ))
        )}
      </div>
    </div>
  );
}