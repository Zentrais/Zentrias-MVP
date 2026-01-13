'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BottomNav } from '@/components/app/BottomNav';
import {
  Camera,
  ChevronLeft,
  Filter,
  Heart,
  MapPin,
  Plus,
  Search,
  Send,
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
  sellerName?: string;
};

type ChatMessage = {
  id: string;
  text: string;
  time: string;
  isFromMe: boolean;
};

type SortBy = 'newest' | 'price_desc' | 'price_asc';

type Filters = {
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: SortBy;
  radiusMiles: number;
};

type AIChatMessage = {
  id: string;
  text: string;
  isFromAI: boolean;
  timestamp: string;
  imageResults?: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
  }[];
};

type ChatHistory = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
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

/** ✅ Location Screen */
function LocationScreen({ onBack, onLocationSelect }: { onBack: () => void; onLocationSelect: (location: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapView, setMapView] = useState<'Map' | 'Satellite'>('Map');
  const [currentLocation, setCurrentLocation] = useState('Birmingham');
  const [recentLocations] = useState(['Toronto', 'Calgary', 'Vancouver']);

  // Get current GPS location (placeholder)
  const getCurrentLocation = () => {
    // TODO: Implement GPS location detection
    setCurrentLocation('Current Location');
    alert('GPS location feature will be implemented with Google Maps integration');
  };

  // Search for location (placeholder)
  const searchLocation = () => {
    if (!searchQuery.trim()) return;
    
    // TODO: Implement location search with Google Maps Geocoding
    setCurrentLocation(searchQuery);
    alert(`Search for "${searchQuery}" will be implemented with Google Maps integration`);
  };

  // Handle search on Enter key
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  };

  // Apply selected location
  const applyLocation = () => {
    onLocationSelect(currentLocation);
    onBack();
  };

  return (
    <div className="min-h-dvh bg-[#F5EEE6] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#F5EEE6]/95 backdrop-blur border-b border-black/5">
        <div className="mx-auto w-full max-w-md px-4 py-3 sm:max-w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] font-semibold text-slate-800">Location</h1>
            <button
              type="button"
              onClick={onBack}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full active:scale-95 transition"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-md px-4 pb-[calc(80px+env(safe-area-inset-bottom))] sm:max-w-full">
        {/* Locate Me Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={getCurrentLocation}
            className="w-full rounded-lg bg-[#B56A1E] px-4 py-3 text-[14px] font-semibold text-white shadow-md active:scale-[0.99] transition"
          >
            Locate Me
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="flex items-center rounded-lg border border-slate-300 bg-white px-4 py-3">
            <input
              type="text"
              placeholder="Search city,state,country"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="w-full bg-transparent text-[14px] text-slate-800 placeholder:text-slate-500 outline-none"
            />
            <Search className="h-4 w-4 text-slate-400 ml-2" />
          </div>
        </div>

        {/* Map View Toggle */}
        <div className="mt-4 flex gap-2">
          {(['Map', 'Satellite'] as const).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setMapView(view)}
              className={cn(
                'rounded-md px-4 py-2 text-[13px] font-medium transition',
                mapView === view
                  ? 'bg-[#B56A1E] text-white'
                  : 'bg-white text-slate-700 ring-1 ring-black/10 hover:bg-slate-50'
              )}
            >
              {view}
            </button>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="mt-4 relative h-64 overflow-hidden rounded-lg bg-slate-200 border border-slate-300">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 mb-3 text-slate-400" />
              <p className="text-[14px] font-medium text-slate-600 mb-1">Google Maps Integration</p>
              <p className="text-[12px] text-slate-500">Interactive map will be added here</p>
              <div className="mt-3 px-3 py-1.5 bg-white rounded-full text-[11px] text-slate-600 inline-block">
                {mapView} View • {currentLocation}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Locations */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[14px] font-semibold text-slate-800">Recent Locations</h3>
            <button className="text-[12px] text-[#B56A1E] font-medium">See All</button>
          </div>
          
          <div className="space-y-2">
            {recentLocations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setCurrentLocation(loc);
                  setSearchQuery(loc);
                }}
                className="flex w-full items-center justify-between rounded-lg bg-white p-3 text-left ring-1 ring-black/5 hover:bg-slate-50 active:scale-[0.99] transition"
              >
                <span className="text-[14px] text-slate-800">{loc}</span>
                <ChevronLeft className="h-4 w-4 rotate-180 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#F5EEE6]/95 backdrop-blur">
        <div className="mx-auto w-full max-w-md px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 sm:max-w-3xl">
          <button
            type="button"
            onClick={applyLocation}
            className={cn(
              'w-full rounded-lg py-3 text-[14px] font-semibold',
              'bg-[#B56A1E] text-white shadow-md active:scale-[0.99] transition'
            )}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

/** ✅ Sell Item screen */
function SellItemScreen({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });
  
  const [categories, setCategories] = useState<string[]>([]);
  const [mapView, setMapView] = useState<'Map' | 'Satellite'>('Map');
  const [useGPS, setUseGPS] = useState(true);
  const [location] = useState('Calgary, AB, Canada');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addCategory = () => {
    if (formData.category.trim() && categories.length < 3 && !categories.includes(formData.category.trim())) {
      setCategories([...categories, formData.category.trim()]);
      setFormData({ ...formData, category: '' });
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Listing data:', { ...formData, categories, location, images: uploadedImages });
    onBack();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setUploadedImages((prev) => [...prev, result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-dvh bg-[#F5EEE6] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#F5EEE6]/95 backdrop-blur border-b border-black/5">
        <div className="mx-auto w-full max-w-md px-4 py-3 sm:max-w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] font-semibold text-slate-800">Sell Item</h1>
            <button
              type="button"
              onClick={onBack}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full active:scale-95 transition"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-md px-4 pb-[calc(80px+env(safe-area-inset-bottom))] sm:max-w-full">
        {/* Item Details */}
        <div className="mt-6">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-4">Item Details</h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Product Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-500 focus:border-[#B56A1E] focus:outline-none"
            />
            
            <div className="space-y-1">
              <textarea
                placeholder="Describe Your product"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-500 focus:border-[#B56A1E] focus:outline-none"
              />
              <p className="text-[12px] text-slate-500">Max 100 Words</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-slate-700">Price</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="1200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-20 rounded-lg border border-slate-300 bg-white px-3 py-2 text-[14px] text-slate-800 placeholder:text-slate-500 focus:border-[#B56A1E] focus:outline-none"
                />
                <span className="text-[14px] text-slate-700">$</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mt-8">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-4">Category</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="eg. Furniture"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-800 placeholder:text-slate-500 focus:border-[#B56A1E] focus:outline-none"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2 rounded-md bg-white px-3 py-1 ring-1 ring-black/10">
                  <span className="text-[13px] text-slate-700">{category}</span>
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <p className="text-[12px] text-slate-500">Max 3 categories</p>
          </div>
        </div>

        {/* Location */}
        <div className="mt-8">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-4">Location</h2>
          
          <div className="space-y-4">
            
            <div className="relative h-40 overflow-hidden rounded-lg bg-slate-200">
              <div className="flex h-full items-center justify-center text-slate-500">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 mb-2" />
                  <p className="text-[13px]">Map View ({mapView})</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-slate-700">Current Location (GPS)</p>
                <p className="text-[13px] text-slate-500">{location}</p>
              </div>
              <button
                type="button"
                onClick={() => setUseGPS(!useGPS)}
                className={cn(
                  'relative h-6 w-11 rounded-full transition',
                  useGPS ? 'bg-[#B56A1E]' : 'bg-slate-300'
                )}
              >
                <div
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
                    useGPS ? 'translate-x-5' : 'translate-x-0.5'
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Attach Product Images */}
        <div className="mt-8">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-4">Attach Product Images</h2>
          
          <div className="space-y-4">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {/* Upload button */}
            <button
              type="button"
              onClick={triggerImageUpload}
              className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 transition"
            >
              <div className="text-center">
                <Plus className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                <p className="text-[13px] text-slate-500">Add Photos</p>
              </div>
            </button>
            
            {/* Display uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-white ring-1 ring-black/10">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 active:scale-95 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-[12px] text-slate-500">
              Image Only • {uploadedImages.length > 0 && `${uploadedImages.length} photo${uploadedImages.length === 1 ? '' : 's'} uploaded`}
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#F5EEE6]/95 backdrop-blur">
        <div className="mx-auto w-full max-w-md px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 sm:max-w-3xl">
          <button
            type="button"
            onClick={handleSubmit}
            className={cn(
              'w-full rounded-xl py-3 text-[14px] font-semibold',
              'bg-[#B56A1E] text-white shadow-md active:scale-[0.99] transition'
            )}
          >
            List Item
          </button>
        </div>
      </div>
    </div>
  );
}

/** ✅ Messaging screen */
function MessagingScreen({
  item,
  onBack,
}: {
  item: Listing;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hi Sarah',
      time: '7:03am',
      isFromMe: true,
    },
    {
      id: '2',
      text: 'Is this product still available',
      time: '7:10pm',
      isFromMe: true,
    },
    {
      id: '3',
      text: 'Hi',
      time: '8:05am',
      isFromMe: false,
    },
    {
      id: '4',
      text: 'Yes it is',
      time: '8:06am',
      isFromMe: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      isFromMe: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-dvh bg-[#F5EEE6] text-slate-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#F5EEE6]/95 backdrop-blur border-b border-black/5">
        <div className="mx-auto w-full max-w-md px-4 py-3 sm:max-w-full">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back"
              className="grid h-9 w-9 place-items-center rounded-full active:scale-95 transition"
            >
              <ChevronLeft className="h-5 w-5 text-[#B56A1E]" />
            </button>
            <h1 className="text-[18px] font-semibold text-slate-800">
              {item.sellerName || 'Sarah K.'}
            </h1>
          </div>
        </div>
      </header>

      {/* Product Info */}
      <div className="mx-auto w-full max-w-md px-4 py-3 sm:max-w-full">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-slate-800">
              {item.title}
            </p>
            <p className="text-[16px] font-bold text-[#B56A1E]">
              {formatPrice(item.price)}
            </p>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="mx-auto w-full max-w-md px-4 pb-2 sm:max-w-full">
        <div className="rounded-lg bg-amber-50 p-3 ring-1 ring-amber-200">
          <p className="text-[12px] text-amber-800">
            ⏱️ Pls do not pay for product unless delivered
          </p>
          <button className="mt-1 text-[12px] font-medium text-amber-700 underline">
            Check our privacy guidelines
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="mx-auto w-full max-w-md flex-1 overflow-hidden px-4 sm:max-w-full">
        <div className="flex h-full flex-col">
          <div className="flex-1 space-y-3 overflow-y-auto py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.isFromMe ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-2',
                    message.isFromMe
                      ? 'bg-[#B56A1E] text-white'
                      : 'bg-white ring-1 ring-black/10'
                  )}
                >
                  <p className="text-[14px]">{message.text}</p>
                  <p
                    className={cn(
                      'mt-1 text-[11px]',
                      message.isFromMe ? 'text-white/70' : 'text-slate-500'
                    )}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-[#F5EEE6]/95 backdrop-blur border-t border-black/5">
        <div className="mx-auto w-full max-w-md px-4 py-3 sm:max-w-full">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center rounded-full bg-white px-4 py-2 ring-1 ring-black/10">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full bg-transparent text-[14px] text-slate-800 placeholder:text-slate-500 outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className={cn(
                'grid h-10 w-10 place-items-center rounded-full transition',
                newMessage.trim()
                  ? 'bg-[#B56A1E] text-white active:scale-95'
                  : 'bg-slate-200 text-slate-400'
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ✅ Product detail screen (matches your screenshot) */
function ProductDetailScreen({
  item,
  onBack,
  onMessageSeller,
}: {
  item: Listing;
  onBack: () => void;
  onMessageSeller: () => void;
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
            onClick={onMessageSeller}
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

// AI Chat Screen Component - moved outside to prevent re-creation on every render
function AIChatScreen({ 
  aiMessages, 
  aiInputText, 
  setAiInputText, 
  sendAIMessage, 
  setChatHistoryOpen, 
  setAiChatOpen 
}: {
  aiMessages: AIChatMessage[];
  aiInputText: string;
  setAiInputText: (text: string) => void;
  sendAIMessage: () => void;
  setChatHistoryOpen: (open: boolean) => void;
  setAiChatOpen: (open: boolean) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#F5EEE6] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-[#F5EEE6]/95 backdrop-blur border-b border-black/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setChatHistoryOpen(true)}
            className="p-2 rounded-full hover:bg-black/5"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-[#B56A1E] rounded"></div>
              <div className="w-full h-0.5 bg-[#B56A1E] rounded"></div>
              <div className="w-full h-0.5 bg-[#B56A1E] rounded"></div>
            </div>
          </button>
          
          <div className="items-center space-x-2">
            <div className="flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-[#B56A1E]" />
            </div>
            <span className="text-sm text-slate-600">Zentrais AI V.1</span>
          </div>
          
          <button
            type="button"
            onClick={() => setAiChatOpen(false)}
            className="p-2"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {aiMessages.length === 0 ? (
          // Initial state
          <div className="flex-1 flex flex-col justify-center items-center px-4">
            <h1 className="text-2xl font-semibold text-slate-800 mb-8">Hey John</h1>
          </div>
        ) : (
          // Chat messages
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {aiMessages.map((message) => (
              <div key={message.id} className={`flex ${message.isFromAI ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isFromAI 
                    ? 'bg-white text-slate-800 border border-slate-200' 
                    : 'bg-[#B56A1E] text-white'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  {message.imageResults && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {message.imageResults.slice(0, 4).map((item) => (
                        <div key={item.id} className="bg-slate-50 rounded-lg p-2">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="w-full h-20 object-cover rounded-md mb-2"
                          />
                          <p className="text-xs font-medium text-slate-800">{item.title}</p>
                          <p className="text-xs text-[#B56A1E] font-semibold">${item.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {message.imageResults && message.imageResults.length > 4 && (
                    <div className="mt-2">
                      <div className="bg-slate-50 rounded-lg p-2">
                        <img 
                          src={message.imageResults[4].imageUrl} 
                          alt={message.imageResults[4].title}
                          className="w-full h-20 object-cover rounded-md mb-2"
                        />
                        <p className="text-xs font-medium text-slate-800">{message.imageResults[4].title}</p>
                        <p className="text-xs text-[#B56A1E] font-semibold">${message.imageResults[4].price}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-black/5 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendAIMessage();
                  }
                }}
                placeholder={aiMessages.length === 0 ? "What are you getting today" : "Type Something"}
                className="w-full bg-white border border-slate-300 rounded-full px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#B56A1E] focus:border-transparent"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
            <button
              type="button"
              onClick={sendAIMessage}
              disabled={!aiInputText.trim()}
              className="bg-[#B56A1E] hover:bg-[#b5957b] disabled:bg-[#b5957b] text-white rounded-full p-3 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Chat History Sidebar Component - moved outside to prevent re-creation
function ChatHistorySidebar({ 
  chatHistories, 
  setChatHistoryOpen 
}: {
  chatHistories: ChatHistory[];
  setChatHistoryOpen: (open: boolean) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-[#B56A1E] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-white" />
              <input 
                type="text" 
                placeholder="Search"
                className="bg-transparent text-white placeholder-white/70 text-sm focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setChatHistoryOpen(false)}
              className="text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-white/10">
          <button className="flex items-center space-x-2 text-white text-sm">
            <div className="w-4 h-4 border border-white rounded-sm flex items-center justify-center">
              <Plus className="h-3 w-3" />
            </div>
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          {/* Today */}
          <div className="p-4">
            <h3 className="text-white/70 text-xs font-medium mb-3">Today</h3>
            {chatHistories
              .filter(chat => chat.timestamp === 'today')
              .map((chat) => (
                <div key={chat.id} className="flex items-center justify-between py-2 px-2 rounded hover:bg-white/10 cursor-pointer group">
                  <span className="text-white text-sm truncate flex-1">{chat.title}</span>
                  <button className="opacity-0 group-hover:opacity-100 text-white/70">
                    <div className="w-4 h-4 flex justify-center items-center">•••</div>
                  </button>
                </div>
              ))}
          </div>

          {/* Yesterday */}
          <div className="p-4">
            <h3 className="text-white/70 text-xs font-medium mb-3">Yesterday</h3>
            {chatHistories
              .filter(chat => chat.timestamp === 'yesterday')
              .map((chat) => (
                <div key={chat.id} className="flex items-center justify-between py-2 px-2 rounded hover:bg-white/10 cursor-pointer group">
                  <span className="text-white text-sm truncate flex-1">{chat.title}</span>
                  <button className="opacity-0 group-hover:opacity-100 text-white/70">
                    <div className="w-4 h-4 flex justify-center items-center">•••</div>
                  </button>
                </div>
              ))}
          </div>

          {/* Last Week */}
          <div className="p-4">
            <h3 className="text-white/70 text-xs font-medium mb-3">Last Week</h3>
            {chatHistories
              .filter(chat => chat.timestamp === 'lastweek')
              .map((chat) => (
                <div key={chat.id} className="flex items-center justify-between py-2 px-2 rounded hover:bg-white/10 cursor-pointer group">
                  <span className="text-white text-sm truncate flex-1">{chat.title}</span>
                  <button className="opacity-0 group-hover:opacity-100 text-white/70">
                    <div className="w-4 h-4 flex justify-center items-center">•••</div>
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Clear History */}
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center space-x-2 text-white text-sm">
            <div className="w-4 h-4 border border-white rounded-full"></div>
            <span>Clear History</span>
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="p-4">
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=300&q=60"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div 
        className="flex-1 bg-black/20"
        onClick={() => setChatHistoryOpen(false)}
      />
    </div>
  );
}

export default function ExchangePage() {
  // AI Chat state
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatHistoryOpen, setChatHistoryOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<AIChatMessage[]>([]);
  const [aiInputText, setAiInputText] = useState('');
  const [chatHistories] = useState<ChatHistory[]>([
    { id: '1', title: 'Chat Title', lastMessage: 'Looking for antique tables...', timestamp: 'today' },
    { id: '2', title: 'Chat Title', lastMessage: 'Camera equipment search', timestamp: 'today' },
    { id: '3', title: 'Chat Title', lastMessage: 'Furniture recommendations', timestamp: 'today' },
    { id: '4', title: 'Chat Title', lastMessage: 'Electronics deals', timestamp: 'yesterday' },
    { id: '5', title: 'Chat Title', lastMessage: 'Vintage items query', timestamp: 'yesterday' },
    { id: '6', title: 'Chat Title', lastMessage: 'Pricing advice needed', timestamp: 'yesterday' },
    { id: '7', title: 'Chat Title', lastMessage: 'Local marketplace tips', timestamp: 'lastweek' },
    { id: '8', title: 'Chat Title', lastMessage: 'Negotiation strategies', timestamp: 'lastweek' },
    { id: '9', title: 'Chat Title', lastMessage: 'Best selling practices', timestamp: 'lastweek' },
  ]);

  // All existing state hooks
  const [mode, setMode] = useState<'grid' | 'search' | 'messaging' | 'sell' | 'detail' | 'location'>('grid');
  const [searchText, setSearchText] = useState('');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [selected, setSelected] = useState<Listing | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [draft, setDraft] = useState<{
    minPriceText: string;
    maxPriceText: string;
    sortBy: SortBy;
    radiusMiles: number;
  }>({
    minPriceText: '',
    maxPriceText: '',
    sortBy: 'newest',
    radiusMiles: 10,
  });
  const [appliedFilters, setAppliedFilters] = useState<Filters>(DEFAULT_FILTERS);

  // Sell form state
  const [sellForm, setSellForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: 'Birmingham',
    images: [] as string[]
  });

  // Handle sending AI message
  const sendAIMessage = () => {
    if (!aiInputText.trim()) return;
    
    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      text: aiInputText,
      isFromAI: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setAiMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response based on message content
    setTimeout(() => {
      let aiResponse: AIChatMessage;
      
      if (aiMessages.length === 0) {
        // First message - ask about budget
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "I can see you are in Calgary Alberta, do you want me to limit my search there and also can I know your budget?",
          isFromAI: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (aiInputText.toLowerCase().includes('$500') || aiInputText.includes('500')) {
        // Budget provided - show search results
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "I Found 5 Antique tables in Canada. Check them out",
          isFromAI: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          imageResults: [
            {
              id: '1',
              title: 'Victorian Dining Table',
              price: 450,
              imageUrl: 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=300&q=80'
            },
            {
              id: '2', 
              title: 'Antique Oak Table',
              price: 380,
              imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=300&q=80'
            },
            {
              id: '3',
              title: 'Vintage Round Table',
              price: 520,
              imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80'
            },
            {
              id: '4',
              title: 'Mahogany Side Table',
              price: 280,
              imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80'
            },
            {
              id: '5',
              title: 'Classic Wood Table',
              price: 495,
              imageUrl: 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=300&q=80'
            }
          ]
        };
      } else {
        // Default response
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: "I'd be happy to help you find what you're looking for! Can you tell me more about your budget and specific preferences?",
          isFromAI: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      
      setAiMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setAiInputText('');
  };

  const listings = useMemo<Listing[]>(
    () => [
      {
        id: '1',
        title: 'MacBook Pro 14" M2 2023',
        subtitle: 'Laptop',
        price: 1899,
        timeAgo: '2h ago',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
        ],
        categories: ['Electronics', 'Computer'],
        sellerName: 'Emma T.',
        description: 'Excellent condition MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Perfect for work or creative projects. Includes original charger and box.',
      },
      {
        id: '2',
        title: 'Vintage Danish Teak Dining Table',
        subtitle: 'Furniture',
        price: 850,
        timeAgo: '1d ago',
        imageUrl: 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1200&q=80',
        images: [
          'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        ],
        categories: ['Furniture', 'Vintage'],
        sellerName: 'Marcus K.',
        description: 'Beautiful mid-century modern dining table from the 1960s. Solid teak construction, seats 6 people comfortably. Minor wear consistent with age.',
      },
      {
        id: '3',
        title: 'Canon EOS R5 Camera + 24-70mm Lens',
        subtitle: 'Camera',
        price: 2850,
        timeAgo: '4h ago',
        imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1200&q=80',
        images: [
          'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
        ],
        categories: ['Electronics', 'Photography'],
        sellerName: 'Alex P.',
        description: 'Professional mirrorless camera with RF 24-70mm f/2.8 lens. Low shutter count, pristine condition. Perfect for photography enthusiasts.',
      },
      {
        id: '4',
        title: 'Nike Air Jordan 1 Retro High',
        subtitle: 'Sneakers',
        price: 180,
        timeAgo: '30min ago',
        imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80',
        categories: ['Shoes', 'Fashion'],
        sellerName: 'Jordan M.',
        description: 'Classic Chicago colorway, size 10.5. Worn a few times, excellent condition. Comes with original box and laces.',
      },
      {
        id: '5',
        title: 'Fender Stratocaster Electric Guitar',
        subtitle: 'Musical Instrument',
        price: 650,
        timeAgo: '6h ago',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
        categories: ['Music', 'Instrument'],
        sellerName: 'Riley S.',
        description: 'Mexican-made Fender Strat in sunburst finish. Great tone, plays beautifully. Perfect for beginners or experienced players.',
      },
      {
        id: '6',
        title: 'Dyson V15 Detect Cordless Vacuum',
        subtitle: 'Home Appliance',
        price: 420,
        timeAgo: '3h ago',
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
        categories: ['Home', 'Appliance'],
        sellerName: 'Lisa H.',
        description: 'Barely used Dyson V15 with laser dust detection. Includes all attachments and charging dock. Moving sale!',
      },
      {
        id: '7',
        title: 'Specialized Road Bike - Carbon Frame',
        subtitle: 'Bicycle',
        price: 1200,
        timeAgo: '1d ago',
        imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=1200&q=80',
        categories: ['Sports', 'Cycling'],
        sellerName: 'David R.',
        description: 'Specialized Allez Sprint with carbon frame, Shimano 105 groupset. Well maintained, ready to ride. Size 54cm.',
      },
      {
        id: '8',
        title: 'Designer Leather Sofa Set',
        subtitle: 'Furniture',
        price: 1100,
        timeAgo: '2d ago',
        imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=80',
        categories: ['Furniture', 'Living Room'],
        sellerName: 'Sophie L.',
        description: '3-piece genuine leather sofa set in cognac brown. Modern design, very comfortable. Selling due to downsizing.',
      },
    ],
    []
  );

  const openDetail = (id: string) => {
    setSelected(listings.find((l) => l.id === id) ?? null);
    setMode('detail');
  };

  const openMessaging = () => {
    setMode('messaging');
  };

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('Alberta');

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // focus search input when entering search mode
  useEffect(() => {
    if (mode === 'search') requestAnimationFrame(() => inputRef.current?.focus());
    if (mode !== 'search') setFilterOpen(false);
  }, [mode]);

  useEffect(() => {
    if (!filterOpen) return;
    setDraft({
      minPriceText: appliedFilters.minPrice == null ? '' : String(appliedFilters.minPrice),
      maxPriceText: appliedFilters.maxPrice == null ? '' : String(appliedFilters.maxPrice),
      sortBy: appliedFilters.sortBy,
      radiusMiles: appliedFilters.radiusMiles,
    });
  }, [filterOpen, appliedFilters]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = listings.slice();

    if (q) arr = arr.filter((l) => l.title.toLowerCase().includes(q) || l.subtitle.toLowerCase().includes(q));
    if (appliedFilters.minPrice != null) arr = arr.filter((l) => l.price >= appliedFilters.minPrice!);
    if (appliedFilters.maxPrice != null) arr = arr.filter((l) => l.price <= appliedFilters.maxPrice!);

    if (appliedFilters.sortBy === 'price_desc') arr.sort((a, b) => b.price - a.price);
    else if (appliedFilters.sortBy === 'price_asc') arr.sort((a, b) => a.price - b.price);
    else arr.sort((a, b) => parseTimeAgoToMinutes(a.timeAgo) - parseTimeAgoToMinutes(b.timeAgo));

    return arr;
  }, [listings, query, appliedFilters]);

  const applyDraftFilters = () => {
    const minP = draft.minPriceText ? Number(draft.minPriceText) : null;
    const maxP = draft.maxPriceText ? Number(draft.maxPriceText) : null;

    setAppliedFilters({
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
    setAppliedFilters(DEFAULT_FILTERS);
    setFilterOpen(false);
  };

  // ✅ Location screen
  if (mode === 'location') {
    return (
      <LocationScreen
        onBack={() => setMode('grid')}
        onLocationSelect={(location) => setSelectedLocation(location)}
      />
    );
  }

  // ✅ Sell Item screen
  if (mode === 'sell') {
    return (
      <SellItemScreen
        onBack={() => setMode('grid')}
      />
    );
  }

  // ✅ Messaging screen
  if (mode === 'messaging' && selected) {
    return (
      <MessagingScreen
        item={selected}
        onBack={() => setMode('detail')}
      />
    );
  }

  // ✅ Detail screen (based on selected product)
  if (mode === 'detail' && selected) {
    return (
      <ProductDetailScreen
        item={selected}
        onBack={() => {
          // go back to where you came from (keep it simple: back to search if you were in search, else grid)
          setMode('grid'); // change to 'grid' if you want always back to grid
        }}
        onMessageSeller={openMessaging}
      />
    );
  }

  // Check if AI chat should be shown - after all hooks are called
  if (aiChatOpen) {
    return (
      <>
        <AIChatScreen 
          aiMessages={aiMessages}
          aiInputText={aiInputText}
          setAiInputText={setAiInputText}
          sendAIMessage={sendAIMessage}
          setChatHistoryOpen={setChatHistoryOpen}
          setAiChatOpen={setAiChatOpen}
        />
        {chatHistoryOpen && <ChatHistorySidebar 
          chatHistories={chatHistories}
          setChatHistoryOpen={setChatHistoryOpen}
        />}
      </>
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
                <button 
                  type="button" 
                  aria-label="AI Chat" 
                  onClick={() => setAiChatOpen(true)}
                  className="grid h-10 w-10 place-items-center rounded-full active:scale-95 transition"
                >
                  <Sparkles className="h-5 w-5 text-[#B56A1E]" />
                </button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md px-4 pb-3 pt-2 sm:max-w-full">
              <h1 className="text-[28px] font-semibold leading-tight">Exchange</h1>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-[13px] font-semibold text-slate-600">Todays Picks</p>

                <div className="flex items-center gap-1 text-[12px] text-slate-600">
                  <button
                    type="button"
                    onClick={() => setMode('location')}
                    className="flex items-center gap-1 hover:text-[#B56A1E] active:scale-95 transition"
                  >
                    <MapPin className="h-4 w-4 text-[#B56A1E]" />
                    <span>{selectedLocation}</span>
                  </button>
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
          onClick={() => setMode('sell')}
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
