import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Trash2 } from "lucide-react";

const stages = [
  { id: "lead", label: "Lead" },
  { id: "qualified", label: "Qualified" },
  { id: "proposal", label: "Proposal" },
  { id: "negotiation", label: "Negotiation" },
  { id: "closed_won", label: "Closed Won" },
  { id: "closed_lost", label: "Closed Lost" },
];

const momentumOptions = [
  { id: "hot", label: "🔥 Hot" },
  { id: "warm", label: "☀️ Warm" },
  { id: "cold", label: "❄️ Cold" },
  { id: "stale", label: "⚠️ Stale" },
];

export default function DealModal({ 
  open, 
  onOpenChange, 
  deal, 
  onSave,
  onDelete,
  isLoading 
}) {
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    contact_email: "",
    value: "",
    stage: "lead",
    probability: "",
    expected_close_date: "",
    momentum: "warm",
    owner: "",
    notes: ""
  });

  useEffect(() => {
    if (deal) {
      setFormData({
        company_name: deal.company_name || "",
        contact_name: deal.contact_name || "",
        contact_email: deal.contact_email || "",
        value: deal.value || "",
        stage: deal.stage || "lead",
        probability: deal.probability || "",
        expected_close_date: deal.expected_close_date || "",
        momentum: deal.momentum || "warm",
        owner: deal.owner || "",
        notes: deal.notes || ""
      });
    } else {
      setFormData({
        company_name: "",
        contact_name: "",
        contact_email: "",
        value: "",
        stage: "lead",
        probability: "",
        expected_close_date: "",
        momentum: "warm",
        owner: "",
        notes: ""
      });
    }
  }, [deal, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      value: parseFloat(formData.value) || 0,
      probability: parseFloat(formData.probability) || null
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {deal ? "Edit Deal" : "New Deal"}
          </DialogTitle>
          <DialogDescription>
            {deal ? "Deal information эдгээж байна" : "Шинэ deal нэмэх"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Company Name *
              </Label>
              <Input
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="Acme Inc."
                className="mt-1.5"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Contact Name
              </Label>
              <Input
                value={formData.contact_name}
                onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                placeholder="John Smith"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Contact Email
              </Label>
              <Input
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                placeholder="john@acme.com"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Deal Value ($) *
              </Label>
              <Input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="50000"
                className="mt-1.5"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Win Probability (%)
              </Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                placeholder="75"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Stage
              </Label>
              <Select
                value={formData.stage}
                onValueChange={(value) => setFormData({ ...formData, stage: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map(stage => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Momentum
              </Label>
              <Select
                value={formData.momentum}
                onValueChange={(value) => setFormData({ ...formData, momentum: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {momentumOptions.map(m => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Expected Close Date
              </Label>
              <Input
                type="date"
                value={formData.expected_close_date}
                onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Owner
              </Label>
              <Input
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                placeholder="Sales rep name"
                className="mt-1.5"
              />
            </div>

            <div className="col-span-2">
              <Label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Notes
              </Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add context, next steps, or important details..."
                className="mt-1.5 min-h-[80px]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            {deal && onDelete ? (
              <Button
                type="button"
                variant="ghost"
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                onClick={() => onDelete(deal)}
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            ) : (
              <div />
            )}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-slate-900 hover:bg-slate-800">
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {deal ? "Update" : "Create"} Deal
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}