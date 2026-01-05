import { useState, useEffect } from "react";
import { Store, Search, ArrowLeft, ExternalLink, Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStores, createStore, updateStore, deleteStore } from "@/api/stores";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function OnlineStores() {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
    url: "",
    category: "Бүгд",
    gradient: "from-purple-600 to-pink-600",
    order: 0
  });

  const queryClient = useQueryClient();
  const isAdmin = isAuthenticated && user?.role === "admin";

  const { data: storesData, isLoading, error: storesError } = useQuery({
    queryKey: ["onlineStores"],
    queryFn: async () => {
      try {
        const data = await getStores({ sort: "order" });
        return data;
      } catch (error) {
        console.error("Get stores error:", error);
        return { stores: [] };
      }
    },
  });

  // Ensure stores is always an array
  const stores = Array.isArray(storesData?.stores) 
    ? storesData.stores 
    : Array.isArray(storesData) 
      ? storesData 
      : [];
  
  // Log error but don't break the UI
  if (storesError) {
    console.error("Stores query error:", storesError);
  }

  const createMutation = useMutation({
    mutationFn: (data) => {
      console.log("Creating store with data:", data);
      return createStore(data);
    },
    onSuccess: (response) => {
      console.log("Store created successfully:", response);
      queryClient.invalidateQueries({ queryKey: ["onlineStores"] });
      toast.success("Дэлгүүр нэмэгдлээ");
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error("Create store error:", error);
      const errorMessage = error.response?.data?.error || error.message || "Алдаа гарлаа";
      toast.error(errorMessage);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      console.log("Updating store with id:", id, "data:", data);
      return updateStore(id, data);
    },
    onSuccess: (response) => {
      console.log("Store updated successfully:", response);
      queryClient.invalidateQueries({ queryKey: ["onlineStores"] });
      toast.success("Дэлгүүр шинэчлэгдлээ");
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      console.error("Update store error:", error);
      const errorMessage = error.response?.data?.error || error.message || "Алдаа гарлаа";
      toast.error(errorMessage);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onlineStores"] });
      toast.success("Дэлгүүр устгагдлаа");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      logo_url: "",
      url: "",
      category: "Бүгд",
      gradient: "from-purple-600 to-pink-600",
      order: 0
    });
    setEditingStore(null);
  };

  const handleEdit = (store) => {
    setEditingStore(store);
    setFormData({
      name: store.name || "",
      logo_url: store.logo_url || "",
      url: store.url || "",
      category: store.category || "Бүгд",
      gradient: store.gradient || "from-purple-600 to-pink-600",
      order: store.order || 0
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Дэлгүүрийн нэр оруулна уу");
      return;
    }
    if (!formData.url.trim()) {
      toast.error("Вэбсайт URL оруулна уу");
      return;
    }
    
    // Prepare data
    const submitData = {
      name: formData.name.trim(),
      logo_url: formData.logo_url.trim() || null,
      url: formData.url.trim(),
      category: formData.category,
      gradient: formData.gradient,
      order: formData.order || 0
    };
    
    console.log("Submitting store data:", submitData);
    
    if (editingStore) {
      updateMutation.mutate({ id: editingStore.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const filteredStores = Array.isArray(stores) 
    ? stores.filter(store =>
        store?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl("Shop")}>
              <Button variant="outline" size="icon" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="p-2.5 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl shadow-xl">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Онлайн дэлгүүрүүд
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {filteredStores.length} дэлгүүр
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Дэлгүүр хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {isAdmin && (
            <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Дэлгүүр нэмэх
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredStores.length === 0 ? (
          <div className="text-center py-20">
            <Store className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Дэлгүүр олдсонгүй</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStores.map((store) => (
              <a
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-2xl p-6 border-2 border-purple-200/50 hover:border-yellow-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${store.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                <div className="relative aspect-square flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 group-hover:bg-gradient-to-br group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300">
                  <img 
                    src={store.logo_url} 
                    alt={store.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Лого ачааллаж байхгүй үед fallback
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center">
                    <div className="text-4xl font-black text-purple-400">
                      {store.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="relative mt-4 text-center">
                  <p className="font-black text-slate-800 text-base group-hover:text-purple-600 transition-colors">
                    {store.name}
                  </p>
                </div>
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-white/90 hover:bg-white shadow-md"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEdit(store);
                      }}
                      title="Засах"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-white/90 hover:bg-red-50 text-red-600 shadow-md"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (confirm("Устгахдаа итгэлтэй байна уу?")) {
                          deleteMutation.mutate(store.id);
                        }
                      }}
                      title="Устгах"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </a>
            ))}
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStore ? "Дэлгүүр засах" : "Дэлгүүр нэмэх"}
            </DialogTitle>
            <DialogDescription>
              {editingStore ? "Дэлгүүрийн мэдээллийг засах" : "Шинэ дэлгүүр нэмэх"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Нэр</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Дэлгүүрийн нэр"
              />
            </div>
            <div>
              <Label>Лого URL</Label>
              <Input
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                placeholder="https://logo.clearbit.com/example.com эсвэл https://example.com/logo.png"
              />
              {formData.logo_url && (
                <div className="mt-2 p-2 border rounded-lg bg-slate-50">
                  <p className="text-xs text-slate-500 mb-2">Лого preview:</p>
                  <div className="w-20 h-20 bg-white rounded-lg p-2 border flex items-center justify-center">
                    <img 
                      src={formData.logo_url} 
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextElementSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center text-2xl font-black text-purple-400">
                      {formData.name.charAt(0).toUpperCase() || '?'}
                    </div>
                  </div>
                </div>
              )}
              <p className="text-xs text-slate-400 mt-1">
                Жишээ: https://logo.clearbit.com/amazon.com эсвэл https://www.amazon.com/logo.png
              </p>
            </div>
            <div>
              <Label>Вэбсайт URL</Label>
              <Input
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label>Ангилал</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Бүгд">Бүгд</SelectItem>
                  <SelectItem value="Электроникс">Электроникс</SelectItem>
                  <SelectItem value="Хувцас">Хувцас</SelectItem>
                  <SelectItem value="Гэр ахуй">Гэр ахуй</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Градиент</Label>
              <Select value={formData.gradient} onValueChange={(value) => setFormData({ ...formData, gradient: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="from-purple-600 to-pink-600">Purple to Pink</SelectItem>
                  <SelectItem value="from-blue-600 to-cyan-600">Blue to Cyan</SelectItem>
                  <SelectItem value="from-green-600 to-emerald-600">Green to Emerald</SelectItem>
                  <SelectItem value="from-orange-600 to-red-600">Orange to Red</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Дараалал</Label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmit} className="flex-1">
                {editingStore ? "Хадгалах" : "Нэмэх"}
              </Button>
              <Button variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>
                Цуцлах
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
