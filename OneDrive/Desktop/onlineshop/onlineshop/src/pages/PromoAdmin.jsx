import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { getMessages, markMessageRead, replyMessage } from "@/api/messages";
import { getPromos, createPromo, updatePromo, deletePromo } from "@/api/promos";
import { getFeatured, addFeatured, removeFeatured } from "@/api/featured";
import { getSearchQueries } from "@/api/searchQueries";
import { getAllOrders, updateOrder } from "@/api/orders";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ArrowLeft, Star, ArrowUp, Package, Megaphone, Users, Search, MessageSquare, Settings, Pencil, Eye, Mail, Send, ShoppingCart, Calendar, CreditCard, MapPin, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { toast } from "sonner";
import ProductManagement from "@/components/admin/ProductManagement";
import ContactManagement from "@/components/admin/ContactManagement";
import { Badge } from "@/components/ui/badge";

export default function PromoAdmin() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [newMessage, setNewMessage] = useState({ message: "", is_active: true });
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Search queries
  const { data: searchQueriesData } = useQuery({
    queryKey: ['search-queries'],
    queryFn: async () => {
      const data = await getSearchQueries({ sort: "-count" });
      return data.search_queries || data || [];
    },
    enabled: isAuthenticated && user?.role === "admin",
  });

  // Ensure searchQueries is always an array
  const searchQueries = Array.isArray(searchQueriesData?.search_queries) 
    ? searchQueriesData.search_queries 
    : Array.isArray(searchQueriesData) 
      ? searchQueriesData 
      : [];

  // Messages
  const { data: messagesData, isLoading: messagesLoading, error: messagesError } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: async () => {
      try {
        const data = await getMessages({ sort: "-created_at" });
        // API response structure: { messages: [...] }
        if (Array.isArray(data.messages)) {
          return data.messages;
        }
        if (Array.isArray(data)) {
          return data;
        }
        return [];
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        return [];
      }
    },
    enabled: isAuthenticated && user?.role === "admin",
  });

  // Ensure messages is always an array
  const messages = Array.isArray(messagesData) ? messagesData : [];
  
  // Уншаагүй мессежүүдийн тоо
  const unreadCount = messages.filter(msg => !msg.is_read).length;

  // Promos (PromoMessages)
  const { data: promosData } = useQuery({
    queryKey: ["promo-messages"],
    queryFn: async () => {
      const data = await getPromos({ sort: "-created_at" });
      return data;
    },
    enabled: isAuthenticated && user?.role === "admin",
  });

  // Ensure promoMessages is always an array
  const promoMessages = Array.isArray(promosData?.promos) 
    ? promosData.promos 
    : Array.isArray(promosData) 
      ? promosData 
      : [];

  // Products
  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await getProducts({ sort: "-created_at" });
      return data;
    },
    enabled: isAuthenticated && user?.role === "admin",
  });

  // Ensure products is always an array
  const products = Array.isArray(productsData?.products) 
    ? productsData.products 
    : Array.isArray(productsData) 
      ? productsData 
      : [];

  // Featured products
  const { data: featuredData } = useQuery({
    queryKey: ["featured-products-admin"],
    queryFn: async () => {
      const featured = await getFeatured({ sort: "order" });
      const featuredList = Array.isArray(featured?.featured) 
        ? featured.featured 
        : Array.isArray(featured) 
          ? featured 
          : [];
      const productIds = featuredList.map(f => f?.product_id).filter(Boolean);
      if (productIds.length === 0) return [];
      const prodsData = await getProducts();
      const prods = Array.isArray(prodsData?.products) 
        ? prodsData.products 
        : Array.isArray(prodsData) 
          ? prodsData 
          : [];
      return featuredList.map(f => ({
        ...f,
        product: prods.find(p => p.id === f.product_id)
      }));
    },
    enabled: isAuthenticated && user?.role === "admin",
  });

  // Ensure featuredProducts is always an array
  const featuredProducts = Array.isArray(featuredData) ? featuredData : [];

  // Create promo
  const createMutation = useMutation({
    mutationFn: (data) => createPromo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promo-messages"] });
      setNewMessage({ message: "", is_active: true });
      toast.success("Амжилттай нэмэгдлээ");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  // Update promo
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updatePromo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promo-messages"] });
      toast.success("Амжилттай засварлагдлаа");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  // Delete promo
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePromo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promo-messages"] });
      toast.success("Амжилттай устгагдлаа");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  // Add featured
  const addFeaturedMutation = useMutation({
    mutationFn: (productId) => {
      if (!productId) {
        throw new Error("Бараа сонгоно уу");
      }
      return addFeatured(productId, 0);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["featured-products-admin"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
      setSelectedProductId("");
      toast.success("Онцлох бараанд нэмэгдлээ");
    },
    onError: (error) => {
      console.error("Add featured error:", error);
      const errorMessage = error.response?.data?.error || error.message || "Алдаа гарлаа";
      toast.error(errorMessage);
    },
  });

  // Remove featured
  const removeFeaturedMutation = useMutation({
    mutationFn: (id) => removeFeatured(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["featured-products-admin"] });
      queryClient.invalidateQueries({ queryKey: ["featured-products"] });
      toast.success("Онцлох бараанаас хасагдлаа");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  // Order Management Component
  function OrderManagement() {
    const { data: ordersData, isLoading: ordersLoading } = useQuery({
      queryKey: ["admin-orders"],
      queryFn: async () => {
        try {
          const data = await getAllOrders();
          return data.orders || data || [];
        } catch (error) {
          console.error("Failed to fetch orders:", error);
          return [];
        }
      },
      enabled: isAuthenticated && user?.role === "admin",
    });

    const orders = Array.isArray(ordersData) ? ordersData : [];

    const updateOrderMutation = useMutation({
      mutationFn: ({ id, data }) => updateOrder(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
        toast.success("Захиалга амжилттай шинэчлэгдлээ");
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || "Алдаа гарлаа");
      },
    });

    const statusColors = {
      "шинэ": "bg-blue-100 text-blue-800 border-blue-200",
      "баталгаажсан": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "хүргэлтэнд": "bg-amber-100 text-amber-800 border-amber-200",
      "хүргэгдсэн": "bg-green-100 text-green-800 border-green-200",
      "цуцалсан": "bg-rose-100 text-rose-800 border-rose-200"
    };

    const statusOptions = [
      { value: "шинэ", label: "Шинэ" },
      { value: "баталгаажсан", label: "Баталгаажсан" },
      { value: "хүргэлтэнд", label: "Хүргэлтэнд" },
      { value: "хүргэгдсэн", label: "Хүргэгдсэн" },
      { value: "цуцалсан", label: "Цуцалсан" }
    ];

    const formatPrice = (price) => {
      return new Intl.NumberFormat('mn-MN').format(price) + '₮';
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return "Огноо тодорхойгүй";
      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "Огноо тодорхойгүй";
        return new Intl.DateTimeFormat('mn-MN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(date);
      } catch {
        return "Огноо тодорхойгүй";
      }
    };

    const handleStatusChange = (orderId, newStatus) => {
      updateOrderMutation.mutate({
        id: orderId,
        data: { status: newStatus }
      });
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Захиалгын удирдлага
          </CardTitle>
        </CardHeader>
        <CardContent>
          {ordersLoading ? (
            <p className="text-slate-500 text-center py-8">Ачааллаж байна...</p>
          ) : orders.length === 0 ? (
            <p className="text-slate-500 text-center py-8">Захиалга байхгүй</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border">
                  <CardHeader className="bg-slate-50 border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Захиалга #{order.id.slice(0, 8)}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(order.created_at || order.created_date)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${statusColors[order.status] || "bg-slate-100 text-slate-800"} border`}>
                          {order.status}
                        </Badge>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value)}
                          disabled={updateOrderMutation.isPending}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <User className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-slate-500">Хүлээн авагч</p>
                            <p className="text-slate-900 font-medium">{order.customer_name}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-slate-500">Утас</p>
                            <p className="text-slate-900 font-medium">{order.customer_phone}</p>
                          </div>
                        </div>
                        {order.customer_email && (
                          <div className="flex items-start gap-2">
                            <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div>
                              <p className="text-slate-500">Имэйл</p>
                              <p className="text-slate-900 font-medium">{order.customer_email}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-slate-500">Хаяг</p>
                            <p className="text-slate-900 font-medium">{order.delivery_address}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CreditCard className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <p className="text-slate-500">Төлбөр</p>
                            <p className="text-slate-900 font-medium">{order.payment_method}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.items && order.items.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">Бүтээгдэхүүн</h4>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm p-2 bg-slate-50 rounded">
                              <span className="text-slate-700">
                                {item.product_name} x {item.quantity}
                              </span>
                              <span className="font-medium">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="text-lg font-semibold text-slate-900">Нийт дүн</span>
                      <span className="text-xl font-bold text-slate-900">
                        {formatPrice(order.total_amount)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Mark message as read
  const markReadMutation = useMutation({
    mutationFn: (id) => markMessageRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Алдаа гарлаа");
    },
  });

  // Reply mutation
  const replyMutation = useMutation({
    mutationFn: ({ id, reply }) => replyMessage(id, reply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      setReplyDialogOpen(false);
      setReplyText("");
      setSelectedMessage(null);
      toast.success("Хариу амжилттай илгээгдлээ");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Хариу илгээхэд алдаа гарлаа");
    },
  });

  const handleCreate = () => {
    if (!newMessage.message.trim()) {
      toast.error("Зарны текст оруулна уу");
      return;
    }
    createMutation.mutate(newMessage);
  };

  const handleUpdate = (id, data) => {
    updateMutation.mutate({ id, data });
  };

  const handleDelete = (id) => {
    if (confirm("Устгахдаа итгэлтэй байна уу?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddFeatured = () => {
    if (!selectedProductId) {
      toast.error("Бараа сонгоно уу");
      return;
    }
    addFeaturedMutation.mutate(selectedProductId);
  };

  const filteredProducts = Array.isArray(products) ? products.filter(p => 
    selectedCategory === "all" || p.category === selectedCategory
  ) : [];

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
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Админ панел
              </h1>
              <p className="text-xs text-slate-500 font-medium">Удирдлага</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="products">Бараа</TabsTrigger>
            <TabsTrigger value="promos">Зар</TabsTrigger>
            <TabsTrigger value="featured">Онцлох</TabsTrigger>
            <TabsTrigger value="orders">Захиалга</TabsTrigger>
            <TabsTrigger value="users">Хэрэглэгч</TabsTrigger>
            <TabsTrigger value="search">Хайлт</TabsTrigger>
            <TabsTrigger value="views">Үзэлт</TabsTrigger>
            <TabsTrigger value="messages" className="relative">
              Мессеж
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="contacts">Холбоо</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <ProductManagement products={filteredProducts} />
          </TabsContent>

          <TabsContent value="promos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  Зар нэмэх
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Зарны текст (жишээ: 🎉 500+ бүтээгдэхүүн)"
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                    className="flex-1"
                  />
                  <Button onClick={handleCreate} disabled={createMutation.isPending}>
                    <Plus className="w-4 h-4 mr-2" />
                    Нэмэх
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              {promoMessages.map((msg) => (
                <Card key={msg.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{msg.message}</span>
                      <Badge variant={msg.is_active ? "default" : "secondary"}>
                        {msg.is_active ? "Идэвхтэй" : "Идэвхгүй"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdate(msg.id, { is_active: !msg.is_active })}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(msg.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Онцлох бараа нэмэх
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ангилал сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Бүгд</SelectItem>
                    <SelectItem value="электроникс">Электроникс</SelectItem>
                    <SelectItem value="хувцас">Хувцас</SelectItem>
                    <SelectItem value="гэр ахуй">Гэр ахуй</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Бараа сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProducts.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button onClick={handleAddFeatured} disabled={addFeaturedMutation.isPending}>
                  <Plus className="w-4 h-4 mr-2" />
                  Нэмэх
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((fp) => (
                  <Card key={fp.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={fp.product?.image_url || "/placeholder.png"}
                        alt={fp.product?.name || "Бараа"}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "/placeholder.png";
                        }}
                      />
                      <Badge className="absolute top-2 right-2 bg-purple-600">
                        #{fp.order || 0}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {fp.product?.name || "Бараа олдсонгүй"}
                      </h3>
                      {fp.product?.price && (
                        <p className="text-purple-600 font-bold text-xl mb-3">
                          {fp.product.price.toLocaleString()} ₮
                        </p>
                      )}
                      {fp.product?.category && (
                        <p className="text-sm text-slate-500 mb-3">
                          Ангилал: {fp.product.category}
                        </p>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => removeFeaturedMutation.mutate(fp.id)}
                        disabled={removeFeaturedMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Устгах
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Star className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p className="text-slate-500">Онцлох бараа байхгүй байна</p>
                      <p className="text-sm text-slate-400 mt-2">Дээрх формаар онцлох бараа нэмнэ үү</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Хэрэглэгчдийн жагсаалт
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 text-center py-8">Хэрэглэгчдийн удирдлага (хөгжүүлж байна)</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Хайлтын түүх
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {searchQueries.length > 0 ? (
                    searchQueries.map((query) => (
                      <div key={query.id} className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium">{query.query || query.search_term}</p>
                          <p className="text-sm text-slate-500">Хайлт: {query.count || 0} удаа</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-center py-8">Хайлтын түүх олдсонгүй</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="views" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Үзэлтийн тоо
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 text-center py-8">Үзэлтийн статистик (хөгжүүлж байна)</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Хүлээн авсан мессежүүд
                </CardTitle>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <p className="text-slate-500 text-center py-8">Ачааллаж байна...</p>
                ) : messagesError ? (
                  <p className="text-red-500 text-center py-8">
                    Мессеж татахад алдаа гарлаа: {messagesError?.message || "Алдаа"}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {messages.length > 0 ? (
                      messages.map((msg) => (
                        <div key={msg.id} className={`p-4 border rounded-lg ${!msg.is_read ? "bg-blue-50 border-blue-200" : ""}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{msg.name}</p>
                                {!msg.is_read && (
                                  <Badge className="bg-blue-500 text-white text-xs">
                                    Шинэ
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600">{msg.email}</p>
                              {msg.phone && (
                                <p className="text-sm text-slate-600">Утас: {msg.phone}</p>
                              )}
                              <p className="mt-2">{msg.message}</p>
                              {msg.created_at && (
                                <p className="text-xs text-slate-400 mt-2">
                                  {new Date(msg.created_at).toLocaleString('mn-MN')}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedMessage(msg);
                                  setReplyText("");
                                  setReplyDialogOpen(true);
                                  if (!msg.is_read) {
                                    markReadMutation.mutate(msg.id);
                                  }
                                }}
                                className="text-blue-600 border-blue-300 hover:bg-blue-50"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Хариу өгөх
                              </Button>
                              {!msg.is_read && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => markReadMutation.mutate(msg.id)}
                                  className="text-slate-600"
                                  disabled={markReadMutation.isPending}
                                >
                                  Уншсан гэж тэмдэглэх
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-center py-8">Мессеж олдсонгүй</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <ContactManagement />
          </TabsContent>
        </Tabs>

        {/* Reply Modal */}
        <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Мессежинд хариу өгөх</DialogTitle>
              <DialogDescription>
                {selectedMessage && (
                  <>
                    <span className="font-medium">{selectedMessage.name}</span>
                    {selectedMessage.email && ` (${selectedMessage.email})`}-д хариу илгээх
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-lg border">
                  <p className="text-sm text-slate-600 mb-1">
                    <span className="font-medium">Анхны мессеж:</span>
                  </p>
                  <p className="text-sm">{selectedMessage.message}</p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Хариу мессеж <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Хариу мессеж бичнэ үү..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setReplyDialogOpen(false);
                  setReplyText("");
                  setSelectedMessage(null);
                }}
                disabled={replyMutation.isPending}
              >
                Цуцлах
              </Button>
              <Button
                onClick={() => {
                  if (!replyText.trim()) {
                    toast.error("Хариу мессеж оруулна уу");
                    return;
                  }
                  if (!selectedMessage || !selectedMessage.id) {
                    toast.error("Мессеж сонгогдоогүй байна");
                    return;
                  }
                  replyMutation.mutate({
                    id: selectedMessage.id,
                    reply: replyText.trim()
                  });
                }}
                disabled={replyMutation.isPending || !replyText.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {replyMutation.isPending ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Илгээж байна...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Хариу илгээх
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 z-50"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
