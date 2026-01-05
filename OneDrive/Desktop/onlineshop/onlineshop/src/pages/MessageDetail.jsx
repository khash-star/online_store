import { Link, useParams, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/shop/Footer";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getMessage, createMessage, markMessageRead } from "@/api/messages";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

export default function MessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [replyFormData, setReplyFormData] = useState({ message: "" });
  const [sending, setSending] = useState(false);
  const queryClient = useQueryClient();

  // Fetch message by ID
  const { data: message, isLoading, error } = useQuery({
    queryKey: ['message', id],
    queryFn: () => getMessage(id),
    enabled: !!id && isAuthenticated,
  });

  // Mark message as read when viewing
  const markReadMutation = useMutation({
    mutationFn: (messageId) => markMessageRead(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['message', id] });
      queryClient.invalidateQueries({ queryKey: ['user-messages'] });
    },
  });

  // Mark as read when message is loaded and not already read
  useEffect(() => {
    if (message && !message.is_read && isAuthenticated) {
      markReadMutation.mutate(message.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message?.id, message?.is_read, isAuthenticated]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Мессеж илгээхийн тулд нэвтрэх хэрэгтэй");
      navigate(createPageUrl("Login"));
      return;
    }

    if (!replyFormData.message.trim()) {
      toast.error("Мессеж оруулна уу");
      return;
    }

    setSending(true);
    try {
      await createMessage({
        name: user?.full_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        message: replyFormData.message.trim()
      });
      toast.success("Таны мессеж амжилттай илгээгдлээ! 🎉");
      setReplyFormData({ message: "" });
      // Invalidate messages list to refresh
      queryClient.invalidateQueries({ queryKey: ['user-messages'] });
      // Optionally navigate back to Contact page
      // navigate(createPageUrl("Contact"));
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
          <Link to={createPageUrl("Contact")}>
            <Button variant="outline" size="sm" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Мессежийн дэлгэрэнгүй
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-slate-500">Ачааллаж байна...</p>
          </div>
        ) : error ? (
          <Card className="p-8 text-center">
            <p className="text-red-500 mb-4">Мессеж олдсонгүй эсвэл алдаа гарлаа</p>
            <Link to={createPageUrl("Contact")}>
              <Button variant="outline">Буцах</Button>
            </Link>
          </Card>
        ) : message ? (
          <div className="space-y-6">
            {/* Анхны мессеж */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Таны мессеж</h2>
                </div>
                <div className="bg-slate-50 border rounded-lg p-4">
                  <p className="text-sm text-slate-500 mb-3">
                    {message.created_at && new Date(message.created_at).toLocaleString('mn-MN')}
                  </p>
                  <p className="text-slate-900 whitespace-pre-wrap">{message.message}</p>
                </div>
              </CardContent>
            </Card>

            {/* Админий хариу */}
            {message.reply && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-semibold text-purple-700">Админий хариу</h2>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                    <p className="text-sm text-purple-600 mb-3">
                      {message.replied_at && new Date(message.replied_at).toLocaleString('mn-MN')}
                    </p>
                    <p className="text-slate-900 whitespace-pre-wrap">{message.reply}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Шинэ мессеж бичих form */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Шинэ мессеж бичих</h2>
                <form onSubmit={handleReplySubmit} className="space-y-4">
                  <Textarea
                    value={replyFormData.message}
                    onChange={(e) => setReplyFormData({ message: e.target.value })}
                    placeholder="Таны санал хүсэлт..."
                    rows={5}
                    required
                    className="min-h-[120px]"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
              </CardContent>
            </Card>
          </div>
        ) : null}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

