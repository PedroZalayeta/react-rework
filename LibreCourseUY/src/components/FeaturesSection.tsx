import { cn } from "@/lib/utils";
import { Boxes } from "@/components/BackgroundBoxes";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Learn by Doing",
      description:
        "Contribute to real projects and learn industry-standard tools like Git, GitHub, and modern frameworks.",
      icon: <IconTerminal2 className="w-8 h-8" />,
    },
    {
      title: "Community Driven",
      description:
        "Built by students, for students. Join a community of learners and help others just like you.",
      icon: <IconEaseInOut className="w-8 h-8" />,
    },
    {
      title: "Build Your Portfolio",
      description:
        "Get real-world experience and add meaningful projects to your developer portfolio.",
      icon: <IconCurrencyDollar className="w-8 h-8" />,
    },
    {
      title: "Open Source",
      description:
        "All our courses and materials are free and open source. Learn from real code.",
      icon: <IconCloud className="w-8 h-8" />,
    },
    {
      title: "Mentorship",
      description:
        "Get guidance from experienced developers who want to help you succeed.",
      icon: <IconRouteAltLeft className="w-8 h-8" />,
    },
    {
      title: "Collaboration",
      description:
        "Work together with other learners on exciting projects and build something great.",
      icon: <IconHelp className="w-8 h-8" />,
    },
    {
      title: "Career Growth",
      description:
        "Stand out to employers with real contributions to open source projects.",
      icon: <IconAdjustmentsBolt className="w-8 h-8" />,
    },
    {
      title: "And more...",
      description:
        "Join us and discover all the opportunities waiting for you in the tech world.",
      icon: <IconHeart className="w-8 h-8" />,
    },
  ];
  return (
    <div className="h-full w-full relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-slate-800 transition-colors duration-300",
        (index === 0 || index === 4) && "lg:border-l border-slate-800",
        index < 4 && "lg:border-b border-slate-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-slate-900/90 pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-slate-900/90 pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-blue-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-slate-600 group-hover/feature:bg-blue-400 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white font-semibold">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
