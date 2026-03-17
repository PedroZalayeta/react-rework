"use client";

import AnimatedBackground from "./AnimatedBackground";

const features = [
  {
    id: "card-1",
    icon: "🎯",
    title: "Learn by Doing",
    description: "Contribute to real projects and learn industry-standard tools like Git, GitHub, and modern frameworks.",
  },
  {
    id: "card-2",
    icon: "🤝",
    title: "Community Driven",
    description: "Built by students, for students. Join a community of learners and help others just like you.",
  },
  {
    id: "card-3",
    icon: "🚀",
    title: "Build Your Portfolio",
    description: "Get real-world experience and add meaningful projects to your developer portfolio.",
  },
  {
    id: "card-4",
    icon: "💡",
    title: "Open Source",
    description: "All our courses and materials are free and open source. Learn from real code and contribute back.",
  },
];

export default function FeaturesCards() {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedBackground
            className="rounded-xl bg-gradient-to-br from-[#b29758]/20 to-[#8a723e]/20 border border-[#b29758]/30"
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.6,
            }}
            enableHover
          >
            {features.map((feature) => (
              <div 
                key={feature.id} 
                data-id={feature.id}
                className="flex flex-col items-center justify-center p-6 text-center h-48 cursor-pointer"
              >
                <span className="text-4xl mb-3">{feature.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm" style={{ color: '#a8a5a5' }}>{feature.description}</p>
              </div>
            ))}
          </AnimatedBackground>
        </div>
      </div>
    </section>
  );
}
