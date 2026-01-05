import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/shop/Footer";

export default function FAQ() {
  const faqs = [
    {
      category: "Захиалга",
      questions: [
        {
          q: "Яаж захиалга өгөх вэ?",
          a: "Бүтээгдэхүүнийг сагсанд нэмж, 'Төлбөр төлөх' товч дарна. Хүргэлтийн мэдээллээ оруулаад захиалгаа баталгаажуулна."
        },
        {
          q: "Захиалгаа цуцлах боломжтой юу?",
          a: "Тийм, захиалга баталгаажуулснаас хойш 24 цагийн дотор цуцлах боломжтой. 'Миний захиалга' хэсгээс захиалгаа цуцлана уу."
        },
        {
          q: "Захиалгын төлөвийг хэрхэн шалгах вэ?",
          a: "'Миний захиалга' хэсэгт очиж захиалгынхаа дэлгэрэнгүй мэдээлэл, төлөвийг харах боломжтой."
        }
      ]
    },
    {
      category: "Төлбөр",
      questions: [
        {
          q: "Ямар төлбөрийн хэлбэр ашиглаж болох вэ?",
          a: "Бэлэн мөнгө, карт, дансаар шилжүүлэг гэсэн гурван төлбөрийн хэлбэрийг дэмжинэ."
        },
        {
          q: "Төлбөр найдвартай юу?",
          a: "Тийм, бүх төлбөрийн гүйлгээ шифрлэгдсэн байдаг бөгөөд таны карт, банкны мэдээлэл аюулгүй хадгалагдана."
        },
        {
          q: "Хөнгөлөлттэй код хэрхэн ашиглах вэ?",
          a: "Төлбөр төлөх хэсэгт 'Хөнгөлөлтийн код' гэсэн талбар байгаа бөгөөд тэнд кодоо оруулаад баталгаажуулна."
        }
      ]
    },
    {
      category: "Хүргэлт",
      questions: [
        {
          q: "Хүргэлт хэр удаан үргэлжлэх вэ?",
          a: "УБ хотод 1-2 хоног, орон нутагт 3-5 хоногийн дотор хүргэнэ."
        },
        {
          q: "Хүргэлтийн төлбөр хэд вэ?",
          a: "100,000₮-аас дээш захиалгад хүргэлт үнэгүй. Түүнээс доош захиалгад 5,000₮ төлнө."
        },
        {
          q: "Хүргэлтийн хаягаа өөрчлөх боломжтой юу?",
          a: "Захиалга баталгаажсанаас хойш 2 цагийн дотор бидэнтэй холбогдож хаягаа өөрчлөх боломжтой."
        }
      ]
    },
    {
      category: "Буцаалт",
      questions: [
        {
          q: "Бүтээгдэхүүнийг буцаах боломжтой юу?",
          a: "Тийм, хүлээн авснаас хойш 14 хоногийн дотор буцаах боломжтой. Бүтээгдэхүүн хэрэглэгдээгүй, анхны байдалтай байх ёстой."
        },
        {
          q: "Буцаах үйл явц хэрхэн явагдах вэ?",
          a: "'Миний захиалга' хэсгээс буцаалтын хүсэлт илгээнэ. Бид хүсэлтийг хянаж, баталгаажуулсны дараа мөнгийг буцаан олгоно."
        },
        {
          q: "Мөнгийг хэзээ буцаан авах вэ?",
          a: "Бүтээгдэхүүнийг хүлээн авсны дараа 3-5 хоногийн дотор мөнгийг буцаан олгоно."
        }
      ]
    },
    {
      category: "Бүртгэл",
      questions: [
        {
          q: "Бүртгэл заавал хийх ёстой юу?",
          a: "Тийм, таалагдсан бараа хадгалах, захиалга өгөх, түүхээ харахын тулд бүртгэл хийх шаардлагатай."
        },
        {
          q: "Нууцлал найдвартай юу?",
          a: "Таны мэдээллийг бид гуравдагч этгээдэд задруулахгүй, хуулиар хамгаалагдсан."
        },
        {
          q: "Нууц үгээ мартсан бол яах вэ?",
          a: "Нэвтрэх хуудсанд 'Нууц үг мартсан' гэснийг дарж имэйл хаягаа оруулна. Бид таны имэйл рүү шинэчлэх холбоос илгээнэ."
        }
      ]
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Түгээмэл асуулт
          </h1>
          <p className="text-xl text-slate-600">
            Таны асуултад хариулт энд байна
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {category.questions.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${index}-${idx}`} className="border border-slate-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold text-slate-900">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pt-2">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Хариулт олдсонгүй юу?</h2>
          <p className="text-purple-100 mb-6">
            Бидэнтэй холбогдоорой, бид танд туслахад бэлэн байна
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