import type { CSSProperties } from "react";
import { SiApple, SiCisco, SiGoogle, SiHubspot, SiMeta, SiReact, SiSap, SiShopify, SiStripe } from "react-icons/si";
import { FaAmazon, FaMicrosoft } from "react-icons/fa";

// Brand logos (react-icons). Only list companies you have actually worked with,
// logos imply a client relationship. Format: [Icon, name, brand colour on hover]
const clients: [typeof SiReact, string, string][] = [
  [FaMicrosoft, "Microsoft", "#00A4EF"],
  [SiGoogle, "Google", "#4285F4"],
  [FaAmazon, "Amazon", "#FF9900"],
  [SiMeta, "Meta", "#0668E1"],
  [SiApple, "Apple", "#0B1F3B"],
  [SiShopify, "Shopify", "#7AB55C"],
  [SiHubspot, "HubSpot", "#FF7A59"],
  [SiStripe, "Stripe", "#635BFF"],
  [SiSap, "SAP", "#0FAAFF"],
  [SiCisco, "Cisco", "#049FD9"],
];

export default function ClientLogos() {
  return (
    <section aria-label="Companies we have worked with" className="relative overflow-hidden bg-white py-0">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-3 md:px-12">
        <span className="h-px w-8 bg-[#DCE5EF]" />
        <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">Trusted by companies worldwide</p>
        <span className="h-px flex-1 bg-[#EEF2F7]" />
      </div>

      <div className="relative overflow-hidden border-y border-[#EEF2F7]">
        <div
          className="mqw overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          }}
        >
          <div className="mq2 flex w-max items-center" style={{ willChange: "transform" }}>
            {[0, 1].flatMap((k) =>
              clients.map(([Icon, name, color]) => (
                <div
                  key={`${k}-${name}`}
                  aria-hidden={k === 1 || undefined}
                  className="group flex h-[76px] w-[200px] shrink-0 items-center justify-center gap-3 md:h-[84px] md:w-[230px]"
                  style={{ "--c": color } as CSSProperties}
                >
                  <Icon aria-hidden="true" size={28} className="shrink-0 text-[#A5B1C2] transition-colors duration-300 group-hover:[color:var(--c)]" />
                  <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#8795A8] transition-colors duration-300 group-hover:text-[#172B4D]">{name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
