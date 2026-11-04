import type { Metadata } from "next";
import { Anton, Bodoni_Moda, League_Gothic, Limelight, Permanent_Marker, Playfair_Display, Special_Elite } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

// Only the curtain's fonts (Limelight, League Gothic, Playfair) are preloaded; the rest load just after first
// paint instead of competing with the CSS for bandwidth on slow phones.
const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--f-bodoni", preload: false });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--f-anton", preload: false });
const limelight = Limelight({ subsets: ["latin"], weight: "400", variable: "--f-limelight" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--f-playfair" });
const league = League_Gothic({ subsets: ["latin"], variable: "--f-league" });
const elite = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--f-elite", preload: false });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--f-marker", preload: false });

// metadataBase (site.url) already carries any base path, so this stays a plain path.
const card = { url: "/og.png", width: 1200, height: 630, alt: "HIMANSHU, the cinema issue: a magazine cover" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: { type: "website", title: site.title, description: site.description, images: [card] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [card.url] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fonts = [bodoni, anton, limelight, playfair, league, elite, marker].map((f) => f.variable).join(" ");
  // data-intro locks scrolling until the intro finishes; the Intro component removes it.
  // The inline script runs before paint: repeat visits and deep links (#section) skip the curtain.
  return (
    <html lang="en" className={fonts} data-intro="" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `try{var h=document.documentElement;if(localStorage.getItem("seen-intro")||location.hash.length>1)h.classList.add("seen");if(localStorage.getItem("commentary")==="1")h.classList.add("commentary")}catch(e){}` }} />
        <noscript>
          <style>{`#intro{display:none}html[data-intro]{overflow:auto}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
