"use client";
import { useState } from "react";

const links = [["Services", "services"], ["Work", "projects"], ["About", "about"], ["Contact", "contact"]] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between border-b border-white/15 bg-fjord-950/90 px-5 text-white backdrop-blur-xl md:h-[76px] md:px-[max(1.5rem,calc((100vw-1140px)/2))]">
    <a href="#home" className="font-display text-[1.05rem] font-bold tracking-[0.1em]">BART<span className="ml-1.5 text-fjord-200">VDB</span></a>
    <button className="border-0 bg-transparent text-sm font-medium text-white md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-nav">Menu</button>
    <nav id="primary-nav" className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-16 flex-col border-b border-white/15 bg-fjord-950 px-5 pb-5 pt-3 md:static md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0`}>
      {links.map(([label, id]) => <a className="py-2 text-sm text-fjord-100 hover:text-white md:p-0" onClick={() => setOpen(false)} href={`#${id}`} key={id}>{label}</a>)}
    </nav>
  </header>;
}
