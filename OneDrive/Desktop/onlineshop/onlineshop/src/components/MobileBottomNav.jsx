import { Home, Heart, MessageSquare, User, ShoppingBag } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/api/favorites";
import { getMessages } from "@/api/messages";

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Таалагдсан барааны тоог авах
  const { data: favoritesData } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      try {
        if (!isAuthenticated) return { favorites: [] };
        const data = await getFavorites();
        return data;
      } catch {
        return { favorites: [] };
      }
    },
    enabled: isAuthenticated,
  });

  const favoritesCount = favoritesData?.favorites?.length || 0;

  // Мессежүүдийн тоог авах
  const { data: messagesData } = useQuery({
    queryKey: ["user-messages"],
    queryFn: async () => {
      try {
        if (!isAuthenticated) return { messages: [] };
        const data = await getMessages({ sort: "-created_at" });
        return data;
      } catch {
        return { messages: [] };
      }
    },
    enabled: isAuthenticated,
  });

  // Count unread messages
  const messages = messagesData?.messages || [];
  const unreadCount = messages.filter(msg => !msg.is_read).length;
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavClick = (e, page) => {
    // Shop болон Profile хуудаснууд login шаардлагагүй
    if (page === "Shop" || page === "Profile") {
      return;
    }

    // Favorites, Contact, MyOrders хуудаснууд login шаардлагатай
    if ((page === "Favorites" || page === "Contact" || page === "MyOrders") && !isAuthenticated) {
      e.preventDefault();
      toast.error("Нэвтрэх хэрэгтэй");
      navigate(createPageUrl("Login"));
    }
  };

  const navItems = [
    { icon: Home, label: "Дэлгүүр", page: "Shop" },
    { icon: Heart, label: "Таалагдсан", page: "Favorites" },
    { icon: ShoppingBag, label: "Захиалга", page: "MyOrders" },
    { icon: MessageSquare, label: "Мессеж", page: "Contact" },
    { icon: User, label: "Профайл", page: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const path = createPageUrl(item.page);
          const active = isActive(path);
          
          return (
            <Link
              key={item.page}
              to={path}
              onClick={(e) => handleNavClick(e, item.page)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                active
                  ? "text-purple-600"
                  : "text-slate-600 hover:text-purple-600"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${active ? "fill-purple-100" : ""}`} />
                {item.page === "Favorites" && favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {favoritesCount > 9 ? "9+" : favoritesCount}
                  </span>
                )}
                {item.page === "Contact" && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}