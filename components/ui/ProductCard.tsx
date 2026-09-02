"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Sparkles, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";
import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    setAdding(true);
    await addToCart(product.id, 1);
    setAdding(false);
  };

  const hasSale = !!product.salePrice && parseFloat(product.salePrice) < parseFloat(product.price);
  const displayPrice = hasSale ? product.salePrice : product.price;

  return (
    <div className="group relative bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <Link href={`/shop/${product.slug}`} className="block relative aspect-square w-full bg-purple-50 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-primary-300 bg-gradient-to-br from-purple-50 to-primary-50">
            <Sparkles className="w-12 h-12 stroke-1 text-primary-400 mb-2" />
            <span className="text-xs font-serif text-primary-600 font-medium">Arizona Occul</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasSale && (
            <span className="bg-gold-500 text-primary-950 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              SALE
            </span>
          )}
          {product.stock <= 0 && (
            <span className="bg-gray-900/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button Placeholder */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label="Save to Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-sm z-10"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {product.category && (
            <span className="text-[11px] font-medium tracking-wider uppercase text-gold-600 block mb-1">
              {product.category.name}
            </span>
          )}

          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-serif text-base font-semibold text-gray-900 hover:text-primary-700 transition-colors line-clamp-2 leading-snug mb-1.5">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
            ))}
            <span className="text-xs text-gray-400 ml-1">(Authentic)</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-purple-50 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-lg text-primary-900">
                {formatPrice(displayPrice)}
              </span>
              {hasSale && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || adding}
            aria-label="Add to cart"
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-700 hover:bg-primary-800 disabled:bg-gray-200 disabled:cursor-not-allowed text-white transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
