// Public files (/media, /og.png, the CV PDF, videos) need the base path when the site lives under a
// sub-folder, e.g. GitHub Pages at /<repo>/. next/link adds it by itself; raw paths go through here.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => basePath + path;
