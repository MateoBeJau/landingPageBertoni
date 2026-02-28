"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "15+", label: "Anos de experiência" },
  { value: "100+", label: "Fotografias no portfólio" },
  { value: "4", label: "Séries fotográficas" },
  { value: "RS & BR", label: "Regiões fotografadas" },
];

export default function StatsStrip() {
  return (
    <div className="bg-stone-950 border-y border-stone-800 py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-stone-800">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center md:px-8"
            >
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-1">
                {stat.value}
              </span>
              <span className="font-sans text-stone-500 text-xs uppercase tracking-[0.15em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
