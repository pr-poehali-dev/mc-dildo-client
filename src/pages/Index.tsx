import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { id: "home", label: "ГЛАВНАЯ" },
  { id: "download", label: "ЗАГРУЗКА" },
  { id: "features", label: "ФУНКЦИИ" },
  { id: "screenshots", label: "СКРИНШОТЫ" },
  { id: "docs", label: "ДОКУМЕНТАЦИЯ" },
];

const FEATURES = [
  {
    icon: "Zap",
    title: "Буст FPS",
    desc: "Оптимизированный рендеринг увеличивает FPS до 500% по сравнению с ванильным клиентом",
    color: "green",
  },
  {
    icon: "Cpu",
    title: "CPU Оптимизация",
    desc: "Умное распределение нагрузки процессора снижает задержки и устраняет фризы",
    color: "cyan",
  },
  {
    icon: "MemoryStick",
    title: "RAM Менеджер",
    desc: "Продвинутая система управления памятью — меньше утечек, стабильная работа",
    color: "green",
  },
  {
    icon: "Gauge",
    title: "Lowlatency режим",
    desc: "Минимальный пинг и моментальный отклик управления для конкурентной игры",
    color: "cyan",
  },
  {
    icon: "Settings",
    title: "Тонкая настройка",
    desc: "Гибкие настройки графики с пресетами под любое железо — от слабых ПК до топовых сборок",
    color: "green",
  },
  {
    icon: "Shield",
    title: "Античит совместим",
    desc: "Полная совместимость с популярными античит-системами — безопасная игра на любых серверах",
    color: "cyan",
  },
];

const DOCS = [
  { title: "Быстрый старт", desc: "Установка и первый запуск за 5 минут", icon: "PlayCircle" },
  { title: "Настройка производительности", desc: "Как выжать максимум FPS из вашего железа", icon: "SlidersHorizontal" },
  { title: "Конфигурация графики", desc: "Пресеты и ручная настройка шейдеров", icon: "Monitor" },
  { title: "Горячие клавиши", desc: "Все шорткаты и как их переназначить", icon: "Keyboard" },
  { title: "Troubleshooting", desc: "Решение частых проблем и ошибок", icon: "Wrench" },
  { title: "FAQ", desc: "Ответы на популярные вопросы", icon: "HelpCircle" },
];

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ["rgba(0,255,136,", "rgba(0,229,255,"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

function FpsCounter() {
  const [fps, setFps] = useState(420);
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(400 + Math.floor(Math.random() * 80));
    }, 800);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="font-orbitron neon-text text-2xl font-bold">{fps}</span>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const scrollY = window.scrollY + 100;
      sections.forEach((sec) => {
        if (sec && scrollY >= sec.offsetTop) setActiveSection(sec.id);
      });
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      <Particles />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(0,255,136,0.15)] bg-[rgba(10,10,10,0.92)] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-[#00ff88] flex items-center justify-center animate-pulse-neon">
              <span className="font-orbitron text-[#00ff88] text-xs font-black">D</span>
            </div>
            <span className="font-orbitron text-white text-sm font-bold tracking-widest">
              DILDO<span className="neon-text">CLIENT</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`font-orbitron text-xs tracking-widest transition-all duration-300 ${
                  activeSection === l.id
                    ? "neon-text"
                    : "text-gray-500 hover:text-gray-200"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-gray-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-t border-[rgba(0,255,136,0.1)] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="font-orbitron text-xs tracking-widest text-gray-400 hover:neon-text text-left"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center grid-bg pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] pointer-events-none z-10" />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-[rgba(0,255,136,0.3)] px-4 py-1.5 mb-8 animate-fade-in-up opacity-0 delay-100">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-orbitron text-[#00ff88] text-xs tracking-widest">ВЕРСИЯ 2.4.1 — СТАБИЛЬНАЯ</span>
          </div>

          <h1
            className="font-orbitron text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight glitch animate-fade-in-up opacity-0 delay-200"
            data-text="DILDO CLIENT"
          >
            <span className="text-white">DILDO</span>
            <br />
            <span className="neon-text">CLIENT</span>
          </h1>

          <p className="font-rajdhani text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-4 leading-relaxed animate-fade-in-up opacity-0 delay-300">
            Производительный Minecraft клиент нового поколения.<br />
            Максимальный FPS. Минимальные задержки.
          </p>

          {/* Live FPS */}
          <div className="inline-flex items-center gap-4 border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.03)] px-6 py-3 mb-10 animate-fade-in-up opacity-0 delay-400">
            <div className="text-center">
              <div className="font-rajdhani text-gray-500 text-xs uppercase tracking-widest mb-0.5">Live FPS</div>
              <FpsCounter />
            </div>
            <div className="w-px h-8 bg-[rgba(0,255,136,0.3)]" />
            <div className="text-center">
              <div className="font-rajdhani text-gray-500 text-xs uppercase tracking-widest mb-0.5">Ping</div>
              <span className="font-orbitron neon-text-cyan text-2xl font-bold">3</span>
              <span className="font-rajdhani text-gray-500 text-sm ml-1">ms</span>
            </div>
            <div className="w-px h-8 bg-[rgba(0,255,136,0.3)]" />
            <div className="text-center">
              <div className="font-rajdhani text-gray-500 text-xs uppercase tracking-widest mb-0.5">Версия MC</div>
              <span className="font-orbitron text-white text-lg font-bold">1.21</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0 delay-500">
            <button onClick={() => scrollTo("download")} className="neon-btn text-sm px-8 py-3">
              ⬇ СКАЧАТЬ БЕСПЛАТНО
            </button>
            <button onClick={() => scrollTo("features")} className="neon-btn neon-btn-cyan text-sm px-8 py-3">
              ПОСМОТРЕТЬ ФУНКЦИИ
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-float">
          <span className="font-rajdhani text-gray-600 text-xs tracking-widest">SCROLL</span>
          <Icon name="ChevronDown" size={16} className="text-[#00ff88]" />
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-orbitron text-[#00ff88] text-xs tracking-[0.3em] uppercase">// 01</span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3 mb-4">ЗАГРУЗКА</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { os: "Windows", icon: "Monitor", version: "2.4.1", size: "48 MB", recommended: true },
              { os: "macOS", icon: "Apple", version: "2.4.1", size: "52 MB", recommended: false },
              { os: "Linux", icon: "Terminal", version: "2.4.1", size: "45 MB", recommended: false },
            ].map((item) => (
              <div
                key={item.os}
                className={`card-dark p-6 relative overflow-hidden ${item.recommended ? "neon-border" : ""}`}
              >
                {item.recommended && (
                  <div className="absolute top-0 right-0 bg-[#00ff88] text-black font-orbitron text-xs px-3 py-1 font-bold">
                    РЕКОМЕНДУЕТСЯ
                  </div>
                )}
                <Icon name={item.icon as "Monitor"} size={32} className="text-[#00ff88] mb-4" fallback="Download" />
                <h3 className="font-orbitron text-white text-lg font-bold mb-1">{item.os}</h3>
                <p className="font-rajdhani text-gray-500 text-sm mb-1">Версия {item.version}</p>
                <p className="font-rajdhani text-gray-600 text-sm mb-6">{item.size}</p>
                <button className={`neon-btn w-full text-xs ${item.recommended ? "" : "neon-btn-cyan"}`}>
                  СКАЧАТЬ
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 border border-[rgba(0,229,255,0.2)] bg-[rgba(0,229,255,0.03)]">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={16} className="text-[#00e5ff] mt-0.5 shrink-0" />
              <p className="font-rajdhani text-gray-400 text-sm leading-relaxed">
                Требования: Java 17+, Minecraft 1.16–1.21. Рекомендуется 8 ГБ RAM для максимальной производительности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-orbitron text-[#00ff88] text-xs tracking-[0.3em] uppercase">// 02</span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3 mb-4">ФУНКЦИИ</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto" />
            <p className="font-rajdhani text-gray-500 mt-4 max-w-lg mx-auto">
              Каждая функция разработана с одной целью — дать тебе преимущество
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-dark p-6 group">
                <div
                  className={`w-10 h-10 flex items-center justify-center mb-4 border ${
                    f.color === "green"
                      ? "border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.05)]"
                      : "border-[rgba(0,229,255,0.3)] bg-[rgba(0,229,255,0.05)]"
                  }`}
                >
                  <Icon
                    name={f.icon as "Zap"}
                    size={18}
                    className={f.color === "green" ? "text-[#00ff88]" : "text-[#00e5ff]"}
                    fallback="Star"
                  />
                </div>
                <h3 className="font-orbitron text-white text-sm font-bold mb-2 tracking-wide">{f.title}</h3>
                <p className="font-rajdhani text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 card-dark p-8">
            <h3 className="font-orbitron text-white text-sm font-bold mb-6 tracking-widest">СРАВНЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ</h3>
            <div className="space-y-5">
              {[
                { name: "Dildo Client", fps: 480, pct: 96, color: "#00ff88" },
                { name: "Другой клиент A", fps: 280, pct: 56, color: "#00e5ff" },
                { name: "Vanilla Minecraft", fps: 90, pct: 18, color: "#555" },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between mb-1.5">
                    <span className="font-rajdhani text-gray-400 text-sm">{item.name}</span>
                    <span className="font-orbitron text-sm font-bold" style={{ color: item.color }}>
                      {item.fps} FPS
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{ width: `${item.pct}%`, background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section id="screenshots" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-orbitron text-[#00ff88] text-xs tracking-[0.3em] uppercase">// 03</span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3 mb-4">СКРИНШОТЫ</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative group overflow-hidden neon-border">
              <img
                src="https://cdn.poehali.dev/projects/f6efb861-13d8-4b3e-9419-70806b092ccd/files/244ebc46-9ef6-4ae7-ab09-a36e41084aa3.jpg"
                alt="Dildo Client игровой вид"
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-orbitron text-[#00ff88] text-xs tracking-widest">ИГРОВОЙ ВИД</span>
              </div>
              <div className="absolute top-3 right-3 bg-[rgba(0,255,136,0.9)] text-black font-orbitron text-xs font-bold px-2 py-0.5">
                480 FPS
              </div>
            </div>

            <div className="relative group overflow-hidden neon-border-cyan">
              <img
                src="https://cdn.poehali.dev/projects/f6efb861-13d8-4b3e-9419-70806b092ccd/files/2f14f540-49a9-4999-9f8d-cc533ec55eec.jpg"
                alt="Dildo Client меню настроек"
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-orbitron text-[#00e5ff] text-xs tracking-widest">МЕНЮ КЛИЕНТА</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5">
            {["#1a2a1a", "#0a1a2a", "#1a1a2a"].map((bg, i) => (
              <div
                key={i}
                className="aspect-video border border-[rgba(0,255,136,0.1)] flex items-center justify-center"
                style={{ background: bg }}
              >
                <span className="font-orbitron text-gray-700 text-xs">СКОРО</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCS */}
      <section id="docs" className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-orbitron text-[#00ff88] text-xs tracking-[0.3em] uppercase">// 04</span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3 mb-4">ДОКУМЕНТАЦИЯ</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto" />
            <p className="font-rajdhani text-gray-500 mt-4">Всё что нужно — под рукой</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCS.map((doc) => (
              <button
                key={doc.title}
                className="card-dark p-5 text-left group flex items-start gap-4"
              >
                <div className="w-8 h-8 border border-[rgba(0,255,136,0.2)] flex items-center justify-center shrink-0 group-hover:border-[#00ff88] transition-colors">
                  <Icon name={doc.icon as "PlayCircle"} size={14} className="text-[#00ff88]" fallback="FileText" />
                </div>
                <div className="flex-1">
                  <h3 className="font-orbitron text-white text-xs font-bold mb-1 tracking-wide">
                    {doc.title}
                  </h3>
                  <p className="font-rajdhani text-gray-600 text-sm leading-tight">{doc.desc}</p>
                </div>
                <Icon name="ChevronRight" size={14} className="text-gray-700 group-hover:text-[#00ff88] mt-0.5 shrink-0 transition-colors" />
              </button>
            ))}
          </div>

          <div className="mt-10 bg-[#050505] border border-[rgba(0,255,136,0.15)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="font-orbitron text-gray-600 text-xs ml-3">TERMINAL</span>
            </div>
            <div className="space-y-1.5 font-mono text-sm">
              <p><span className="text-[#00ff88]">$</span> <span className="text-gray-300">java -jar dildo-client-2.4.1.jar</span></p>
              <p className="text-gray-600">Инициализация движка...</p>
              <p className="text-gray-600">Загрузка модулей оптимизации...</p>
              <p className="text-gray-600">Применение патчей производительности...</p>
              <p>
                <span className="text-[#00ff88]">✓</span>
                <span className="text-gray-400"> Клиент готов. FPS: </span>
                <span className="text-[#00ff88]">480</span>
                <span className="animate-blink text-[#00ff88]">_</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[rgba(0,255,136,0.1)] py-10 px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-[#00ff88] flex items-center justify-center">
              <span className="font-orbitron text-[#00ff88] text-xs font-black">D</span>
            </div>
            <span className="font-orbitron text-gray-600 text-xs tracking-widest">DILDO CLIENT © 2024</span>
          </div>
          <p className="font-rajdhani text-gray-700 text-sm">Не является официальным продуктом Mojang / Microsoft</p>
          <div className="flex gap-4">
            <button className="font-orbitron text-gray-600 hover:text-[#00ff88] text-xs tracking-wider transition-colors">
              Discord
            </button>
            <button className="font-orbitron text-gray-600 hover:text-[#00ff88] text-xs tracking-wider transition-colors">
              GitHub
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
