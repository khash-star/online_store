import { Smartphone, Shirt, Home, Apple, Book, Dumbbell, Package } from "lucide-react";

const CATEGORY_ICONS = {
  "электроникс": Smartphone,
  "хувцас": Shirt,
  "гэр ахуй": Home,
  "хоол хүнс": Apple,
  "ном": Book,
  "спорт": Dumbbell,
  "бусад": Package
};

const CATEGORY_COLORS = {
  "электроникс": "from-blue-600 to-cyan-400",
  "хувцас": "from-purple-600 to-pink-400",
  "гэр ахуй": "from-emerald-600 to-teal-400",
  "хоол хүнс": "from-orange-600 to-yellow-400",
  "ном": "from-amber-600 to-orange-400",
  "спорт": "from-rose-600 to-pink-400",
  "бусад": "from-slate-600 to-slate-400"
};

export default function CategoryGrid({ categories, onSelectCategory }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-8">
      {categories.filter(c => c.value !== "all").map((category) => {
        const Icon = CATEGORY_ICONS[category.value] || Package;
        const gradient = CATEGORY_COLORS[category.value] || "from-slate-500 to-slate-600";
        
        return (
          <button
            key={category.value}
            onClick={() => onSelectCategory(category.value)}
            className="group"
          >
            <div className={`relative bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white hover:shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden`}>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300" />
              <Icon className="relative w-10 h-10 mx-auto mb-2 drop-shadow-lg" />
              <p className="relative text-sm font-bold text-center drop-shadow">
                {category.label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}