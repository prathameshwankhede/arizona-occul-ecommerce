"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, Star, Sparkles, ArrowLeft, CheckCircle2, Phone, Truck } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import ProductCard from "@/components/ui/ProductCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { formatPrice } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";
import { getWhatsAppLink } from "@/lib/utils/format";
import type { Product } from "@/types";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data.product || data.data);
          setRelated(data.data.relatedProducts || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) load();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) return;
    setAdding(true);
    const result = await addToCart(product.id, quantity);
    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <PublicLayout>
        <LoadingSpinner size="lg" className="py-32" />
      </PublicLayout>
    );
  }

  if (!product) {
    return (
      <PublicLayout>
        <div className="py-20 text-center">
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <Link href="/shop" className="text-primary-700 text-sm font-medium">← Back to Shop</Link>
        </div>
      </PublicLayout>
    );
  }

  const hasSale = !!product.salePrice && parseFloat(product.salePrice) < parseFloat(product.price);
  const displayPrice = hasSale ? product.salePrice : product.price;
  const waLink = getWhatsAppLink("8390125338", `Hi Dr. Preity, I'm interested in: ${product.name}`);

  return (
    <PublicLayout>
      <section className="py-8 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-700 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Image */}
            <div className="aspect-square rounded-3xl bg-white border border-purple-100 overflow-hidden relative">
              {product.image ? (
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-primary-300 bg-gradient-to-br from-purple-50 to-primary-50">
                  <Sparkles className="w-20 h-20 stroke-1 text-primary-400 mb-3" />
                  <span className="font-serif text-primary-600 font-medium">Arizona Occul</span>
                </div>
              )}
              {hasSale && (
                <span className="absolute top-4 left-4 bg-gold-500 text-primary-950 text-xs font-bold px-3 py-1 rounded-full">SALE</span>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              {product.category && (
                <span className="text-xs font-semibold tracking-widest uppercase text-gold-600">
                  {product.category.name}
                </span>
              )}

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
                <span className="text-xs text-gray-500 ml-1">Authentic & Consecrated</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary-900">
                  {formatPrice(displayPrice)}
                </span>
                {hasSale && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                )}
              </div>

              {/* Stock */}
              <div className="text-sm">
                {product.stock > 0 ? (
                  <span className="text-green-700 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              )}

              {/* Quantity + Add to Cart */}
              {product.stock > 0 && (
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold border-x border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {added ? "Added to Cart ✓" : adding ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-purple-100">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Truck className="w-4 h-4 text-primary-600" />
                  Free shipping above ₹999
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  Energized & Consecrated
                </div>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
              >
                <Phone className="w-4 h-4" />
                Ask Dr. Preity about this product
              </a>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
