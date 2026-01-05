import { ShoppingCart, Tag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ProductCard({ product, onAddToCart, onViewDetails, isFavorite, onToggleFavorite }) {
  const finalPrice = product.discount_percent > 0 
    ? product.price * (1 - product.discount_percent / 100)
    : product.price;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + '₮';
  };

  const handleClick = () => {
    // Зураг дээр дарахад дэлгэрэнгүй modal нээх
    onViewDetails?.(product);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div 
        className="relative cursor-pointer"
        onClick={handleClick}
      >
        <div className="aspect-square bg-slate-100 overflow-hidden">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <Tag className="w-16 h-16" />
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm hover:bg-white z-10 w-8 h-8"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(product);
          }}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
        </Button>

        {product.discount_percent > 0 && (
          <Badge className="absolute top-2 right-2 bg-rose-500 hover:bg-rose-600 text-xs px-1.5 py-0.5">
            -{product.discount_percent}%
          </Badge>
        )}
        
        {!product.is_available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-lg">
              Дууссан
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="pt-1 pb-0">
        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-0 text-sm min-h-[1.8rem] leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-bold text-slate-900">
            {formatPrice(finalPrice)}
          </span>
          {product.discount_percent > 0 && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-xs text-amber-600">
            Үлдсэн: {product.stock} ширхэг
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0.5 pb-1">
        <Button 
          className="w-full bg-slate-900 hover:bg-slate-800 h-7 text-xs"
          onClick={() => onAddToCart(product)}
          disabled={!product.is_available || product.stock === 0}
        >
          <ShoppingCart className="w-3 h-3 mr-1" />
          Сагсанд нэмэх
        </Button>
      </CardFooter>
    </Card>
  );
}