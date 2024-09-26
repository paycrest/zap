// app/MainContent.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getMaxWidthClass = (): string => {
    // Add routes that should be wider here
    const widerRoutes = ['/privacy_policy', '/terms'];
    return widerRoutes.includes(pathname) ? 'max-w-xl' : 'max-w-md';
  };

  return (
    <main className={`w-full flex-grow ${getMaxWidthClass()}`}>
      {children}
    </main>
  );
}

export default MainContent;