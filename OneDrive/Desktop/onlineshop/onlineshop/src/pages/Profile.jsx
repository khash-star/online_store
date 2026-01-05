import { useState, useEffect } from "react";
import { ArrowLeft, User, Mail, Shield, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { useAuth } from "@/hooks/useAuth";
import { getCurrentUser, updateCurrentUser } from "@/api/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function Profile() {
  const { user: authUser, updateUser, logout: authLogout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    // Нэвтрээгүй бол login page руу redirect хийх
    if (!authLoading && !isAuthenticated) {
      navigate(createPageUrl("Login"));
      return;
    }
    
    if (isAuthenticated) {
      loadUser();
    }
  }, [isAuthenticated, authLoading, navigate]);

  const loadUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setFormData({
        full_name: userData.full_name || "",
        phone: userData.phone || "",
        address: userData.address || ""
      });
    } catch (error) {
      toast.error("Хэрэглэгчийн мэдээлэл татаж чадсангүй");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      console.log("Updating user with data:", formData);
      const updatedUser = await updateCurrentUser(formData);
      console.log("Update response:", updatedUser);
      setUser(updatedUser);
      updateUser(updatedUser);
      toast.success("Амжилттай хадгаллаа");
      // Shop хуудас руу буцах
      setTimeout(() => {
        navigate(createPageUrl("Shop"));
      }, 1000);
    } catch (error) {
      console.error("Profile update error:", error);
      const errorMessage = error.response?.data?.error 
        || error.response?.data?.message 
        || error.message 
        || "Мэдээлэл шинэчлэхэд алдаа гарлаа";
      toast.error(errorMessage);
      
      // Network алдаа шалгах
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network')) {
        toast.error("Backend server ажиллахгүй байна. Backend server эхлүүлнэ үү.");
      }
    } finally {
      setSaving(false);
    }
  };

  // Auth loading эсвэл нэвтрээгүй бол хүлээх
  if (authLoading || (!isAuthenticated && loading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  // Нэвтрээгүй бол хоосон div буцаах (redirect хийгдэх ёстой)
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

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
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Миний профайл
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          {/* Хэрэглэгчийн мэдээлэл */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Хувийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Нэр</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Нэрээ оруулна уу"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>
                    <Mail className="w-4 h-4 inline mr-2" />
                    Имэйл хаяг
                  </Label>
                  <Input
                    value={user?.email || ""}
                    disabled
                    className="mt-1 bg-slate-100"
                  />
                  <p className="text-xs text-slate-500 mt-1">Имэйл хаягийг өөрчлөх боломжгүй</p>
                </div>

                <div>
                  <Label htmlFor="phone">Утасны дугаар</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Утасны дугаараа оруулна уу"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Хаяг</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Хаягаа оруулна уу"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>
                    <Shield className="w-4 h-4 inline mr-2" />
                    Эрх
                  </Label>
                  <Input
                    value={user?.role === "admin" ? "Админ" : "Хэрэглэгч"}
                    disabled
                    className="mt-1 bg-slate-100"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Хадгалж байна...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Хадгалах
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Гарах товч */}
          <Card>
            <CardContent className="pt-6">
              <Button
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => {
                  authLogout();
                  window.location.href = createPageUrl("Shop");
                }}
              >
                Системээс гарах
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <MobileBottomNav />
    </div>
  );
}