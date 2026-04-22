import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ITEMS = [
  { id:1, category:"лендинг",    title:"Студия красоты",         sub:"Продающий лендинг с онлайн-записью",       img:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&h=520&fit=crop",  bg:"#E8A598" },
  { id:2, category:"магазин",    title:"Бутик одежды",           sub:"Интернет-магазин с каталогом и корзиной",  img:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=520&fit=crop", bg:"#E8B84B" },
  { id:3, category:"корпоратив", title:"IT-компания",            sub:"Корпоративный сайт с командой и услугами", img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&h=520&fit=crop", bg:"#F5EDD8" },
  { id:4, category:"лендинг",    title:"Онлайн-школа",          sub:"Курс по продвижению — перенос из Figma",   img:"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&h=520&fit=crop", bg:"#E8B84B" },
  { id:5, category:"магазин",    title:"Цветочный магазин",     sub:"Магазин с доставкой и фильтром",           img:"https://images.unsplash.com/photo-1487530811015-780ce39de73d?w=700&h=520&fit=crop", bg:"#E8A598" },
  { id:6, category:"корпоратив", title:"Фотограф",              sub:"Портфолио с галереей и формой заявки",    img:"https://images.unsplash.com/photo-1452780212461-8ef04b6ddfc4?w=700&h=520&fit=crop",  bg:"#F5EDD8" },
  { id:7, category:"лендинг",    title:"Косметолог",            sub:"Лендинг с формой записи и прайсом",       img:"https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700&h=520&fit=crop",  bg:"#D4622A" },
  { id:8, category:"магазин",    title:"Украшения ручной работы",sub:"Магазин с каталогом и оплатой",          img:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&h=520&fit=crop",  bg:"#E8B84B" },
  { id:9, category:"корпоратив", title:"Архитектурное бюро",    sub:"Сайт с портфолио проектов",               img:"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&h=520&fit=crop",   bg:"#E8A598" },
];

const CATS = ["все", "лендинг", "магазин", "корпоратив"];

const STATS = [
  { num: "120+", label: "проектов" },
  { num: "4 года", label: "опыта" },
  { num: "100%", label: "в срок" },
];

export default function Portfolio() {
  const [active, setActive] = useState("все");
  const filtered = active === "все" ? ITEMS : ITEMS.filter(i => i.category === active);

  return (
    <div className="font-body min-h-screen" style={{ background: "#F5EDD8", color: "#1A1714" }}>

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50" style={{ background: "#1A1714" }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
          <Link to="/" className="font-display font-black text-lg uppercase tracking-widest"
            style={{ color: "#F5EDD8" }}>
            Ирина Завадская
          </Link>
          <Link to="/" className="btn btn-yellow flex items-center gap-2 text-xs">
            <Icon name="ArrowLeft" size={14} /> На главную
          </Link>
        </div>
      </header>

      {/* ── HERO ЗАГОЛОВОК ── */}
      <section className="px-6 pt-16 pb-12" style={{ background: "#F5EDD8" }}>
        <div className="max-w-7xl mx-auto">
          <span className="tag tag-yellow mb-6 inline-block">Мои работы</span>
          <h1 className="font-display font-black uppercase leading-none mb-6"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)", letterSpacing: "-0.02em", color: "#1A1714" }}>
            Порт&shy;фолио
          </h1>

          {/* Строка со статистикой */}
          <div className="flex flex-wrap gap-10 mb-10 pb-10" style={{ borderBottom: "1.5px solid #C8B89A" }}>
            {STATS.map(s => (
              <div key={s.label}>
                <div className="font-display font-black text-4xl leading-none" style={{ color: "#D4622A" }}>{s.num}</div>
                <div className="font-body text-xs uppercase tracking-widest mt-1" style={{ color: "#8A7A65" }}>{s.label}</div>
              </div>
            ))}
            <p className="font-serif italic text-base self-end ml-auto max-w-xs text-right" style={{ color: "#6B5E4A" }}>
              Работаю с малым бизнесом, фрилансерами и онлайн-школами
            </p>
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap gap-3">
            {CATS.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className="btn transition-all"
                style={{
                  background: active === cat ? "#1A1714" : "transparent",
                  color:      active === cat ? "#F5EDD8" : "#1A1714",
                  borderColor: "#1A1714",
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── СЕТКА ПРОЕКТОВ ── */}
      <section className="px-6 pb-20" style={{ background: "#F5EDD8" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <article key={item.id}
                className="rounded-xl overflow-hidden border-2 cursor-pointer group transition-all hover:scale-[1.02]"
                style={{ background: item.bg, borderColor: "#1A1714",
                  color: item.bg === "#D4622A" ? "#F5EDD8" : "#1A1714" }}>

                {/* Фото */}
                <div className="relative overflow-hidden border-b-2" style={{ borderColor: "#1A1714", height: 220 }}>
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {/* Номер проекта */}
                  <span className="absolute top-3 left-3 font-display font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: "#1A1714", color: "#F5EDD8" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Категория */}
                  <span className="absolute top-3 right-3 font-body text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ background: "#F5EDD8", color: "#1A1714", border: "1.5px solid #1A1714" }}>
                    {item.category}
                  </span>
                </div>

                {/* Текст */}
                <div className="p-5">
                  <h3 className="font-display font-black text-2xl uppercase leading-tight mb-1">{item.title}</h3>
                  <p className="font-body text-sm opacity-65">{item.sub}</p>
                  <div className="mt-4 flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest group-hover:gap-3 transition-all opacity-70">
                    Смотреть <Icon name="ArrowRight" size={13} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Пустой результат */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display font-black text-3xl uppercase opacity-30">Нет проектов</p>
            </div>
          )}
        </div>
      </section>

      {/* ── РАЗДЕЛИТЕЛЬ ── */}
      <div style={{ height: 2, background: "#1A1714" }} />

      {/* ── БЕГУЩАЯ СТРОКА ── */}
      <div className="overflow-hidden py-3" style={{ background: "#E8B84B" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {["СТУДИИ КРАСОТЫ","БУТИКИ ОДЕЖДЫ","IT-КОМПАНИИ","ОНЛАЙН-ШКОЛЫ",
            "ЦВЕТОЧНЫЕ МАГАЗИНЫ","ФОТОГРАФЫ","КОСМЕТОЛОГИ","АРХИТЕКТОРЫ",
            "СТУДИИ КРАСОТЫ","БУТИКИ ОДЕЖДЫ","IT-КОМПАНИИ","ОНЛАЙН-ШКОЛЫ"].map((w, i) => (
            <span key={i} className="font-display font-black uppercase tracking-widest mx-8 text-sm"
              style={{ color: "#1A1714" }}>
              // {w}
            </span>
          ))}
        </div>
      </div>

      {/* ── РАЗДЕЛИТЕЛЬ ── */}
      <div style={{ height: 2, background: "#1A1714" }} />

      {/* ── CTA ── */}
      <section className="py-20 px-6" style={{ background: "#D4622A" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-black uppercase leading-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "#F5EDD8" }}>
              Хотите<br/>такой же?
            </h2>
            <p className="font-serif italic text-xl mt-4" style={{ color: "#F5EDD8", opacity: 0.8 }}>
              Расскажите о проекте — обсудим и посчитаем стоимость.
            </p>
          </div>
          <Link to="/#contact" className="btn btn-yellow text-base px-10 py-5 shrink-0">
            Обсудить проект →
          </Link>
        </div>
      </section>

      {/* ── РАЗДЕЛИТЕЛЬ ── */}
      <div style={{ height: 2, background: "#1A1714" }} />

      {/* ── ПОДВАЛ ── */}
      <footer style={{ background: "#1A1714" }}>
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start justify-between gap-8">
          <Link to="/" className="font-display font-black text-xl uppercase tracking-widest" style={{ color: "#F5EDD8" }}>
            Ирина Завадская
          </Link>
          <p className="font-body text-xs" style={{ color: "#6A5A4A" }}>
            © 2025 · Все права защищены
          </p>
          <Link to="/" className="btn btn-outline-cream text-xs flex items-center gap-2">
            <Icon name="ArrowLeft" size={13} /> На главную
          </Link>
        </div>
        {/* Огромный текст */}
        <div className="overflow-hidden" style={{ borderTop: "1.5px solid #2A2520" }}>
          <p className="font-display font-black uppercase text-center leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(60px, 14vw, 180px)", color: "#2A2520",
              letterSpacing: "-0.02em", marginBottom: "-0.15em", paddingTop: "0.1em" }}>
            Портфолио
          </p>
        </div>
      </footer>

    </div>
  );
}
