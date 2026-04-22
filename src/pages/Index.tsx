import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ─── Картинки ─── */
const HERO_IMG = "https://cdn.poehali.dev/projects/38ad1151-23fa-489a-925f-68dc1a0c1296/files/a128673b-f808-4535-a2ef-2d6e19486fd2.jpg";

/* ─── Навигация ─── */
const NAV_LINKS = [
  { label: "Услуги",         href: "#services"  },
  { label: "Обо мне",       href: "#about"     },
  { label: "Мастер-классы", href: "#workshops" },
  { label: "Блог",          href: "#blog"      },
  { label: "Портфолио",     href: "/portfolio" },
  { label: "Контакты",      href: "#contact"   },
];

const MARQUEE = [
  "TILDA", "FIGMA", "ЛЕНДИНГ", "МАГАЗИН",
  "ВЕРСТКА", "ДИЗАЙН", "САЙТ ПОД КЛЮЧ", "ПЕРЕНОС С CMS",
];

const SERVICES = [
  { num:"01", title:"Перенос из Figma",  desc:"Быстро и аккуратно верстаю любые макеты — пиксель в пиксель.",           price:"от 5 000 ₽",  bg:"#E8A598" },
  { num:"02", title:"Сайты и лендинги", desc:"Стильные интернет-магазины, продающие лендинги и корпоративные сайты.",    price:"от 15 000 ₽", bg:"#E8B84B" },
  { num:"03", title:"Перенос с CMS",     desc:"Копирую проекты с WordPress, Wix, Joomla и других платформ на Tilda.",    price:"от 8 000 ₽",  bg:"#F5EDD8" },
  { num:"04", title:"Аудит и улучшение", desc:"Нахожу слабые места и делаю сайт быстрее, красивее, эффективнее.",        price:"от 3 000 ₽",  bg:"#D4622A" },
];

const WORKSHOPS = [
  { date:"10 мая 2025",   title:"Tilda с нуля за 1 день",         format:"Онлайн", seats:"15 мест", price:"2 900 ₽" },
  { date:"24 мая 2025",   title:"Figma → Tilda: перенос макетов",  format:"Онлайн", seats:"10 мест", price:"4 500 ₽" },
  { date:"14 июня 2025",  title:"Интернет-магазин на Tilda",       format:"Онлайн", seats:"12 мест", price:"3 900 ₽" },
];

const REVIEWS = [
  { name:"Светлана В.", role:"Владелец студии красоты", text:"Ирина перенесла наш макет из Figma за 3 дня. Всё точно, аккуратно — сайт получился лучше, чем мы ожидали!" },
  { name:"Максим О.",   role:"Основатель онлайн-школы", text:"Перешли с WordPress на Tilda — думали, будет долго. Ирина всё сделала быстро и чисто. Теперь управляем сами."  },
  { name:"Анна Г.",     role:"Предприниматель",          text:"Прошла мастер-класс по Tilda — наконец разобралась! Очень понятно объясняет даже сложные вещи."              },
];

const BLOG_POSTS = [
  { tag:"Tilda", title:"5 ошибок при верстке, которые убивают конверсию",      excerpt:"Часто вижу одни и те же ошибки у новичков. Разбираю каждую...", readTime:"5 мин" },
  { tag:"Figma", title:"Как подготовить макет в Figma для верстки на Tilda",    excerpt:"Хороший макет — половина успеха. Рассказываю, что сделать до передачи...", readTime:"7 мин" },
  { tag:"SEO",   title:"Почему ваш сайт на Tilda не находят в Google",           excerpt:"SEO на Tilda — это реально, если знать несколько простых правил...", readTime:"6 мин" },
];

/* ─── Анимация появления ─── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Anim({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Разделитель-полоса ─── */
function Divider({ color = "#1A1714" }: { color?: string }) {
  return <div style={{ height: 2, background: color }} />;
}

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="font-body text-brand-black overflow-x-hidden" style={{ background: "#F5EDD8" }}>

      {/* ══════════════════════════════
          NAVBAR — светлый с полосочками
      ══════════════════════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-sm" : ""}`}
        style={{ background: "#F5EDD8", borderBottom: "2px solid #1A1714" }}>

        {/* Desktop */}
        <div className="hidden lg:flex items-stretch" style={{ height: 44 }}>

          {/* Лого — с правой границей */}
          <a href="/"
            className="flex items-center px-6 font-display font-black text-sm uppercase tracking-widest whitespace-nowrap shrink-0 hover:opacity-70 transition-opacity"
            style={{ color: "#1A1714", borderRight: "2px solid #1A1714" }}>
            Ирина Завадская
          </a>

          {/* Пункты меню — каждый с правой границей */}
          {NAV_LINKS.map(l => (
            l.href.startsWith("/")
              ? <Link key={l.label} to={l.href}
                  className="flex items-center px-5 font-body text-xs font-semibold uppercase tracking-widest hover:bg-black/5 transition-colors"
                  style={{ color: "#1A1714", borderRight: "2px solid #1A1714" }}>
                  {l.label}
                </Link>
              : <a key={l.label} href={l.href}
                  className="flex items-center px-5 font-body text-xs font-semibold uppercase tracking-widest hover:bg-black/5 transition-colors"
                  style={{ color: "#1A1714", borderRight: "2px solid #1A1714" }}>
                  {l.label}
                </a>
          ))}

          {/* Пустое пространство */}
          <div className="flex-1" />

          {/* CTA кнопка — в рамке, прижата к правому краю */}
          <div className="flex items-center px-4" style={{ borderLeft: "2px solid #1A1714" }}>
            <a href="#contact"
              className="font-body text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border-2 hover:bg-brand-yellow transition-colors whitespace-nowrap"
              style={{ borderColor: "#1A1714", color: "#1A1714" }}>
              Обсудить проект
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center justify-between px-5 py-3">
          <a href="/" className="font-display font-black text-sm uppercase tracking-widest" style={{ color: "#1A1714" }}>
            Ирина Завадская
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#1A1714" }}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden flex flex-col" style={{ borderTop: "2px solid #1A1714", background: "#F5EDD8" }}>
            {NAV_LINKS.map(l => (
              l.href.startsWith("/")
                ? <Link key={l.label} to={l.href} onClick={() => setMobileOpen(false)}
                    className="px-5 py-3 font-body text-xs font-semibold uppercase tracking-widest hover:bg-black/5"
                    style={{ color: "#1A1714", borderBottom: "1.5px solid #1A171430" }}>
                    {l.label}
                  </Link>
                : <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                    className="px-5 py-3 font-body text-xs font-semibold uppercase tracking-widest hover:bg-black/5"
                    style={{ color: "#1A1714", borderBottom: "1.5px solid #1A171430" }}>
                    {l.label}
                  </a>
            ))}
            <div className="px-5 py-4">
              <a href="#contact" className="btn btn-black w-full justify-center">Обсудить проект</a>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#F5EDD8" }}>
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-0 grid lg:grid-cols-2 gap-10 items-end">

          {/* Left — текст */}
          <div className="pb-16 lg:pb-24">
            <span className="tag tag-yellow mb-6 inline-block">Добро пожаловать</span>

            <h1 className="font-display font-black uppercase leading-none mb-8"
              style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)", letterSpacing: "-0.01em", color: "#1A1714" }}>
              Создаю<br/>
              <em className="not-italic" style={{ color: "#D4622A" }}>сайты</em><br/>
              на Tilda
            </h1>

            <p className="font-serif italic text-lg mb-4" style={{ color: "#6B5E4A", maxWidth: 380 }}>
              Быстро и аккуратно — от переноса макета из Figma до полноценного интернет-магазина.
            </p>
            <p className="font-body text-sm mb-10" style={{ color: "#8A7A65", maxWidth: 360 }}>
              120+ проектов за 4 года. Работаю с малым бизнесом, фрилансерами и онлайн-школами.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-yellow">Обсудить проект</a>
              <a href="#services" className="btn btn-outline">Услуги</a>
            </div>

            {/* Статы */}
            <div className="flex gap-10 mt-12 pt-8" style={{ borderTop: "1.5px solid #C8B89A" }}>
              {[["120+","проектов"],["4 года","опыта"],["100%","в срок"]].map(([n,l]) => (
                <div key={l}>
                  <div className="font-display font-black text-4xl leading-none" style={{ color: "#1A1714" }}>{n}</div>
                  <div className="font-body text-xs uppercase tracking-widest mt-1" style={{ color: "#8A7A65" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — фото */}
          <div className="relative flex justify-end items-end">
            {/* Фоновый жёлтый прямоугольник */}
            <div className="absolute bottom-0 right-0 w-4/5 h-5/6 rounded-t-3xl" style={{ background: "#E8B84B" }} />
            {/* Фото */}
            <div className="relative z-10 rounded-t-3xl overflow-hidden" style={{ width: "clamp(260px, 38vw, 480px)" }}>
              <img src={HERO_IMG} alt="Ирина Завадская"
                className="w-full object-cover object-top"
                style={{ aspectRatio: "3/4" }} />
            </div>
            {/* Бейдж */}
            <div className="absolute top-10 left-4 z-20 font-display font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full"
              style={{ background: "#D4622A", color: "#F5EDD8", border: "1.5px solid #1A1714" }}>
              Tilda-эксперт
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          БЕГУЩАЯ СТРОКА
      ══════════════════════════════ */}
      <Divider />
      <div className="overflow-hidden py-3" style={{ background: "#E8B84B" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE,...MARQUEE,...MARQUEE,...MARQUEE].map((w,i) => (
            <span key={i} className="font-display font-black uppercase tracking-widest mx-8 text-sm"
              style={{ color: "#1A1714" }}>
              // {w}
            </span>
          ))}
        </div>
      </div>
      <Divider />

      {/* ══════════════════════════════
          О СЕБЕ
      ══════════════════════════════ */}
      <section id="about" className="py-24 px-6" style={{ background: "#F5EDD8" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Фото слева */}
          <Anim>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-2/3 h-2/3 rounded-2xl" style={{ background: "#E8A598", zIndex: 0 }} />
              <div className="relative z-10 rounded-2xl overflow-hidden border-2" style={{ borderColor: "#1A1714" }}>
                <img src={HERO_IMG} alt="О себе" className="w-full object-cover object-top" style={{ aspectRatio: "4/5" }} />
              </div>
              {/* Плашка */}
              <div className="absolute -bottom-5 -right-5 z-20 px-5 py-3 rounded-xl border-2"
                style={{ background: "#E8B84B", borderColor: "#1A1714" }}>
                <div className="font-display font-black text-3xl leading-none">4 года</div>
                <div className="font-body text-xs uppercase tracking-widest mt-1" style={{ color: "#6B5E4A" }}>на Tilda</div>
              </div>
            </div>
          </Anim>

          {/* Текст */}
          <Anim delay={120}>
            <span className="tag tag-salmon mb-5 inline-block">Обо мне</span>
            <h2 className="font-display font-black uppercase leading-none mb-6"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#1A1714" }}>
              Привет,<br/>
              я <em className="not-italic" style={{ color: "#D4622A" }}>Ирина</em>
            </h2>
            <p className="font-serif italic text-lg mb-4" style={{ color: "#6B5E4A", maxWidth: 440 }}>
              Специализируюсь на создании сайтов на Tilda — от переноса макетов из Figma до полноценных интернет-магазинов.
            </p>
            <p className="font-body text-sm leading-relaxed mb-8" style={{ color: "#8A7A65", maxWidth: 420 }}>
              Работаю быстро и аккуратно. После сдачи проекта вы сможете управлять сайтом самостоятельно — я обучу.
            </p>

            {/* Мини-карточки */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="card-yellow p-4">
                <div className="font-display font-black text-2xl">Моя миссия</div>
                <p className="font-body text-xs mt-2 leading-relaxed" style={{ color: "#5A4A30" }}>
                  Помочь малому бизнесу получить красивый сайт, который реально продаёт.
                </p>
              </div>
              <div className="card-salmon p-4">
                <div className="font-display font-black text-2xl">Кому помогаю</div>
                <p className="font-body text-xs mt-2 leading-relaxed" style={{ color: "#5A3A30" }}>
                  Предпринимателям, фрилансерам, онлайн-школам и малому бизнесу.
                </p>
              </div>
            </div>

            <a href="#contact" className="btn btn-black">Обсудить проект</a>
          </Anim>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════
          УСЛУГИ
      ══════════════════════════════ */}
      <section id="services" className="py-24 px-6" style={{ background: "#F5EDD8" }}>
        <div className="max-w-7xl mx-auto">
          <Anim>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
              <div>
                <span className="tag tag-yellow mb-4 inline-block">Чем могу помочь</span>
                <h2 className="font-display font-black uppercase leading-none"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#1A1714" }}>
                  Услуги
                </h2>
              </div>
              <a href="#contact" className="btn btn-outline self-start md:self-end">Обсудить проект</a>
            </div>
          </Anim>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => (
              <Anim key={s.num} delay={i * 80}>
                <div className="p-6 h-full flex flex-col gap-3 rounded-xl border-2"
                  style={{ background: s.bg, borderColor: "#1A1714",
                    color: s.bg === "#D4622A" ? "#F5EDD8" : "#1A1714" }}>
                  <span className="font-display font-black text-5xl leading-none opacity-20">{s.num}</span>
                  <h3 className="font-display font-black text-2xl uppercase leading-tight">{s.title}</h3>
                  <p className="font-body text-sm leading-relaxed flex-1 opacity-75">{s.desc}</p>
                  <div className="font-display font-black text-xl pt-3"
                    style={{ borderTop: `1.5px solid ${s.bg === "#D4622A" ? "#F5EDD8" : "#1A1714"}`, opacity: 0.7 }}>
                    {s.price}
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════
          ПОРТФОЛИО-БАННЕР
      ══════════════════════════════ */}
      <section id="portfolio" className="relative overflow-hidden py-0" style={{ background: "#E8D8B8" }}>
        <Anim>
          <div className="relative flex items-center justify-center select-none"
            style={{ minHeight: "clamp(400px, 65vh, 620px)" }}>

            {/* Огромный текст */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
              <span className="font-display font-black uppercase text-brand-black leading-none"
                style={{ fontSize: "clamp(90px, 18vw, 210px)", letterSpacing: "-0.02em", opacity: 1 }}>
                PORT
              </span>
              <span className="font-display font-black uppercase text-brand-black leading-none"
                style={{ fontSize: "clamp(90px, 18vw, 210px)", letterSpacing: "-0.02em", opacity: 1 }}>
                FOLIO
              </span>
            </div>

            {/* Фото верхнее левое */}
            <div className="absolute z-10" style={{ top: "5%", left: "5%" }}>
              <div className="overflow-hidden rounded-sm border-2" style={{ borderColor: "#1A1714", width: "clamp(120px,16vw,220px)", aspectRatio: "3/4" }}>
                <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=530&fit=crop"
                  alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Фото правое среднее */}
            <div className="absolute z-10" style={{ top: "25%", right: "3%" }}>
              <div className="overflow-hidden rounded-sm border-2" style={{ borderColor: "#1A1714", width: "clamp(110px,14vw,200px)", aspectRatio: "4/3" }}>
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
                  alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Фото нижнее левое */}
            <div className="absolute z-10" style={{ bottom: "5%", left: "8%" }}>
              <div className="overflow-hidden rounded-sm border-2" style={{ borderColor: "#1A1714", width: "clamp(110px,14vw,190px)", aspectRatio: "3/4" }}>
                <img src="https://images.unsplash.com/photo-1487530811015-780ce39de73d?w=380&h=500&fit=crop"
                  alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Кнопка */}
            <Link to="/portfolio" className="relative z-20 btn btn-yellow text-base px-8 py-4">
              Смотреть работы →
            </Link>
          </div>
        </Anim>
      </section>

      <Divider />

      {/* ══════════════════════════════
          МАСТЕР-КЛАССЫ
      ══════════════════════════════ */}
      <section id="workshops" className="py-24 px-6" style={{ background: "#F5EDD8" }}>
        <div className="max-w-7xl mx-auto">
          <Anim>
            <div className="mb-14">
              <span className="tag tag-black mb-4 inline-block">Ближайшие события</span>
              <h2 className="font-display font-black uppercase leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#1A1714" }}>
                Мастер-классы
              </h2>
            </div>
          </Anim>
          <div className="grid md:grid-cols-3 gap-5">
            {WORKSHOPS.map((w, i) => (
              <Anim key={w.title} delay={i * 80}>
                <div className="p-6 h-full flex flex-col gap-4 rounded-xl border-2"
                  style={{ background: i === 0 ? "#E8A598" : i === 1 ? "#E8B84B" : "#F5EDD8", borderColor: "#1A1714" }}>
                  <span className="font-body text-xs font-semibold uppercase tracking-widest opacity-60">{w.date}</span>
                  <h3 className="font-display font-black text-2xl uppercase leading-tight">{w.title}</h3>
                  <div className="flex gap-4 mt-auto flex-wrap">
                    <span className="flex items-center gap-1.5 font-body text-xs opacity-60">
                      <Icon name="MapPin" size={12} /> {w.format}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-xs opacity-60">
                      <Icon name="Users" size={12} /> {w.seats}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1.5px solid #1A171440" }}>
                    <span className="font-display font-black text-2xl">{w.price}</span>
                    <button className="btn btn-black text-xs py-2 px-4">Записаться</button>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════
          ОТЗЫВЫ
      ══════════════════════════════ */}
      <section id="reviews" className="py-24 px-6" style={{ background: "#1A1714" }}>
        <div className="max-w-7xl mx-auto">
          <Anim>
            <div className="mb-14">
              <span className="tag tag-yellow mb-4 inline-block">Отзывы</span>
              <h2 className="font-display font-black uppercase leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#F5EDD8" }}>
                Что говорят клиенты
              </h2>
            </div>
          </Anim>
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <Anim key={r.name} delay={i * 80}>
                <div className="p-7 rounded-xl h-full flex flex-col border-2"
                  style={{ background: i === 1 ? "#E8B84B" : "#2A2520", borderColor: "#3A3530",
                    color: i === 1 ? "#1A1714" : "#F5EDD8" }}>
                  <div className="flex gap-0.5 mb-5" style={{ color: "#E8B84B" }}>
                    {"★★★★★".split("").map((s,j) => <span key={j} className="text-xl">{s}</span>)}
                  </div>
                  <p className="font-serif italic text-base leading-relaxed flex-1 mb-6">«{r.text}»</p>
                  <div>
                    <div className="font-display font-black text-base uppercase">{r.name}</div>
                    <div className="font-body text-xs mt-0.5 opacity-50">{r.role}</div>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      <Divider color="#2A2520" />

      {/* ══════════════════════════════
          БЛОГ
      ══════════════════════════════ */}
      <section id="blog" className="py-24 px-6" style={{ background: "#F5EDD8" }}>
        <div className="max-w-7xl mx-auto">
          <Anim>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
              <div>
                <span className="tag tag-orange mb-4 inline-block">Полезное</span>
                <h2 className="font-display font-black uppercase leading-none"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#1A1714" }}>
                  Блог
                </h2>
              </div>
            </div>
          </Anim>
          <div className="grid md:grid-cols-3 gap-5">
            {BLOG_POSTS.map((p, i) => (
              <Anim key={p.title} delay={i * 80}>
                <article className="rounded-xl overflow-hidden border-2 h-full flex flex-col cursor-pointer group hover:opacity-90 transition-opacity"
                  style={{ background: i === 0 ? "#E8A598" : i === 1 ? "#E8B84B" : "#F5EDD8", borderColor: "#1A1714" }}>
                  <div className="px-6 pt-6 pb-2 flex items-center gap-3">
                    <span className="tag tag-black">{p.tag}</span>
                    <span className="font-body text-xs opacity-50">{p.readTime}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-black text-xl uppercase leading-tight mb-3 flex-1">{p.title}</h3>
                    <p className="font-body text-sm leading-relaxed opacity-65 mb-5">{p.excerpt}</p>
                    <div className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest group-hover:gap-3 transition-all">
                      Читать <Icon name="ArrowRight" size={13} />
                    </div>
                  </div>
                </article>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════
          CTA — «Готовы к следующему уровню?»
      ══════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#D4622A" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <h2 className="font-display font-black uppercase leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#F5EDD8" }}>
              Готовы<br/>к запуску?
            </h2>
            <p className="font-serif italic text-xl mt-4" style={{ color: "#F5EDD8", opacity: 0.8 }}>
              Расскажите о проекте — отвечу в течение нескольких часов.
            </p>
          </div>
          <a href="#contact" className="btn btn-yellow text-base px-10 py-5 shrink-0">
            Поехали! →
          </a>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════
          КОНТАКТЫ
      ══════════════════════════════ */}
      <section id="contact" className="py-24 px-6" style={{ background: "#F5EDD8" }}>
        <div className="max-w-2xl mx-auto">
          <Anim>
            <span className="tag tag-black mb-5 inline-block">Контакты</span>
            <h2 className="font-display font-black uppercase leading-none mb-10"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#1A1714" }}>
              Напишите<br/>мне
            </h2>
          </Anim>
          <Anim delay={100}>
            <form className="flex flex-col gap-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-xs font-semibold uppercase tracking-widest block mb-2 opacity-60">Имя</label>
                  <input type="text" placeholder="Ваше имя"
                    className="w-full bg-transparent rounded-lg px-4 py-3 font-body text-sm focus:outline-none transition-colors"
                    style={{ border: "1.5px solid #1A1714" }} />
                </div>
                <div>
                  <label className="font-body text-xs font-semibold uppercase tracking-widest block mb-2 opacity-60">Email</label>
                  <input type="email" placeholder="email@example.com"
                    className="w-full bg-transparent rounded-lg px-4 py-3 font-body text-sm focus:outline-none transition-colors"
                    style={{ border: "1.5px solid #1A1714" }} />
                </div>
              </div>
              <div>
                <label className="font-body text-xs font-semibold uppercase tracking-widest block mb-2 opacity-60">Запрос</label>
                <select className="w-full bg-transparent rounded-lg px-4 py-3 font-body text-sm focus:outline-none"
                  style={{ border: "1.5px solid #1A1714", background: "#F5EDD8" }}>
                  <option value="">Выберите тему</option>
                  <option value="figma">Перенос макета из Figma</option>
                  <option value="site">Создание сайта / лендинга</option>
                  <option value="shop">Интернет-магазин</option>
                  <option value="migration">Перенос с другой платформы</option>
                  <option value="audit">Аудит сайта</option>
                  <option value="workshop">Мастер-класс по Tilda</option>
                </select>
              </div>
              <div>
                <label className="font-body text-xs font-semibold uppercase tracking-widest block mb-2 opacity-60">Сообщение</label>
                <textarea rows={4} placeholder="Расскажите о проекте..."
                  className="w-full bg-transparent rounded-lg px-4 py-3 font-body text-sm focus:outline-none resize-none"
                  style={{ border: "1.5px solid #1A1714" }} />
              </div>
              <button type="button" className="btn btn-black justify-center text-sm py-4">
                Отправить →
              </button>
            </form>
          </Anim>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════
          ПОДВАЛ — полосочки как в референсе
      ══════════════════════════════ */}
      <footer style={{ background: "#E8B84B" }}>

        {/* Верхняя граница */}
        <div style={{ height: 2, background: "#1A1714" }} />

        {/* Три колонки с вертикальными разделителями */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderBottom: "2px solid #1A1714" }}>

          {/* Навигация */}
          <div className="px-8 py-10" style={{ borderRight: "2px solid #1A1714" }}>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: "#1A1714" }}>
              Навигация
            </h4>
            {/* 2 колонки ссылок */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {NAV_LINKS.map(l => (
                l.href.startsWith("/")
                  ? <Link key={l.label} to={l.href}
                      className="font-body text-xs font-semibold uppercase tracking-wider hover:opacity-60 transition-opacity"
                      style={{ color: "#1A1714" }}>
                      {l.label}
                    </Link>
                  : <a key={l.label} href={l.href}
                      className="font-body text-xs font-semibold uppercase tracking-wider hover:opacity-60 transition-opacity"
                      style={{ color: "#1A1714" }}>
                      {l.label}
                    </a>
              ))}
            </div>
          </div>

          {/* Контакты */}
          <div className="px-8 py-10" style={{ borderRight: "2px solid #1A1714" }}>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: "#1A1714" }}>
              Контакты
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "ira@tildamaster.ru",
                "tildamaster.ru",
                "@ira_tilda",
              ].map(t => (
                <li key={t} className="font-body text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#1A1714" }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Соцсети */}
          <div className="px-8 py-10">
            <h4 className="font-display font-black text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: "#1A1714" }}>
              Stay in Touch
            </h4>
            {/* Иконки соцсетей */}
            <div className="flex gap-2 mb-5">
              {[
                { icon:"Instagram", label:"Instagram" },
                { icon:"Music",     label:"TikTok"    },
                { icon:"Youtube",   label:"YouTube"   },
                { icon:"Send",      label:"Telegram"  },
              ].map(s => (
                <a key={s.label} href="#" title={s.label}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center hover:opacity-60 transition-opacity"
                  style={{ borderColor: "#1A1714", color: "#1A1714" }}>
                  <Icon name={s.icon} fallback="Link" size={14} />
                </a>
              ))}
            </div>
            {/* Handle-кнопка */}
            <a href="#" className="inline-flex items-center font-body font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border-2 hover:opacity-70 transition-opacity"
              style={{ background: "#D4622A", borderColor: "#D4622A", color: "#F5EDD8" }}>
              @ira_tilda
            </a>
          </div>
        </div>

        {/* Огромный текст — обрезан снизу, как в референсе */}
        <div className="overflow-hidden" style={{ lineHeight: 0 }}>
          <p className="font-display font-black uppercase leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(80px, 17vw, 220px)",
              color: "#1A1714",
              letterSpacing: "-0.025em",
              marginBottom: "-0.18em",
              paddingLeft: "0.05em",
              whiteSpace: "nowrap",
            }}>
            Ирина Завадская
          </p>
        </div>
      </footer>

    </div>
  );
}