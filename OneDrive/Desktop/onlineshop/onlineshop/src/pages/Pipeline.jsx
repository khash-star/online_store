import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDeals, createDeal, updateDeal, deleteDeal } from "@/api/deals";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Flame, 
  Plus,
  Search,
  Filter,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InsightCard from "@/components/crm/InsightCard";
import PipelineColumn from "@/components/crm/PipelineColumn";
import DealModal from "@/components/crm/DealModal";

const STAGES = [
  { id: "lead", label: "Lead" },
  { id: "qualified", label: "Qualified" },
  { id: "proposal", label: "Proposal" },
  { id: "negotiation", label: "Negotiation" },
  { id: "closed_won", label: "Closed Won" },
  { id: "closed_lost", label: "Closed Lost" },
];

export default function Pipeline() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const queryClient = useQueryClient();

  const { data: dealsData, isLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const data = await getDeals({ sort: "-created_at" });
      return data.deals || data || [];
    },
  });

  const deals = dealsData || [];

  const createMutation = useMutation({
    mutationFn: (data) => createDeal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      setModalOpen(false);
      setSelectedDeal(null);
    },
    onError: (error) => {
      console.error("Failed to create deal:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateDeal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      setModalOpen(false);
      setSelectedDeal(null);
    },
    onError: (error) => {
      console.error("Failed to update deal:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteDeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      setModalOpen(false);
      setSelectedDeal(null);
    },
    onError: (error) => {
      console.error("Failed to delete deal:", error);
    },
  });

  const handleSave = (data) => {
    if (selectedDeal) {
      updateMutation.mutate({ id: selectedDeal.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (deal) => {
    if (confirm("Are you sure you want to delete this deal?")) {
      deleteMutation.mutate(deal.id);
    }
  };

  const handleMove = (deal, newStage) => {
    updateMutation.mutate({ id: deal.id, data: { stage: newStage } });
  };

  const handleEdit = (deal) => {
    setSelectedDeal(deal);
    setModalOpen(true);
  };

  const filteredDeals = useMemo(() => {
    if (!searchQuery.trim()) return deals;
    const query = searchQuery.toLowerCase();
    return deals.filter(deal =>
      deal.name?.toLowerCase().includes(query) ||
      deal.company?.toLowerCase().includes(query) ||
      deal.email?.toLowerCase().includes(query)
    );
  }, [deals, searchQuery]);

  const dealsByStage = useMemo(() => {
    const grouped = {};
    STAGES.forEach(stage => {
      grouped[stage.id] = filteredDeals.filter(d => d.stage === stage.id);
    });
    return grouped;
  }, [filteredDeals]);

  const insights = useMemo(() => {
    const total = deals.length;
    const won = deals.filter(d => d.stage === "closed_won").length;
    const lost = deals.filter(d => d.stage === "closed_lost").length;
    const active = total - won - lost;
    const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
    const wonValue = deals.filter(d => d.stage === "closed_won").reduce((sum, d) => sum + (d.value || 0), 0);
    
    return {
      total,
      active,
      won,
      lost,
      totalValue,
      wonValue,
      winRate: total > 0 ? ((won / total) * 100).toFixed(1) : 0
    };
  }, [deals]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Sales Pipeline</h1>
              <p className="text-slate-500 mt-1">Manage your deals and track progress</p>
            </div>
            <Button onClick={() => { setSelectedDeal(null); setModalOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <InsightCard
              icon={Target}
              label="Total Deals"
              value={insights.total}
              color="blue"
            />
            <InsightCard
              icon={TrendingUp}
              label="Active"
              value={insights.active}
              color="green"
            />
            <InsightCard
              icon={Flame}
              label="Won"
              value={insights.won}
              color="orange"
            />
            <InsightCard
              icon={DollarSign}
              label="Total Value"
              value={`$${insights.totalValue.toLocaleString()}`}
              color="purple"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {STAGES.map((stage) => (
              <PipelineColumn
                key={stage.id}
                stage={stage}
                deals={dealsByStage[stage.id] || []}
                onDealClick={handleEdit}
                onDealMove={handleMove}
                onDealDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <DealModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        deal={selectedDeal}
        onSave={handleSave}
      />
    </div>
  );
}
