"use client";

import { useEffect, useRef, useState } from "react";
import { ContactCTA, Footer, Header, ViewportOptimizedImage } from "../components/mm-shared";

const construction = [
  { title: "Obra y estructura", copy: "Bases firmes para grandes ideas.", image: "https://images.pexels.com/photos/9784169/pexels-photo-9784169.jpeg?cs=srgb&fm=jpg" },
  { title: "Adecuaciones", copy: "Adaptamos espacios a nuevas oportunidades.", image: "https://images.pexels.com/photos/10346959/pexels-photo-10346959.jpeg?cs=srgb&fm=jpg" },
  { title: "Instalaciones", copy: "Cada sistema en su lugar, listo para funcionar.", image: "https://images.pexels.com/photos/465118/pexels-photo-465118.jpeg?cs=srgb&fm=jpg" },
  { title: "Acabados", copy: "La precisión se nota en cada encuentro.", image: "/carpentry-detail.png" },
  { title: "Proyecto terminado", copy: "Espacios listos para vivirse.", image: "/interior-mm.png" },
];

const carpentry = [
  { title: "Cocinas integrales", image: "https://images.pexels.com/photos/34925526/pexels-photo-34925526.jpeg?cs=srgb&fm=jpg" },
  { title: "Clósets y vestidores", image: "/carpentry-detail.png" },
  { title: "Detalles y ensambles", image: "/carpentry-detail.png" },
  { title: "Centros de entretenimiento", image: "https://images.pexels.com/photos/5900814/pexels-photo-5900814.jpeg?cs=srgb&fm=jpg" },
  { title: "Mobiliario a medida", image: "https://images.pexels.com/photos/6436792/pexels-photo-6436792.jpeg?cs=srgb&fm=jpg" },
];

const projects = [
  { name: "Residencia Ladera", discipline: "Construcción", image: "/hero-mm.png", location: "Ubicación demo", size: "wide" },
  { name: "Cocina Nogal", discipline: "Carpintería", image: "/carpentry-detail.png", location: "Ubicación demo", size: "tall" },
  { name: "Casa del Valle", discipline: "Interiorismo", image: "/interior-mm.png", location: "Ubicación demo", size: "tall" },
  { name: "Oficinas Centrales", discipline: "Construcción", image: "https://images.pexels.com/photos/10346959/pexels-photo-10346959.jpeg?cs=srgb&fm=jpg", location: "Ubicación demo", size: "standard" },
  { name: "Estancia Horizonte", discipline: "Interiorismo", image: "/interior-feature.png", location: "Ubicación demo", size: "wide" },
  { name: "Vestidor Roble", discipline: "Carpintería", image: "/carpentry-detail.png", location: "Ubicación demo", size: "standard" },
  { name: "Estructura Patio", discipline: "Construcción", image: "https://images.pexels.com/photos/9784169/pexels-photo-9784169.jpeg?cs=srgb&fm=jpg", location: "Ubicación demo", size: "standard" },
  { name: "Suite Serena", discipline: "Interiorismo", image: "/interior-feature.png", location: "Ubicación demo", size: "standard" },
];

function HeroStory() {
  return <section className="hero" id="inicio">
    <div className="hero-copy">
      <p className="eyebrow">Diseñamos · Construimos · Transformamos</p>
      <h1>Espacios<br /><em>que trascienden.</em></h1><span className="hairline" />
      <p className="hero-subtitle">De la idea al espacio terminado.</p>
      <div className="hero-actions hero-actions-desktop"><a className="button button-dark" href="#contacto">Cotiza tu proyecto <span>→</span></a><a className="text-link" href="#proyectos">Ver proyectos <span>↘</span></a></div>
    </div>
    <picture className="hero-picture">
      <source media="(max-width: 767px)" type="image/avif" srcSet="/hero-mm-mobile-480.avif 480w, /hero-mm-mobile-768.avif 768w, /hero-mm-mobile-1024.avif 1024w" sizes="100vw" />
      <source media="(max-width: 767px)" type="image/webp" srcSet="/hero-mm-mobile-480.webp 480w, /hero-mm-mobile-768.webp 768w, /hero-mm-mobile-1024.webp 1024w" sizes="100vw" />
      <source type="image/avif" srcSet="/hero-mm-960.avif 960w, /hero-mm-1280.avif 1280w, /hero-mm-1672.avif 1672w" sizes="(max-width: 1080px) 74vw, 72vw" />
      <source type="image/webp" srcSet="/hero-mm-960.webp 960w, /hero-mm-1280.webp 1280w, /hero-mm-1672.webp 1672w" sizes="(max-width: 1080px) 74vw, 72vw" />
      <img className="hero-image" src="/hero-mm.png" width="1672" height="941" alt="Construcción, carpintería e interiorismo integrados en un mismo espacio" loading="eager" fetchPriority="high" decoding="async" />
    </picture>
    <div className="hero-actions hero-actions-mobile"><a className="button button-dark" href="#contacto">Cotiza tu proyecto <span>→</span></a><a className="button button-outline" href="#proyectos">Ver proyectos <span>→</span></a></div>
    <p className="vertical-note">Ideas<br />Materiales<br />Espacios<br />Personas</p>
    <div className="hero-disciplines" aria-label="Disciplinas">
      <a href="/construccion"><b>01</b><span>Construcción, adecuaciones y acondicionamiento.<small>Conocer servicios →</small></span></a>
      <a href="/carpinteria"><b>02</b><span>Carpintería especializada.<small>Conocer servicios →</small></span></a>
      <a href="/interiorismo"><b>03</b><span>Decoración e Interiorismo.<small>Conocer servicios →</small></span></a>
    </div>
  </section>;
}

function ConstructionCarousel() {
  const track = useRef<HTMLDivElement>(null); const [active, setActive] = useState(0); const [paused, setPaused] = useState(false);
  const go = (index:number) => {
    const next = (index + construction.length) % construction.length;
    setActive(next);
    const rail = track.current;
    const card = rail?.children[next] as HTMLElement | undefined;
    if (rail && card) rail.scrollTo({ left: card.offsetLeft - rail.clientWidth / 2 + card.clientWidth / 2, behavior:"smooth" });
  };
  useEffect(() => { if (paused) return; const id = window.setInterval(() => go(active + 1), 6000); return () => window.clearInterval(id); }, [active, paused]);
  return <section className="section construction-section" id="construccion">
    <div className="section-intro"><p className="section-number">01 <span /></p><h2>Construcción, adecuaciones<br /><em>y acondicionamiento.</em></h2><p>Espacios funcionales, seguros y listos para impulsar lo que viene.</p><div className="section-links"><a className="text-link" href="/construccion">Conocer servicios <span>→</span></a><a href="#proyectos">Ver proyectos →</a></div></div>
    <div className="carousel-shell" onPointerDown={() => setPaused(true)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="construction-track" ref={track}>{construction.map((item, i) => <article className={`construction-card ${i === active ? "is-active" : ""}`} key={item.title}>
        <ViewportOptimizedImage src={item.image} alt={item.title} sizes="(max-width: 720px) 84vw, (max-width: 980px) 54vw, 28vw" /><div className="card-shade" /><div className="card-copy"><b>{String(i + 1).padStart(2,"0")}</b><h3>{item.title}</h3><p>{item.copy}</p></div>
      </article>)}</div>
      <div className="carousel-controls"><button onClick={() => go(active - 1)} aria-label="Proyecto anterior">←</button><span><b>{String(active + 1).padStart(2,"0")}</b> / 05</span><i style={{"--progress": `${(active + 1) * 20}%`} as React.CSSProperties} /><button onClick={() => go(active + 1)} aria-label="Proyecto siguiente">→</button></div>
    </div>
  </section>;
}

function CarpentryGallery() {
  return <section className="section carpentry-section" id="carpinteria">
    <div className="section-heading"><p className="section-number">02 <span /></p><h2>Carpintería<br /><em>especializada.</em></h2><p>Diseño a medida. Materiales que se sienten.<br />Detalles que perduran.</p><div className="section-links"><a className="text-link" href="/carpinteria">Conocer servicios <span>→</span></a><a href="#proyectos">Ver proyectos →</a></div></div>
    <p className="edge-note">Madera<br />Diseño<br />Funcionalidad<br />Espacios únicos</p>
    <div className="carpentry-grid">{carpentry.map((item, i) => <article key={item.title} className={i === 2 ? "featured" : ""}><ViewportOptimizedImage src={item.image} alt={item.title} sizes="(max-width: 720px) 78vw, 24vw" style={{objectPosition: i === 2 ? "13% center" : "center"}} /><div className="card-shade" /><div className="card-copy"><b>{String(i + 1).padStart(2,"0")}</b><h3>{item.title}</h3></div></article>)}</div>
  </section>;
}

function InteriorismFeature() {
  return <section className="section interior-section" id="interiorismo">
    <div className="interior-copy"><p className="section-number">03 <span /></p><h2>Decoración e<br /><em>Interiorismo.</em></h2><span className="hairline" /><p>Espacios que se sienten<br />tan bien como se ven.</p><div className="section-links"><a className="text-link" href="/interiorismo">Conocer servicios <span>→</span></a><a href="#proyectos">Ver proyectos →</a></div></div>
    <div className="interior-art"><ViewportOptimizedImage src="/interior-mm.png" alt="Sala, comedor e iluminación integrados en un interior contemporáneo" sizes="(max-width: 720px) 140vw, (max-width: 980px) 92vw, 82vw" /><span className="project-name">Estancia contemporánea <i>Proyecto demo</i></span></div>
    <div className="interior-thumbs"><span>Residencias</span><span>Oficinas</span><span>Comercios</span><span>Hoteles</span></div>
  </section>;
}

function ProjectMasonry() {
  const [filter, setFilter] = useState("Todos"); const visible = filter === "Todos" ? projects : projects.filter(p => p.discipline === filter);
  return <section className="section projects-section" id="proyectos">
    <div className="projects-head"><div><p className="section-number">04 <span /></p><h2>Proyectos que<br /><em>hablan por nosotros.</em></h2></div><p>Espacios reales.<br />Historias reales.<br />Resultados que inspiran.</p><div className="filters" aria-label="Filtrar proyectos">{["Todos","Construcción","Carpintería","Interiorismo"].map(f => <button className={filter === f ? "active" : ""} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div></div>
    <div className="masonry">{visible.map((project, i) => <article className={`project-card ${project.size}`} key={project.name}><ViewportOptimizedImage src={project.image} alt={project.name} sizes="(max-width: 720px) 100vw, (max-width: 980px) 50vw, 33vw" /><div className="project-overlay"><b>{String(i + 1).padStart(2,"0")}</b><h3>{project.name}</h3><p>{project.discipline} · <span>{project.location}</span></p><a href="#contacto">Ver proyecto →</a></div></article>)}</div>
    <a className="button button-outline" href="#contacto">Ver todos los proyectos <span>→</span></a>
  </section>;
}

function AboutSection() {
  return <section className="section about-section" id="nosotros">
    <div className="about-copy"><p className="section-number">05 <span /></p><h2>Diseñamos,<br />construimos y<br /><em>transformamos espacios.</em></h2><span className="hairline" /><p>Somos un equipo especializado en construcción, carpintería e interiorismo. Integramos diseño, ejecución y atención personalizada para convertir cada proyecto en un espacio funcional, estético y hecho para durar.</p></div>
    <figure className="about-image"><ViewportOptimizedImage src="https://images.pexels.com/photos/5583250/pexels-photo-5583250.jpeg?cs=srgb&fm=jpg" alt="Equipo temporal revisando planos de un proyecto" sizes="(max-width: 980px) 100vw, 53vw" /><figcaption>Imagen temporal · pendiente de fotografía real del equipo MM</figcaption></figure>
    <div className="values"><div><b>01</b><h3>Experiencia</h3><p>Conocimiento aplicado a cada etapa.</p></div><div><b>02</b><h3>Calidad</h3><p>Materiales y acabados cuidados.</p></div><div><b>03</b><h3>Atención personalizada</h3><p>Acompañamiento durante el proceso.</p></div><div><b>04</b><h3>Compromiso</h3><p>Decisiones con propósito.</p></div></div>
  </section>;
}

export default function Home() { return <main><Header /><HeroStory /><ConstructionCarousel /><CarpentryGallery /><InteriorismFeature /><ProjectMasonry /><AboutSection /><ContactCTA title="Hablemos de|tu proyecto." /><Footer /></main>; }
