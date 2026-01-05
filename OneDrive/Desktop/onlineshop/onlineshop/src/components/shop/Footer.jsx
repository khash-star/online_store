import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile: Accordion, Desktop: Grid */}
        <div className="md:grid md:grid-cols-2 gap-8 mb-6">
          {/* Нэг цэс - бүх холбоосууд */}
          <div className="md:block">
            <div className="md:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="menu" className="border-b border-white/10">
                  <AccordionTrigger className="text-white hover:no-underline py-3">
                    <h4 className="font-bold text-base">Сайтын тухай</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pt-3 pb-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <Link to={createPageUrl("Shop")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                        Дэлгүүр
                      </Link>
                      <Link to={createPageUrl("About")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                        Бидний тухай
                      </Link>
                      <Link to={createPageUrl("Contact")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                        Холбоо барих
                      </Link>
                      <Link to={createPageUrl("FAQ")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                        Түгээмэл асуулт
                      </Link>
                      <Link to={createPageUrl("Terms")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                        Үйлчилгээний нөхцөл
                      </Link>
                      <Link to={createPageUrl("Favorites")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                        Таалагдсан
                      </Link>
                      <Link to={createPageUrl("MyOrders")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                        Миний захиалга
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="hidden md:block">
              <h4 className="font-bold text-base mb-3">Сайтын тухай</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <Link to={createPageUrl("Shop")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                  Дэлгүүр
                </Link>
                <Link to={createPageUrl("About")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                  Бидний тухай
                </Link>
                <Link to={createPageUrl("Contact")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                  Холбоо барих
                </Link>
                <Link to={createPageUrl("FAQ")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                  Түгээмэл асуулт
                </Link>
                <Link to={createPageUrl("Terms")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                  Үйлчилгээний нөхцөл
                </Link>
                <Link to={createPageUrl("Favorites")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                  Таалагдсан
                </Link>
                <Link to={createPageUrl("MyOrders")} onClick={scrollToTop} className="text-slate-300 hover:text-white transition-colors text-sm">
                  Миний захиалга
                </Link>
              </div>
            </div>
          </div>

          {/* Холбоо барих */}
          <div className="md:block">
            <div className="md:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="contact" className="border-b border-white/10">
                  <AccordionTrigger className="text-white hover:no-underline py-3">
                    <h4 className="font-bold text-base">Холбоо барих</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pt-3 pb-4">
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Улаанбаатар хот, Монгол улс</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>+976 9999-9999</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>info@buysmart.mn</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="hidden md:block">
              <h4 className="font-bold text-base mb-3">Холбоо барих</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Улаанбаатар хот, Монгол улс</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+976 9999-9999</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@buysmart.mn</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-4 text-center text-slate-400 text-xs">
          <p>© 2026 BuySmart. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}