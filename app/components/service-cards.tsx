import Link from "next/link";
import { serviceAreas } from "../service-content";

export function ServiceCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="services-grid">
      {serviceAreas.map((service) => (
        <article className="service-card" key={service.slug}>
          <span className="service-tag">{service.tag}</span>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <ul>
            {service.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          {detailed && (
            <Link className="service-link" href={`/tjenester/${service.slug}`}>
              Les mer <span aria-hidden="true">→</span>
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
