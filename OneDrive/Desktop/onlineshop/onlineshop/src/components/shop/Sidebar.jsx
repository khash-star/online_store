import { Smartphone, Shirt, Home, Apple, Book, Dumbbell, Package, Store } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const CATEGORY_ICONS = {
  "электроникс": Smartphone,
  "хувцас": Shirt,
  "гэр ахуй": Home,
  "хоол хүнс": Apple,
  "ном": Book,
  "спорт": Dumbbell,
  "бусад": Package
};

export default function Sidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-purple-100/50 h-[calc(100vh-80px)] sticky top-[80px]">
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6">
          {/* Ангилал */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Store className="w-4 h-4" />
              Ангилал
            </h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const Icon = CATEGORY_ICONS[category.value] || Package;
                const isSelected = selectedCategory === category.value;
                
                return (
                  <button
                    key={category.value}
                    onClick={() => onSelectCategory(category.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}