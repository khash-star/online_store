import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, Mail, Lock, UserPlus } from "lucide-react";
import { createPageUrl } from "../utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: ""
  });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await login(formData.email, formData.password);
        toast.success("Амжилттай нэвтэрлээ");
        navigate(createPageUrl("Shop"));
      } else {
        // Register
        if (!formData.full_name || !formData.full_name.trim()) {
          toast.error("Нэр оруулна уу");
          setLoading(false);
          return;
        }
        if (!formData.email || !formData.email.trim()) {
          toast.error("Имэйл оруулна уу");
          setLoading(false);
          return;
        }
        // Имэйл формат шалгах
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          toast.error("Зөв имэйл хаяг оруулна уу");
          setLoading(false);
          return;
        }
        if (!formData.password || formData.password.length < 6) {
          toast.error("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой");
          setLoading(false);
          return;
        }
        if (!formData.phone || !formData.phone.trim()) {
          toast.error("Утасны дугаар оруулна уу");
          setLoading(false);
          return;
        }
        const result = await register({
          email: formData.email.trim(),
          password: formData.password,
          full_name: formData.full_name.trim(),
          phone: formData.phone.trim()
        });
        console.log("Register result:", result);
        toast.success("Бүртгэл амжилттай үүслээ");
        navigate(createPageUrl("Shop"));
      }
    } catch (error) {
      console.error("Auth error:", error);
      const errorMessage = error.response?.data?.error 
        || error.response?.data?.message 
        || error.message 
        || (isLogin ? "Нэвтрэхэд алдаа гарлаа" : "Бүртгэхэд алдаа гарлаа");
      toast.error(errorMessage);
      
      // Network алдаа шалгах
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network')) {
        toast.error("Backend server ажиллахгүй байна. Backend server эхлүүлнэ үү.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-30 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl("Shop")}>
              <Button variant="outline" size="icon" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="p-2.5 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl shadow-xl">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                {isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 sm:px-6 py-12">
        <Card className="border-2 border-purple-100 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {isLogin ? "Нэвтрэх" : "Шинэ бүртгэл үүсгэх"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="full_name">
                    Нэр *
                  </Label>
                  <Input
                    id="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Нэрээ оруулна уу"
                    className="mt-1"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Имэйл хаяг *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="имэйл@жишээ.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Нууц үг *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Нууц үгээ оруулна уу"
                  className="mt-1"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="phone">
                    Утасны дугаар *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Утасны дугаараа оруулна уу"
                    className="mt-1"
                    required
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 text-white font-semibold py-6"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    {isLogin ? (
                      <>
                        <LogIn className="w-5 h-5" />
                        Нэвтрэх
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        Бүртгүүлэх
                      </>
                    )}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: "", password: "", full_name: "", phone: "" });
                }}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                {isLogin ? (
                  <>
                    Шинэ бүртгэл үүсгэх үү? <span className="underline">Бүртгүүлэх</span>
                  </>
                ) : (
                  <>
                    Аль хэдийн бүртгэлтэй юу? <span className="underline">Нэвтрэх</span>
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

