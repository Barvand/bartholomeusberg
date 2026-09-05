import ContactForm from "../contact-form";
import { Reveal } from "../animation/reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="page-container">
        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
