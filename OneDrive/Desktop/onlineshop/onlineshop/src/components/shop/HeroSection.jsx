import { ChevronRight, TrendingUp, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection({ onScrollToProducts }) {
  return (
    <div className="relative bg-white overflow-hidden w-full">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-200/40 to-yellow-200/40 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
              Дэлхийн
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                шилдэг брэндүүд
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
              Олон улсын алдартай брэндүүдийн бүтээгдэхүүнүүдийг нэг дороос хайж олоорой
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all font-bold px-8 text-base"
                onClick={onScrollToProducts}
              >
                Дэлгүүр үзэх
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 font-semibold px-8 text-base"
              >
                🎁 Хөнгөлөлт
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-purple-100">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-2">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-slate-900 text-sm">Үнэгүй хүргэлт</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-purple-100">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl mb-2">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-slate-900 text-sm">100% баталгаа</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-purple-100">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl mb-2">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-slate-900 text-sm">Шинэ бараа</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-30" />
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80" 
                alt="Shopping"
                className="relative rounded-3xl shadow-2xl w-full max-w-lg object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-6 shadow-2xl border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900">500+</p>
                    <p className="text-sm text-slate-600">Бүтээгдэхүүн</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}