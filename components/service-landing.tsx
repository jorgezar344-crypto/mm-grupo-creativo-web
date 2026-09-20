"use client";

import { ContactCTA, Footer, Header, OptimizedImage, ViewportOptimizedImage, whatsappHref } from "./mm-shared";

export type ServiceLandingProps = {
  number:string;
  title:string;
  accent:string;
  description:string;
  services:string[];
  heroImage:string;
  images:{src:string;alt:string}[];
  ctaLabel:string;
  contactMessage:string;
};

export function ServiceLanding({number,title,accent,description,services,heroImage,images,ctaLabel,contactMessage}:ServiceLandingProps){
  const contactHref=whatsappHref(contactMessage);
  return <main className="service-page">
    <Header/>
    <section className="service-hero" id="inicio">
      <div className="service-hero-copy"><p className="section-number">{number}<span/></p><h1>{title}<br/><em>{accent}</em></h1><span className="hairline"/><p>{description}</p><div className="service-actions"><a className="button button-dark" href={contactHref} target="_blank" rel="noreferrer">{ctaLabel}<span>→</span></a><a className="text-link" href="/#proyectos">Ver proyectos <span>↘</span></a></div></div>
      <div className="service-hero-art"><OptimizedImage src={heroImage} alt={`${title} ${accent}`} sizes="(max-width: 767px) 100vw, 62vw" eager/></div>
    </section>
    <section className="service-offer section"><div className="service-offer-head"><p className="eyebrow">Servicios de muestra</p><h2>Soluciones para<br/><em>cada espacio.</em></h2><p>{description}</p></div><ol>{services.map((service,index)=><li key={service}><b>{String(index+1).padStart(2,"0")}</b><span>{service}</span></li>)}</ol></section>
    <section className="service-gallery section"><div className="service-gallery-head"><p className="eyebrow">Selección visual</p><h2>Ideas que toman<br/><em>forma.</em></h2></div><div className="service-gallery-grid">{images.map((image,index)=><figure key={`${image.src}-${index}`}><ViewportOptimizedImage src={image.src} alt={image.alt} sizes="(max-width: 720px) 100vw, 34vw"/><figcaption>{String(index+1).padStart(2,"0")} — {image.alt}</figcaption></figure>)}</div></section>
    <ContactCTA eyebrow="Conversemos sobre tu espacio." title="Tu proyecto,|nuestro siguiente paso." label={ctaLabel} href={contactHref}/>
    <Footer/>
  </main>
}
