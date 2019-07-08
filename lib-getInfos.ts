import * as guards from './lib-typeGuards';
import { IScrapperResult, IRestaurant } from './scrapper';

/**
 * scrapper of the main result page of theFork
 *
 * @returns IScrapperResult 
 */
const getInfos = (): IScrapperResult => {
  const RESULT_ITEM_SELECTOR = '.resultItem';

  const restaurants = [...document.querySelectorAll(RESULT_ITEM_SELECTOR)]
    .map((resultItem: Element): (null | IRestaurant) => {

      /* making sure of the type with parent node */
      const parentNode = resultItem.parentNode;
      if(!guards.isElement(parentNode) || guards.isNull(parentNode)) return null;
      const parentElement = parentNode as HTMLElement;

      /* main dom objects */
      const resultItemElement = parentElement.querySelector(RESULT_ITEM_SELECTOR);
      if (guards.isNull(resultItemElement) || !guards.isHTMLListElement(resultItemElement)) return null;

      const nameElement = resultItemElement.querySelector('.resultItem-name > a');

      if (guards.isNull(nameElement) || !guards.isHTMLAnchorElement(nameElement)) return null;
      const name = (nameElement as HTMLAnchorElement).innerText;
    
      const addressElement = resultItemElement.querySelector('.resultItem-address');
      if (guards.isNull(addressElement) || !guards.isHTMLDivElement(addressElement)) return null;
      const address = (addressElement as HTMLDivElement).innerText;

      const avatarElement = resultItemElement.querySelector('.resultItem-avatar > a > img');
      if (guards.isNull(avatarElement) || !guards.isHTMLImageElement(avatarElement)) return null;
      const imageUrl = (avatarElement as HTMLImageElement).src;

      /* price */
      const averagePriceElement = resultItemElement.querySelector('.resultItem-averagePrice');
      if (guards.isNull(averagePriceElement) || !guards.isHTMLDivElement(averagePriceElement)) return null;
      const averagePrice = parseFloat((averagePriceElement as HTMLDivElement).innerText.split('moyen ')[1].split('€')[0].trim().replace(',', '.'));

      /* grades */
      const averageElement = resultItemElement.querySelector('.rating-ratingValue');
      if (guards.isNull(averageElement) || !guards.isHTMLSpanElement(averageElement)) return null;
      const averageGrade = parseFloat((averageElement as HTMLSpanElement).innerText.trim().replace(',', '.'));

      const opinionElement = resultItemElement.querySelector('.resultItem-rating > .reviewsCount > a');
      if (guards.isNull(opinionElement) || !guards.isHTMLAnchorElement(opinionElement)) return null;
      const opinionNumber = parseFloat((opinionElement as HTMLAnchorElement).innerText.split(' ')[0]);

      /* restaurant types */
      const restaurantTypes: string[] = [...resultItemElement.querySelectorAll('.restaurantTag')]
        .map(t => {
          if (guards.isNull(t) || !guards.isHTMLSpanElement(t)) return null;
          return t.innerText as string;
        })
        .filter((x: string | null): x is string => x !== null); // filter out errors

      const resultingRestaurant: IRestaurant = {
        imageUrl,
        name,
        address,
        averagePrice,
        grade: {
          averageGrade,
          opinionNumber,
        },
        restaurantTypes,
      };
      return resultingRestaurant;
    })
    .filter((x: IRestaurant | null): x is IRestaurant => x !== null); // filter out errors

  return restaurants;
};

export default getInfos;