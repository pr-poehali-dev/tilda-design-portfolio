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

const MARQUEE_WORDS = ["Tilda", "Figma", "Дизайн", "Лендинг", "Интернет-магазин", "Верстка", "Tilda", "Сайт под ключ"];

const SERVICES = [
  {
    icon: "Layers",
    title: "Перенос макета из Figma",
    desc: "Быстро и аккуратно верстаю любые макеты на Tilda — пиксель в пиксель, без лишних вопросов.",
    price: "от 5 000 ₽",
    color: "bg-brand-blue",
  },
  {
    icon: "ShoppingBag",
    title: "Сайты и лендинги",
    desc: "Создаю стильные интернет-магазины, продающие лендинги и удобные корпоративные сайты.",
    price: "от 15 000 ₽",
    color: "bg-brand-orange",
  },
  {
    icon: "RefreshCw",
    title: "Перенос с других платформ",
    desc: "Копирую проекты с WordPress, Joomla, Wix и других CMS на Tilda — без потери контента.",
    price: "от 8 000 ₽",
    color: "bg-brand-navy",
  },
  {
    icon: "SearchCheck",
    title: "Аудит и улучшение",
    desc: "Разбираю ваш сайт на Tilda, нахожу слабые места и делаю его быстрее, красивее и эффективнее.",
    price: "от 3 000 ₽",
    color: "bg-brand-blue-dark",
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1, category: "лендинг", title: "Студия красоты", sub: "Продающий лендинг с онлайн-записью", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop" },
  { id: 2, category: "магазин", title: "Бутик одежды", sub: "Интернет-магазин с каталогом и корзиной", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop" },
  { id: 3, category: "корпоратив", title: "IT-компания", sub: "Корпоративный сайт с командой и услугами", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
  { id: 4, category: "лендинг", title: "Онлайн-школа", sub: "Курс по продвижению — перенос из Figma", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop" },
  { id: 5, category: "магазин", title: "Цветочный магазин", sub: "Магазин с доставкой и фильтром по букетам", img: "https://images.unsplash.com/photo-1487530811015-780ce39de73d?w=400&h=300&fit=crop" },
  { id: 6, category: "корпоратив", title: "Фотограф", sub: "Портфолио с галереей и формой бронирования", img: "https://images.unsplash.com/photo-1452780212461-8ef04b6ddfc4?w=400&h=300&fit=crop" },
];

const PORTFOLIO_CATS = ["все", "лендинг", "магазин", "корпоратив"];

const REVIEWS = [
  {
    name: "Светлана В.",
    role: "Владелец студии красоты",
    text: "Ирина перенесла наш макет из Figma за 3 дня. Всё точно, аккуратно, без единого вопроса. Сайт получился лучше, чем мы ожидали!",
    stars: 5,
  },
  {
    name: "Максим О.",
    role: "Основатель онлайн-школы",
    text: "Перешли с WordPress на Tilda — думали, будет долго и больно. Ирина всё сделала быстро и чисто. Теперь сами управляем сайтом без программистов.",
    stars: 5,
  },
  {
    name: "Анна Г.",
    role: "Предприниматель, магазин украшений",
    text: "Прошла мастер-класс по Tilda — наконец разобралась, как самостоятельно редактировать сайт. Очень понятно объясняет даже сложные вещи.",
    stars: 5,
  },
];

const WORKSHOPS = [
  {
    date: "10 мая 2025",
    title: "Tilda с нуля за 1 день",
    format: "Онлайн",
    seats: "15 мест",
    price: "2 900 ₽",
  },
  {
    date: "24 мая 2025",
    title: "Figma → Tilda: перенос макетов",
    format: "Онлайн",
    seats: "10 мест",
    price: "4 500 ₽",
  },
  {
    date: "14 июня 2025",
    title: "Интернет-магазин на Tilda",
    format: "Онлайн",
    seats: "12 мест",
    price: "3 900 ₽",
  },
];

const BLOG_POSTS = [
  {
    tag: "Tilda",
    title: "5 ошибок при верстке сайта на Tilda, которые убивают конверсию",
    excerpt: "Часто вижу одни и те же ошибки у новичков. Разбираю каждую с примерами и объясняю, как исправить...",
    readTime: "5 мин",
  },
  {
    tag: "Figma",
    title: "Как правильно подготовить макет в Figma для верстки на Tilda",
    excerpt: "Хороший макет — это половина успеха. Рассказываю, что нужно сделать до передачи верстальщику...",
    readTime: "7 мин",
  },
  {
    tag: "SEO",
    title: "Почему ваш сайт на Tilda не находят в Google: разбираю типичные причины",
    excerpt: "SEO на Tilda — это реально, если знать несколько простых правил. Делюсь чек-листом...",
    readTime: "6 мин",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
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

  const filtered = activeFilter === "все"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(i => i.category === activeFilter);

  return (
    <div className="font-body text-brand-navy overflow-x-hidden">

      {/* ───── NAVBAR ───── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#FAF0E6]/95 shadow-md backdrop-blur-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-accent text-2xl font-bold tracking-widest text-brand-blue uppercase leading-none">
            Ирина<br/><span className="text-brand-orange">Завадская</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="font-accent text-sm font-medium tracking-wider uppercase text-brand-navy hover:text-brand-orange transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-brand-orange text-white font-accent text-sm font-semibold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-[#C94E1A] transition-colors"
          >
            Обсудить проект
          </a>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-brand-navy">
            <Icon name={mobileOpen ? "X" : "Menu"} size={26} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#FAF0E6] border-t border-brand-blue/20 px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                className="font-accent text-base tracking-wider uppercase text-brand-navy hover:text-brand-orange transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="mt-2 bg-brand-orange text-white font-accent text-sm tracking-widest uppercase px-6 py-3 rounded-full text-center">
              Связаться
            </a>
          </div>
        )}
      </header>

      {/* ───── HERO ───── */}
      <section className="min-h-screen bg-brand-blue relative overflow-hidden hero-wave-bg">
        <div className="flex flex-col md:flex-row w-full min-h-screen">
          <div className="flex-1 flex flex-col justify-center px-10 md:px-20 pt-32 pb-16 md:py-0 relative z-10">
            <p className="font-accent text-[#F2C9A8] text-sm tracking-[0.3em] uppercase mb-6" style={{ animation: "fade-up 0.7s ease-out 0.1s both" }}>
              Веб-дизайнер • Специалист Tilda
            </p>
            <h1 className="font-display italic text-white text-5xl md:text-7xl leading-[1.05] mb-6">
              Сайты на Tilda,<br/>
              которые<br/>
              <span className="text-[#F2C9A8]">работают.</span>
            </h1>
            <p className="font-accent text-[#F2C9A8] text-sm md:text-base tracking-widest uppercase mb-4">
              Быстро. Красиво. Без лишних вопросов.
            </p>
            <p className="text-white/70 text-base max-w-sm mb-10">
              Создаю сайты под ключ, переношу макеты из Figma и помогу разобраться с любой задачей на Tilda.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact"
                className="bg-brand-orange text-white font-accent text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#C94E1A] transition-all hover:scale-105 shadow-lg">
                Начать сейчас
              </a>
              <a href="#about"
                className="border-2 border-white/40 text-white font-accent text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:border-white transition-all hover:scale-105">
                Узнать больше
              </a>
            </div>
          </div>

          <div className="relative w-full md:w-[45%] h-72 md:h-auto overflow-hidden">
            <img
              src={HERO_IMG}
              alt="Коуч"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-transparent to-transparent hidden md:block" />
            <div className="absolute bottom-8 left-6 bg-brand-orange text-white rounded-2xl px-5 py-3 shadow-xl">
              <div className="font-accent text-xl font-bold">120+</div>
              <div className="text-xs tracking-wider uppercase opacity-90">Сайтов сдано</div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── MARQUEE ───── */}
      <div className="bg-brand-orange overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="font-accent text-white text-lg font-semibold tracking-[0.2em] uppercase mx-8">{w}</span>
          ))}
        </div>
      </div>

      {/* ───── ABOUT ───── */}
      <section id="about" className="bg-[#FAF0E6] py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <AnimSection>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-blue/30 rounded-2xl" />
              <img
                src={HERO_IMG}
                alt="О себе"
                className="relative z-10 w-full rounded-2xl object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-blue text-white rounded-2xl p-5 z-20 shadow-xl">
                <div className="font-display italic text-2xl">4 года</div>
                <div className="font-accent text-xs tracking-widest uppercase opacity-80">опыта на Tilda</div>
              </div>
            </div>
          </AnimSection>

          <AnimSection>
            <p className="font-accent text-brand-orange text-sm tracking-[0.3em] uppercase mb-4">Обо мне</p>
            <h2 className="font-display italic text-brand-blue text-4xl md:text-5xl leading-tight mb-6">
              Привет, я Ирина — <span className="underline decoration-brand-orange">веб-дизайнер</span> на Tilda
            </h2>
            <p className="text-brand-navy/80 leading-relaxed mb-4">
              Специализируюсь на создании сайтов на Tilda: от переноса макетов из Figma до полноценных интернет-магазинов и корпоративных сайтов.
            </p>
            <p className="text-brand-navy/80 leading-relaxed mb-8">
              Работаю быстро и аккуратно. Объясняю всё понятным языком — без технического жаргона. После сдачи проекта вы сможете управлять сайтом самостоятельно.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { num: "120+", label: "проектов" },
                { num: "4 года", label: "на Tilda" },
                { num: "100%", label: "в срок" },
                { num: "30+", label: "учеников" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-brand-blue/10">
                  <div className="font-display italic text-brand-blue text-3xl font-bold">{s.num}</div>
                  <div className="font-accent text-xs tracking-wider uppercase text-brand-navy/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 bg-brand-blue text-white font-accent text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#2A3580] transition-all hover:scale-105">
              Обсудить проект <Icon name="ArrowRight" size={16} />
            </a>
          </AnimSection>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section id="services" className="py-24 px-6" style={{ backgroundColor: "rgba(123,143,212,0.15)" }}>
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <p className="font-accent text-brand-orange text-sm tracking-[0.3em] uppercase mb-3 text-center">Чем могу помочь</p>
            <h2 className="font-display italic text-brand-blue text-4xl md:text-5xl text-center mb-4">Услуги</h2>
            <p className="text-brand-navy/60 text-center max-w-xl mx-auto mb-16">
              Всё, что нужно для запуска и развития вашего сайта на Tilda — в одном месте.
            </p>
          </AnimSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title}>
                <div className={`${s.color} text-white rounded-2xl p-7 h-full flex flex-col gap-4 hover:scale-105 transition-transform cursor-pointer`}>
                  <div className="bg-white/20 rounded-xl w-12 h-12 flex items-center justify-center">
                    <Icon name={s.icon} fallback="Star" size={22} />
                  </div>
                  <h3 className="font-display italic text-xl leading-tight">{s.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed flex-1">{s.desc}</p>
                  <div className="font-accent text-sm font-bold tracking-wider border-t border-white/20 pt-4">{s.price}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PORTFOLIO ───── */}
      <section id="portfolio" className="bg-[#FAF0E6] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <p className="font-accent text-brand-orange text-sm tracking-[0.3em] uppercase mb-3 text-center">Мои работы</p>
            <h2 className="font-display italic text-brand-blue text-4xl md:text-5xl text-center mb-10">Портфолио</h2>
          </AnimSection>

          <AnimSection>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {PORTFOLIO_CATS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`font-accent text-sm tracking-widest uppercase px-6 py-2.5 rounded-full border-2 transition-all ${
                    activeFilter === cat
                      ? "bg-brand-blue border-brand-blue text-white"
                      : "border-brand-blue/30 text-brand-navy hover:border-brand-blue"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <AnimSection key={item.id}>
                <div className="group rounded-2xl overflow-hidden border border-brand-blue/10 bg-white hover:shadow-xl transition-all cursor-pointer">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-orange text-white font-accent text-xs tracking-wider uppercase px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display italic text-brand-blue text-xl mb-1">{item.title}</h3>
                    <p className="text-brand-navy/70 text-sm">{item.sub}</p>
                    <div className="mt-4 flex items-center gap-2 text-brand-orange font-accent text-xs tracking-wider uppercase">
                      Смотреть проект <Icon name="ArrowRight" size={14} />
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── WORKSHOPS ───── */}
      <section id="workshops" className="bg-brand-blue py-24 px-6" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q15 20 30 30 T60 30' stroke='rgba(255,255,255,0.12)' fill='none' stroke-width='1.5'/%3E%3C/svg%3E\")" }}>
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <p className="font-accent text-[#F2C9A8] text-sm tracking-[0.3em] uppercase mb-3 text-center">Ближайшие события</p>
            <h2 className="font-display italic text-white text-4xl md:text-5xl text-center mb-16">Мастер-классы</h2>
          </AnimSection>
          <div className="grid md:grid-cols-3 gap-6">
            {WORKSHOPS.map((w) => (
              <AnimSection key={w.title}>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-7 hover:bg-white/20 transition-all h-full flex flex-col gap-4">
                  <span className="font-accent text-[#F2C9A8] text-xs tracking-[0.2em] uppercase">{w.date}</span>
                  <h3 className="font-display italic text-white text-2xl leading-tight">{w.title}</h3>
                  <div className="flex gap-4 flex-wrap mt-auto">
                    <span className="flex items-center gap-1.5 text-white/70 text-sm">
                      <Icon name="MapPin" size={14} />{w.format}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/70 text-sm">
                      <Icon name="Users" size={14} />{w.seats}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/20 pt-4">
                    <span className="font-accent text-white font-bold text-lg">{w.price}</span>
                    <button className="bg-brand-orange text-white font-accent text-xs tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-[#C94E1A] transition-colors">
                      Записаться
                    </button>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── REVIEWS ───── */}
      <section id="reviews" className="bg-[#F2C9A8] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <p className="font-accent text-brand-orange text-sm tracking-[0.3em] uppercase mb-3 text-center">Что говорят клиенты</p>
            <h2 className="font-display italic text-brand-blue text-4xl md:text-5xl text-center mb-16">Отзывы</h2>
          </AnimSection>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <AnimSection key={r.name}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {Array(r.stars).fill(0).map((_, j) => (
                      <span key={j} className="text-brand-orange text-lg">★</span>
                    ))}
                  </div>
                  <p className="font-display italic text-brand-navy text-lg leading-relaxed flex-1 mb-6">
                    «{r.text}»
                  </p>
                  <div>
                    <div className="font-accent text-sm font-bold tracking-wider text-brand-blue uppercase">{r.name}</div>
                    <div className="text-brand-navy/50 text-xs mt-1">{r.role}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── BLOG ───── */}
      <section id="blog" className="bg-[#FAF0E6] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <p className="font-accent text-brand-orange text-sm tracking-[0.3em] uppercase mb-3 text-center">Полезное</p>
            <h2 className="font-display italic text-brand-blue text-4xl md:text-5xl text-center mb-16">Блог</h2>
          </AnimSection>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <AnimSection key={post.title}>
                <article className="group bg-white rounded-2xl overflow-hidden border border-brand-blue/10 hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
                  <div className="h-3 bg-brand-blue" />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#F2C9A8] text-brand-navy font-accent text-xs tracking-wider uppercase px-3 py-1 rounded-full">{post.tag}</span>
                      <span className="text-brand-navy/40 text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="font-display italic text-brand-blue text-xl leading-tight mb-3 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-brand-navy/60 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-brand-orange font-accent text-xs tracking-wider uppercase mt-auto group-hover:gap-3 transition-all">
                      Читать <Icon name="ArrowRight" size={14} />
                    </div>
                  </div>
                </article>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CONTACT ───── */}
      <section id="contact" className="bg-brand-navy py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q15 20 30 30 T60 30' stroke='rgba(255,255,255,0.15)' fill='none' stroke-width='1.5'/%3E%3C/svg%3E\")" }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <AnimSection>
            <p className="font-accent text-[#F2C9A8] text-sm tracking-[0.3em] uppercase mb-4 text-center">Обсудим проект?</p>
            <h2 className="font-display italic text-white text-4xl md:text-6xl text-center leading-tight mb-4">
              Напишите мне
            </h2>
            <p className="text-white/60 text-center mb-12">Опишите задачу — и я отвечу в течение нескольких часов.</p>
          </AnimSection>
          <AnimSection>
            <form className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 flex flex-col gap-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-accent text-xs text-white/60 tracking-widest uppercase block mb-2">Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#F2C9A8] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-accent text-xs text-white/60 tracking-widest uppercase block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#F2C9A8] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="font-accent text-xs text-white/60 tracking-widest uppercase block mb-2">Запрос</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F2C9A8] transition-colors">
                  <option value="" className="bg-brand-navy">Выберите тему</option>
                  <option value="figma" className="bg-brand-navy">Перенос макета из Figma</option>
                  <option value="site" className="bg-brand-navy">Создание сайта / лендинга</option>
                  <option value="shop" className="bg-brand-navy">Интернет-магазин</option>
                  <option value="migration" className="bg-brand-navy">Перенос с другой платформы</option>
                  <option value="audit" className="bg-brand-navy">Аудит сайта</option>
                  <option value="workshop" className="bg-brand-navy">Мастер-класс по Tilda</option>
                  <option value="other" className="bg-brand-navy">Другое</option>
                </select>
              </div>
              <div>
                <label className="font-accent text-xs text-white/60 tracking-widest uppercase block mb-2">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о вашем проекте: что нужно сделать, есть ли макет, сроки..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#F2C9A8] transition-colors resize-none"
                />
              </div>
              <button
                type="button"
                className="bg-brand-orange text-white font-accent text-sm tracking-widest uppercase py-4 rounded-full hover:bg-[#C94E1A] transition-all hover:scale-[1.02] mt-2 shadow-lg"
              >
                Отправить сообщение
              </button>
            </form>
          </AnimSection>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="bg-brand-navy border-t border-white/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-accent text-xl font-bold tracking-widest text-white uppercase">
            Ирина <span className="text-brand-orange">Завадская</span>
          </span>
          <p className="text-white/30 text-sm">© 2025 Все права защищены</p>
          <div className="flex gap-4">
            {["Instagram", "Linkedin", "Send"].map(icon => (
              <a key={icon} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors">
                <Icon name={icon} fallback="Link" size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}