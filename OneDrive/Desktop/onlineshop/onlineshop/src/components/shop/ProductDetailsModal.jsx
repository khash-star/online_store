import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Tag } from "lucide-react";

export default function ProductDetailsModal({ product, open, onOpenChange, onAddToCart }) {
  if (!product) return null;

  const finalPrice = product.discount_percent > 0 
    ? product.price * (1 - product.discount_percent / 100)
    : product.price;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('mn-MN').format(price) + '₮';
  };

  const categoryLabels = {
    "электроникс": "Электроникс",
    "хувцас": "Хувцас",
    "гэр ахуй": "Гэр ахуй",
    "хоол хүнс": "Хоол хүнс",
    "ном": "Ном",
    "спорт": "Спорт",
    "бусад": "Бусад"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          <DialogDescription>
            {product.description || `${categoryLabels[product.category] || product.category} ангиллын бараа`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Зураг */}
          <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <Tag className="w-24 h-24" />
              </div>
            )}
            
            {product.discount_percent > 0 && (
              <Badge className="absolute top-4 right-4 bg-rose-500 hover:bg-rose-600 text-lg px-3 py-1">
                -{product.discount_percent}%
              </Badge>
            )}
          </div>

          {/* Мэдээлэл */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {categoryLabels[product.category] || product.category}
              </Badge>
              
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-slate-900">
                  {formatPrice(finalPrice)}
                </span>
                {product.discount_percent > 0 && (
                  <span className="text-xl text-slate-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {product.description && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900">Дэлгэрэнгүй</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <Package className="w-5 h-5 text-slate-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">Нөөцийн байдал</p>
                {product.is_available && product.stock > 0 ? (
                  <p className="text-sm text-emerald-600">
                    Боломжтой ({product.stock} ширхэг)
                  </p>
                ) : (
                  <p className="text-sm text-rose-600">Дууссан</p>
                )}
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
              onClick={() => {
                onAddToCart?.(product);
                onOpenChange(false);
              }}
              disabled={!product.is_available || product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Сагсанд нэмэх
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}