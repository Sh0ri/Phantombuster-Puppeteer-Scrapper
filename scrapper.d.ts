interface IRestaurant {
  name: string;
  address : string;
  imageUrl: string;
  averagePrice: number;
  grade: {
    average : number;
    opinionNumber: number;
  }
  restaurantType: string;
}

interface IScrapperResult extends Array<IRestaurant> { }