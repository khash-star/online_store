import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

export default function ImportProductDialog({ open, onOpenChange, onSuccess }) {
  const [url, setUrl] = useState("");

  const handleImport = () => {
    if (!url.trim()) {
      toast.error("URL оруулна уу");
      return;
    }

    // Шинэ цонхонд линк нээх
    window.open(url, '_blank', 'noopener,noreferrer');
    
    toast.success("Линк нээгдлээ!");
    setUrl("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Захиалга оруулах
          </DialogTitle>
          <DialogDescription>
            Дэлхийн алдартай дэлгүүрүүдээс захиалга өгөх линк оруулна уу
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Input
            placeholder="https://www.amazon.com/product/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12"
            onKeyDown={(e) => e.key === 'Enter' && handleImport()}
          />

          <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 space-y-2">
            <p className="font-medium text-slate-900">💡 Зөвлөмж:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Барааны дэлгэрэнгүй хуудасны линк оруулна уу</li>
              <li>Линк шинэ цонхонд нээгдэнэ</li>
            </ul>
          </div>

          <Button
            onClick={handleImport}
            disabled={!url.trim()}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold"
          >
            Линк нээх
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}