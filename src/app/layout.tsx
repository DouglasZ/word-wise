import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "sonner";
import {readFileSync} from "fs";
import { join } from 'path';

const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Word Wise",
  description: "A simple word management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="word-wise-app-theme"
      >
          <div className="flex flex-col min-h-dvh">
              <div className="flex-1 container mx-auto p-2">
                {children}
              </div>
            <Toaster
                closeButton
                richColors
                position="bottom-center"
                className="custom-taster"
                expand={false}
                toastOptions={{
                    duration: 5000,
                }}
           />
              <footer className="h-[50px] border flex items-center justify-center text-sm text-gray-400 p-2 shadow-inner">
                  <div className="flex-1 flex justify-center">&copy; {currentYear}</div>
                  <span className="text-xs">v{packageJson.version}</span>
              </footer>
        </div>
      </ThemeProvider>
      </body>
    </html>
  );
}
