import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ITEMS = [
  { id:1,  category:"лендинг",    title:"Студия красоты",    sub:"Продающий лендинг с онлайн-записью",       img:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&h=520&fit=crop" },
  { id:2,  category:"магазин",    title:"Бутик одежды",      sub:"Интернет-магазин с каталогом и корзиной",  img:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=520&fit=crop" },
  { id:3,  category:"корпоратив", title:"IT-компания",        sub:"Корпоративный сайт с командой и услугами", img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=520&fit=crop" },
  { id:4,  category:"лендинг",    title:"Онлайн-школа",      sub:"Курс по продвижению — перенос из Figma",   img:"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&h=520&fit=crop" },
  { id:5,  category:"магазин",    title:"Цветочный магазин", sub:"Магазин с доставкой и фильтром",           img:"https://images.unsplash.com/photo-1487530811015-780ce39de73d?w=700&h=520&fit=crop" },
  { id:6,  category:"корпоратив", title:"Фотограф",           sub:"Портфолио с галереей и формой заявки",    img:"https://images.unsplash.com/photo-1452780212461-8ef04b6ddfc4?w=700&h=520&fit=crop" },
  { id:7,  category:"лендинг",    title:"Косметолог",         sub:"Лендинг с формой записи и прайсом",        img:"https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700&h=520&fit=crop" },
  { id:8,  category:"магазин",    title:"Украшения ручной работы", sub:"Магазин с каталогом и оплатой",     img:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&h=520&fit=crop" },
  { id:9,  category:"корпоратив", title:"Архитектурное бюро", sub:"Сайт с портфолио проектов",               img:"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&h=520&fit=crop" },
];

const CATS = ["все","лендинг","магазин","корпоратив"];

export default function Portfolio() {
  const [active, setActive] = useState("все");
  const filtered = active === "все" ? ITEMS : ITEMS.filter(i => i.category === active);

  return (
    <div className="font-body text-brand-charcoal min-h-screen" style={{ background:"#F5F0FF" }}>

      {/* Шапка */}
      <header className="border-b-2 border-brand-black bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-xl leading-tight tracking-tight">
            Ирина<br/>
            <em className="not-italic text-brand-lavender-dark font-accent italic">Завадская</em>
          </Link>
          <Link to="/" className="btn-dark text-sm">
            <Icon name="ArrowLeft" size={15} /> На главную
          </Link>
        </div>
      </header>

      {/* Заголовок */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <span className="tag tag-lavender mb-4 inline-block">🌸 Мои работы</span>
        <h1 className="font-display text-5xl md:text-7xl text-brand-charcoal mb-3">Портфолио</h1>
        <p className="font-accent italic text-brand-lavender-dark text-xl mb-8">— 120+ проектов за 4 года</p>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-3">
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`font-body text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full border-2 border-brand-black transition-all
                ${active === cat
                  ? "bg-brand-charcoal text-white shadow-[3px_3px_0_#9B7CC8]"
                  : "bg-white text-brand-charcoal hover:shadow-[3px_3px_0_#1E1B1E]"
                }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div key={item.id}
              className="border-2 border-brand-black rounded-2xl overflow-hidden bg-white shadow-[5px_5px_0_#1E1B1E] hover:shadow-[2px_2px_0_#1E1B1E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer group">
              <div className="relative overflow-hidden h-52 border-b-2 border-brand-black">
                <img src={item.img} alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 tag tag-lavender">{item.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl mb-1 text-brand-charcoal">{item.title}</h3>
                <p className="font-body text-brand-charcoal/55 text-sm">{item.sub}</p>
                <div className="mt-4 flex items-center gap-2 font-body text-xs font-bold tracking-widest uppercase text-brand-lavender-dark group-hover:gap-3 transition-all">
                  Смотреть <Icon name="ArrowRight" size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t-2 border-brand-black py-16 text-center" style={{ background:"#2A2530" }}>
        <p className="font-display text-3xl text-white mb-6">Хотите такой же сайт? 🌸</p>
        <Link to="/#contact" className="btn-yellow">Обсудить проект <Icon name="ArrowRight" size={16} /></Link>
      </div>

    </div>
  );
}
