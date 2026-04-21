import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/38ad1151-23fa-489a-925f-68dc1a0c1296/files/a128673b-f808-4535-a2ef-2d6e19486fd2.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Обо мне", href: "#about" },
  { label: "Мастер-классы", href: "#workshops" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
];

const MARQUEE_WORDS = [
  "✦ TILDA", "✦ FIGMA", "✦ ЛЕНДИНГ", "✦ МАГАЗИН",
  "✦ ВЕРСТКА", "✦ ДИЗАЙН", "✦ TILDA", "✦ САЙТ ПОД КЛЮЧ",
];

const SERVICES = [
  { icon: "Layers", title: "Перенос из Figma", desc: "Быстро и аккуратно верстаю любые макеты на Tilda — пиксель в пиксель.", price: "от 5 000 ₽", step: "01" },
  { icon: "ShoppingBag", title: "Сайты и лендинги", desc: "Стильные интернет-магазины, продающие лендинги и корпоративные сайты.", price: "от 15 000 ₽", step: "02" },
  { icon: "RefreshCw", title: "Перенос с CMS", desc: "Копирую проекты с WordPress, Joomla, Wix и других платформ на Tilda.", price: "от 8 000 ₽", step: "03" },
  { icon: "SearchCheck", title: "Аудит и улучшение", desc: "Нахожу слабые места и делаю ваш сайт быстрее, красивее, эффективнее.", price: "от 3 000 ₽", step: "04" },
];

const PORTFOLIO_ITEMS = [
  { id: 1, category: "лендинг",    title: "Студия красоты",   sub: "Продающий лендинг с онлайн-записью",      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=450&fit=crop" },
  { id: 2, category: "магазин",    title: "Бутик одежды",     sub: "Интернет-магазин с каталогом и корзиной", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=450&fit=crop" },
  { id: 3, category: "корпоратив", title: "IT-компания",      sub: "Корпоративный сайт с командой и услугами",img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=450&fit=crop" },
  { id: 4, category: "лендинг",    title: "Онлайн-школа",     sub: "Курс по продвижению — перенос из Figma",  img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=450&fit=crop" },
  { id: 5, category: "магазин",    title: "Цветочный магазин",sub: "Магазин с доставкой и фильтром",          img: "https://images.unsplash.com/photo-1487530811015-780ce39de73d?w=600&h=450&fit=crop" },
  { id: 6, category: "корпоратив", title: "Фотограф",         sub: "Портфолио с галереей и формой заявки",   img: "https://images.unsplash.com/photo-1452780212461-8ef04b6ddfc4?w=600&h=450&fit=crop" },
];
const PORTFOLIO_CATS = ["все", "лендинг", "магазин", "корпоратив"];

const REVIEWS = [
  { name: "Светлана В.", role: "Владелец студии красоты",  text: "Ирина перенесла наш макет из Figma за 3 дня. Всё точно, аккуратно — сайт получился лучше, чем мы ожидали!", stars: 5 },
  { name: "Максим О.",   role: "Основатель онлайн-школы",  text: "Перешли с WordPress на Tilda — думали, будет долго. Ирина всё сделала быстро и чисто. Теперь управляем сами.", stars: 5 },
  { name: "Анна Г.",     role: "Предприниматель",           text: "Прошла мастер-класс по Tilda — наконец разобралась! Очень понятно объясняет даже сложные вещи.", stars: 5 },
];

const WORKSHOPS = [
  { date: "10 мая 2025",  title: "Tilda с нуля за 1 день",        format: "Онлайн", seats: "15 мест", price: "2 900 ₽" },
  { date: "24 мая 2025",  title: "Figma → Tilda: перенос макетов", format: "Онлайн", seats: "10 мест", price: "4 500 ₽" },
  { date: "14 июня 2025", title: "Интернет-магазин на Tilda",      format: "Онлайн", seats: "12 мест", price: "3 900 ₽" },
];

const BLOG_POSTS = [
  { tag: "Tilda",  title: "5 ошибок при верстке на Tilda, которые убивают конверсию",   excerpt: "Часто вижу одни и те же ошибки у новичков. Разбираю каждую с примерами...", readTime: "5 мин" },
  { tag: "Figma",  title: "Как правильно подготовить макет в Figma для верстки на Tilda",excerpt: "Хороший макет — это половина успеха. Рассказываю, что нужно сделать до передачи...", readTime: "7 мин" },
  { tag: "SEO",    title: "Почему ваш сайт на Tilda не находят в Google",                excerpt: "SEO на Tilda — это реально, если знать несколько простых правил. Делюсь чек-листом...", readTime: "6 мин" },
];

function useInView(threshold = 0.12) {
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
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>
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
    <div className="font-body text-brand-black overflow-x-hidden bg-brand-cream">

      {/* ══════ ТОП-ПОЛОСКА ══════ */}
      <div className="bg-brand-orange text-white text-xs font-body font-medium tracking-widest text-center py-2 uppercase">
        ✦ Открыта запись на июнь 2025 ✦
      </div>

      {/* ══════ NAVBAR ══════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 border-b border-brand-black/20 ${scrolled ? "bg-brand-cream/97 backdrop-blur-sm" : "bg-brand-cream"}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Лого */}
          <a href="#" className="font-display text-xl font-normal text-brand-black leading-none tracking-tight">
            Ирина<br/>
            <span className="italic text-brand-lavender-dark">Завадская</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href}
                className="font-body text-sm text-brand-black/70 hover:text-brand-black transition-colors tracking-wide">
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-brand-lavender text-brand-black border border-brand-black font-body text-sm font-medium px-5 py-2.5 rounded-full hover:bg-brand-lavender-dark hover:text-white transition-all">
            Обсудить проект
          </a>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-brand-black/10 bg-brand-cream px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                className="font-body text-base text-brand-black/80 hover:text-brand-black">{l.label}</a>
            ))}
            <a href="#contact" className="mt-1 bg-brand-lavender text-brand-black border border-brand-black text-sm font-medium px-5 py-2.5 rounded-full text-center">
              Обсудить проект
            </a>
          </div>
        )}
      </header>

      {/* ══════ HERO ══════ */}
      <section className="bg-brand-cream wave-pattern relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            {/* Декор-смайл */}
            <div className="text-2xl mb-4">💜</div>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.08] text-brand-black mb-6">
              Создаю сайты<br/>на Tilda,<br/>
              <span className="italic text-brand-lavender-dark">которые работают.</span>
            </h1>
            <p className="font-body text-brand-black/60 text-sm tracking-widest uppercase mb-4">
              Веб-дизайн · Верстка · Tilda-специалист
            </p>
            <p className="font-body text-brand-black/75 text-base leading-relaxed max-w-md mb-8">
              Быстро и аккуратно — от переноса макета из Figma до готового интернет-магазина.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact"
                className="bg-brand-lavender text-brand-black border-2 border-brand-black font-body font-medium text-sm px-7 py-3.5 rounded-full hover:bg-brand-lavender-dark hover:text-white transition-all shadow-[3px_3px_0_#1A1A1A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                Обсудить проект →
              </a>
              <a href="#portfolio"
                className="bg-transparent text-brand-black border-2 border-brand-black font-body font-medium text-sm px-7 py-3.5 rounded-full hover:bg-brand-black hover:text-white transition-all">
                Смотреть работы
              </a>
            </div>
          </div>

          {/* Right — фото с обводкой */}
          <div className="relative flex justify-center">
            {/* Декоративные звёзды */}
            <span className="absolute top-4 right-8 text-2xl rotate-12">⚡</span>
            <span className="absolute bottom-10 left-4 text-xl -rotate-12">✦</span>
            <span className="absolute top-1/2 right-2 text-lg">★</span>

            <div className="relative w-72 md:w-80">
              {/* Сдвинутый фоновый прямоугольник */}
              <div className="absolute top-3 left-3 w-full h-full rounded-2xl border-2 border-brand-black bg-brand-lavender-light" />
              <div className="relative border-2 border-brand-black rounded-2xl overflow-hidden">
                <img src={HERO_IMG} alt="Ирина Завадская" className="w-full aspect-[3/4] object-cover object-top" />
              </div>
              {/* Бейдж */}
              <div className="absolute -bottom-4 -right-4 bg-brand-orange border-2 border-brand-black rounded-xl px-4 py-2 text-white shadow-[2px_2px_0_#1A1A1A]">
                <div className="font-display text-xl">120+</div>
                <div className="font-body text-xs uppercase tracking-wide opacity-90">сайтов сдано</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ РАЗДЕЛИТЕЛЬ — БЕГУЩАЯ СТРОКА ══════ */}
      <div className="bg-brand-orange border-y-2 border-brand-black overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="font-body text-white text-sm font-semibold tracking-[0.25em] uppercase mx-6">{w}</span>
          ))}
        </div>
      </div>

      {/* ══════ О СЕБЕ ══════ */}
      <section id="about" className="bg-brand-black py-24 px-6 relative">
        {/* декор */}
        <span className="absolute right-12 top-10 text-brand-lavender text-4xl opacity-40 select-none">✦</span>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          {/* Фото */}
          <Anim>
            <div className="relative flex justify-center">
              <div className="absolute top-4 left-4 w-full h-full rounded-2xl border-2 border-brand-lavender bg-brand-lavender/20" />
              <div className="relative border-2 border-brand-lavender rounded-2xl overflow-hidden w-full max-w-xs">
                <img src={HERO_IMG} alt="О себе" className="w-full aspect-[4/5] object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-brand-lavender border-2 border-brand-lavender-dark rounded-xl px-5 py-3 shadow-[3px_3px_0_#A88CC0]">
                <div className="font-display text-xl text-brand-black italic">4 года</div>
                <div className="font-body text-xs tracking-widest uppercase text-brand-black/70">опыта на Tilda</div>
              </div>
            </div>
          </Anim>

          {/* Текст */}
          <Anim delay={120}>
            <p className="font-body text-brand-lavender text-sm tracking-[0.3em] uppercase mb-4">Обо мне</p>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
              Привет, я Ирина —<br/>
              <span className="italic text-brand-lavender">веб-дизайнер</span><br/>
              на Tilda
            </h2>
            <p className="font-body text-white/65 leading-relaxed mb-5">
              Специализируюсь на создании сайтов на Tilda: от переноса макетов из Figma до полноценных интернет-магазинов.
            </p>
            <p className="font-body text-white/65 leading-relaxed mb-8">
              Работаю быстро и аккуратно. После сдачи проекта вы сможете управлять сайтом самостоятельно.
            </p>

            {/* Статы */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { num: "120+", label: "проектов" },
                { num: "4 года", label: "на Tilda" },
                { num: "100%", label: "в срок" },
                { num: "30+", label: "учеников" },
              ].map(s => (
                <div key={s.label} className="border border-brand-lavender/40 rounded-xl p-4">
                  <div className="font-display text-2xl italic text-brand-lavender">{s.num}</div>
                  <div className="font-body text-xs uppercase tracking-wider text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 bg-brand-lavender text-brand-black border-2 border-brand-lavender-dark font-body font-medium text-sm px-7 py-3.5 rounded-full hover:bg-brand-lavender-dark hover:text-white transition-all shadow-[3px_3px_0_#A88CC0]">
              Обсудить проект <Icon name="ArrowRight" size={16} />
            </a>
          </Anim>
        </div>
      </section>

      {/* ══════ УСЛУГИ ══════ */}
      <section id="services" className="bg-brand-lavender-light py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Anim>
            <p className="font-body text-brand-black/50 text-sm tracking-[0.3em] uppercase text-center mb-2">Чем могу помочь</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-black text-center mb-2">
              Услуги
            </h2>
            <p className="font-accent italic text-brand-lavender-dark text-center text-xl mb-14">
              — всё для вашего сайта на Tilda
            </p>
          </Anim>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <Anim key={s.title} delay={i * 80}>
                <div className="card-outlined p-6 h-full flex flex-col gap-4 hover:-translate-y-1 hover:shadow-[4px_4px_0_#1A1A1A] transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full border-2 border-brand-black flex items-center justify-center bg-brand-lavender-light group-hover:bg-brand-lavender transition-colors">
                      <Icon name={s.icon} fallback="Star" size={18} />
                    </div>
                    <span className="font-display italic text-3xl text-brand-black/10">{s.step}</span>
                  </div>
                  <h3 className="font-display text-xl leading-tight">{s.title}</h3>
                  <p className="font-body text-brand-black/65 text-sm leading-relaxed flex-1">{s.desc}</p>
                  <div className="font-body text-sm font-semibold border-t border-brand-black/10 pt-4 text-brand-lavender-dark">{s.price}</div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ПОРТФОЛИО ══════ */}
      <section id="portfolio" className="bg-brand-cream py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Anim>
            <p className="font-body text-brand-black/50 text-sm tracking-[0.3em] uppercase text-center mb-2">Мои работы</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-black text-center mb-2">
              Портфолио
            </h2>
            <p className="font-accent italic text-brand-lavender-dark text-center text-xl mb-10">
              — проекты, которыми горжусь
            </p>
          </Anim>

          {/* Фильтры */}
          <Anim>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {PORTFOLIO_CATS.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className={`font-body text-sm tracking-wider uppercase px-5 py-2 rounded-full border-2 border-brand-black transition-all ${
                    activeFilter === cat
                      ? "bg-brand-black text-white shadow-[2px_2px_0_#A88CC0]"
                      : "bg-white text-brand-black hover:bg-brand-lavender-light"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </Anim>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <Anim key={item.id} delay={i * 60}>
                <div className="group card-outlined overflow-hidden hover:shadow-[4px_4px_0_#1A1A1A] hover:-translate-y-0.5 transition-all cursor-pointer">
                  <div className="relative overflow-hidden h-52 border-b-2 border-brand-black">
                    <img src={item.img} alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-brand-lavender border-2 border-brand-black font-body text-xs tracking-wider uppercase px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl mb-1">{item.title}</h3>
                    <p className="font-body text-brand-black/60 text-sm">{item.sub}</p>
                    <div className="mt-4 flex items-center gap-2 text-brand-lavender-dark font-body text-xs tracking-wider uppercase">
                      Смотреть <Icon name="ArrowRight" size={13} />
                    </div>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ МАСТЕР-КЛАССЫ ══════ */}
      <section id="workshops" className="bg-brand-pink py-24 px-6 border-y-2 border-brand-black">
        <div className="max-w-6xl mx-auto">
          <Anim>
            <p className="font-body text-brand-black/50 text-sm tracking-[0.3em] uppercase text-center mb-2">Ближайшие события</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-black text-center mb-2">
              Мастер-классы
            </h2>
            <p className="font-accent italic text-brand-lavender-dark text-center text-xl mb-14">
              — научу работать в Tilda с нуля
            </p>
          </Anim>
          <div className="grid md:grid-cols-3 gap-6">
            {WORKSHOPS.map((w, i) => (
              <Anim key={w.title} delay={i * 80}>
                <div className="card-outlined p-7 h-full flex flex-col gap-4 hover:shadow-[4px_4px_0_#1A1A1A] hover:-translate-y-0.5 transition-all">
                  <span className="font-body text-brand-black/50 text-xs tracking-[0.2em] uppercase">{w.date}</span>
                  <h3 className="font-display italic text-2xl leading-tight">{w.title}</h3>
                  <div className="flex gap-4 flex-wrap mt-auto">
                    <span className="flex items-center gap-1.5 font-body text-brand-black/60 text-sm">
                      <Icon name="MapPin" size={13} />{w.format}
                    </span>
                    <span className="flex items-center gap-1.5 font-body text-brand-black/60 text-sm">
                      <Icon name="Users" size={13} />{w.seats}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t-2 border-brand-black/10 pt-4">
                    <span className="font-display text-xl">{w.price}</span>
                    <button className="bg-brand-black text-white font-body text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border-2 border-brand-black hover:bg-brand-lavender hover:text-brand-black transition-all">
                      Записаться
                    </button>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ОТЗЫВЫ ══════ */}
      <section id="reviews" className="bg-brand-cream py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Anim>
            <p className="font-body text-brand-black/50 text-sm tracking-[0.3em] uppercase text-center mb-2">Что говорят клиенты</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-black text-center mb-2">
              Отзывы
            </h2>
            <p className="font-accent italic text-brand-lavender-dark text-center text-xl mb-14">
              — говорят лучше меня 💜
            </p>
          </Anim>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <Anim key={r.name} delay={i * 80}>
                <div className="card-outlined p-7 h-full flex flex-col hover:shadow-[4px_4px_0_#C8B4D8] hover:-translate-y-0.5 transition-all">
                  <div className="flex gap-1 mb-5">
                    {Array(r.stars).fill(0).map((_, j) => (
                      <span key={j} className="text-brand-orange text-base">★</span>
                    ))}
                  </div>
                  <p className="font-accent italic text-brand-black text-lg leading-relaxed flex-1 mb-6">
                    «{r.text}»
                  </p>
                  <div>
                    <div className="font-body text-sm font-semibold text-brand-black">{r.name}</div>
                    <div className="font-body text-brand-black/45 text-xs mt-0.5">{r.role}</div>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ БЛОГ ══════ */}
      <section id="blog" className="bg-brand-lavender-light py-24 px-6 border-t-2 border-brand-black">
        <div className="max-w-6xl mx-auto">
          <Anim>
            <p className="font-body text-brand-black/50 text-sm tracking-[0.3em] uppercase text-center mb-2">Полезное</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-black text-center mb-2">Блог</h2>
            <p className="font-accent italic text-brand-lavender-dark text-center text-xl mb-14">
              — про Tilda, дизайн и SEO
            </p>
          </Anim>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <Anim key={post.title} delay={i * 80}>
                <article className="card-outlined overflow-hidden h-full flex flex-col hover:shadow-[4px_4px_0_#1A1A1A] hover:-translate-y-0.5 transition-all cursor-pointer group">
                  {/* Цветная полоска сверху */}
                  <div className="h-2.5 bg-brand-lavender border-b-2 border-brand-black" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-brand-lavender-light border-2 border-brand-black font-body text-xs tracking-wider uppercase px-3 py-1 rounded-full">{post.tag}</span>
                      <span className="font-body text-brand-black/40 text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-xl leading-snug mb-3 flex-1">{post.title}</h3>
                    <p className="font-body text-brand-black/60 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                    <div className="flex items-center gap-2 font-body text-xs tracking-wider uppercase text-brand-lavender-dark mt-auto group-hover:gap-3 transition-all">
                      Читать <Icon name="ArrowRight" size={13} />
                    </div>
                  </div>
                </article>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ КОНТАКТЫ ══════ */}
      <section id="contact" className="bg-brand-black py-24 px-6 border-t-2 border-brand-black relative overflow-hidden">
        <span className="absolute right-16 top-12 text-brand-lavender text-5xl opacity-20 select-none rotate-12">✦</span>
        <span className="absolute left-10 bottom-10 text-brand-lavender text-3xl opacity-20 select-none -rotate-6">⚡</span>
        <div className="max-w-2xl mx-auto relative z-10">
          <Anim>
            <p className="font-body text-brand-lavender/70 text-sm tracking-[0.3em] uppercase text-center mb-2">Обсудим проект?</p>
            <h2 className="font-display text-4xl md:text-6xl text-white text-center leading-tight mb-2">
              Напишите мне
            </h2>
            <p className="font-accent italic text-brand-lavender text-center text-xl mb-10">
              — отвечу в течение нескольких часов
            </p>
          </Anim>
          <Anim delay={100}>
            <form className="border-2 border-brand-lavender/30 rounded-2xl p-8 flex flex-col gap-5 bg-white/5 backdrop-blur">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-body text-xs text-white/50 tracking-widest uppercase block mb-2">Имя</label>
                  <input type="text" placeholder="Ваше имя"
                    className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-brand-lavender transition-colors" />
                </div>
                <div>
                  <label className="font-body text-xs text-white/50 tracking-widest uppercase block mb-2">Email</label>
                  <input type="email" placeholder="email@example.com"
                    className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-brand-lavender transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-body text-xs text-white/50 tracking-widest uppercase block mb-2">Запрос</label>
                <select className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-lavender transition-colors">
                  <option value="" className="bg-zinc-900">Выберите тему</option>
                  <option value="figma" className="bg-zinc-900">Перенос макета из Figma</option>
                  <option value="site" className="bg-zinc-900">Создание сайта / лендинга</option>
                  <option value="shop" className="bg-zinc-900">Интернет-магазин</option>
                  <option value="migration" className="bg-zinc-900">Перенос с другой платформы</option>
                  <option value="audit" className="bg-zinc-900">Аудит сайта</option>
                  <option value="workshop" className="bg-zinc-900">Мастер-класс по Tilda</option>
                  <option value="other" className="bg-zinc-900">Другое</option>
                </select>
              </div>
              <div>
                <label className="font-body text-xs text-white/50 tracking-widest uppercase block mb-2">Сообщение</label>
                <textarea rows={4} placeholder="Расскажите о проекте: что нужно сделать, есть ли макет, сроки..."
                  className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-brand-lavender transition-colors resize-none" />
              </div>
              <button type="button"
                className="bg-brand-lavender text-brand-black border-2 border-brand-lavender-dark font-body font-semibold text-sm tracking-widest uppercase py-4 rounded-full hover:bg-brand-lavender-dark hover:text-white transition-all shadow-[3px_3px_0_#A88CC0] hover:shadow-none mt-1">
                Отправить сообщение ✦
              </button>
            </form>
          </Anim>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-brand-black border-t-2 border-brand-lavender/20 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl text-white">
            Ирина <span className="italic text-brand-lavender">Завадская</span>
          </span>
          <p className="font-body text-white/25 text-sm">© 2025 Все права защищены</p>
          <div className="flex gap-3">
            {["Instagram", "Send", "Youtube"].map(icon => (
              <a key={icon} href="#"
                className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-brand-lavender transition-colors">
                <Icon name={icon} fallback="Link" size={14} />
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
