import Image from "next/image";
import HeroContent from "../hero-content";

export default function HeroSection() {
  return (
    <section id="home" className="home-hero">
      <Image
        src="/newhero.jpg"
        alt="Bart van den Berg"
        fill
        priority
        sizes="100vw"
        className="home-hero-image"
      />
      <div className="home-hero-overlay" />
      <div className="page-container home-hero-content">
        <div className="home-hero-copy">
          <HeroContent alignRight />
        </div>
      </div>
    </section>
  );
}
