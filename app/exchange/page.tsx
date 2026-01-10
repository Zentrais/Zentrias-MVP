'use client';

import React, { useMemo, useState } from 'react';
import { BottomNav } from '@/components/app/BottomNav';
import { Heart, MapPin, Plus, Search, Sparkles } from 'lucide-react';

type Listing = {
  id: string;
  title: string;
  price: number;
  timeAgo: string;
  imageUrl: string;
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ');
}

function formatPrice(n: number) {
  // Keep it simple like the mock: $450
  return `$${Math.round(n)}`;
}

function ListingCard({
  item,
  liked,
  onToggleLike,
}: {
  item: Listing;
  liked: boolean;
  onToggleLike: () => void;
}) {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full">
          {/* Use <img> so you don’t need Next Image domain config for placeholders */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {/* Like */}
          <button
            type="button"
            onClick={onToggleLike}
            aria-label={liked ? 'Unlike' : 'Like'}
            className={cn(
              'absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full',
              'bg-white/70 backdrop-blur',
              'shadow-[0_1px_0_rgba(0,0,0,0.08)] active:scale-95 transition'
            )}
          >
            <Heart
              className={cn(
                'h-5 w-5',
                liked ? 'fill-[#B56A1E] text-[#B56A1E]' : 'text-[#B56A1E]'
              )}
            />
          </button>

          {/* Price pill */}
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

      {/* Meta row under image */}
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="truncate text-[13px] font-medium text-slate-700">{item.title}</p>
        <p className="shrink-0 text-[12px] text-slate-500">{item.timeAgo}</p>
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
        price: 450,
        timeAgo: '10min ago',
        imageUrl:
          'https://images.unsplash.com/photo-1523413452902-6f6a0f7d3a9a?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: '2',
        title: 'Vintage Oak Artic Table',
        price: 450,
        timeAgo: '1h ago',
        imageUrl:
          'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: '3',
        title: 'Nike Shoes',
        price: 450,
        timeAgo: '2h ago',
        imageUrl:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: '4',
        title: 'Running Shoes',
        price: 450,
        timeAgo: '5h ago',
        imageUrl:
          'https://images.unsplash.com/photo-1528701800489-20be3c6fd1a8?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: '5',
        title: 'Telephone',
        price: 450,
        timeAgo: '5h ago',
        imageUrl:
          'https://images.unsplash.com/photo-1520975693411-b2b2682a35f5?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: '6',
        title: 'Red Blazers',
        price: 450,
        timeAgo: '6h ago',
        imageUrl:
          'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: '7',
        title: 'PlayStation Controller',
        price: 450,
        timeAgo: '8h ago',
        imageUrl:
          'https://images.unsplash.com/photo-1600080972464-8e5f35f63a49?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: '8',
        title: 'Jacket',
        price: 450,
        timeAgo: '9h ago',
        imageUrl:
          'https://images.unsplash.com/photo-1520975958223-0a0c6e6b0f5e?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    []
  );

  const [likedIds, setLikedIds] = useState<Set<string>>(() => new Set());

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-dvh bg-[#F5EEE6] text-slate-900">
      {/* Top App Bar */}
      <header className="sticky top-0 z-20 bg-[#F5EEE6]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 pt-3 sm:max-w-3xl">
          {/* Left: Avatar */}
          <button
            type="button"
            aria-label="Profile"
            className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10"
          >
            <img
              alt="Profile"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=60"
            />
          </button>

          {/* Center: Logo mark */}
          <div className="grid h-10 w-10 place-items-center rounded-full">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-transparent">
              <span className="text-xl font-extrabold text-[#B56A1E]">o</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="grid h-10 w-10 place-items-center rounded-full active:scale-95 transition"
            >
              <Search className="h-5 w-5 text-[#B56A1E]" />
            </button>
            <button
              type="button"
              aria-label="Filters"
              className="grid h-10 w-10 place-items-center rounded-full active:scale-95 transition"
            >
              <Sparkles className="h-5 w-5 text-[#B56A1E]" />
            </button>
          </div>
        </div>

        {/* Title + section header row */}
        <div className="mx-auto w-full max-w-md px-4 pb-3 pt-2 sm:max-w-3xl">
          <h1 className="text-[28px] font-semibold leading-tight">Exchange</h1>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-slate-600">Todays Picks</p>

            <div className="flex items-center gap-1 text-[12px] text-slate-600">
              <MapPin className="h-4 w-4 text-[#B56A1E]" />
              <span>Alberta</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main
        className={cn(
          'mx-auto w-full max-w-md px-4',
          // leave room for BottomNav + safe area
          'pb-[calc(96px+env(safe-area-inset-bottom))]',
          'sm:max-w-3xl'
        )}
      >
        {/* Grid: portrait = 2 cols, landscape/wider = 3 cols, big = 4 cols */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
          {listings.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
              liked={likedIds.has(item.id)}
              onToggleLike={() => toggleLike(item.id)}
            />
          ))}
        </div>
      </main>

      {/* Floating + button */}
      <button
        type="button"
        aria-label="Create listing"
        className={cn(
          'fixed right-5 z-30 grid h-14 w-14 place-items-center rounded-full',
          'bg-[#B56A1E] text-white shadow-lg',
          'active:scale-95 transition',
          // sits above BottomNav + safe area
          'bottom-[calc(84px+env(safe-area-inset-bottom))]'
        )}
      >
        <Plus className="h-6 w-6" />
      </button>

      <BottomNav />
    </div>
  );
}
