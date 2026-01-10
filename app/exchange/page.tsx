'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BottomNav } from '@/components/app/BottomNav';
import {
  ChevronLeft,
  Filter,
  Heart,
  MapPin,
  Plus,
  Search,
  Sparkles,
  X,
} from 'lucide-react';

type Listing = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  timeAgo: string;
  imageUrl: string;

  // ✅ detail screen fields
  images?: string[];
  categories?: string[]; // e.g. ["Furniture", "Antique"]
  description?: string;
};

type SortBy = 'newest' | 'price_desc' | 'price_asc';

type Filters = {
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: SortBy;
  radiusMiles: number;
};

const DEFAULT_FILTERS: Filters = {
  minPrice: null,
  maxPrice: null,
  sortBy: 'newest',
  radiusMiles: 10,
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ');
}

function formatPrice(n: number) {
  return `$${Math.round(n)}`;
}

function parseTimeAgoToMinutes(timeAgo: string): number {
  const s = timeAgo.trim().toLowerCase();
  if (s.includes('yesterday')) return 24 * 60;

  const m = s.match(/(\d+)\s*(min|m|hour|h|day|d)/i);
  if (!m) return Number.MAX_SAFE_INTEGER;

  const value = Number(m[1]);
  const unit = m[2].toLowerCase();

  if (unit === 'min' || unit === 'm') return value;
  if (unit === 'hour' || unit === 'h') return value * 60;
  if (unit === 'day' || unit === 'd') return value * 24 * 60;

  return Number.MAX_SAFE_INTEGER;
}

/** Grid card */
function ListingCard({
  item,
  liked,
  onToggleLike,
  onOpen,
}: {
  item: Listing;
  liked: boolean;
  onToggleLike: () => void;
  onOpen: () => void;
}) {
  return (
    <button type="button" onClick={onOpen} className="w-full text-left">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="relative aspect-[4/3] w-full">
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" loading="lazy" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike();
            }}
            aria-label={liked ? 'Unlike' : 'Like'}
            className={cn(
              'absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full',
              'bg-white/70 backdrop-blur',
              'shadow-[0_1px_0_rgba(0,0,0,0.08)] active:scale-95 transition'
            )}
          >
            <Heart className={cn('h-5 w-5', liked ? 'fill-[#B56A1E] text-[#B56A1E]' : 'text-[#B56A1E]')} />
          </button>

          <div
            className={cn(
              'absolute bottom-2 left-2 rounded-md px-2 py-0.5',
              'bg-white/90 text-sm font-semibold text-slate-800',
              'ring-1 ring-black/10'
            )}
          >
            {formatPrice(item.price)}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="truncate text-[13px] font-medium text-slate-700">{item.title}</p>
        <p className="shrink-0 text-[12px] text-slate-500">{item.timeAgo}</p>
      </div>
    </button>
  );
}

/** Search result row card */
function SearchResultCard({
  item,
  onOpen,
}: {
  item: Listing;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left rounded-2xl bg-white px-3 py-3 ring-1 ring-black/10 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
    >
      <div className="flex gap-4">
        <div className="relative h-[92px] w-[140px] shrink-0 overflow-hidden rounded-xl">
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-0.5 text-[12px] font-semibold text-slate-800 ring-1 ring-black/10">
            {formatPrice(item.price)}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[18px] font-semibold text-slate-800">{item.title}</p>
          <p className="mt-0.5 text-[14px] text-slate-600">{item.subtitle}</p>
          <p className="mt-6 text-[13px] text-slate-500">Posted {item.timeAgo}</p>
        </div>
      </div>
    </button>
  );
}

function RadioRow({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 py-1.5 text-left">
      <span className={cn('grid h-4 w-4 place-items-center rounded-full border', checked ? 'border-[#B56A1E]' : 'border-slate-400')}>
        {checked && <span className="h-2 w-2 rounded-full bg-[#B56A1E]" />}
      </span>
      <span className="text-[13px] text-slate-700">{label}</span>
    </button>
  );
}

function FilterModal({
  open,
  onClose,
  draft,
  setDraft,
  onApply,
  onClear,
}: {
  open: boolean;
  onClose: () => void;
  draft: { minPriceText: string; maxPriceText: string; sortBy: SortBy; radiusMiles: number };
  setDraft: React.Dispatch<React.SetStateAction<{ minPriceText: string; maxPriceText: string; sortBy: SortBy; radiusMiles: number }>>;
  onApply: () => void;
  onClear: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      <button type="button" aria-label="Close filters" onClick={onClose} className="absolute inset-0 bg-black/15" />

      <div className="absolute left-1/2 top-[110px] w-[92%] max-w-[360px] -translate-x-1/2 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/10">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-black/5 active:scale-95 transition"
          >
            <X className="h-4 w-4 text-slate-700" />
          </button>

          <button type="button" onClick={onClear} className="text-[12px] font-medium text-slate-500 hover:text-slate-700">
            Clear All Filters
          </button>
        </div>

        <div className="mt-2">
          <p className="text-[13px] font-semibold text-slate-700">Price Range</p>

          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-black/10">
              <span className="text-[12px] text-slate-500">Max</span>
              <input
                inputMode="numeric"
                value={draft.maxPriceText}
                onChange={(e) => setDraft((d) => ({ ...d, maxPriceText: e.target.value.replace(/[^\d]/g, '') }))}
                placeholder="0"
                className="w-full bg-transparent text-[13px] text-slate-800 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-black/10">
              <span className="text-[12px] text-slate-500">Min</span>
              <input
                inputMode="numeric"
                value={draft.minPriceText}
                onChange={(e) => setDraft((d) => ({ ...d, minPriceText: e.target.value.replace(/[^\d]/g, '') }))}
                placeholder="0"
                className="w-full bg-transparent text-[13px] text-slate-800 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[13px] font-semibold text-slate-700">Sort By</p>

          <div className="mt-2">
            <RadioRow label="Newest Arrivals" checked={draft.sortBy === 'newest'} onClick={() => setDraft((d) => ({ ...d, sortBy: 'newest' }))} />
            <RadioRow label="Price: High to Low" checked={draft.sortBy === 'price_desc'} onClick={() => setDraft((d) => ({ ...d, sortBy: 'price_desc' }))} />
            <RadioRow label="Price: Low to High" checked={draft.sortBy === 'price_asc'} onClick={() => setDraft((d) => ({ ...d, sortBy: 'price_asc' }))} />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[13px] font-semibold text-slate-700">Location Radius</p>

          <div className="mt-2 flex items-center gap-3">
            <span className="text-[12px] text-slate-600">{draft.radiusMiles}miles</span>
            <input
              type="range"
              min={1}
              max={100}
              value={draft.radiusMiles}
              onChange={(e) => setDraft((d) => ({ ...d, radiusMiles: Number(e.target.value) }))}
              className="w-full accent-[#B56A1E]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onApply}
          className={cn(
            'mt-5 w-full rounded-full py-2.5 text-[13px] font-semibold',
            'bg-[#B56A1E] text-white shadow-md active:scale-[0.99] transition'
          )}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}

/** ✅ Product detail screen (matches your screenshot) */
function ProductDetailScreen({
  item,
  onBack,
}: {
  item: Listing;
  onBack: () => void;
}) {
  const images = item.images?.length ? item.images : [item.imageUrl];
  const categories = item.categories?.length ? item.categories : ['Furniture', 'Antique'];

  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const desc =
    item.description ??
    'Lorem ipsum dolor sit amet consectetur. Libero mi senectus malesuada porta convallis metus. Lectus enim et ipsum blandit accumsan. Neque vivamus velit non odio. Vulputate et ornare amet vel ut mauris. Quisque fames tincidunt non rhoncus id tellus id viverra. Sit blandit nisl nec tellus sed sagittis nec. Nulla eget elit lorem lacinia.';

  return (
    <div className="min-h-dvh bg-[#F5EEE6] text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-[#F5EEE6]/90 backdrop-blur">
        <div className="mx-auto w-full max-w-md px-4 py-3 sm:max-w-full">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back"
              className="grid h-9 w-9 place-items-center rounded-full active:scale-95 transition"
            >
              <ChevronLeft className="h-5 w-5 text-[#B56A1E]" />
            </button>
            <h1 className="min-w-0 flex-1 truncate text-[16px] font-semibold text-slate-800">
              {item.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-md px-4 pb-[calc(110px+env(safe-area-inset-bottom))] sm:max-w-full">
        {/* Responsive layout: stack on mobile, 2-col on landscape/desktop */}
        <div className="sm:grid sm:grid-cols-2 sm:gap-6">
          {/* Image block */}
          <div>
            <div className="relative mt-2 overflow-hidden rounded-2xl bg-white ring-1 ring-black/10">
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={images[index]}
                  alt={`${item.title} ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Dots */}
            {images.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Image ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      'h-2 w-2 rounded-full transition',
                      i === index ? 'bg-slate-700' : 'bg-slate-300'
                    )}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Details block */}
          <div className="mt-6 sm:mt-2">
            {/* Price pill */}
            <div className="my-4">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[16px] font-semibold text-slate-800 ring-1 ring-black/10">
                {formatPrice(item.price)}
              </span>
            </div>
            <p className="text-[13px] font-semibold text-slate-700">Category</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="rounded-md bg-white px-3 py-1 text-[12px] text-slate-700 ring-1 ring-black/10"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-[13px] font-semibold text-slate-700">Product Description</p>
              <p className={cn('mt-2 text-[13px] leading-6 text-slate-600', !expanded && 'line-clamp-5')}>
                {desc}
              </p>

              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-2 text-[12px] font-semibold text-[#B56A1E]"
              >
                {expanded ? 'Read less' : 'Read more'}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#F5EEE6]/95 backdrop-blur">
        <div className="mx-auto w-full max-w-md px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 sm:max-w-3xl">
          <button
            type="button"
            className={cn(
              'w-full rounded-xl py-3 text-[13px] font-semibold',
              'bg-[#B56A1E] text-white shadow-md active:scale-[0.99] transition'
            )}
          >
            Message Seller
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExchangePage() {
  const listings = useMemo<Listing[]>(
    () => [
      {
        id: '1',
        title: 'Antique Bottle',
        subtitle: 'Bottle',
        price: 450,
        timeAgo: '2d ago',
        imageUrl: 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1200&q=80',
        images: [
          'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1549497537-3fe2ab5f9e2b?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1200&q=80',
        ],
        categories: ['Collectibles', 'Antique'],
      },
      {
        id: '2',
        title: 'Vintage Oak Artic Table',
        subtitle: 'Table',
        price: 450,
        timeAgo: '1h ago',
        imageUrl: 'https://images.unsplash.com/photo-1523413452902-6f6a0f7d3a9a?auto=format&fit=crop&w=1200&q=80',
        images: [
          'https://images.unsplash.com/photo-1523413452902-6f6a0f7d3a9a?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1400&q=80',
          'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1400&q=80',
        ],
        categories: ['Furniture', 'Antique'],
      },
      {
        id: '3',
        title: 'Running Shoes',
        subtitle: 'Shoes',
        price: 250,
        timeAgo: '5h ago',
        imageUrl: 'https://images.unsplash.com/photo-1528701800489-20be3c6fd1a8?auto=format&fit=crop&w=1200&q=80',
        categories: ['Shoes', 'Sports'],
      },
      {
        id: '4',
        title: 'Telephone',
        subtitle: 'Phone',
        price: 120,
        timeAgo: '10min ago',
        imageUrl: 'https://images.unsplash.com/photo-1520975693411-b2b2682a35f5?auto=format&fit=crop&w=1200&q=80',
        categories: ['Electronics', 'Vintage'],
      },
    ],
    []
  );

  const [mode, setMode] = useState<'grid' | 'search' | 'detail'>('grid');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = useMemo(
    () => (selectedId ? listings.find((l) => l.id === selectedId) ?? null : null),
    [selectedId, listings]
  );

  const openDetail = (id: string) => {
    setSelectedId(id);
    setMode('detail');
  };

  const [query, setQuery] = useState('Antique Table');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());
  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filters
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);

  const [draft, setDraft] = useState(() => ({
    minPriceText: '',
    maxPriceText: '',
    sortBy: DEFAULT_FILTERS.sortBy as SortBy,
    radiusMiles: DEFAULT_FILTERS.radiusMiles,
  }));

  // focus search input when entering search mode
  useEffect(() => {
    if (mode === 'search') requestAnimationFrame(() => inputRef.current?.focus());
    if (mode !== 'search') setFilterOpen(false);
  }, [mode]);

  useEffect(() => {
    if (!filterOpen) return;
    setDraft({
      minPriceText: filters.minPrice == null ? '' : String(filters.minPrice),
      maxPriceText: filters.maxPrice == null ? '' : String(filters.maxPrice),
      sortBy: filters.sortBy,
      radiusMiles: filters.radiusMiles,
    });
  }, [filterOpen, filters]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = listings.slice();

    if (q) arr = arr.filter((l) => l.title.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q));
    if (filters.minPrice != null) arr = arr.filter((l) => l.price >= filters.minPrice!);
    if (filters.maxPrice != null) arr = arr.filter((l) => l.price <= filters.maxPrice!);

    if (filters.sortBy === 'price_desc') arr.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === 'price_asc') arr.sort((a, b) => a.price - b.price);
    else arr.sort((a, b) => parseTimeAgoToMinutes(a.timeAgo) - parseTimeAgoToMinutes(b.timeAgo));

    return arr;
  }, [listings, query, filters]);

  const applyDraftFilters = () => {
    const minP = draft.minPriceText ? Number(draft.minPriceText) : null;
    const maxP = draft.maxPriceText ? Number(draft.maxPriceText) : null;

    setFilters({
      minPrice: Number.isFinite(minP as number) ? minP : null,
      maxPrice: Number.isFinite(maxP as number) ? maxP : null,
      sortBy: draft.sortBy,
      radiusMiles: draft.radiusMiles,
    });

    setFilterOpen(false);
  };

  const clearAllFilters = () => {
    setDraft({
      minPriceText: '',
      maxPriceText: '',
      sortBy: DEFAULT_FILTERS.sortBy,
      radiusMiles: DEFAULT_FILTERS.radiusMiles,
    });
    setFilters(DEFAULT_FILTERS);
    setFilterOpen(false);
  };

  // ✅ Detail screen (based on selected product)
  if (mode === 'detail' && selected) {
    return (
      <ProductDetailScreen
        item={selected}
        onBack={() => {
          // go back to where you came from (keep it simple: back to search if you were in search, else grid)
          setMode('grid'); // change to 'grid' if you want always back to grid
        }}
      />
    );
  }

  return (
    <div className="min-h-dvh bg-[#F5EEE6] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#F5EEE6]/90 backdrop-blur">
        {mode === 'grid' ? (
          <>
            <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 pt-3 sm:max-w-full">
              <button type="button" aria-label="Profile" className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10">
                <img
                  alt="Profile"
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=60"
                />
              </button>

              <div className="grid h-10 w-10 place-items-center rounded-full">
                <span className="text-xl font-extrabold text-[#B56A1E]">o</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Search"
                  onClick={() => setMode('search')}
                  className="grid h-10 w-10 place-items-center rounded-full active:scale-95 transition"
                >
                  <Search className="h-5 w-5 text-[#B56A1E]" />
                </button>
                <button type="button" aria-label="Filters" className="grid h-10 w-10 place-items-center rounded-full active:scale-95 transition">
                  <Sparkles className="h-5 w-5 text-[#B56A1E]" />
                </button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md px-4 pb-3 pt-2 sm:max-w-full">
              <h1 className="text-[28px] font-semibold leading-tight">Exchange</h1>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-[13px] font-semibold text-slate-600">Todays Picks</p>

                <div className="flex items-center gap-1 text-[12px] text-slate-600">
                  <MapPin className="h-4 w-4 text-[#B56A1E]" />
                  <span>Alberta</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 pt-3 sm:max-w-full">
              <button
                type="button"
                aria-label="Back"
                onClick={() => setMode('grid')}
                className="grid h-10 w-10 place-items-center rounded-full active:scale-95 transition"
              >
                <ChevronLeft className="h-5 w-5 text-[#B56A1E]" />
              </button>

              <div className="grid h-10 w-10 place-items-center rounded-full">
                <span className="text-xl font-extrabold text-[#B56A1E]">o</span>
              </div>

              <button type="button" aria-label="Profile" className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10">
                <img
                  alt="Profile"
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=60"
                />
              </button>
            </div>

            <div className="mx-auto w-full max-w-md px-4 pb-3 pt-3 sm:max-w-full">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center rounded-full bg-white/50 px-4 py-3 ring-1 ring-black/10">
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search items..."
                      className="w-full bg-transparent text-[14px] text-slate-800 placeholder:text-slate-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Filter"
                  onClick={() => setFilterOpen(true)}
                  className="grid h-12 w-12 place-items-center rounded-full bg-white/50 ring-1 ring-black/10 active:scale-95 transition"
                >
                  <Filter className="h-5 w-5 text-[#B56A1E]" />
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      <FilterModal
        open={mode === 'search' && filterOpen}
        onClose={() => setFilterOpen(false)}
        draft={draft}
        setDraft={setDraft}
        onApply={applyDraftFilters}
        onClear={clearAllFilters}
      />

      <main className={cn('mx-auto w-full max-w-md px-4', 'pb-[calc(96px+env(safe-area-inset-bottom))]', 'sm:max-w-full')}>
        {mode === 'grid' ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:mx-5 sm:grid-cols-3 lg:grid-cols-4">
            {listings.map((item) => (
              <ListingCard
                key={item.id}
                item={item}
                liked={likedIds.has(item.id)}
                onToggleLike={() => toggleLike(item.id)}
                onOpen={() => openDetail(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <SearchResultCard key={`${item.id}-search`} item={item} onOpen={() => openDetail(item.id)} />
            ))}
          </div>
        )}
      </main>

      {/* Floating + button (hide in search mode) */}
      {mode === 'grid' && (
        <button
          type="button"
          aria-label="Create listing"
          className={cn(
            'fixed right-5 z-30 grid h-14 w-14 place-items-center rounded-full',
            'bg-[#B56A1E] text-white shadow-lg',
            'active:scale-95 transition',
            'bottom-[calc(84px+env(safe-area-inset-bottom))]'
          )}
        >
          <Plus className="h-6 w-6" />
        </button>
      )}

      <BottomNav />
    </div>
  );
}
