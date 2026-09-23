

// 教材 电子产品 家具 运动用品 衣物
export type Category = 'textbook' | 'electronics' | 'furniture' | 'sports' | 'clothing'
// 全新 几乎全新 良好 一般
export type Condition = 'new' | 'like-new' | 'good' | 'fair'

export interface User  {
    id: string,
    name: string,
    avatar: string,
    campus: string
}

export interface Listing {
    id: string,
    title: string,
    description: string,
    price: number,
    originalPrice?: number,
    category: Category,
    condition: Condition,
    images: string[],
    sellerId: string,
    createdAt: string,
    status: 'available' | 'sold'
}

export interface ListingDetail extends Listing{
    seller: User
}

export interface ListingQuery {
    category?: Category | 'all',
    keyword?: string,
    sellerId?: string
}

export interface CreateListingDTO {
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: Category;
    condition: Condition;
    images: string[];
    sellerId: string;
}

export interface UpdateListingDTO {
  title?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  category?: Category;
  condition?: Condition;
  images?: string[];
  status?: 'available' | 'sold';
}