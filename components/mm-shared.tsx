"use client";

import { useEffect, useRef, useState } from "react";

const localImageVariants: Record<string, { width:number; height:number; webp:string; avif?:string }> = {
  "/hero-mm.png": { width:1672, height:941, webp:"/hero-mm-960.webp 960w, /hero-mm-1280.webp 1280w, /hero-mm-1672.webp 1672w", avif:"/hero-mm-960.avif 960w, /hero-mm-1280.avif 1280w, /hero-mm-1672.avif 1672w" },
  "/carpentry-detail.png": { width:1536, height:1024, webp:"/carpentry-detail-480.webp 480w, /carpentry-detail-768.webp 768w, /carpentry-detail-1024.webp 1024w, /carpentry-detail-1280.webp 1280w" },
  "/interior-mm.png": { width:1672, height:941, webp:"/interior-mm-640.webp 640w, /interior-mm-960.webp 960w, /interior-mm-1280.webp 1280w, /interior-mm-1672.webp 1672w", avif:"/interior-mm-640.avif 640w, /interior-mm-960.avif 960w, /interior-mm-1280.avif 1280w, /interior-mm-1672.avif 1672w" },
  "/interior-feature.png": { width:1672, height:941, webp:"/interior-feature-640.webp 640w, /interior-feature-960.webp 960w, /interior-feature-1280.webp 1280w, /interior-feature-1672.webp 1672w" },
  "/mm-logo.png": { width:640, height:640, webp:"/mm-logo-96.webp 96w, /mm-logo-128.webp 128w" },
};

function pexelsUrl(src:string, width:number) { return `${src}&auto=compress&w=${width}`; }

export function OptimizedImage({ src, alt, sizes, eager = false, style, className }:{ src:string; alt:string; sizes:string; eager?:boolean; style?:React.CSSProperties; className?:string }) {
  const local = localImageVariants[src];
  if (local) return <picture className="responsive-picture">
    {local.avif && <source type="image/avif" srcSet={local.avif} sizes={sizes} />}
    <source type="image/webp" srcSet={local.webp} sizes={sizes} />
    <img className={className} src={src} alt={alt} width={local.width} height={local.height} sizes={sizes} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" style={style} />
  </picture>;
  if (src.startsWith("https://images.pexels.com/")) return <img className={className} src={pexelsUrl(src, 1200)} srcSet={[480,768,1200].map(width => `${pexelsUrl(src,width)} ${width}w`).join(", ")} sizes={sizes} alt={alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "low"} decoding="async" style={style} />;
  return <img className={className} src={src} alt={alt} sizes={sizes} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "low"} decoding="async" style={style} />;
}

export function ViewportOptimizedImage(props:{ src:string; alt:string; sizes:string; style?:React.CSSProperties; className?:string }) {
  const marker = useRef<HTMLSpanElement>(null);
  const [visible,setVisible] = useState(false);
  useEffect(() => {
    const element=marker.current;
    if(!element || !("IntersectionObserver" in window)){setVisible(true);return;}
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect();}},{rootMargin:"240px"});
    observer.observe(element);
    return()=>observer.disconnect();
  },[]);
  return <span className="deferred-image" ref={marker}>{visible && <OptimizedImage {...props} />}</span>;
}

const navItems = [
  ["Inicio","/"],["Construcción","/construccion"],["Carpintería","/carpinteria"],["Interiorismo","/interiorismo"],
  ["Proyectos","/#proyectos"],["Nosotros","/#nosotros"],["Contacto","/#contacto"],
];

export function whatsappHref(message:string){return `https://wa.me/5214422712597?text=${encodeURIComponent(message)}`;}

export function Header(){return <header className="site-header">
  <a className="brand" href="/" aria-label="MM Grupo Creativo, inicio"><OptimizedImage src="/mm-logo.png" alt="" sizes="54px" eager /><span>Grupo Creativo</span></a>
  <nav aria-label="Navegación principal">{navItems.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav>
  <a className="header-cta" href={whatsappHref("Hola, me interesa cotizar un proyecto con MM Grupo Creativo.")} target="_blank" rel="noreferrer">Cotiza tu proyecto <span aria-hidden="true">→</span></a>
  <details className="mobile-menu"><summary aria-label="Abrir menú"><span/><span/><span/></summary><div>{navItems.map(([label,href])=><a key={href} href={href} onClick={event=>(event.currentTarget.closest("details") as HTMLDetailsElement|null)?.removeAttribute("open")}>{label}</a>)}</div></details>
</header>}

export function Footer(){return <footer><a className="brand footer-brand" href="/"><OptimizedImage src="/mm-logo.png" alt="" sizes="54px"/><span>Grupo Creativo</span></a><p>Construcción · Carpintería · Interiorismo</p><a href="/">Volver al inicio ↑</a></footer>}

export function ContactCTA({eyebrow="Tu espacio puede ser el siguiente.",title="Hablemos de tu proyecto.",label="Cotiza tu proyecto",href=whatsappHref("Hola, me interesa cotizar un proyecto con MM Grupo Creativo.")}:{eyebrow?:string;title?:string;label?:string;href?:string}){
  const parts=title.split("|");
  return <section className="contact-section" id="contacto"><p>{eyebrow}</p><h2>{parts[0]}{parts[1]&&<><br/><em>{parts[1]}</em></>}</h2><a className="button button-light" href={href} target="_blank" rel="noreferrer">{label}<span>→</span></a></section>
}
