import { motion } from "framer-motion";
import { getFeatured } from "@/api/featured";
import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, ShoppingCart } from "lucide-react";

export default function FeaturedProducts({ onProductClick, onAddToCart }) {
  const { data: featuredData = {}, isLoading: isLoadingFeatured } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const data = await getFeatured({ sort: "order" });
      return data;
    },
  });

  // Ensure featuredList is always an array
  const featuredList = Array.isArray(featuredData.featured) 
    ? featuredData.featured 
    : Array.isArray(featuredData) 
      ? featuredData 
      : [];
  
  const productIds = Array.isArray(featuredList) 
    ? featuredList.map(f => f?.product_id).filter(Boolean)
    : [];

  const { data: productsData = {}, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["featured-products-list", productIds],
    queryFn: async () => {
      const data = await getProducts({ sort: "-created_at" });
      return data;
    },
    // Always fetch products - we'll use them even if no featured products
    enabled: true,
  });

  // Ensure allProducts is always an array
  const allProducts = Array.isArray(productsData.products) 
    ? productsData.products 
    : Array.isArray(productsData) 
      ? productsData 
      : [];
  
  let products = [];

  if (featuredList.length > 0 && productIds.length > 0) {
    products = Array.isArray(allProducts) 
      ? allProducts.filter(p => productIds.includes(p.id) && p.is_available)
      : [];
    // Order by featured order
    products.sort((a, b) => {
      const aOrder = featuredList.find(f => f.product_id === a.id)?.order || 0;
      const bOrder = featuredList.find(f => f.product_id === b.id)?.order || 0;
      return aOrder - bOrder;
    });
  } else {
    // If no featured products, show first 10 available products
    products = Array.isArray(allProducts) 
      ? allProducts.filter(p => p.is_available).slice(0, 10)
      : [];
  }

  const isLoading = isLoadingFeatured || isLoadingProducts;

  if (isLoading || products.length === 0) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + '₮';
  };

  return (
    <div className="bg-white py-12 overflow-hidden border-y border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">🔥 Онцлох бүтээгдэхүүнүүд</h2>
      </div>
      
      <div className="relative flex">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...products, ...products, ...products].map((product, index) => {
            const finalPrice = product.discount_percent > 0 
              ? product.price * (1 - product.discount_percent / 100)
              : product.price;

            return (
              <div
                key={`${product.id}-${index}`}
                className="inline-block w-[176px] bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all hover:scale-105"
              >
                <div 
                  className="aspect-square bg-slate-100 relative overflow-hidden cursor-pointer"
                  onClick={() => onProductClick?.(product)}
                >
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Tag className="w-16 h-16 text-slate-300" />
                    </div>
                  )}
                  
                  {product.discount_percent > 0 && (
                    <Badge className="absolute top-3 right-3 bg-rose-500 hover:bg-rose-600 text-white font-bold">
                      -{product.discount_percent}%
                    </Badge>
                  )}
                </div>
                
                <div className="p-2">
                  <h3 
                    className="font-bold text-slate-900 mb-1 truncate text-xs cursor-pointer hover:text-purple-600"
                    onClick={() => onProductClick?.(product)}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-base font-black text-slate-900">
                      {formatPrice(finalPrice)}
                    </span>
                    {product.discount_percent > 0 && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  
                  <Button
                    size="sm"
                    className="w-full text-xs h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAddToCart) {
                        onAddToCart(product);
                      } else if (onProductClick) {
                        onProductClick(product);
                      }
                    }}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Сагсанд нэмэх
                  </Button>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}