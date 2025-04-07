// Import css file
import './model-viewer.css';
import Script from 'next/script';
import React from 'react';
import { KlickpunkteModel } from '@/components/klickpunkte-model';
import { Exhibitions } from '@/components/exhibitions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ausstellungen & Klickpunkte',
};

export default function Page() {
  return (
    <>
      <Script
        type="module"
        strategy="lazyOnload"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
      />
      <main className="flex flex-col min-h-screen max-h-screen">
        <Exhibitions />
        <KlickpunkteModel />
      </main>
    </>
  );
}
