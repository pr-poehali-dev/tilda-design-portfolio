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

const MARQUEE_WORDS = ["Баланс", "Развитие", "Ясность", "Свобода", "Энергия", "Рост", "Успех", "Смелость"];

const SERVICES = [
  {
    icon: "Compass",
    title: "Карьерный коучинг",
    desc: "Индивидуальные сессии для тех, кто хочет понять своё призвание и построить карьеру мечты.",
    price: "от 8 000 ₽",
    color: "bg-brand-blue",
  },
  {
    icon: "Users",
    title: "Работа с командой",
    desc: "Помогаю руководителям выстраивать эффективные команды и создавать здоровую культуру.",
    price: "от 25 000 ₽",
    color: "bg-brand-orange",
  },
  {
    icon: "Sparkles",
    title: "Личная трансформация",
    desc: "Глубинная работа с убеждениями, страхами и ограничениями, мешающими двигаться вперёд.",
    price: "от 12 000 ₽",
    color: "bg-brand-navy",
  },
  {
    icon: "Zap",
    title: "Интенсив за 1 день",
    desc: "Однодневная VIP-сессия с полным погружением — для тех, кто ценит своё время.",
    price: "45 000 ₽",
    color: "bg-brand-blue-dark",
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1, category: "карьера", title: "Анна, 32 года", sub: "Из найма — в собственный бизнес", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop" },
  { id: 2, category: "лидерство", title: "Михаил, 41 год", sub: "Стал директором крупной компании", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop" },
  { id: 3, category: "баланс", title: "Елена, 38 лет", sub: "Нашла гармонию между работой и семьёй", img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop" },
  { id: 4, category: "карьера", title: "Дмитрий, 29 лет", sub: "Переехал и построил карьеру за рубежом", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" },
  { id: 5, category: "лидерство", title: "Ольга, 45 лет", sub: "Создала команду-мечту", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop" },
  { id: 6, category: "баланс", title: "Сергей, 35 лет", sub: "Снизил стресс, повысил доход", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop" },
];

const PORTFOLIO_CATS = ["все", "карьера", "лидерство", "баланс"];

const REVIEWS = [
  {
    name: "Наталья К.",
    role: "Финансовый директор",
    text: "За три месяца работы я наконец поняла, чего хочу по-настоящему. Получила повышение и перестала бояться говорить «нет».",
    stars: 5,
  },
  {
    name: "Алексей М.",
    role: "Предприниматель",
    text: "Думал, что коучинг — это не для меня. Но эти сессии буквально изменили то, как я смотрю на бизнес и на себя.",
    stars: 5,
  },
  {
    name: "Марина Л.",
    role: "HR-директор",
    text: "Работаем уже полгода. Команда стала эффективнее, а я — спокойнее. Рекомендую каждому руководителю.",
    stars: 5,
  },
];

const WORKSHOPS = [
  {
    date: "15 мая 2025",
    title: "Карьера без компромиссов",
    format: "Онлайн",
    seats: "12 мест",
    price: "5 000 ₽",
  },
  {
    date: "7 июня 2025",
    title: "Лидерство изнутри",
    format: "Москва",
    seats: "8 мест",
    price: "12 000 ₽",
  },
  {
    date: "20 июня 2025",
    title: "Баланс. Это возможно",
    format: "Онлайн",
    seats: "20 мест",
    price: "3 500 ₽",
  },
];

const BLOG_POSTS = [
  {
    tag: "Карьера",
    title: "5 признаков, что вам нужен карьерный коуч прямо сейчас",
    excerpt: "Если вы просыпаетесь в воскресенье и думаете о работе — это уже сигнал...",
    readTime: "4 мин",
  },
  {
    tag: "Лидерство",
    title: "Почему «умные» руководители делают всё сами и как это остановить",
    excerpt: "Делегирование — это не слабость. Это суперсила, которую нужно развивать...",
    readTime: "6 мин",
  },
  {
    tag: "Баланс",
    title: "Как перестать работать по ночам и не потерять результат",
    excerpt: "Продуктивность — это не про количество часов. Вот что реально работает...",
    readTime: "5 мин",
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
            Имя<br/><span className="text-brand-orange">Фамилия</span>
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
            Связаться
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
              Личный коуч • Ваш со-заговорщик
            </p>
            <h1 className="font-display italic text-white text-5xl md:text-7xl leading-[1.05] mb-6">
              Ваша карьера.<br/>
              Ваша жизнь.<br/>
              <span className="text-[#F2C9A8]">Ваши правила.</span>
            </h1>
            <p className="font-accent text-[#F2C9A8] text-sm md:text-base tracking-widest uppercase mb-4">
              Без компромиссов. Без выгорания. Без масок.
            </p>
            <p className="text-white/70 text-base max-w-sm mb-10">
              Устали делать всё «правильно» и жертвовать собой? Пора это изменить.
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
              <div className="font-accent text-xl font-bold">200+</div>
              <div className="text-xs tracking-wider uppercase opacity-90">Изменённых жизней</div>
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
                <div className="font-display italic text-2xl">7 лет</div>
                <div className="font-accent text-xs tracking-widest uppercase opacity-80">опыта в коучинге</div>
              </div>
            </div>
          </AnimSection>

          <AnimSection>
            <p className="font-accent text-brand-orange text-sm tracking-[0.3em] uppercase mb-4">Обо мне</p>
            <h2 className="font-display italic text-brand-blue text-4xl md:text-5xl leading-tight mb-6">
              Когда в последний раз кто-то думал о <span className="underline decoration-brand-orange">вас</span>?
            </h2>
            <p className="text-brand-navy/80 leading-relaxed mb-4">
              Ваши цели, ваш рост, ваше будущее — я здесь именно для этого. Никаких шаблонных советов. Только конкретная, честная работа, которая реально меняет жизнь.
            </p>
            <p className="text-brand-navy/80 leading-relaxed mb-8">
              Привет! Я — ваш со-заговорщик в построении жизни, которую вы хотите. Не той, которую ожидают другие.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { num: "200+", label: "клиентов" },
                { num: "7 лет", label: "практики" },
                { num: "98%", label: "довольны" },
                { num: "15+", label: "стран" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-brand-blue/10">
                  <div className="font-display italic text-brand-blue text-3xl font-bold">{s.num}</div>
                  <div className="font-accent text-xs tracking-wider uppercase text-brand-navy/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 bg-brand-blue text-white font-accent text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-brand-blue-dark transition-all hover:scale-105">
              Познакомиться <Icon name="ArrowRight" size={16} />
            </a>
          </AnimSection>
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section id="services" className="py-24 px-6" style={{ backgroundColor: "rgba(123,143,212,0.15)" }}>
        <div className="max-w-6xl mx-auto">
          <AnimSection>
            <p className="font-accent text-brand-orange text-sm tracking-[0.3em] uppercase mb-3 text-center">Что я предлагаю</p>
            <h2 className="font-display italic text-brand-blue text-4xl md:text-5xl text-center mb-4">Услуги</h2>
            <p className="text-brand-navy/60 text-center max-w-xl mx-auto mb-16">
              Каждый формат — это глубокая, живая работа. Никакого «пустого» времени.
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
            <p className="font-accent text-brand-orange text-sm tracking-[0.3em] uppercase mb-3 text-center">Результаты клиентов</p>
            <h2 className="font-display italic text-brand-blue text-4xl md:text-5xl text-center mb-10">Портфолио историй</h2>
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
                      Читать историю <Icon name="ArrowRight" size={14} />
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
            <p className="font-accent text-brand-orange text-sm tracking-[0.3em] uppercase mb-3 text-center">Мысли вслух</p>
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
            <p className="font-accent text-[#F2C9A8] text-sm tracking-[0.3em] uppercase mb-4 text-center">Начнём?</p>
            <h2 className="font-display italic text-white text-4xl md:text-6xl text-center leading-tight mb-4">
              Напишите мне
            </h2>
            <p className="text-white/60 text-center mb-12">Расскажите о себе — и я отвечу в течение 24 часов.</p>
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
                  <option value="career" className="bg-brand-navy">Карьерный коучинг</option>
                  <option value="leadership" className="bg-brand-navy">Лидерство и команда</option>
                  <option value="workshop" className="bg-brand-navy">Мастер-класс</option>
                  <option value="other" className="bg-brand-navy">Другое</option>
                </select>
              </div>
              <div>
                <label className="font-accent text-xs text-white/60 tracking-widest uppercase block mb-2">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Расскажите немного о себе и своей ситуации..."
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
            Имя <span className="text-brand-orange">Фамилия</span>
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