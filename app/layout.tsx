import type { Metadata } from "next";
import type { ReactNode } from "react";
import NavBar from '@/components/NavBar';
import { orbitron, exo_2 } from '@/app/fonts';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Indie Gamer',
    template: '%s | Indie Gamer'
  },
  description: 'Only the best indie games, reviewed for you',
};

type Props = {
  children: ReactNode
}

export default function RootLayout({children}: Props) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo_2.variable}`}>
      <body className="bg-orange-50 px-4 py-2 flex flex-col min-h-screen justify-start">
        <header >
          <NavBar />
        </header>
        <main className="py-3 flex-grow">
          {children}
        </main>
        <footer className="text-center text-xs border-t py-3 text-slate-500">
          Game data and images courtesy of&nbsp;
          <a href="https://rawg.io" target="_blank" className="text-orange-800 hover:underline">RAWG</a>
          &nbsp; | Deployed to Vercel
        </footer>
      </body>
    </html>
  );  
}