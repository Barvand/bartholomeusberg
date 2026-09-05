import Link from "next/link";
import { serviceAreas } from "../service-content";

const cardStyles: Record<string, string> = {
  nettsider: "bg-gradient-to-br from-fjord-800 to-fjord-950",
  "pc-it": "bg-gradient-to-br from-fjord-600 to-fjord-700",
  "bedrifts-it": "bg-gradient-to-br from-fjord-700 to-fjord-800",
};

export function ServiceCards({ detailed = false }: { detailed?: boolean }) {
  const web = serviceAreas.filter((s) => s.group === "web");
  const it = serviceAreas.filter((s) => s.group === "it");

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-[minmax(260px,380px)] gap-6">
        {web.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            detailed={detailed}
          />
        ))}
      </div>

      <h3 className="section-heading service-dark-heading tracking-wide text-fjord-500">
        IT-support for små bedrifter
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {it.map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            detailed={detailed}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  detailed,
}: {
  service: (typeof serviceAreas)[number];
  detailed: boolean;
}) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-xl p-7 text-fjord-50 shadow-sm transition-transform hover:-translate-y-0.5 ${
        cardStyles[service.slug] ?? "bg-fjord-700"
      }`}
    >
      <span className="text-xs font-bold uppercase tracking-wider text-fjord-200">
        {service.tag}
      </span>
      <h3 className="font-display text-xl font-semibold text-white">
        {service.title}
      </h3>
      <p className="text-sm text-fjord-100">{service.description}</p>
      <ul className="mt-1 flex flex-col gap-1.5 text-sm text-fjord-100">
        {service.features.slice(0, 3).map((feature) => (
          <li
            key={feature}
            className="flex gap-2 before:content-['→'] before:text-fjord-300"
          >
            {feature}
          </li>
        ))}
      </ul>
      {detailed && (
        <Link
          href={`/tjenester/${service.slug}`}
          className="mt-auto font-semibold text-white hover:underline"
        >
          Les mer <span aria-hidden="true">→</span>
        </Link>
      )}
    </article>
  );
}
