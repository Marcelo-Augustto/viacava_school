import { useEffect, useState, type ReactNode } from "react";
import { benefits, business, faqs, lessons, whatsappUrl } from "./data";

type IconName = "arrow" | "check" | "instagram" | "menu" | "close" | "spark" | "pace" | "world" | "talk" | "whatsapp";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    instagram: <><rect width="18" height="18" x="3" y="3" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    spark: <><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" /></>,
    pace: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
    world: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" /></>,
    talk: <><path d="M20 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4Z" /><path d="M8 9h8M8 13h5" /></>,
    whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" /><path d="M8.4 7.4c.2-.5.4-.5.8-.5h.6c.2 0 .4.1.5.4l.9 2.1c.1.3 0 .5-.2.8l-.7.8c-.2.2-.1.4 0 .6.5 1 1.2 1.8 2.1 2.5.9.7 1.8 1.1 2.2 1.3.3.1.5.1.7-.1l1-1.2c.2-.2.4-.3.7-.2l2 .9c.3.1.5.3.5.5 0 .2-.1 1.3-.7 1.8-.5.6-1.3 1-2.2 1-1 0-2.6-.4-4.7-1.5-1.5-.8-2.8-1.9-3.9-3.2-1.1-1.3-1.8-2.7-2-3.7-.3-1.2.1-1.9.4-2.3Z" /></>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href="#inicio" aria-label="Teacher Viacava — início">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 42 42"><path d="M8 10 19.2 33 34 10h-8l-6.1 12.7L14.2 10Z" /></svg>
        <i />
      </span>
      <span className="brand__type"><small>INGLÊS COM</small><strong>Teacher Viacava</strong></span>
    </a>
  );
}

function Arcs({ className = "" }: { className?: string }) {
  return (
    <svg className={`arcs ${className}`} viewBox="0 0 500 500" fill="none" aria-hidden="true">
      {[70, 110, 150, 190].map((r) => <circle key={r} cx="385" cy="110" r={r} stroke="currentColor" strokeWidth="18" />)}
    </svg>
  );
}

function ArrowLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return <a className="text-link" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}<Icon name="arrow" size={18} /></a>;
}

function SectionHeading({ label, title, text, align = "left" }: { label: string; title: ReactNode; text?: string; align?: "left" | "center" }) {
  return <div className={`section-heading section-heading--${align}`}><span className="section-label">{label}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const links = [["Início", "#inicio"], ["Sobre", "#sobre"], ["Aulas", "#aulas"], ["Como funciona", "#como-funciona"], ["Depoimentos", "#depoimentos"], ["FAQ", "#faq"]];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const sectionIds = ["inicio", "sobre", "aulas", "como-funciona", "depoimentos", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.1, 0.3] },
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Logo compact />
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-nav" aria-label={open ? "Fechar menu" : "Abrir menu"}>
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
        <nav id="site-nav" className={open ? "is-open" : ""} aria-label="Navegação principal">
          <div className="nav-links">
            {links.map(([label, href]) => <a key={href} href={href} className={activeSection === href.slice(1) ? "is-active" : ""} aria-current={activeSection === href.slice(1) ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}
          </div>
          <a className="button button--small" href={whatsappUrl()} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Falar no WhatsApp <Icon name="arrow" size={17} /></a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <main id="conteudo">
      <section className="hero" id="inicio">
        <Arcs className="hero__arcs" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow"><i /> INGLÊS COM TEACHER VIACAVA</span>
            <h1>Seu inglês pode ir <em>muito mais longe.</em></h1>
            <p>Aulas de inglês personalizadas, com foco no que realmente importa para você. Aprenda no seu ritmo, desenvolva sua confiança e comece a usar o inglês de verdade.</p>
            <div className="hero__actions">
              <a className="button" href={whatsappUrl()} target="_blank" rel="noreferrer">Quero aprender inglês <Icon name="arrow" /></a>
              <a className="button button--ghost" href="#aulas">Conhecer as aulas</a>
            </div>
            <div className="hero__note"><span><Icon name="check" size={16} /></span> Atendimento direto com o professor</div>
          </div>
          <div className="hero__visual" aria-label="Composição visual com expressões em inglês">
            <div className="lesson-sheet">
              <span className="lesson-sheet__number">LESSON 01</span>
              <strong>HELLO!</strong>
              <p>Comece a falar.<br />Continue evoluindo.</p>
              <div className="lesson-sheet__line"><i /><i /><i /></div>
              <span className="lesson-sheet__tag">YOUR ENGLISH, YOUR WAY.</span>
            </div>
            <div className="word-card word-card--one">CONFIDENCE <span>→</span></div>
            <div className="word-card word-card--two">REAL LIFE ENGLISH</div>
            <div className="hero__dot" />
          </div>
        </div>
        <a className="scroll-cue" href="#beneficios"><span>ROLE PARA DESCOBRIR</span><i /></a>
      </section>

      <section className="section benefits" id="beneficios">
        <div className="container">
          <div className="benefits__intro">
            <SectionHeading label="POR QUE APRENDER COMIGO?" title={<>Inglês que faz sentido <em>para você.</em></>} />
            <p>Não existe uma única forma de aprender. As aulas partem dos seus objetivos para tornar o inglês mais próximo da sua rotina.</p>
          </div>
          <div className="benefit-grid">
            {benefits.map((item, index) => <article className="benefit-card" key={item.title}>
              <div className="benefit-card__top"><span className="icon-box"><Icon name={item.icon} size={25} /></span><small>0{index + 1}</small></div>
              <h3>{item.title}</h3><p>{item.text}</p>
            </article>)}
          </div>
        </div>
      </section>

      <About />
      <Lessons />
      <Process />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}

function About() {
  return <section className="section about" id="sobre"><div className="container about__grid">
    <div className="portrait-placeholder" role="img" aria-label="Espaço reservado para uma fotografia do Teacher Viacava">
      <div className="portrait-placeholder__monogram">V<span>.</span></div>
      <div className="portrait-placeholder__caption"><span>FOTO DO PROFESSOR</span><small>Substitua por uma foto autêntica</small></div>
    </div>
    <div className="about__copy">
      <SectionHeading label="QUEM ESTÁ POR TRÁS DAS AULAS" title={<>Prazer, eu sou o <em>Teacher Viacava.</em></>} />
      <p className="about__lead">Aqui, o contato é direto: você conversa com quem vai acompanhar o seu aprendizado.</p>
      <p>A proposta é entender o que você busca no inglês e construir aulas conectadas aos seus objetivos — com espaço para perguntar, praticar e evoluir com mais segurança.</p>
      <div className="about__values"><span><Icon name="check" size={17} /> Escuta e proximidade</span><span><Icon name="check" size={17} /> Foco nos seus objetivos</span></div>
      <ArrowLink href={whatsappUrl()} external>Vamos conversar?</ArrowLink>
    </div>
  </div></section>;
}

function Lessons() {
  return <section className="section lessons" id="aulas"><div className="container">
    <div className="lessons__header"><SectionHeading label="SOBRE AS AULAS" title={<>Aulas pensadas para <em>seus objetivos.</em></>} text="Cada pessoa tem um motivo diferente para aprender inglês. Estes são alguns dos focos que podem orientar seu caminho." /><span className="lessons__aside">POSSIBILIDADES DE FOCO<br />CONSTRUÍDAS COM VOCÊ</span></div>
    <div className="lesson-grid">{lessons.map(([number, title, text]) => <article className="lesson-card" key={title}><span className="lesson-card__number">{number}</span><div><h3>{title}</h3><p>{text}</p></div><span className="lesson-card__arrow" aria-hidden="true">↗</span></article>)}</div>
    <div className="lessons__footer"><p>Não encontrou exatamente o que procura?</p><ArrowLink href={whatsappUrl("Olá, Teacher Viacava! Gostaria de conversar sobre meus objetivos com o inglês.")} external>Conte seu objetivo</ArrowLink></div>
  </div></section>;
}

function Process() {
  const steps = [["01", "Entre em contato", "Converse diretamente pelo WhatsApp para tirar suas dúvidas."], ["02", "Conte seus objetivos", "Explique o que você procura e quais habilidades deseja desenvolver."], ["03", "Planeje seu aprendizado", "Converse sobre as possibilidades e encontre um caminho adequado aos seus objetivos."]] as const;
  return <section className="section process" id="como-funciona"><div className="container">
    <SectionHeading label="COMO FUNCIONA" title={<>Começar é mais simples <em>do que parece.</em></>} text="Três passos para transformar a vontade de aprender em um plano possível." align="center" />
    <div className="process__steps">{steps.map(([number, title, text], index) => <article className="process-step" key={number}><div className="process-step__number">{number}</div>{index < steps.length - 1 && <span className="process-step__line" aria-hidden="true" />}<h3>{title}</h3><p>{text}</p></article>)}</div>
    <div className="process__action"><a className="button" href={whatsappUrl()} target="_blank" rel="noreferrer">Dar o primeiro passo <Icon name="arrow" /></a></div>
  </div></section>;
}

function Testimonials() {
  return <section className="section testimonials" id="depoimentos"><div className="container testimonials__grid">
    <div><SectionHeading label="DEPOIMENTOS" title={<>Histórias reais,<br /><em>sempre.</em></>} /><p>Este espaço está sendo preparado para receber relatos autênticos de alunos. Por aqui, nenhuma história é inventada.</p></div>
    <div className="testimonial-placeholder"><span className="quote-mark">“</span><p>Em breve, experiências reais de quem está construindo uma nova relação com o inglês.</p><div><i /> RELATOS DE ALUNOS</div></div>
  </div></section>;
}

function Faq() {
  return <section className="section faq" id="faq"><div className="container faq__grid">
    <div className="faq__intro"><SectionHeading label="DÚVIDAS FREQUENTES" title={<>Ainda tem alguma <em>dúvida?</em></>} text="Encontre respostas rápidas ou fale diretamente comigo para saber os detalhes." /><ArrowLink href={whatsappUrl()} external>Prefiro conversar</ArrowLink></div>
    <div className="faq__list">{faqs.map((faq, index) => <details className="faq-item" key={faq.question} open={index === 0}><summary><span>{faq.question}</span><i aria-hidden="true" /></summary><div className="faq-item__answer"><p>{faq.answer}</p></div></details>)}</div>
  </div></section>;
}

function FinalCta() {
  return <section className="final-cta"><div className="container"><div className="final-cta__panel"><Arcs className="final-cta__arcs" /><div className="final-cta__content"><span className="section-label section-label--dark">SEU PRÓXIMO PASSO</span><h2>Seu inglês começa<br /><em>aqui.</em></h2><p>Tem dúvidas ou quer saber mais sobre as aulas? Entre em contato e vamos conversar sobre seus objetivos.</p><a className="button button--dark" href={whatsappUrl()} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Conversar pelo WhatsApp <Icon name="arrow" /></a></div></div></div></section>;
}

function Footer() {
  return <footer><div className="container footer__main"><div><Logo /><p>Inglês para ir mais longe.</p></div><div className="footer__links"><div><strong>NAVEGAÇÃO</strong><a href="#sobre">Sobre</a><a href="#aulas">Aulas</a><a href="#como-funciona">Como funciona</a><a href="#faq">FAQ</a></div><div><strong>CONTATO</strong><a href={whatsappUrl()} target="_blank" rel="noreferrer">{business.whatsappDisplay}</a><a href={business.instagram} target="_blank" rel="noreferrer"><Icon name="instagram" size={17} /> {business.instagramHandle}</a></div></div></div><div className="container footer__bottom"><span>© {new Date().getFullYear()} Teacher Viacava.</span><span>Feito para aprender, criado para evoluir.</span></div></footer>;
}

function App() {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><Hero /><Footer /><a className="whatsapp-fab" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Entrar em contato pelo WhatsApp"><Icon name="whatsapp" size={26} /><span>WhatsApp</span></a></>;
}

export default App;
