import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/38ad1151-23fa-489a-925f-68dc1a0c1296/files/a128673b-f808-4535-a2ef-2d6e19486fd2.jpg";
const STICKERS = "https://cdn.poehali.dev/projects/38ad1151-23fa-489a-925f-68dc1a0c1296/files/19a199f3-828b-430a-8bdc-a3f3913e77dc.jpg";
const FLOWERS  = "https://cdn.poehali.dev/projects/38ad1151-23fa-489a-925f-68dc1a0c1296/files/e65ab605-2022-4925-bb34-d5304e97fd30.jpg";

const DECOR_ROW = ["🌸","⚡","✦","🌼","💜","🍄","⭐","🌷","✿","💛","🌻","★"];

const NAV_LINKS = [
  { label:"Услуги",        href:"#services"  },
  { label:"Портфолио",    href:"#portfolio" },
  { label:"Обо мне",      href:"#about"     },
  { label:"Мастер-классы",href:"#workshops" },
  { label:"Отзывы",       href:"#reviews"   },
  { label:"Блог",         href:"#blog"      },
];

const MARQUEE_WORDS = [
  "✦ TILDA","✦ FIGMA","✦ ЛЕНДИНГ","✦ МАГАЗИН",
  "✦ ВЕРСТКА","✦ ДИЗАЙН","✦ САЙТ ПОД КЛЮЧ","✦ TILDA",
];

const SERVICES = [
  { icon:"Layers",      num:"01", title:"Перенос из Figma",   desc:"Быстро и аккуратно верстаю любые макеты на Tilda — пиксель в пиксель.", price:"от 5 000 ₽",  emoji:"🌸", bg:"#EDE0FF" },
  { icon:"ShoppingBag", num:"02", title:"Сайты и лендинги",   desc:"Стильные интернет-магазины, продающие лендинги и корп. сайты.",         price:"от 15 000 ₽", emoji:"⭐", bg:"#FFF9CC" },
  { icon:"RefreshCw",   num:"03", title:"Перенос с CMS",       desc:"Копирую проекты с WordPress, Wix, Joomla и других платформ на Tilda.", price:"от 8 000 ₽",  emoji:"⚡", bg:"#FFE8CC" },
  { icon:"SearchCheck", num:"04", title:"Аудит и улучшение",   desc:"Нахожу слабые места и делаю сайт быстрее, красивее, эффективнее.",    price:"от 3 000 ₽",  emoji:"🌼", bg:"#D4EECC" },
];

const PORTFOLIO_ITEMS = [
  { id:1, category:"лендинг",    title:"Студия красоты",    sub:"Продающий лендинг с онлайн-записью",       img:"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=450&fit=crop" },
  { id:2, category:"магазин",    title:"Бутик одежды",      sub:"Интернет-магазин с каталогом и корзиной",  img:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=450&fit=crop" },
  { id:3, category:"корпоратив", title:"IT-компания",        sub:"Корпоративный сайт с командой и услугами", img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=450&fit=crop" },
  { id:4, category:"лендинг",    title:"Онлайн-школа",      sub:"Курс по продвижению — перенос из Figma",   img:"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=450&fit=crop" },
  { id:5, category:"магазин",    title:"Цветочный магазин", sub:"Магазин с доставкой и фильтром",           img:"https://images.unsplash.com/photo-1487530811015-780ce39de73d?w=600&h=450&fit=crop" },
  { id:6, category:"корпоратив", title:"Фотограф",           sub:"Портфолио с галереей и формой заявки",    img:"https://images.unsplash.com/photo-1452780212461-8ef04b6ddfc4?w=600&h=450&fit=crop" },
];
const PORTFOLIO_CATS = ["все","лендинг","магазин","корпоратив"];

const REVIEWS = [
  { name:"Светлана В.", role:"Владелец студии красоты", text:"Ирина перенесла наш макет из Figma за 3 дня. Всё точно, аккуратно — сайт получился лучше, чем мы ожидали!", stars:5, bg:"#EDE0FF" },
  { name:"Максим О.",   role:"Основатель онлайн-школы", text:"Перешли с WordPress на Tilda — думали, будет долго. Ирина всё сделала быстро и чисто. Теперь управляем сами.",  stars:5, bg:"#FFF9CC" },
  { name:"Анна Г.",     role:"Предприниматель",          text:"Прошла мастер-класс по Tilda — наконец разобралась! Очень понятно объясняет даже сложные вещи.",              stars:5, bg:"#FFE8CC" },
];

const WORKSHOPS = [
  { date:"10 мая 2025",  title:"Tilda с нуля за 1 день",        format:"Онлайн", seats:"15 мест", price:"2 900 ₽", emoji:"🌸", bg:"#EDE0FF" },
  { date:"24 мая 2025",  title:"Figma → Tilda: перенос макетов", format:"Онлайн", seats:"10 мест", price:"4 500 ₽", emoji:"⚡", bg:"#FFF9CC" },
  { date:"14 июня 2025", title:"Интернет-магазин на Tilda",      format:"Онлайн", seats:"12 мест", price:"3 900 ₽", emoji:"⭐", bg:"#FFE8CC" },
];

const BLOG_POSTS = [
  { tag:"Tilda", emoji:"🌷", title:"5 ошибок при верстке на Tilda, которые убивают конверсию",    excerpt:"Часто вижу одни и те же ошибки у новичков. Разбираю каждую с примерами...", readTime:"5 мин", bg:"#EDE0FF" },
  { tag:"Figma", emoji:"🌻", title:"Как правильно подготовить макет в Figma для верстки на Tilda", excerpt:"Хороший макет — это половина успеха. Рассказываю, что нужно сделать до передачи...", readTime:"7 мин", bg:"#FFF9CC" },
  { tag:"SEO",   emoji:"🍄", title:"Почему ваш сайт на Tilda не находят в Google",                 excerpt:"SEO на Tilda — это реально, если знать несколько простых правил. Делюсь чек-листом...", readTime:"6 мин", bg:"#FFE8CC" },
];

/* ───────── SVG Волнистые разделители ───────── */
function WaveDown({ top, bot }: { top: string; bot: string }) {
  return (
    <div style={{ background: top, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg"
        style={{ display:"block", width:"100%" }} preserveAspectRatio="none">
        <path d="M0,0 C180,90 360,0 540,50 C720,100 900,10 1080,55 C1260,95 1350,25 1440,45 L1440,90 L0,90 Z"
          fill={bot} />
      </svg>
    </div>
  );
}

function WaveUp({ top, bot }: { top: string; bot: string }) {
  return (
    <div style={{ background: bot, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg"
        style={{ display:"block", width:"100%" }} preserveAspectRatio="none">
        <path d="M0,90 C180,0 360,90 540,40 C720,-10 900,80 1080,35 C1260,-5 1350,65 1440,45 L1440,0 L0,0 Z"
          fill={top} />
      </svg>
    </div>
  );
}

/* ───────── Плавающий декор ───────── */
type DecorItem = { emoji: string; top: string; left?: string; right?: string; rotate?: string; size?: string };
function FloatDecor({ items }: { items: DecorItem[] }) {
  return (
    <>
      {items.map((d, i) => (
        <span key={i} className="absolute pointer-events-none select-none z-[2]"
          style={{ top: d.top, left: d.left, right: d.right,
            transform: `rotate(${d.rotate ?? "0deg"})`, fontSize: d.size ?? "2rem", opacity: 0.85 }}>
          {d.emoji}
        </span>
      ))}
    </>
  );
}

/* ───────── Анимация появления ───────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Anim({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

/* ───────── Карточка-стикер ───────── */
function Card({ bg, children, className="" }: { bg: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-2 border-brand-black rounded-2xl shadow-[5px_5px_0_#1E1B1E] hover:shadow-[2px_2px_0_#1E1B1E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all ${className}`}
      style={{ background: bg }}>
      {children}
    </div>
  );
}

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("все");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filtered = activeFilter === "все" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(i => i.category === activeFilter);

  return (
    <div className="font-body text-brand-charcoal overflow-x-hidden" style={{ background:"#F5F0FF" }}>

      {/* ── ТОП-ПОЛОСКА ── */}
      <div className="bg-brand-charcoal text-brand-yellow-mid text-xs font-bold tracking-widest text-center py-2 uppercase">
        ✦ Открыта запись на июнь 2025 — осталось 3 места ✦
      </div>

      {/* ── NAVBAR ── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 border-b-2 border-brand-black ${scrolled ? "bg-white/97 backdrop-blur-sm" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">
          <a href="#" className="font-display text-xl leading-tight tracking-tight shrink-0">
            Ирина<br/>
            <em className="not-italic text-brand-lavender-dark font-accent italic">Завадская</em>
          </a>
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href}
                className="font-body text-sm font-medium text-brand-charcoal/70 hover:text-brand-charcoal transition-colors tracking-wide whitespace-nowrap">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-primary hidden lg:inline-flex shrink-0">Обсудить проект</a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-1">
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t-2 border-brand-black bg-white px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                className="font-body text-base font-medium text-brand-charcoal/80 hover:text-brand-charcoal py-0.5">{l.label}</a>
            ))}
            <a href="#contact" className="btn-primary justify-center mt-2">Обсудить проект</a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background:"#F5F0FF" }}>
        <FloatDecor items={[
          { emoji:"🌸", top:"8%",  left:"3%",   rotate:"-10deg", size:"2.5rem" },
          { emoji:"⚡", top:"15%", right:"5%",  rotate:"15deg",  size:"2rem"   },
          { emoji:"🌼", top:"62%", left:"2%",   rotate:"5deg",   size:"2rem"   },
          { emoji:"✦",  top:"78%", right:"8%",  rotate:"-8deg",  size:"1.5rem" },
          { emoji:"💜", top:"42%", right:"3%",  rotate:"0deg",   size:"1.5rem" },
        ]} />
        <img src={FLOWERS} alt="" aria-hidden
          className="absolute bottom-0 right-0 w-56 opacity-20 pointer-events-none select-none" />

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="tag tag-lavender">🌸 Tilda-специалист</span>
              <span className="tag tag-yellow">⭐ Веб-дизайн</span>
              <span className="tag tag-orange">⚡ Figma → Tilda</span>
            </div>
            <h1 className="font-display text-5xl md:text-[3.6rem] leading-[1.06] text-brand-charcoal mb-6">
              Создаю сайты<br/>на Tilda,<br/>
              <em className="not-italic italic text-brand-lavender-dark">которые работают.</em>
            </h1>
            <p className="font-body text-brand-charcoal/65 text-base leading-relaxed max-w-md mb-9">
              Быстро и аккуратно — от переноса макета из Figma до готового интернет-магазина. 120+ проектов за 4 года.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="btn-primary">Обсудить проект →</a>
              <a href="#portfolio" className="btn-dark">Смотреть работы</a>
            </div>
            <div className="flex gap-7">
              {[["120+","проектов"],["4 года","опыта"],["100%","в срок"]].map(([n,l])=>(
                <div key={l}>
                  <div className="font-display text-2xl italic text-brand-charcoal">{n}</div>
                  <div className="font-body text-xs text-brand-charcoal/45 uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Фото */}
          <div className="relative flex justify-center">
            <div className="relative w-72 md:w-80">
              <div className="absolute top-4 left-4 w-full h-full rounded-2xl border-2 border-brand-black bg-brand-yellow" />
              <div className="relative border-2 border-brand-black rounded-2xl overflow-hidden shadow-[6px_6px_0_#1E1B1E]">
                <img src={HERO_IMG} alt="Ирина Завадская" className="w-full aspect-[3/4] object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-brand-orange border-2 border-brand-black rounded-2xl px-4 py-2.5 shadow-[4px_4px_0_#1E1B1E]">
                <div className="font-display text-2xl italic text-brand-charcoal">120+</div>
                <div className="font-body text-[10px] uppercase tracking-widest text-brand-charcoal/70">сайтов сдано</div>
              </div>
              <span className="absolute -top-4 -right-4 text-3xl rotate-12 select-none">🌸</span>
              <span className="absolute top-1/3 -left-8 text-2xl -rotate-12 select-none">⚡</span>
              <span className="absolute -bottom-2 left-4 text-xl select-none">🌼</span>
            </div>
          </div>
        </div>
      </section>

      {/* ВОЛНА → бегущая строка */}
      <WaveDown top="#F5F0FF" bot="#2A2530" />
      <div className="bg-brand-charcoal overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_WORDS,...MARQUEE_WORDS,...MARQUEE_WORDS,...MARQUEE_WORDS].map((w,i)=>(
            <span key={i} className="font-body text-brand-yellow-mid text-sm font-bold tracking-[0.25em] uppercase mx-8">{w}</span>
          ))}
        </div>
      </div>
      <WaveUp top="#2A2530" bot="#F5F0FF" />

      {/* ── О СЕБЕ ── */}
      <section id="about" className="relative py-24 px-6 overflow-hidden" style={{ background:"#F5F0FF" }}>
        <FloatDecor items={[
          { emoji:"🍄", top:"8%",  right:"4%", rotate:"10deg",  size:"2.2rem" },
          { emoji:"💛", top:"55%", left:"2%",  rotate:"-8deg",  size:"1.8rem" },
          { emoji:"🌷", top:"82%", right:"6%", rotate:"5deg",   size:"2rem"   },
        ]} />
        <img src={STICKERS} alt="" aria-hidden
          className="absolute top-4 left-0 w-36 opacity-12 pointer-events-none select-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">
          <Anim>
            <div className="relative flex justify-center">
              <div className="absolute top-4 left-4 w-full h-full rounded-2xl border-2 border-brand-black bg-brand-yellow" />
              <div className="relative border-2 border-brand-black rounded-2xl overflow-hidden w-full max-w-xs shadow-[6px_6px_0_#1E1B1E]">
                <img src={HERO_IMG} alt="О себе" className="w-full aspect-[4/5] object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 -right-3 bg-brand-lavender border-2 border-brand-black rounded-2xl px-5 py-3 shadow-[4px_4px_0_#1E1B1E]">
                <div className="font-display text-xl italic text-brand-charcoal">4 года</div>
                <div className="font-body text-[10px] uppercase tracking-widest text-brand-charcoal/60">опыта на Tilda</div>
              </div>
              <span className="absolute -top-4 -right-2 text-3xl rotate-12 select-none">🌸</span>
            </div>
          </Anim>

          <Anim delay={120}>
            <span className="tag tag-lavender mb-5 inline-block">✿ Обо мне</span>
            <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal leading-tight mb-6">
              Привет, я Ирина —<br/>
              <em className="not-italic italic text-brand-lavender-dark">веб-дизайнер</em><br/>
              на Tilda
            </h2>
            <p className="font-body text-brand-charcoal/65 leading-relaxed mb-5">
              Специализируюсь на создании сайтов на Tilda: от переноса макетов из Figma до полноценных интернет-магазинов.
            </p>
            <p className="font-body text-brand-charcoal/65 leading-relaxed mb-8">
              Работаю быстро и аккуратно. После сдачи проекта вы сможете управлять сайтом самостоятельно.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { num:"120+", label:"проектов",  bg:"#EDE0FF" },
                { num:"4 года",label:"на Tilda", bg:"#FFF9CC" },
                { num:"100%", label:"в срок",    bg:"#FFE8CC" },
                { num:"30+",  label:"учеников",  bg:"#D4EECC" },
              ].map(s=>(
                <div key={s.label} className="border-2 border-brand-black rounded-2xl p-4 shadow-[3px_3px_0_#1E1B1E]" style={{ background:s.bg }}>
                  <div className="font-display text-2xl italic text-brand-charcoal">{s.num}</div>
                  <div className="font-body text-xs uppercase tracking-wider text-brand-charcoal/55 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-yellow">Обсудить проект <Icon name="ArrowRight" size={16} /></a>
          </Anim>
        </div>
      </section>

      {/* ВОЛНА → Услуги */}
      <WaveDown top="#F5F0FF" bot="#FFFBF0" />

      {/* ── УСЛУГИ ── */}
      <section id="services" className="relative py-20 px-6 overflow-hidden" style={{ background:"#FFFBF0" }}>
        <FloatDecor items={[
          { emoji:"🌻", top:"6%",  right:"3%",  rotate:"12deg",  size:"2.5rem" },
          { emoji:"✦",  top:"72%", left:"1%",   rotate:"-5deg",  size:"1.5rem" },
          { emoji:"🌸", top:"90%", right:"5%",  rotate:"-12deg", size:"2rem"   },
        ]} />
        <div className="max-w-6xl mx-auto relative z-10">
          <Anim>
            <div className="text-center mb-14">
              <span className="tag tag-orange mb-4 inline-block">⚡ Чем могу помочь</span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal mb-2">Услуги</h2>
              <p className="font-accent italic text-brand-lavender-dark text-xl">— всё для вашего сайта на Tilda</p>
            </div>
          </Anim>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s,i)=>(
              <Anim key={s.title} delay={i*80}>
                <Card bg={s.bg} className="p-6 h-full flex flex-col gap-4 cursor-default">
                  <span className="absolute top-4 right-5 font-display italic text-5xl text-brand-black/8 select-none leading-none">{s.num}</span>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-brand-black bg-white flex items-center justify-center shadow-[2px_2px_0_#1E1B1E]">
                      <Icon name={s.icon} fallback="Star" size={20} />
                    </div>
                  </div>
                  <span className="text-2xl">{s.emoji}</span>
                  <h3 className="font-display text-xl leading-tight text-brand-charcoal">{s.title}</h3>
                  <p className="font-body text-brand-charcoal/65 text-sm leading-relaxed flex-1">{s.desc}</p>
                  <div className="font-body text-sm font-bold border-t-2 border-brand-black/12 pt-4 text-brand-charcoal">{s.price}</div>
                </Card>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ВОЛНА → Портфолио */}
      <WaveDown top="#FFFBF0" bot="#ffffff" />

      {/* ── ПОРТФОЛИО ── */}
      <section id="portfolio" className="py-20 px-6 relative" style={{ background:"#ffffff" }}>
        <FloatDecor items={[
          { emoji:"🌷", top:"4%",  left:"2%",  rotate:"-8deg", size:"2rem"   },
          { emoji:"💜", top:"52%", right:"1%", rotate:"10deg", size:"1.6rem" },
        ]} />
        <div className="max-w-6xl mx-auto relative z-10">
          <Anim>
            <div className="text-center mb-10">
              <span className="tag tag-dark mb-4 inline-block">🌸 Мои работы</span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal mb-2">Портфолио</h2>
              <p className="font-accent italic text-brand-lavender-dark text-xl">— проекты, которыми горжусь</p>
            </div>
          </Anim>
          <Anim>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {PORTFOLIO_CATS.map(cat=>(
                <button key={cat} onClick={()=>setActiveFilter(cat)}
                  className={`font-body text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full border-2 border-brand-black transition-all
                    ${activeFilter===cat
                      ? "bg-brand-charcoal text-white shadow-[3px_3px_0_#9B7CC8]"
                      : "bg-brand-lavender-light text-brand-charcoal hover:shadow-[3px_3px_0_#1E1B1E]"
                    }`}>
                  {cat}
                </button>
              ))}
            </div>
          </Anim>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item,i)=>(
              <Anim key={item.id} delay={i*60}>
                <Card bg="#fff" className="overflow-hidden cursor-pointer group">
                  <div className="relative overflow-hidden h-48 border-b-2 border-brand-black">
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
                </Card>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ВОЛНА → Мастер-классы */}
      <WaveDown top="#ffffff" bot="#FFF9CC" />

      {/* ── МАСТЕР-КЛАССЫ ── */}
      <section id="workshops" className="py-20 px-6 relative overflow-hidden" style={{ background:"#FFF9CC" }}>
        <FloatDecor items={[
          { emoji:"⭐", top:"5%",  left:"3%",  rotate:"-10deg", size:"2.5rem" },
          { emoji:"🌸", top:"20%", right:"3%", rotate:"12deg",  size:"2rem"   },
          { emoji:"💛", top:"82%", left:"5%",  rotate:"6deg",   size:"1.8rem" },
          { emoji:"🍄", top:"92%", right:"4%", rotate:"-8deg",  size:"1.8rem" },
        ]} />
        <img src={FLOWERS} alt="" aria-hidden
          className="absolute bottom-0 left-0 w-44 opacity-18 pointer-events-none select-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <Anim>
            <div className="text-center mb-14">
              <span className="tag tag-yellow mb-4 inline-block">⭐ Ближайшие события</span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal mb-2">Мастер-классы</h2>
              <p className="font-accent italic text-brand-lavender-dark text-xl">— научу работать в Tilda с нуля</p>
            </div>
          </Anim>
          <div className="grid md:grid-cols-3 gap-6">
            {WORKSHOPS.map((w,i)=>(
              <Anim key={w.title} delay={i*80}>
                <Card bg={w.bg} className="p-7 h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-brand-charcoal/50 text-xs tracking-widest uppercase">{w.date}</span>
                    <span className="text-3xl">{w.emoji}</span>
                  </div>
                  <h3 className="font-display italic text-2xl leading-tight text-brand-charcoal">{w.title}</h3>
                  <div className="flex gap-4 flex-wrap mt-auto">
                    <span className="flex items-center gap-1.5 font-body text-brand-charcoal/60 text-sm">
                      <Icon name="MapPin" size={13} />{w.format}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-brand-charcoal/60 text-sm">
                      <Icon name="Users" size={13} />{w.seats}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t-2 border-brand-black/12 pt-4">
                    <span className="font-display text-2xl italic text-brand-charcoal">{w.price}</span>
                    <button className="btn-dark text-xs px-5 py-2">Записаться</button>
                  </div>
                </Card>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ВОЛНА → Отзывы */}
      <WaveDown top="#FFF9CC" bot="#F5F0FF" />

      {/* ── ОТЗЫВЫ ── */}
      <section id="reviews" className="py-20 px-6 relative overflow-hidden" style={{ background:"#F5F0FF" }}>
        <FloatDecor items={[
          { emoji:"💜", top:"6%",  right:"5%", rotate:"-8deg",  size:"2rem"   },
          { emoji:"🌷", top:"78%", left:"3%",  rotate:"10deg",  size:"2rem"   },
          { emoji:"✦",  top:"48%", right:"2%", rotate:"-15deg", size:"1.5rem" },
        ]} />
        <img src={STICKERS} alt="" aria-hidden
          className="absolute top-0 right-0 w-32 opacity-12 pointer-events-none select-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <Anim>
            <div className="text-center mb-14">
              <span className="tag tag-lavender mb-4 inline-block">💜 Отзывы</span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal mb-2">Что говорят клиенты</h2>
              <p className="font-accent italic text-brand-lavender-dark text-xl">— говорят лучше меня</p>
            </div>
          </Anim>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r,i)=>(
              <Anim key={r.name} delay={i*80}>
                <Card bg={r.bg} className="p-7 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-5">
                    {Array(r.stars).fill(0).map((_,j)=>(
                      <span key={j} className="text-brand-orange-dark text-xl">★</span>
                    ))}
                  </div>
                  <p className="font-accent italic text-brand-charcoal text-lg leading-relaxed flex-1 mb-6">«{r.text}»</p>
                  <div>
                    <div className="font-body text-sm font-bold text-brand-charcoal">{r.name}</div>
                    <div className="font-body text-brand-charcoal/45 text-xs mt-0.5">{r.role}</div>
                  </div>
                </Card>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ВОЛНА → Блог */}
      <WaveDown top="#F5F0FF" bot="#FFE8CC" />

      {/* ── БЛОГ ── */}
      <section id="blog" className="py-20 px-6 relative overflow-hidden" style={{ background:"#FFE8CC" }}>
        <FloatDecor items={[
          { emoji:"🌻", top:"5%",  left:"4%",  rotate:"-12deg", size:"2.5rem" },
          { emoji:"⚡", top:"42%", right:"3%", rotate:"10deg",  size:"2rem"   },
          { emoji:"🍄", top:"88%", left:"2%",  rotate:"8deg",   size:"2rem"   },
        ]} />
        <div className="max-w-6xl mx-auto relative z-10">
          <Anim>
            <div className="text-center mb-14">
              <span className="tag tag-orange mb-4 inline-block">🌻 Полезное</span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-charcoal mb-2">Блог</h2>
              <p className="font-accent italic text-brand-lavender-dark text-xl">— про Tilda, дизайн и SEO</p>
            </div>
          </Anim>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post,i)=>(
              <Anim key={post.title} delay={i*80}>
                <Card bg={post.bg} className="overflow-hidden h-full flex flex-col cursor-pointer group">
                  <div className="flex items-center gap-3 px-6 pt-6 pb-0">
                    <span className="text-3xl">{post.emoji}</span>
                    <span className="tag tag-dark">{post.tag}</span>
                    <span className="font-body text-brand-charcoal/40 text-xs ml-auto">{post.readTime}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl leading-snug mb-3 flex-1 text-brand-charcoal">{post.title}</h3>
                    <p className="font-body text-brand-charcoal/60 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                    <div className="flex items-center gap-2 font-body text-xs font-bold tracking-widest uppercase text-brand-lavender-dark mt-auto group-hover:gap-3 transition-all">
                      Читать <Icon name="ArrowRight" size={13} />
                    </div>
                  </div>
                </Card>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ВОЛНА → Контакты */}
      <WaveDown top="#FFE8CC" bot="#2A2530" />

      {/* ── КОНТАКТЫ ── */}
      <section id="contact" className="py-20 px-6 relative overflow-hidden" style={{ background:"#2A2530" }}>
        <FloatDecor items={[
          { emoji:"🌸", top:"8%",  right:"6%", rotate:"12deg",  size:"2.5rem" },
          { emoji:"⚡", top:"62%", left:"3%",  rotate:"-10deg", size:"2rem"   },
          { emoji:"✦",  top:"88%", right:"8%", rotate:"-5deg",  size:"1.5rem" },
        ]} />
        <div className="max-w-2xl mx-auto relative z-10">
          <Anim>
            <div className="text-center mb-10">
              <span className="tag tag-lavender mb-5 inline-block">💌 Обсудим проект?</span>
              <h2 className="font-display text-4xl md:text-6xl text-white leading-tight mb-2">Напишите мне</h2>
              <p className="font-accent italic text-brand-lavender text-xl">— отвечу в течение нескольких часов</p>
            </div>
          </Anim>
          <Anim delay={100}>
            <form className="border-2 border-brand-lavender/30 rounded-2xl p-8 flex flex-col gap-5 shadow-[6px_6px_0_#9B7CC8]"
              style={{ background:"rgba(255,255,255,0.05)" }}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-xs text-white/40 tracking-widest uppercase block mb-2">Имя</label>
                  <input type="text" placeholder="Ваше имя"
                    className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-lavender transition-colors" />
                </div>
                <div>
                  <label className="font-body text-xs text-white/40 tracking-widest uppercase block mb-2">Email</label>
                  <input type="email" placeholder="email@example.com"
                    className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-lavender transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-body text-xs text-white/40 tracking-widest uppercase block mb-2">Запрос</label>
                <select className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white/80 focus:outline-none focus:border-brand-lavender transition-colors">
                  <option value=""          className="bg-zinc-900">Выберите тему</option>
                  <option value="figma"     className="bg-zinc-900">Перенос макета из Figma</option>
                  <option value="site"      className="bg-zinc-900">Создание сайта / лендинга</option>
                  <option value="shop"      className="bg-zinc-900">Интернет-магазин</option>
                  <option value="migration" className="bg-zinc-900">Перенос с другой платформы</option>
                  <option value="audit"     className="bg-zinc-900">Аудит сайта</option>
                  <option value="workshop"  className="bg-zinc-900">Мастер-класс по Tilda</option>
                  <option value="other"     className="bg-zinc-900">Другое</option>
                </select>
              </div>
              <div>
                <label className="font-body text-xs text-white/40 tracking-widest uppercase block mb-2">Сообщение</label>
                <textarea rows={4} placeholder="Расскажите о проекте: что нужно сделать, есть ли макет, сроки..."
                  className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-brand-lavender transition-colors resize-none" />
              </div>
              <button type="button" className="btn-yellow justify-center text-base py-4 mt-1">
                Отправить сообщение 🌸
              </button>
            </form>
          </Anim>
        </div>
      </section>

      {/* ВОЛНА → Футер */}
      <WaveUp top="#2A2530" bot="#1E1B1E" />

      {/* ── FOOTER ── */}
      <footer style={{ background:"#1E1B1E" }} className="px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl text-white">
            Ирина <em className="not-italic italic text-brand-lavender">Завадская</em>
          </span>
          <div className="flex gap-3 text-2xl">
            {DECOR_ROW.slice(0,6).map((e,i)=>(
              <span key={i} className="opacity-40 hover:opacity-100 transition-opacity cursor-default select-none">{e}</span>
            ))}
          </div>
          <p className="font-body text-white/30 text-sm">© 2025 Все права защищены</p>
        </div>
      </footer>

    </div>
  );
}
