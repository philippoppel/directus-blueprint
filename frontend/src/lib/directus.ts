import { createDirectus, rest } from '@directus/sdk';

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  hero_image?: string;
  published: boolean;
  date_created: string;
  date_updated: string;
}

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  image?: string;
  alt_text?: string;
  date_created: string;
  date_updated: string;
}

interface Collections {
  pages: Page[];
  gallery: GalleryItem[];
}

const directus = createDirectus<Collections>(process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055')
  .with(rest());

export { directus };
export type { Page, GalleryItem };