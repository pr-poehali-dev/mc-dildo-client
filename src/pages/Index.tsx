import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { id: "home", label: "ГЛАВНАЯ" },
  { id: "download", label: "ЗАГРУЗКА" },
  { id: "features", label: "ФУНКЦИИ" },
  { id: "screenshots", label: "СКРИНШОТЫ" },
  { id: "docs", label: "ДОКУМЕНТАЦИЯ" },
];

const FEATURE_CATEGORIES = [
  {
    category: "COMBAT",
    color: "green",
    modules: [
      { name: "KillAura", desc: "Автоматическая атака ближайших врагов в заданном радиусе", tag: "OP" },
      { name: "Reach", desc: "Увеличенная дистанция удара — бей раньше, чем тебя видят", tag: null },
      { name: "Velocity", desc: "Снижение или полное отключение knockback от ударов", tag: null },
      { name: "AutoCrits", desc: "Автоматические криты без прыжков — урон x2 всегда", tag: null },
      { name: "Criticals", desc: "Имитация прыжков для гарантированного крита каждый удар", tag: null },
      { name: "AntiKnockback", desc: "Полная блокировка отбрасывания при получении урона", tag: "NEW" },
    ],
  },
  {
    category: "MOVEMENT",
    color: "cyan",
    modules: [
      { name: "Speed", desc: "Увеличение скорости передвижения с обходом серверных ограничений", tag: "OP" },
      { name: "Fly", desc: "Свободный полёт в выживании — горизонтальный и вертикальный", tag: null },
      { name: "NoFall", desc: "Полная отмена урона от падения с любой высоты", tag: null },
      { name: "Sprint", desc: "Перманентный спринт без потери еды и стамины", tag: null },
      { name: "Bhop", desc: "Bunny hop — автоматические прыжки для максимальной скорости", tag: null },
      { name: "Jesus", desc: "Хождение по воде как посуху без замедления", tag: "NEW" },
    ],
  },
  {
    category: "VISUAL",
    color: "green",
    modules: [
      { name: "ESP", desc: "Подсветка игроков, мобов и предметов сквозь стены", tag: "OP" },
      { name: "Tracers", desc: "Линии до всех игроков — видишь где они даже за горой", tag: null },
      { name: "Fullbright", desc: "Максимальная яркость в любое время суток без факелов", tag: null },
      { name: "ChestESP", desc: "Рентген для сундуков, шалкеров и ценного лута", tag: null },
      { name: "Xray", desc: "Видишь руду и пустоты сквозь любые блоки", tag: "NEW" },
      { name: "NameTags", desc: "Кастомные теги над игроками с их здоровьем и пингом", tag: null },
    ],
  },
  {
    category: "MISC",
    color: "cyan",
    modules: [
      { name: "AutoTotem", desc: "Автоматическое перекладывание тотема в оффхенд при смерти", tag: "OP" },
      { name: "Scaffold", desc: "Автоматическая укладка блоков под ногами при ходьбе", tag: null },
      { name: "AutoArmor", desc: "Автоматическое надевание лучшей доступной брони", tag: null },
      { name: "Nuker", desc: "Мгновенный снос блоков в большом радиусе вокруг игрока", tag: null },
      { name: "AutoEat", desc: "Автоматическое поедание еды при низком уровне голода", tag: null },
      { name: "Timer", desc: "Ускорение тиков игры — двигаешься быстрее всех на сервере", tag: "NEW" },
    ],
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

function BuyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0a0a0a] border border-[rgba(0,255,136,0.3)] p-8 max-w-sm w-full z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors">
          <Icon name="X" size={18} />
        </button>

        <div className="text-center mb-6">
          <span className="font-orbitron text-[#00ff88] text-xs tracking-[0.3em]">ЛИЦЕНЗИЯ</span>
          <h2 className="font-orbitron text-white text-xl font-bold mt-2">DILDO CLIENT</h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto mt-3" />
        </div>

        <div className="space-y-2 mb-6">
          {["Доступ ко всем функциям", "Бесплатные обновления", "Поддержка 1.16–1.21", "Без ограничений по времени"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Icon name="Check" size={14} className="text-[#00ff88] shrink-0" />
              <span className="font-rajdhani text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>

        <div className="border border-[rgba(0,255,136,0.15)] bg-[rgba(0,255,136,0.03)] p-4 mb-6 text-center">
          <span className="font-rajdhani text-gray-500 text-xs uppercase tracking-widest block mb-1">Стоимость</span>
          <span className="font-orbitron text-3xl font-black neon-text">678 ₽</span>
          <span className="font-rajdhani text-gray-600 text-xs block mt-1">единоразово · навсегда</span>
        </div>

        <button className="neon-btn w-full text-sm py-3">
          ПЕРЕЙТИ К ОПЛАТЕ
        </button>

        <p className="font-rajdhani text-gray-700 text-xs text-center mt-4">
          Оплата через банковскую карту
        </p>
      </div>
    </div>
  );
}

function CheatMenu() {
  const [activeTab, setActiveTab] = useState("COMBAT");
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    KillAura: true, Speed: true, ESP: true, Fly: false,
    Reach: true, Velocity: false, AutoCrits: true, AntiKnockback: false,
    NoFall: true, Sprint: true, Bhop: false, Jesus: false,
    Tracers: true, Fullbright: true, ChestESP: false, Xray: false,
    NameTags: true, Criticals: false, AutoTotem: true, Scaffold: false,
    AutoArmor: true, Nuker: false, AutoEat: true, Timer: false,
  });

  const currentCat = FEATURE_CATEGORIES.find((c) => c.category === activeTab)!;

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      <div className="border border-[rgba(0,255,136,0.35)] bg-[#080808] shadow-[0_0_40px_rgba(0,255,136,0.08)]">
        {/* title bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.04)]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border border-[#00ff88] flex items-center justify-center">
              <span className="font-orbitron text-[#00ff88] text-[9px] font-black">D</span>
            </div>
            <span className="font-orbitron text-white text-xs font-bold tracking-[0.2em]">DILDO CLIENT</span>
            <span className="font-orbitron text-gray-600 text-[9px] tracking-widest">v2.4.1</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-rajdhani text-[#00ff88] text-xs">
              {Object.values(enabled).filter(Boolean).length} активно
            </span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-[rgba(255,255,255,0.1)] cursor-pointer hover:bg-[rgba(255,255,255,0.2)]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[rgba(255,60,60,0.5)] cursor-pointer hover:bg-[rgba(255,60,60,0.8)]" />
            </div>
          </div>
        </div>

        <div className="flex">
          {/* sidebar tabs */}
          <div className="w-28 border-r border-[rgba(0,255,136,0.1)] bg-[#060606]">
            {FEATURE_CATEGORIES.map((cat) => {
              const isActive = cat.category === activeTab;
              const activeCount = cat.modules.filter((m) => enabled[m.name]).length;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveTab(cat.category)}
                  className={`w-full px-3 py-3 text-left border-b border-[rgba(255,255,255,0.04)] transition-all ${
                    isActive
                      ? cat.color === "green"
                        ? "bg-[rgba(0,255,136,0.08)] border-l-2 border-l-[#00ff88]"
                        : "bg-[rgba(0,229,255,0.08)] border-l-2 border-l-[#00e5ff]"
                      : "hover:bg-[rgba(255,255,255,0.03)]"
                  }`}
                >
                  <div className={`font-orbitron text-[10px] font-bold tracking-wider mb-1 ${
                    isActive
                      ? cat.color === "green" ? "text-[#00ff88]" : "text-[#00e5ff]"
                      : "text-gray-500"
                  }`}>
                    {cat.category}
                  </div>
                  <div className="font-rajdhani text-[10px] text-gray-700">
                    {activeCount}/{cat.modules.length}
                  </div>
                </button>
              );
            })}
            <div className="px-3 py-3 border-t border-[rgba(0,255,136,0.1)] mt-auto">
              <button className="font-orbitron text-[9px] text-gray-700 hover:text-gray-400 tracking-wider transition-colors">
                CONFIGS
              </button>
            </div>
          </div>

          {/* modules list */}
          <div className="flex-1">
            <div className="px-3 py-2 border-b border-[rgba(0,255,136,0.08)] flex items-center justify-between">
              <span className={`font-orbitron text-[9px] tracking-[0.25em] ${
                currentCat.color === "green" ? "text-[#00ff88]" : "text-[#00e5ff]"
              }`}>
                {activeTab}
              </span>
              <span className="font-rajdhani text-gray-700 text-[10px]">{currentCat.modules.length} модулей</span>
            </div>
            <div className="divide-y divide-[rgba(255,255,255,0.04)]">
              {currentCat.modules.map((mod) => {
                const on = enabled[mod.name];
                return (
                  <div
                    key={mod.name}
                    onClick={() => setEnabled((p) => ({ ...p, [mod.name]: !p[mod.name] }))}
                    className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all group ${
                      on
                        ? currentCat.color === "green"
                          ? "bg-[rgba(0,255,136,0.04)] hover:bg-[rgba(0,255,136,0.07)]"
                          : "bg-[rgba(0,229,255,0.04)] hover:bg-[rgba(0,229,255,0.07)]"
                        : "hover:bg-[rgba(255,255,255,0.03)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-sm shrink-0 ${
                        on
                          ? currentCat.color === "green" ? "bg-[#00ff88] shadow-[0_0_6px_#00ff88]" : "bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]"
                          : "bg-[#2a2a2a]"
                      }`} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-orbitron text-[11px] font-bold ${on ? "text-white" : "text-gray-600"}`}>
                            {mod.name}
                          </span>
                          {mod.tag && (
                            <span className={`font-orbitron text-[8px] px-1 font-bold border ${
                              mod.tag === "OP"
                                ? "text-[#00ff88] border-[rgba(0,255,136,0.4)]"
                                : "text-[#00e5ff] border-[rgba(0,229,255,0.4)]"
                            }`}>
                              {mod.tag}
                            </span>
                          )}
                        </div>
                        <p className="font-rajdhani text-[10px] text-gray-700 leading-tight truncate max-w-[240px]">
                          {mod.desc}
                        </p>
                      </div>
                    </div>
                    {/* toggle */}
                    <div className={`w-8 h-4 flex items-center px-0.5 shrink-0 border transition-all ${
                      on
                        ? currentCat.color === "green"
                          ? "bg-[rgba(0,255,136,0.15)] border-[rgba(0,255,136,0.5)]"
                          : "bg-[rgba(0,229,255,0.15)] border-[rgba(0,229,255,0.5)]"
                        : "bg-[#111] border-[#2a2a2a]"
                    }`}>
                      <div className={`w-3 h-3 transition-all ${
                        on
                          ? currentCat.color === "green"
                            ? "translate-x-4 bg-[#00ff88]"
                            : "translate-x-4 bg-[#00e5ff]"
                          : "translate-x-0 bg-[#333]"
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-[rgba(0,255,136,0.1)] bg-[rgba(0,0,0,0.4)]">
          <span className="font-mono text-[9px] text-gray-700">Minecraft 1.21 | Java 21 | v2.4.1</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-gray-700">FPS <span className="text-[#00ff88]">480</span></span>
            <span className="font-mono text-[9px] text-gray-700">PING <span className="text-[#00e5ff]">12ms</span></span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);

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
      {buyOpen && <BuyModal onClose={() => setBuyOpen(false)} />}
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
            <button onClick={() => setBuyOpen(true)} className="neon-btn text-sm px-8 py-3">
              ⬇ КУПИТЬ КЛИЕНТ
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
              24 модуля across 4 категорий — полный арсенал для доминирования на любом сервере
            </p>
          </div>

          <div className="space-y-6">
            {FEATURE_CATEGORIES.map((cat) => (
              <div key={cat.category} className="card-dark overflow-hidden">
                <div className={`px-6 py-3 border-b flex items-center gap-3 ${
                  cat.color === "green"
                    ? "border-[rgba(0,255,136,0.15)] bg-[rgba(0,255,136,0.04)]"
                    : "border-[rgba(0,229,255,0.15)] bg-[rgba(0,229,255,0.04)]"
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${cat.color === "green" ? "bg-[#00ff88]" : "bg-[#00e5ff]"}`} />
                  <span className={`font-orbitron text-xs font-bold tracking-[0.3em] ${cat.color === "green" ? "text-[#00ff88]" : "text-[#00e5ff]"}`}>
                    {cat.category}
                  </span>
                  <span className="font-rajdhani text-gray-600 text-xs ml-auto">{cat.modules.length} модулей</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(255,255,255,0.03)]">
                  {cat.modules.map((mod) => (
                    <div key={mod.name} className="bg-[#0a0a0a] p-4 hover:bg-[#0f0f0f] transition-colors group">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`font-orbitron text-xs font-bold ${cat.color === "green" ? "text-white" : "text-white"}`}>
                          {mod.name}
                        </span>
                        {mod.tag && (
                          <span className={`font-orbitron text-[9px] px-1.5 py-0.5 font-bold ${
                            mod.tag === "OP"
                              ? "bg-[rgba(0,255,136,0.15)] text-[#00ff88] border border-[rgba(0,255,136,0.3)]"
                              : "bg-[rgba(0,229,255,0.15)] text-[#00e5ff] border border-[rgba(0,229,255,0.3)]"
                          }`}>
                            {mod.tag}
                          </span>
                        )}
                      </div>
                      <p className="font-rajdhani text-gray-600 text-xs leading-relaxed group-hover:text-gray-400 transition-colors">
                        {mod.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Всего модулей", value: "24+" },
              { label: "Обходов античит", value: "12" },
              { label: "Версий MC", value: "6" },
              { label: "Активных юзеров", value: "4.2K" },
            ].map((s) => (
              <div key={s.label} className="card-dark p-4 text-center">
                <div className="font-orbitron text-2xl font-black neon-text mb-1">{s.value}</div>
                <div className="font-rajdhani text-gray-600 text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
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

      {/* CHEAT MENU PREVIEW */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-orbitron text-[#00ff88] text-xs tracking-[0.3em] uppercase">// PREVIEW</span>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mt-3 mb-4">МЕНЮ ЧИТА</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto" />
            <p className="font-rajdhani text-gray-500 mt-4 max-w-lg mx-auto">
              Нажми на модули — переключай в реальном времени. Именно так выглядит меню в игре
            </p>
          </div>
          <CheatMenu />
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