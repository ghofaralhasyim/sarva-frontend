export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface ApiRoom {
    available_rooms: number;
    capacity: number;
    id: number;
    price_per_night: number;
    price_with_breakfast: number;
    total_stock: number;
}

export interface Villa {
  id: number;
  title: string;
  subTitle: string;
  space: number;
  capacity: number;
  bedType: string;
  pool: string;
  description: string;
  features: string[];
  url: string;
  image: string;
  slug: string;
  amenities: string[];
  images: string[];
  price: number;
  priceWithBreakfast: number;
  availableRooms: number;
}