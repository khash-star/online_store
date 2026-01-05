import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { getFavorites, addFavorite, removeFavorite } from "@/api/favorites";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Store, Search, ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/shop/ProductCard";
import CartSheet from "@/components/shop/CartSheet";
import ProductDetailsModal from "@/components/shop/ProductDetailsModal";
import { toast } from "sonner";

const CATEGORIES = [
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

export default function CategoryProducts() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category") || "бусад";
  
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef(null);

  const queryClient = useQueryClient();

  const category = CATEGORIES.find(c => c.value === categoryParam) || CATEGORIES[0];

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ sort: "-created_at" }),
  });

  const products = productsData?.products || [];

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

  const favorites = favoritesData?.favorites || [];

  const toggleFavorite = async (product) => {
    try {
      if (!isAuthenticated) {
        toast.error("Нэвтэрнэ үү");
        navigate(createPageUrl("Profile"));
        return;
      }
      
      const existing = favorites.find(f => f.product_id === product.id);
      
      if (existing) {
        await removeFavorite(existing.id);
        toast.info("Таалагдсанаас хасагдлаа");
      } else {
        await addFavorite(product.id);
        toast.success("Таалагдсанд нэмэгдлээ ❤️");
      }
      
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Нэвтэрнэ үү");
        navigate(createPageUrl("Profile"));
      } else {
        toast.error("Алдаа гарлаа");
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.search]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = product.category === categoryParam;
    const matchesGender = selectedGender === "all" || product.gender === selectedGender;
    return matchesSearch && matchesCategory && matchesGender && product.is_available;
  });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.success("Тоо ширхэг нэмэгдлээ");
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success("Сагсанд нэмэгдлээ");
        const finalPrice = product.discount_percent > 0 
          ? product.price * (1 - product.discount_percent / 100)
          : product.price;
        
        return [...prevCart, { 
          ...product, 
          quantity: 1,
          price: finalPrice 
        }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.info("Сагснаас хасагдлаа");
  };

  const viewDetails = (product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
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
                  {category.label}
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  {filteredProducts.length} бүтээгдэхүүн
                </p>
              </div>
            </div>
            
            <CartSheet 
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onClose={() => setCartOpen(false)}
              open={cartOpen}
              onOpenChange={setCartOpen}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Бүтээгдэхүүн хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {(categoryParam === "хувцас" || categoryParam === "гутал") && (
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Хүйс сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүгд</SelectItem>
                <SelectItem value="эрэгтэй">Эрэгтэй</SelectItem>
                <SelectItem value="эмэгтэй">Эмэгтэй</SelectItem>
                <SelectItem value="унисекс">Унисекс</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-slate-200 rounded-t-xl" />
                <div className="bg-white p-4 rounded-b-xl space-y-3">
                  <div className="h-4 bg-slate-200 rounded" />
                  <div className="h-6 bg-slate-200 rounded w-2/3" />
                  <div className="h-10 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <ShoppingBag className="w-20 h-20 mb-4" />
            <p className="text-lg">Бүтээгдэхүүн олдсонгүй</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={viewDetails}
                isFavorite={favorites.some(f => f.product_id === product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      <ProductDetailsModal
        product={selectedProduct}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onAddToCart={addToCart}
      />

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