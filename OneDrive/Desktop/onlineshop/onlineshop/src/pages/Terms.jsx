import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowLeft, Shield, Truck, RefreshCw, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/shop/Footer";

export default function Terms() {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Үйлчилгээний нөхцөл
          </h1>
          <p className="text-xl text-slate-600">
            Та бидний үйлчилгээг ашиглахын өмнө уншина уу
          </p>
        </div>

        <div className="space-y-8">
          {/* Хүргэлт */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Хүргэлтийн нөхцөл</h2>
            </div>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Хүргэлтийн хугацаа</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Улаанбаатар хот: 1-2 хоног</li>
                  <li>Орон нутаг: 3-5 хоног</li>
                  <li>Алслагдсан бүс: 5-7 хоног</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Хүргэлтийн төлбөр</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>100,000₮-аас дээш захиалгад үнэгүй</li>
                  <li>100,000₮-аас доош: 5,000₮</li>
                  <li>Орон нутаг: 10,000₮</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Хүргэх нөхцөл</h3>
                <p>
                  Бүтээгдэхүүнийг хүлээн авахдаа анхааралтай шалгана уу. 
                  Гэмтэлтэй байвал бол хүлээн авахаас татгалзаж, курьертай хамт 
                  бүртгэл хийлгэнэ үү.
                </p>
              </div>
            </div>
          </div>

          {/* Буцаалт */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Буцаалт солилт</h2>
            </div>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Буцаах нөхцөл</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Хүлээн авснаас хойш 14 хоногийн дотор</li>
                  <li>Бүтээгдэхүүн ашиглагдаагүй байх</li>
                  <li>Анхны сав баглаа боодолтой байх</li>
                  <li>Борлуулалтын баримттай байх</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Буцаах боломжгүй бараа</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Хувийн ариун цэврийн бүтээгдэхүүн</li>
                  <li>Хүнсний бүтээгдэхүүн</li>
                  <li>Эмийн бэлдмэл</li>
                  <li>Хөнгөлөлттэй худалдсан бараа</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Мөнгө буцаах хугацаа</h3>
                <p>
                  Бүтээгдэхүүнийг хүлээн авч шалгасны дараа 3-5 хоногийн дотор 
                  мөнгийг буцаан олгоно.
                </p>
              </div>
            </div>
          </div>

          {/* Төлбөр */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Төлбөрийн нөхцөл</h2>
            </div>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Төлбөрийн хэлбэр</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Бэлэн мөнгө (хүргэлтийн үед)</li>
                  <li>Карт (Visa, MasterCard, AmEx)</li>
                  <li>Дансаар шилжүүлэг</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Төлбөрийн аюулгүй байдал</h3>
                <p>
                  Бүх төлбөрийн гүйлгээ SSL шифрлэлттэй байдаг. 
                  Таны карт болон банкны мэдээллийг бид хадгалдаггүй.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Үнийн мэдээлэл</h3>
                <p>
                  Вэб сайтад үзүүлсэн үнэ нь эцсийн үнэ мөн. 
                  Нэмэлт төлбөр (хүргэлт гэх мэт) тусад нь тодорхойлогдоно.
                </p>
              </div>
            </div>
          </div>

          {/* Нууцлал */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Нууцлалын бодлого</h2>
            </div>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Цуглуулдаг мэдээлэл</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Нэр, утас, имэйл хаяг</li>
                  <li>Хүргэлтийн хаяг</li>
                  <li>Захиалгын түүх</li>
                  <li>Төлбөрийн мэдээлэл</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Мэдээлэл ашиглах</h3>
                <p>
                  Таны мэдээллийг зөвхөн захиалга боловсруулах, 
                  үйлчилгээ сайжруулах зорилгоор ашиглана. 
                  Гуравдагч талд задруулахгүй.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Хамгаалалт</h3>
                <p>
                  Таны мэдээллийг хуулиар хамгаалагдсан, 
                  аюулгүй серверт хадгална.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Асуулт байна уу?</h2>
          <p className="text-purple-100 mb-6">
            Манай үйлчилгээний нөхцлийн талаар асуух зүйл байвал холбогдоорой
          </p>
          <Link to={createPageUrl("Contact")}>
            <Button variant="secondary" size="lg" className="bg-white text-purple-600 hover:bg-slate-100">
              Холбоо барих
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}