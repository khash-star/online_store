import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, deleteProduct } from "@/api/products";
import { uploadFile } from "@/api/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Pencil, Package, Upload, Image as ImageIcon, Download, FileUp } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const categories = [
  { value: "электроникс", label: "Электроникс" },
  { value: "хувцас", label: "Хувцас" },
  { value: "гэр ахуй", label: "Гэр ахуй" },
  { value: "хоол хүнс", label: "Хоол хүнс" },
  { value: "ном", label: "Ном" },
  { value: "спорт", label: "Спорт" },
  { value: "гутал", label: "Гутал" },
  { value: "гоо сайхан", label: "Гоо сайхан" },
  { value: "бусад", label: "Бусад" },
];

export default function ProductManagement({ products }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "бусад",
    gender: "унисекс",
    size: "",
    color: "",
    stock: "100",
    is_available: true,
    discount_percent: "0",
    affiliate_link: ""
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Бараа амжилттай нэмэгдлээ");
      resetForm();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Бараа амжилттай шинэчлэгдлээ");
      resetForm();
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Бараа амжилттай устгагдлаа");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image_url: "",
      category: "бусад",
      gender: "унисекс",
      size: "",
      color: "",
      stock: "100",
      is_available: true,
      discount_percent: "0",
      affiliate_link: ""
    });
    setEditingProduct(null);
    setDialogOpen(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      image_url: product.image_url || "",
      category: product.category || "бусад",
      gender: product.gender || "унисекс",
      size: product.size || "",
      color: product.color || "",
      stock: product.stock?.toString() || "100",
      is_available: product.is_available ?? true,
      discount_percent: product.discount_percent?.toString() || "0",
      affiliate_link: product.affiliate_link || ""
    });
    setDialogOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Зөвхөн зураг файл оруулна уу");
      return;
    }

    setUploading(true);
    try {
      const result = await uploadFile(file);
      // API returns { url: "..." } or just the URL string
      const file_url = result.url || result.file_url || result;
      setFormData({ ...formData, image_url: file_url });
      toast.success("Зураг хуулагдлаа");
    } catch (error) {
      toast.error(error.response?.data?.error || "Зураг хуулахад алдаа гарлаа");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.price) {
      toast.error("Нэр болон үнэ оруулна уу");
      return;
    }

    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 100,
      discount_percent: parseFloat(formData.discount_percent) || 0,
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + '₮';
  };

  // CSV parsing helper
  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      rows.push(row);
    }
    
    return rows;
  };

  const handleBulkImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.csv')) {
      toast.error("Зөвхөн CSV эсвэл Excel файл оруулна уу");
      return;
    }

    setImporting(true);
    toast.info("Файл боловсруулж байна...");

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        toast.error("Файлд өгөгдөл олдсонгүй");
        return;
      }

      const productsData = rows.map(row => ({
        name: row.name || "",
        description: row.description || "",
        price: parseFloat(row.price) || 0,
        image_url: row.image_url || "",
        category: row.category || "бусад",
        gender: row.gender || "унисекс",
        size: row.size || "",
        color: row.color || "",
        stock: parseInt(row.stock) || 100,
        is_available: true,
        discount_percent: parseFloat(row.discount_percent) || 0,
        affiliate_link: row.affiliate_link || ""
      }));

      // Create products one by one
      let successCount = 0;
      let errorCount = 0;

      for (const product of productsData) {
        try {
          await createProduct(product);
          successCount++;
        } catch (error) {
          errorCount++;
          console.error("Failed to create product:", error);
        }
      }

      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      if (errorCount > 0) {
        toast.warning(`${successCount} бараа нэмэгдлээ, ${errorCount} бараанд алдаа гарлаа`);
      } else {
        toast.success(`${successCount} бараа амжилттай нэмэгдлээ! 🎉`);
      }
    } catch (error) {
      toast.error("Алдаа гарлаа: " + error.message);
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  };

  const handleExport = () => {
    if (products.length === 0) {
      toast.error("Экспорт хийх бараа байхгүй байна");
      return;
    }

    const headers = ["name", "description", "price", "image_url", "category", "gender", "size", "color", "stock", "discount_percent", "affiliate_link"];
    const csvContent = [
      headers.join(","),
      ...products.map(p => [
        `"${(p.name || "").replace(/"/g, '""')}"`,
        `"${(p.description || "").replace(/"/g, '""')}"`,
        p.price || 0,
        `"${(p.image_url || "").replace(/"/g, '""')}"`,
        `"${(p.category || "").replace(/"/g, '""')}"`,
        `"${(p.gender || "").replace(/"/g, '""')}"`,
        `"${(p.size || "").replace(/"/g, '""')}"`,
        `"${(p.color || "").replace(/"/g, '""')}"`,
        p.stock || 0,
        p.discount_percent || 0,
        `"${(p.affiliate_link || "").replace(/"/g, '""')}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `products_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`${products.length} бараа экспорт хийгдлээ`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Барааны удирдлага
            </CardTitle>
            <div className="flex gap-2">
              <label className="cursor-pointer">
                <Button variant="outline" disabled={importing} asChild>
                  <span>
                    <FileUp className="w-4 h-4 mr-2" />
                    {importing ? "Импорт хийж байна..." : "Импорт"}
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleBulkImport}
                  className="hidden"
                />
              </label>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </Button>
              <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Бараа нэмэх
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{product.name}</p>
                        <Badge variant={product.is_available ? "default" : "secondary"}>
                          {product.is_available ? "Боломжтой" : "Боломжгүй"}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500">{product.category}</p>
                      <p className="text-sm font-semibold text-purple-600">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm("Устгахдаа итгэлтэй байна уу?")) {
                          deleteMutation.mutate(product.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">Бараа олдсонгүй</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Бараа засах" : "Бараа нэмэх"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct ? "Барааны мэдээллийг засах" : "Шинэ бараа нэмэх"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Нэр *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Барааны нэр"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Тайлбар</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Барааны тайлбар"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Үнэ *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Хөнгөлөлт (%)</label>
                <Input
                  type="number"
                  value={formData.discount_percent}
                  onChange={(e) => setFormData({ ...formData, discount_percent: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Зураг URL</label>
              <div className="flex gap-2">
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
                <label className="cursor-pointer">
                  <Button type="button" variant="outline" disabled={uploading} asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? "Хуулагдаж байна..." : "Хуулах"}
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            {formData.image_url && (
              <div>
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Ангилал</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Хүйс</label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="унисекс">Унисекс</SelectItem>
                    <SelectItem value="эрэгтэй">Эрэгтэй</SelectItem>
                    <SelectItem value="эмэгтэй">Эмэгтэй</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Хэмжээ</label>
                <Input
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="S, M, L..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Өнгө</label>
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Улаан, цэнхэр..."
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Барааны тоо</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="100"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Affiliate Link</label>
              <Input
                value={formData.affiliate_link}
                onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_available}
                onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
              />
              <label className="text-sm font-medium">Боломжтой</label>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={resetForm}
                className="flex-1"
              >
                Цуцлах
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {editingProduct ? "Хадгалах" : "Нэмэх"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
