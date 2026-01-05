import { useState, useRef } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { getStores } from "@/api/stores";
import { useQuery } from "@tanstack/react-query";

export default function PopularStores() {
  const scrollRef = useRef(null);

  const { data: storesData, error: storesError, isLoading } = useQuery({
    queryKey: ["onlineStores"],
    queryFn: async () => {
      try {
        const data = await getStores({ sort: "order" });
        return data;
      } catch (error) {
        console.error("Get stores error:", error);
        return { stores: [] };
      }
    },
  });

  // Ensure stores is always an array
  const stores = Array.isArray(storesData?.stores) 
    ? storesData.stores 
    : Array.isArray(storesData) 
      ? storesData 
      : [];
  
  // Log error but don't break the UI
  if (storesError) {
    console.error("Stores query error:", storesError);
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden w-full">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white flex-1 text-center sm:text-left">
              Дэлхийн шилдэг брэндүүд
            </h2>
            <Link to={createPageUrl("OnlineStores")}>
              <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-purple-700">
                Бүгдийг харах →
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center py-12">
            <p className="text-purple-300 text-sm font-medium">Ачааллаж байна...</p>
          </div>
        </div>
      </div>
    );
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden w-full">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white flex-1 text-center sm:text-left">
            Дэлхийн шилдэг брэндүүд
          </h2>
          <Link to={createPageUrl("OnlineStores")}>
            <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-purple-700">
              Бүгдийг харах →
            </Button>
          </Link>
        </div>

        <div className="relative group">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div 
            ref={scrollRef} 
            className="overflow-x-auto scrollbar-hide"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x pan-y',
              overscrollBehaviorX: 'auto'
            }}
          >
            <div className="flex gap-4 pb-6 px-4" style={{ width: 'max-content' }}>
            {storesError ? (
              <div className="flex flex-col items-center justify-center w-full py-12 gap-2">
                <p className="text-red-300 text-sm font-medium">
                  ⚠️ Backend алдаа: {storesError.response?.status || 'Unknown error'}
                </p>
                <p className="text-purple-300 text-xs">
                  Database дээр дэлгүүрүүд байгаа ч backend API ажиллахгүй байна.
                </p>
              </div>
            ) : stores.length === 0 ? (
              <div className="flex items-center justify-center w-full py-12">
                <p className="text-purple-300 text-sm font-medium">
                  Дэлгүүр олдсонгүй. Админ панел дээр дэлгүүр нэмнэ үү.
                </p>
              </div>
            ) : (
              stores.slice(0, 20).map((store, index) => (
              <a
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-2xl p-6 border-2 border-purple-200/50 hover:border-yellow-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex-shrink-0 w-40 sm:w-44"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${store.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                <div className="relative aspect-square flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 group-hover:bg-gradient-to-br group-hover:from-yellow-50 group-hover:to-orange-50 transition-all duration-300">
                  <img 
                    src={store.logo_url} 
                    alt={store.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Лого ачааллаж байхгүй үед fallback
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center">
                    <div className="text-4xl font-black text-purple-400">
                      {store.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="relative mt-4 text-center">
                  <p className="font-black text-slate-800 text-base group-hover:text-purple-600 transition-colors">
                    {store.name}
                  </p>
                </div>

                <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-full p-2.5 shadow-xl">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </a>
              ))
            )}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-purple-300 text-sm font-medium">
            ✨ Бүх брэндийн албан ёсны вэбсайт руу холбогдоно
          </p>
        </div>
      </div>
    </div>
  );
}