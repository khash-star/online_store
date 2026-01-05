import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavorites, addFavorite, removeFavorite } from "@/api/favorites";
import { getProducts } from "@/api/products";
import { useAuth } from "@/hooks/useAuth";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shop/ProductCard";
import CartSheet from "@/components/shop/CartSheet";
import ProductDetailsModal from "@/components/shop/ProductDetailsModal";
import { toast } from "sonner";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function Favorites() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isAuthenticated } = useAuth();

  const { data: favoritesData, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const data = await getFavorites();
      return data;
    },
    enabled: isAuthenticated,
  });

  const favorites = favoritesData?.favorites || [];

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ sort: "-created_at" }),
  });

  const products = productsData?.products || [];

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const favoriteProducts = products.filter(p => 
    favorites.some(f => f.product_id === p.id)
  );

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

  const toggleFavorite = async (product) => {
    try {
      if (!isAuthenticated) {
        toast.error("Нэвтэрнэ үү");
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
      } else {
        toast.error("Алдаа гарлаа");
      }
    }
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
              <div className="p-2.5 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-xl">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent">
                  Таалагдсан бараа
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  {favoriteProducts.length} бүтээгдэхүүн
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
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
        ) : favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart className="w-24 h-24 text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Таалагдсан бараа байхгүй байна
            </h2>
            <p className="text-slate-500 mb-6">
              Бараа дээр ❤️ дарж таалагдсан жагсаалтандаа нэмнэ үү
            </p>
            <Link to={createPageUrl("Shop")}>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Дэлгүүр үзэх
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={viewDetails}
                isFavorite={true}
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
      <MobileBottomNav />
    </div>
  );
}