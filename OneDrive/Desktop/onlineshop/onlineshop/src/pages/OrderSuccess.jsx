import { CheckCircle2, Package, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="inline-flex p-4 bg-emerald-100 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-emerald-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Захиалга амжилттай!
            </h1>
            <p className="text-slate-600">
              Таны захиалга амжилттай илгээгдлээ. Бид удахгүй холбогдох болно.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 text-left space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Package className="w-5 h-5 text-slate-400" />
              <div>
                <p className="font-medium text-slate-900">Захиалгын төлөв</p>
                <p className="text-slate-600">Шинэ захиалга</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Link to={createPageUrl("Shop")} className="block">
              <Button className="w-full bg-slate-900 hover:bg-slate-800" size="lg">
                <Home className="w-4 h-4 mr-2" />
                Дэлгүүр рүү буцах
              </Button>
            </Link>
            
            <Link to={createPageUrl("MyOrders")} className="block">
              <Button variant="outline" className="w-full" size="lg">
                Миний захиалгууд
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}