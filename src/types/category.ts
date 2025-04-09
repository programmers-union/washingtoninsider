export interface Card {
  image: string;   
  category: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt: string;
  content1: string;
  detailSubtitle: string;
  detailGraphImage: string;
  content2: string;
            
}

export interface CategoryData {
  id: number;
  categorySlug: string;
  mainTitle: string;
  postCount: number;
  cards: Card[];
}

export type Categories = Record<string, CategoryData>;
