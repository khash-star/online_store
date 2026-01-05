import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowLeft, Target, Shield, Heart, Users, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/shop/Footer";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Зорилго",
      description: "Хэрэглэгчдэд дэлхийн шилдэг бүтээгдэхүүнүүдийг хялбар аргаар хүргэх"
    },
    {
      icon: Shield,
      title: "Найдвартай",
      description: "100% баталгаатай, шударга үйлчилгээ"
    },
    {
      icon: Heart,
      title: "Хэрэглэгч төвтэй",
      description: "Таны сэтгэл ханамж бидний амжилт"
    },
    {
      icon: Users,
      title: "Хамт олон",
      description: "Туршлагатай мэргэжилтнүүдийн баг"
    },
    {
      icon: TrendingUp,
      title: "Өсөлт",
      description: "Тасралтгүй хөгжиж, шинэчлэгдэж байна"
    },
    {
      icon: Award,
      title: "Чанар",
      description: "Зөвхөн шилдэг чанарын бүтээгдэхүүн"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link to={createPageUrl("Shop")}>
            <Button variant="outline" size="sm" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Бидний тухай
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            BuySmart бол дэлхийн шилдэг брэндүүдийг танд хүргэх онлайн дэлгүүр юм
          </p>
        </div>

        {/* Story */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Бидний түүх</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              BuySmart нь 2026 онд Монгол улсад үүсгэн байгуулагдсан онлайн худалдааны платформ юм. 
              Бид хэрэглэгчиддээ дэлхийн алдартай брэндүүдийн бүтээгдэхүүнүүдийг хялбар, 
              найдвартай аргаар хүргэх зорилготой ажиллаж байна.
            </p>
            <p>
              Манай зорилго бол зөвхөн бүтээгдэхүүн борлуулах биш, харин таны амьдралыг 
              илүү тав тухтай, чанартай болгоход туслах явдал юм. Бид Amazon, AliExpress, 
              Nike, Apple зэрэг дэлхийн хамгийн том брэндүүдтэй хамтран ажиллаж байна.
            </p>
            <p>
              Манай баг хэрэглэгчийн сэтгэл ханамжийг хамгийн чухалд тооцдог. 
              Бүтээгдэхүүний чанар, хүргэлтийн хурд, үйлчилгээний түвшин - бүгдэд нь 
              бид анхаарал хандуулдаг.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">
            Бидний үнэт зүйлс
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl w-fit mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black mb-2">1000+</div>
              <div className="text-purple-100">Бүтээгдэхүүн</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">500+</div>
              <div className="text-purple-100">Сэтгэл хангалуун үйлчлүүлэгч</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">20+</div>
              <div className="text-purple-100">Олон улсын брэнд</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">24/7</div>
              <div className="text-purple-100">Дэмжлэг</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Бидэнтэй хамт худалдаа хийцгээе
          </h2>
          <p className="text-slate-600 mb-6">
            Дэлхийн шилдэг бүтээгдэхүүнүүдийг танд хүргэхэд бэлэн байна
          </p>
          <Link to={createPageUrl("Shop")}>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Дэлгүүр үзэх
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}