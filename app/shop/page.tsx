"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import ProductCard from "@/components/ui/ProductCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import type { Product } from "@/types";

interface Category {
  id: number;
  name: string;
  slug: string;
  _count?: { products: number };
}

export default function ShopPage() {
  return (
    <Suspense fallback={<PublicLayout><LoadingSpinner size="lg" className="py-32" /></PublicLayout>}>
      <ShopPageInner />
    </Suspense>
  );
}

function ShopPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCategories(d.data);
      });
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (sort) params.set("sort", sort);
      params.set("page", String(page));
      params.set("limit", "12");

      try {
        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data.data || data.data);
          setTotal(data.data.total || 0);
          setTotalPages(data.data.totalPages || 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, category, sort, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase block mb-2">
            ✦ Authentic Spiritual Products ✦
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-3">Shop</h1>
          <p className="text-purple-200 max-w-xl mx-auto text-sm sm:text-base">
            Handpicked, energized Rudraksha, Crystals, Bracelets, Yantra & Vastu products by Arizona Occul.
          </p>
        </div>
      </section>

      <section className="py-10 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
            <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-600 text-sm"
                />
              </div>
            </form>

            <div className="flex items-center gap-3">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-600 bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-600 bg-white"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="name_asc">Name: A → Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <LoadingSpinner size="lg" className="py-20" />
          ) : products.length === 0 ? (
            <EmptyState
              icon={<SlidersHorizontal className="w-8 h-8" />}
              title="No Products Found"
              description="Try adjusting your search or filter criteria."
            />
          ) : (
            <>
              <p className="text-xs text-gray-500 mb-4">
                Showing {products.length} of {total} products
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-purple-50 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600 px-4">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-purple-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
