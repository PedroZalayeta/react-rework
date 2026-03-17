"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

const whyEnglishFeatures: FeatureItem[] = [
  {
    id: 1,
    title: "El inglés es el idioma de la programación",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    description: "La mayoría de la documentación, tutoriales y recursos están en inglés. Dominarlo te abre puertas a nivel mundial. Desde las APIs de los principales servicios hasta las librerías más populares, casi todo está documentado primero en inglés.",
  },
  {
    id: 2,
    title: "Buscar soluciones en inglés",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    description: "Cuando tengas un error, el 90% de las respuestas están en Stack Overflow, Reddit y documentación en inglés. Los foros en español pueden ayudar, pero la solución más rápida y completa siempre estará en inglés.",
  },
  {
    id: 3,
    title: "Preparación profesional",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    description: "Las empresas tech contratan personas que pueden trabajar en inglés. Es una habilidad fundamental en el mercado laboral actual. Muchas ofertas de trabajo exigen inglés técnico como requisito.",
  },
  {
    id: 4,
    title: "Comunidad global",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    description: "Al contribuir a proyectos open source, vas a interactuar con personas de todo el mundo. El inglés es el idioma común que nos une como comunidad global de desarrolladores.",
  },
];

export default function WhyEnglishSection() {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(whyEnglishFeatures[0].image);

  return (
    <section className="py-24" style={{ backgroundColor: 'transparent' }}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Por qué todo está en inglés?
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#a8a5a5' }}>
            Puede parecer raro ver todo en inglés en un sitio para estudiantes uruguayos. 
            Te explicamos porqué:
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {whyEnglishFeatures.map((tab) => (
                <AccordionItem key={tab.id} value={`item-${tab.id}`}>
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.image);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 !no-underline transition"
                  >
                    <h6
                      className={`text-lg font-semibold ${tab.id === activeTabId ? "text-white" : ""}`}
                      style={{ color: tab.id === activeTabId ? '#ffffff' : '#c3c0c0' }}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-3" style={{ color: '#a8a5a5' }}>
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="h-full max-h-48 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="relative m-auto hidden w-full md:w-1/2 overflow-hidden rounded-xl md:block" style={{ backgroundColor: 'rgba(35, 38, 77, 0.5)' }}>
            <img
              src={activeImage}
              alt="Feature preview"
              className="aspect-[4/3] rounded-md object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#23264d]/60 to-transparent pointer-events-none" />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: '#a8a5a5' }}>
            💡 Consejo: No necesitas ser fluido. Con poder leer y escribir lo básico ya es suficiente para empezar.
          </p>
        </div>
      </div>
    </section>
  );
}
