/// <reference types="vite/client" />

declare module '*.jsx' {
  const component: any;
  export default component;
}

declare module '../data/fragrances.js' {
  export interface FragranceNotes {
    top: string[];
    heart: string[];
    base: string[];
  }

  export interface Fragrance {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    notes: FragranceNotes;
    bgColor: string;
    accentColor: string;
    silhouette: string;
    price: string;
    size: string;
    image: string | null;
  }

  export const FRAGRANCES: Fragrance[];
  export default FRAGRANCES;
}

declare module '*.js' {
  const value: any;
  export default value;
  export const FRAGRANCES: any;
}
