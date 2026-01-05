import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowLeft, Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/shop/Footer";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createMessage, getMessages } from "@/api/messages";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [sending, setSending] = useState(false);

  // Нэвтэрсэн хэрэглэгчийн мэдээллийг formData-д оруулах
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || ""
      }));
    }
  }, [isAuthenticated, user]);

  // Хэрэглэгчийн мессежүүд авах
  const { data: messagesData, isLoading: messagesLoading, error: messagesError } = useQuery({
    queryKey: ['user-messages', user?.email],
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
    enabled: isAuthenticated && !!user?.email,
  });

  // Ensure messages is always an array
  const messages = Array.isArray(messagesData) ? messagesData : [];

  const handleMessageClick = (msg) => {
    navigate(`/Contact/messages/${msg.id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Login шалгах
    if (!isAuthenticated) {
      toast.error("Мессеж илгээхийн тулд нэвтрэх хэрэгтэй");
      navigate(createPageUrl("Login"));
      return;
    }

    setSending(true);
    try {
      await createMessage(formData);
      toast.success("Таны мессеж амжилттай илгээгдлээ! 🎉");
      // Нэвтэрсэн хэрэглэгчийн мэдээллийг хадгалж, зөвхөн мессеж талбарыг хоослох
      if (isAuthenticated && user) {
        setFormData(prev => ({ ...prev, message: "" }));
      } else {
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
      // Мессежүүдийг дахин татах
      if (isAuthenticated) {
        // Query-г дахин татах
        queryClient.invalidateQueries({ queryKey: ['user-messages'] });
        // Шууд refetch хийх
        setTimeout(() => {
          queryClient.refetchQueries({ queryKey: ['user-messages'] });
        }, 100);
      }
    } catch (error) {
      toast.error("Алдаа гарлаа");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link to={createPageUrl("Shop")}>
            <Button variant="outline" size="sm" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Холбоо барих
          </h1>
          <p className="text-xl text-slate-600">
            Таны санал хүсэлтийг хүлээж байна
          </p>
        </div>

        {isAuthenticated && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Миний мессежүүд
                {messages.length > 0 && (
                  <span className="ml-2 bg-purple-600 text-white text-xs rounded-full px-2 py-1 font-bold">
                    {messages.length}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {messagesLoading ? (
                <p className="text-slate-500 text-center py-4">Ачааллаж байна...</p>
              ) : messagesError ? (
                <p className="text-red-500 text-center py-4">
                  Мессеж татахад алдаа гарлаа: {messagesError?.message || "Алдаа"}
                </p>
              ) : messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className="border rounded-lg p-4 space-y-3 cursor-pointer hover:bg-purple-50 transition-colors"
                      onClick={() => handleMessageClick(msg)}
                    >
                      <div>
                        <p className="text-sm text-slate-500 mb-1">
                          {msg.created_at && new Date(msg.created_at).toLocaleString('mn-MN')}
                        </p>
                        <p className="text-slate-900 font-medium line-clamp-2">{msg.message}</p>
                      </div>
                      {msg.reply && (
                        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                          <p className="text-sm text-purple-700 font-medium mb-2">
                            Админий хариу:
                            {msg.replied_at && (
                              <span className="text-xs text-purple-500 ml-2">
                                ({new Date(msg.replied_at).toLocaleString('mn-MN')})
                              </span>
                            )}
                          </p>
                          <p className="text-slate-900 line-clamp-2">{msg.reply}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-4">Мессеж байхгүй байна</p>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div id="contact-form" className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Мессеж илгээх</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isAuthenticated && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Таны нэр
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Нэрээ оруулна уу"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Имэйл хаяг
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Утасны дугаар
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+976 9999-9999"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Мессеж
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Таны санал хүсэлт..."
                  rows={5}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Илгээж байна...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Илгээх
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Холбоо барих мэдээлэл</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Хаяг</h3>
                    <p className="text-slate-600">
                      Улаанбаатар хот, Монгол улс
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Утас</h3>
                    <p className="text-slate-600">+976 9999-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Имэйл</h3>
                    <p className="text-slate-600">info@buysmart.mn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Ажлын цаг</h3>
                    <p className="text-slate-600">
                      Даваа - Баасан: 09:00 - 18:00<br />
                      Бямба - Ням: 10:00 - 16:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">24/7 Дэмжлэг</h3>
              <p className="text-purple-100 mb-4">
                Таны асуултад хариулахад бэлэн байна
              </p>
              <a href="mailto:info@buysmart.mn">
                <Button variant="secondary" className="bg-white text-purple-600 hover:bg-slate-100">
                  Имэйл илгээх
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}