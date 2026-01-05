import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/api/orders";
import { createPageUrl } from "@/utils";
import { useAuth } from "@/hooks/useAuth";
import { 
  ShoppingBag, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  CreditCard,
  ChevronLeft,
  CheckCircle2
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    delivery_address: "",
    payment_method: "бэлэн_мөнгө",
    notes: ""
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Хэрэглэгч нэвтэрсэн бол мэдээллийг автоматаар бөглөх
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        customer_name: user.full_name || prev.customer_name,
        customer_phone: user.phone || prev.customer_phone,
        customer_email: user.email || prev.customer_email,
        delivery_address: user.address || prev.delivery_address
      }));
    }
  }, [isAuthenticated, user]);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const createOrderMutation = useMutation({
    mutationFn: (orderData) => createOrder(orderData),
    onSuccess: () => {
      localStorage.removeItem("cart");
      toast.success("Захиалга амжилттай илгээгдлээ!");
      navigate(createPageUrl("OrderSuccess"));
    },
    onError: () => {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error("Сагс хоосон байна");
      return;
    }

    const orderData = {
      ...formData,
      items: cart.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total_amount: totalAmount,
      status: "шинэ"
    };

    createOrderMutation.mutate(orderData);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + '₮';
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <ShoppingBag className="w-16 h-16 mx-auto text-slate-400" />
            <h2 className="text-xl font-semibold text-slate-900">Сагс хоосон байна</h2>
            <p className="text-slate-500">Захиалга өгөхийн тулд эхлээд бүтээгдэхүүн сонгоно уу</p>
            <Link to={createPageUrl("Shop")}>
              <Button className="bg-slate-900 hover:bg-slate-800">
                Дэлгүүр рүү буцах
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link to={createPageUrl("Shop")} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ChevronLeft className="w-5 h-5" />
            <span>Буцах</span>
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Төлбөр төлөх</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Захиалгын форм */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Хүлээн авагчийн мэдээлэл
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Нэр *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    placeholder="Таны нэр"
                    className="mt-1.5"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Утасны дугаар *</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.customer_phone}
                        onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                        placeholder="99119911"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Имэйл</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.customer_email}
                        onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                        placeholder="email@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Хүргэлтийн мэдээлэл
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Хаяг *</Label>
                  <Textarea
                    id="address"
                    required
                    value={formData.delivery_address}
                    onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
                    placeholder="Хүргэх хаяг, байр, орцны дугаар"
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Нэмэлт тайлбар</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Нэмэлт тайлбар, хүсэлт"
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Төлбөрийн хэлбэр
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.payment_method}
                  onValueChange={(value) => setFormData({...formData, payment_method: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="бэлэн_мөнгө">Бэлэн мөнгө</SelectItem>
                    <SelectItem value="картаар">Картаар</SelectItem>
                    <SelectItem value="данс_шилжүүлэг">Данс шилжүүлэг</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Захиалгын хураангуй */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Захиалгын хураангуй</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Нийт барааны үнэ</span>
                    <span className="font-medium">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Хүргэлтийн төлбөр</span>
                    <span className="font-medium">Үнэгүй</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Нийт дүн</span>
                    <span className="text-2xl">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-slate-900 hover:bg-slate-800" 
                  size="lg"
                  disabled={createOrderMutation.isPending}
                >
                  {createOrderMutation.isPending ? "Илгээж байна..." : "Захиалга өгөх"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
    </div>
  );
}