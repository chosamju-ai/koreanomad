export type TransportQuality = "excellent" | "good" | "average" | "poor";

export interface CityData {
  rank: number;
  name: string;
  nameEn: string;
  slug: string;
  image: string;
  internetSpeed: number;
  temperature: number;
  monthlyCost: number;
  rating: number;
  reviewCount: number;
  cafeCount: number;
  coworkingCount: number;
  transport: TransportQuality;
  description?: string;
  tags?: string[];
}

export interface Review {
  id: string;
  citySlug: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  createdAt: Date;
}
