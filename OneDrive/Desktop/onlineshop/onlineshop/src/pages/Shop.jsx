import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Store, Search, Filter, ShoppingBag, Link as LinkIcon, Menu, X, Settings, ArrowUp, ChevronLeft, ChevronRight, Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { getProducts } from "@/api/products";
import { getFavorites, addFavorite, removeFavorite } from "@/api/favorites";
import { createSearchQuery } from "@/api/searchQueries";
import { useAuth } from "@/hooks/useAuth";
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
import HeroSection from "@/components/shop/HeroSection";
import PopularStores from "@/components/shop/PopularStores";
import ProductMarquee from "@/components/shop/ProductMarquee";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import ImportProductDialog from "@/components/shop/ImportProductDialog";
import Footer from "@/components/shop/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

import { toast } from "sonner";

const CATEGORIES = [
  { value: "all", label: "Бүгд" },
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

export default function Shop() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const productsRef = useRef(null);
  const productsScrollRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const { data: productsData, isLoading, refetch } = useQuery({
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

  const queryClient = useQueryClient();

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

  const saveSearchQuery = async (query) => {
    if (!query.trim() || query.length < 2) return;
    
    try {
      await createSearchQuery(query.trim());
    } catch (error) {
      // Алдаа гарсан ч үргэлжлүүлнэ
    }
  };

  // Сагсыг localStorage-аас уншаж авах
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);


  // Скролл товч
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Сагсыг localStorage-д хадгалах
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && product.is_available;
  });

  const productsByCategory = CATEGORIES.slice(1).reduce((acc, category) => {
    const categoryProducts = filteredProducts.filter(p => p.category === category.value).slice(0, 10);
    if (categoryProducts.length > 0) {
      acc.push({ category, products: categoryProducts });
    }
    return acc;
  }, []);

  const addToCart = (product) => {
    // Login шалгах
    if (!isAuthenticated) {
      toast.error("Сагсанд нэмэхийн тулд нэвтрэх хэрэгтэй");
      navigate(createPageUrl("Login"));
      return;
    }

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

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollProducts = (direction) => {
    if (productsScrollRef.current) {
      const scrollAmount = 300;
      productsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 overflow-x-hidden w-full max-w-full">
      {/* Толгой хэсэг */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to={createPageUrl("Shop")} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="p-2.5 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl shadow-xl">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  BuySmart
                </h1>
                <p className="text-xs text-slate-500 font-medium">Ухаалаг сонголт ✨</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <Link to={createPageUrl("Profile")} className="hidden sm:block">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(createPageUrl("Login"))}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 hidden sm:flex"
                >
                  <User className="w-5 h-5" />
                </Button>
              )}

              <Link to={createPageUrl("Favorites")} className="hidden sm:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-600 hover:text-red-500 relative"
                >
                  <Heart className="w-5 h-5" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {favorites.length}
                    </span>
                  )}
                </Button>
              </Link>

              {user?.role === "admin" && (
                <Link to={createPageUrl("PromoAdmin")} className="hidden sm:block">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-600 hover:text-purple-600"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </Link>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setImportOpen(true)}
                className="border-purple-200 text-purple-700 hover:bg-purple-50 hidden sm:flex"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Захиалга оруулах
              </Button>

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
        </div>
      </header>

      <FeaturedProducts onProductClick={viewDetails} onAddToCart={addToCart} />

      <ProductMarquee />

      <PopularStores />

      {/* Products */}
      <main className="py-12 w-full overflow-x-hidden" ref={productsRef}>
        {/* Хайлт */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Бүтээгдэхүүн хайх..."
              value={searchQuery}
              onChange={(e) => {
                const query = e.target.value;
                setSearchQuery(query);

                // Debounce хайлтын статистик
                if (searchTimeoutRef.current) {
                  clearTimeout(searchTimeoutRef.current);
                }

                searchTimeoutRef.current = setTimeout(() => {
                  if (query.trim()) {
                    saveSearchQuery(query);
                  }
                }, 1500);
              }}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Бүтээгдэхүүнүүд ангилал бүрээр */}
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="animate-pulse space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-8 bg-slate-200 rounded w-48 mb-4" />
                  <div className="flex gap-6 overflow-x-auto">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="flex-shrink-0 w-72">
                        <div className="aspect-square bg-slate-200 rounded-t-xl" />
                        <div className="bg-white p-4 rounded-b-xl space-y-3">
                          <div className="h-4 bg-slate-200 rounded" />
                          <div className="h-6 bg-slate-200 rounded w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : productsByCategory.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <ShoppingBag className="w-20 h-20 mb-4" />
              <p className="text-lg">Бүтээгдэхүүн олдсонгүй</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 overflow-hidden">
            {productsByCategory.map(({ category, products }) => (
              <div key={category.value} className="overflow-hidden w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">{category.label}</h2>
                  <Link to={createPageUrl("CategoryProducts") + `?category=${category.value}`}>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                      Бүгдийг харах →
                    </Button>
                  </Link>
                </div>
                
                <div className="relative group overflow-hidden w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const container = document.getElementById(`scroll-${category.value}`);
                      container?.scrollBy({ left: -300, behavior: 'smooth' });
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  <div id={`scroll-${category.value}`} className="overflow-x-auto scrollbar-hide w-full" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}>
                    <div className="flex gap-3 pb-4 pl-4 sm:pl-6">
                      {products.map((product) => (
                        <div key={product.id} className="flex-shrink-0 w-44">
                          <ProductCard
                            product={product}
                            onAddToCart={addToCart}
                            onViewDetails={viewDetails}
                            isFavorite={favorites.some(f => f.product_id === product.id)}
                            onToggleFavorite={toggleFavorite}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const container = document.getElementById(`scroll-${category.value}`);
                      container?.scrollBy({ left: 300, behavior: 'smooth' });
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Дэлгэрэнгүй мэдээлэл */}
      <ProductDetailsModal
        product={selectedProduct}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onAddToCart={addToCart}
      />

      {/* Гадаад дэлгүүрээс нэмэх */}
      <ImportProductDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onSuccess={refetch}
      />

      {/* Скролл дээш товч */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 z-50"
          size="icon"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
        )}

        <Footer />
        <MobileBottomNav />
        </div>
        );
        }