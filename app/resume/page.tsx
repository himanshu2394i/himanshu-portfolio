import type { Metadata } from "next";
import CV from "../cv/page";

// "/resume" is the most common guess for a CV. Same page; search engines are told /cv is the original.
export const metadata: Metadata = {
  title: "Himanshu, CV",
  description: "One-page CV: Growthvine Capital, DTU, AI systems and data infrastructure.",
  openGraph: { title: "Himanshu, CV", description: "One-page CV: Growthvine Capital, DTU, AI systems and data infrastructure.", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  alternates: { canonical: "/cv" },
};

export default CV;
