'use client';

import { BottomNav } from '@/components/app/BottomNav';

export default function DialoguePlaceholderPage() {
  return (
    <>
      <div className="container mx-auto py-12 px-4 max-w-md text-center pb-24">
        <h1 className="text-2xl font-semibold mb-2">Dialogue</h1>
        <p className="text-gray-400">
          The Dialogue engine (chat) will live here. For this MVP we&apos;re focusing on Perspectives.
        </p>
      </div>
      <BottomNav />
    </>
  );
}


