import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/orders";
import { useAuth } from "@/hooks/useAuth";
import { Package, Calendar, CreditCard, MapPin, Phone, Mail, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const statusColors = {
  "шинэ": "bg-blue-100 text-blue-800 border-blue-200",
  "баталгаажсан": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "хүргэлтэнд": "bg-amber-100 text-amber-800 border-amber-200",
  "хүргэгдсэн": "bg-green-100 text-green-800 border-green-200",
  "цуцалсан": "bg-rose-100 text-rose-800 border-rose-200"
};

const paymentLabels = {
  "бэлэн_мөнгө": "Бэлэн мөнгө",
  "картаар": "Картаар",
  "данс_шилжүүлэг": "Данс шилжүүлэг"
};

export default function MyOrders() {
  const { isAuthenticated } = useAuth();

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const data = await getOrders({ sort: "-created_at" });
      return data;
    },
    enabled: isAuthenticated,
  });

  const orders = ordersData?.orders || ordersData || [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + '₮';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl("Shop")} className="text-slate-600 hover:text-slate-900">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Миний захиалгууд</h1>
              <p className="text-sm text-slate-500">Таны бүх захиалгын жагсаалт</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <Package className="w-16 h-16 mx-auto text-slate-400" />
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Захиалга байхгүй</h2>
                <p className="text-slate-500 mt-2">Та одоогоор захиалга өгөөгүй байна</p>
              </div>
              <Link to={createPageUrl("Shop")}>
                <Badge className="cursor-pointer hover:bg-slate-800">
                  Дэлгүүр үзэх
                </Badge>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Захиалга #{order.id.slice(0, 8)}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {order.created_at || order.created_date ? (
                            (() => {
                              try {
                                const dateStr = order.created_at || order.created_date;
                                const date = new Date(dateStr);
                                if (isNaN(date.getTime())) {
                                  return "Огноо тодорхойгүй";
                                }
                                return format(date, "yyyy оны MM сарын dd");
                              } catch (error) {
                                return "Огноо тодорхойгүй";
                              }
                            })()
                          ) : (
                            "Огноо тодорхойгүй"
                          )}
                        </span>
                      </div>
                    </div>
                    <Badge className={`${statusColors[order.status]} border`}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                  {/* Бүтээгдэхүүнүүд */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Захиалсан бүтээгдэхүүн</h3>
                    <div className="space-y-2">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm p-3 bg-slate-50 rounded-lg">
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

                  {/* Мэдээлэл */}
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
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

                    <div className="space-y-3">
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
                          <p className="text-slate-900 font-medium">
                            {paymentLabels[order.payment_method]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Нийт дүн */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-slate-900">Нийт дүн</span>
                      <span className="text-2xl font-bold text-slate-900">
                        {formatPrice(order.total_amount)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}