export interface Job {
  title: string;
  org: string;
  location: string;
  deadline: string;
}

export interface Card {
  image: string;   
  category: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt: string;
  content1: string;
  content2: string;
  detailSubtitle: string;
  detailGraphImage: string;
  chapters?: string[];      
  more?: string;
  chapterLabel?: string;
  variant?: string;         
  type?: string;           
  cta?: string;                       
  jobs?: Job[];            
}

export interface CategoryData {
  id: number;
  categorySlug: string;
  mainTitle: string;
  searchPlaceholder: string;
  postCount: number;
  cards: Card[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export type Categories = Record<string, CategoryData>;
