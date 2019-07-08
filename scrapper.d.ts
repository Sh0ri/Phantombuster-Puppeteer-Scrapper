export interface IRestaurant {
  name: string;
  address : string;
  imageUrl: string;
  averagePrice: number;
  grade: {
    averageGrade : number;
    opinionNumber: number;
  }
  restaurantTypes: string[];
}

export interface IScrapperResult extends Array<IRestaurant> { }