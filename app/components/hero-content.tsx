"use client";
import { motion, useReducedMotion } from "motion/react";
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
export default function HeroContent() {
  const reduceMotion = useReducedMotion();
  const transition = (duration: number) => ({
    duration: reduceMotion ? 0.15 : duration,
    ease: "easeOut" as const,
  });
  return (
    <motion.div
      className="text-center"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.09,
            delayChildren: reduceMotion ? 0 : 0.04,
          },
        },
      }}
    >
      <motion.p
        className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-fjord-200"
        variants={item}
        transition={transition(0.46)}
      >
        IT · NETTSIDER · BERGEN
      </motion.p>
      <motion.h1
        className="my-4 max-w-207.5 font-display text-5xl font-semibold leading-[0.96] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.7rem]"
        variants={item}
        transition={transition(0.52)}
      >
        Teknologi som
        <br />
        <em className="not-italic text-fjord-200">bare fungerer.</em>
      </motion.h1>
      <motion.p
        className="text-center text-[1.06rem] leading-7 text-fjord-50/90"
        variants={item}
        transition={transition(0.5)}
      >
        Nettsider, PC-hjelp og praktisk IT-hjelp for privatpersoner og små
        bedrifter i Arna og Bergen.
      </motion.p>
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-3"
        variants={item}
        transition={transition(0.46)}
      >
        <motion.a
          whileHover={reduceMotion ? undefined : { y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center rounded bg-white px-5 py-3 text-sm font-bold text-fjord-950 transition-colors hover:bg-fjord-100"
          href="#services"
        >
          Se tjenester
        </motion.a>
        <motion.a
          whileHover={reduceMotion ? undefined : { y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center rounded border border-white/70 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
          href="#contact"
        >
          Ta kontakt
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
