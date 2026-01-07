'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNav } from '@/components/app/BottomNav';

type ChatPreview = {
  id: string;
  name: string;
  lastMessage: string;
  time: string; // e.g. "9:41 PM"
  unreadCount?: number;
  isOnline?: boolean;
};

const DEMO_CHATS: ChatPreview[] = [
  { id: 'alex', name: 'Alex', lastMessage: 'Got it ✅', time: '9:41 PM', unreadCount: 2, isOnline: true },
  { id: 'khushi', name: 'Khushi', lastMessage: 'Pushed the fix to dev branch', time: '8:15 PM', unreadCount: 1 },
  { id: 'sahil', name: 'Sahil', lastMessage: 'Let’s optimize the render loop tomorrow', time: 'Yesterday' },
  { id: 'scott', name: 'Scott', lastMessage: 'Can you review the PR when free?', time: 'Mon' },
  { id: 'prathamesh', name: 'Prathamesh', lastMessage: 'XML import looks better now', time: 'Sun' },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? '';
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
  return (a + b).toUpperCase();
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#486d15" strokeWidth="2">
      <path d="M21 21l-4.3-4.3" />
      <circle cx="11" cy="11" r="7" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function DialoguePage() {
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchOpen) {
      // focus after the input appears
      window.setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [searchOpen]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return DEMO_CHATS;
    return DEMO_CHATS.filter(
      (c) => c.name.toLowerCase().includes(s) || c.lastMessage.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className="h-[100dvh] w-full text-black bg-[#eff3ec]">
      <div className="h-full flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-black/10 bg-[#ccd1c8]">
          <div className="mx-auto max-w-md px-4 py-3 grid grid-cols-3 items-center">
            {/* Left: Avatar */}
            <div className="items-center justify-start">
              <div className="h-11 w-11 rounded-full bg-white/40 border border-black/20 flex items-center justify-center font-semibold">
                IMG
              </div>
              <div className="min-w-0">
                <div className="text-xl font-semibold leading-tight truncate">Dialogs</div>
                </div>
            </div>

            {/* Center: Company Logo */}
            <div className="flex items-center justify-center">
              <div className="relative h-12 w-42">
                <Image
                  src="/logo-pink.png"
                  alt="Company logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right: Search toggle */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="h-10 w-10 rounded-full bg-white/40 border border-black/10 hover:bg-white/60 transition flex items-center justify-center"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label={searchOpen ? 'Close search' : 'Open search'}
              >
                <SearchIcon />
              </button>
            </div>
          </div>

          {/* Search (hidden by default, toggled by icon) */}
          {searchOpen ? (
            <div className="mx-auto max-w-md px-4 pb-3">
              <div className="flex items-center gap-2 rounded-2xl bg-[#eff3ec] border border-black/10 px-3 py-2">
                <span className="text-black/50">🔎</span>
                <input
                  ref={searchRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search chats"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-black/50"
                />
                {q ? (
                  <button
                    type="button"
                    className="text-xs px-2 py-1 rounded-lg hover:bg-black/5"
                    onClick={() => setQ('')}
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </header>

        {/* Chat list */}
        <main className="flex-1">
          <div className="mx-auto max-w-md h-full overflow-y-auto">
            {/* Leave room for FAB + bottom tabs */}
            <div className="px-2 py-2 pb-32">
              {filtered.length === 0 ? (
                <div className="text-center text-black/60 text-sm mt-10">No chats found.</div>
              ) : (
                filtered.map((c) => (
                  <Link
                    key={c.id}
                    href={`/dialogue/${c.id}`}
                    className="block border-b border-black/10 hover:bg-black/5 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 px-3 py-3">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="h-12 w-12 rounded-full bg-white/50 flex items-center justify-center font-semibold border border-black/30">
                          {initials(c.name)}
                        </div>
                        {c.isOnline ? (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#5db841] ring-2 ring-[#eff3ec]" />
                        ) : (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-black/50 ring-2 ring-[#eff3ec]" />
                        )}
                      </div>

                      {/* Name + message */}
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold truncate">{c.name}</div>
                        <div className="text-sm text-black/60 truncate">{c.lastMessage}</div>
                      </div>

                      {/* Time + unread */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        {c.unreadCount ? (
                          <div className="min-w-[22px] h-[22px] px-2 rounded-full bg-[#486d15] text-white text-xs font-semibold flex items-center justify-center">
                            {c.unreadCount}
                          </div>
                        ) : (
                          <div className="h-[22px]" />
                        )}
                        <div className="text-xs text-black/50">{c.time}</div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </main>

        {/* Floating + New button (bottom-right above tabs) */}
        <button
          type="button"
          onClick={() => alert('New chat (placeholder)')}
          className="fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 h-14 w-14 rounded-full bg-[#00a884] text-white shadow-lg hover:brightness-110 transition flex items-center justify-center"
          aria-label="New chat"
          title="New chat"
        >
          <PlusIcon />
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
