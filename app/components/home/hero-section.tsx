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
        className="home-hero-image home-hero-image-desktop"
      />
      <Image
        src="/hero-mobile.png"
        alt="Bart van den Berg"
        fill
        priority
        sizes="100vw"
        quality={90}
        className="home-hero-image home-hero-image-mobile"
      />
      <div className="home-hero-overlay" />
      <div className="page-container home-hero-content">
        <div className="home-hero-copy">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
