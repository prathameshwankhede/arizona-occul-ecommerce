import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/types";

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: "Original 5 Mukhi Nepali Rudraksha Mala",
    slug: "original-5-mukhi-nepali-rudraksha-mala",
    sku: "RUD-5M-01",
    description: "Authentic, high-energy 108+1 bead five-mukhi Nepali Rudraksha mala, purified and consecrated for inner peace and health.",
    price: "1999.00",
    salePrice: "1499.00",
    stock: 25,
    image: null,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    category: { id: 1, name: "Rudraksha", slug: "rudraksha", status: "ACTIVE", createdAt: new Date().toISOString() },
  },
  {
    id: 2,
    categoryId: 2,
    name: "Natural Pyrite Abundance & Wealth Bracelet",
    slug: "natural-pyrite-abundance-wealth-bracelet",
    sku: "CRY-PYR-02",
    description: "Genuine high-grade Pyrite (Fool's Gold) gemstone stretch bracelet. Renowned for shielding negative vibrations and attracting abundance.",
    price: "1299.00",
    salePrice: "999.00",
    stock: 40,
    image: null,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    category: { id: 2, name: "Bracelets", slug: "bracelets", status: "ACTIVE", createdAt: new Date().toISOString() },
  },
  {
    id: 3,
    categoryId: 3,
    name: "Consecrated Copper Shri Yantra (6x6 inch)",
    slug: "consecrated-copper-shri-yantra",
    sku: "YAN-SHR-03",
    description: "Heavy copper plate Shri Yantra embossed with exact geometric Vedic precision. Ideal for puja altars and business setups.",
    price: "2499.00",
    salePrice: "1899.00",
    stock: 15,
    image: null,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    category: { id: 3, name: "Yantra", slug: "yantra", status: "ACTIVE", createdAt: new Date().toISOString() },
  },
  {
    id: 4,
    categoryId: 4,
    name: "Seven Chakra Crystal Healing Tower",
    slug: "seven-chakra-crystal-healing-tower",
    sku: "CRY-7CH-04",
    description: "Multi-stone natural crystal generator point designed to align and balance the seven body chakras and purify room aura.",
    price: "1499.00",
    salePrice: "1199.00",
    stock: 30,
    image: null,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    category: { id: 4, name: "Crystals", slug: "crystals", status: "ACTIVE", createdAt: new Date().toISOString() },
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-gold-600 font-semibold text-xs sm:text-sm tracking-widest uppercase block mb-2">
              ✦ Sacred Spiritual Store ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
              Featured Spiritual Essentials
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 group"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}
