export type NavItem = {
  slug: string;
  href: string;
  name: string;
  descriptor: string;
  description: string;
};

export type NavGroup = {
  eyebrow?: string;
  items: NavItem[];
};

export type NavMenu = {
  id: "products" | "solutions";
  label: string;
  href: string;
  groups: NavGroup[];
};

export const PRODUCTS_MENU: NavMenu = {
  id: "products",
  label: "Products",
  href: "/products/jogaan",
  groups: [
    {
      items: [
        {
          slug: "jogaan",
          href: "/products/jogaan",
          name: "Jogaan",
          descriptor: "The farmer's app",
          description:
            "The grower's view of the Fashol network. Live buyer demand, mobile money settlement in 24 hours, and a marketplace for seed, feed, and farm machinery. Built for farmers and field agents across Bangladesh.",
        },
        {
          slug: "hyperfarm",
          href: "/products/hyperfarm",
          name: "Hyperfarm",
          descriptor: "The buyer's procurement desk",
          description:
            "The buyer's procurement desk. Real-time stock, cold-chain fulfillment, four-tier grading, and full traceability from farm gate to final invoice. Used by restaurants, retailers, quick-commerce, and exporters.",
        },
      ],
    },
  ],
};

export const SOLUTIONS_MENU: NavMenu = {
  id: "solutions",
  label: "Solutions",
  href: "/solutions/restaurants",
  groups: [
    {
      eyebrow: "Buyers",
      items: [
        {
          slug: "restaurants",
          href: "/solutions/restaurants",
          name: "Restaurants",
          descriptor: "Fresh produce to kitchen doors",
          description:
            "Fresh produce at your kitchen door before morning service, ordered the night before. No more 4AM runs to the wholesale market.",
        },
        {
          slug: "retailers",
          href: "/solutions/retailers",
          name: "Retailers",
          descriptor: "Neighborhood shops and kirana stores",
          description:
            "Neighborhood shop and kirana supply routes with predictable pricing and reliable delivery windows.",
        },
        {
          slug: "quick-commerce",
          href: "/solutions/quick-commerce",
          name: "Quick commerce",
          descriptor: "Daily pricing, cold-chain fulfillment",
          description:
            "Real-time stock visibility and daily pricing with cold-chain fulfillment to your distribution centers. Traceability from farmer to final order.",
        },
        {
          slug: "supershops",
          href: "/solutions/supershops",
          name: "Supershops",
          descriptor: "Retail chain supply partnerships",
          description:
            "Supply partnerships for supershops and retail chains, with consistent grading, dependable volumes, and integrated distribution.",
        },
        {
          slug: "importers",
          href: "/solutions/importers",
          name: "Importers",
          descriptor: "Bangladesh-origin sourcing into regional markets",
          description:
            "Sourcing Bangladesh-origin produce for regional markets, with grade verification, cold-chain handling, and customs-ready documentation.",
        },
        {
          slug: "exporters",
          href: "/solutions/exporters",
          name: "Exporters",
          descriptor: "Farm-to-airport in 24 hours",
          description:
            "Grade A selection at hub intake, dedicated cold-chain routing to airports, and export documentation handled end-to-end.",
        },
        {
          slug: "commission-agents",
          href: "/solutions/commission-agents",
          name: "Commission agents",
          descriptor: "Traditional arotdars on a modern stack",
          description:
            "Traditional commission agents on a modern stack. Transparent pricing, settlement, and inventory management.",
        },
        {
          slug: "wholesalers",
          href: "/solutions/wholesalers",
          name: "Wholesalers",
          descriptor: "Bulk distribution with transparency",
          description:
            "Direct-from-hub bulk pricing with quality grading applied at intake, not at the urban wholesale market.",
        },
      ],
    },
    {
      eyebrow: "Suppliers",
      items: [
        {
          slug: "farmers",
          href: "/solutions/farmers",
          name: "Farmers",
          descriptor: "The grower's end of the network",
          description:
            "Fair pricing benchmarked against 200-plus wholesale markets, mobile money settlement in 24 hours, and a marketplace for inputs and machinery.",
        },
        {
          slug: "agri-input-suppliers",
          href: "/solutions/agri-input-suppliers",
          name: "Agri input suppliers",
          descriptor: "Seed, feed, and pesticide distribution",
          description:
            "Distribution channel into 60,000-plus registered farmers, with demand data and verified delivery.",
        },
        {
          slug: "agri-machinery-suppliers",
          href: "/solutions/agri-machinery-suppliers",
          name: "Agri machinery suppliers",
          descriptor: "Farm equipment and tooling",
          description:
            "Marketplace access to farmer demand for tractors, tillers, and harvest equipment, with Fashol-backed farmer financing options.",
        },
      ],
    },
    {
      eyebrow: "Partners",
      items: [
        {
          slug: "cold-storage-operators",
          href: "/solutions/cold-storage-operators",
          name: "Cold storage operators",
          descriptor: "Cold-chain capacity and routing",
          description:
            "Capacity integration into Fashol's routing layer, with automated utilization and settlement.",
        },
        {
          slug: "logistics-partners",
          href: "/solutions/logistics-partners",
          name: "Logistics partners",
          descriptor: "Fleet and last-mile operations",
          description:
            "Fleet and last-mile work across 40-plus hubs and 200-plus wholesale markets, dispatched through Fashol's routing system.",
        },
      ],
    },
  ],
};

export const NAV_MENUS: NavMenu[] = [PRODUCTS_MENU, SOLUTIONS_MENU];

export type ProductLogo = { src: string; alt: string; scale: number };

export const PRODUCT_LOGOS: Record<string, ProductLogo> = {
  jogaan: { src: "/jogaanlogo.png", alt: "Jogaan", scale: 0.8 },
  hyperfarm: { src: "/images/content/hyperfarm-logo.png", alt: "Hyperfarm", scale: 1.15 },
};

export function findMenuItem(menu: NavMenu, slug: string): NavItem | undefined {
  for (const group of menu.groups) {
    const item = group.items.find((it) => it.slug === slug);
    if (item) return item;
  }
  return undefined;
}

export function allItems(menu: NavMenu): NavItem[] {
  return menu.groups.flatMap((g) => g.items);
}
