import * as tGuards from './lib-typeGuards';
import { IScrapperResult, IRestaurant } from './scrapper';

const RESULT_ITEM_SELECTOR = '.resultItem';

/**
 * scraps all the restaurants of the page
 *
 * @returns {IScrapperResult} restaurants infos of the page
 */
const getAllRestaurantsInfos = (): IScrapperResult =>
  [...document.querySelectorAll(RESULT_ITEM_SELECTOR)]
    .map(getOneRestaurantInfos)
    .filter((x: IRestaurant | null): x is IRestaurant => x !== null);

/**
 * scraps one particular restaurant
 *
 * @param {Element} resultItem
 * @returns {(null | IRestaurant)} informations of the restaurant or null if error
 */
const getOneRestaurantInfos = (resultItem: Element): (null | IRestaurant) => {
  /* making sure of the type with parent node */
  const parentNode = resultItem.parentNode;
  if(!tGuards.isElement(parentNode) || tGuards.isNull(parentNode)) return null;
  const parentElement = parentNode as HTMLElement;

  /* main dom objects */
  const resultItemElement = parentElement.querySelector(RESULT_ITEM_SELECTOR);
  if (tGuards.isNull(resultItemElement) || !tGuards.isHTMLListElement(resultItemElement)) return null;

  const nameElement = resultItemElement.querySelector('.resultItem-name > a');

  if (tGuards.isNull(nameElement) || !tGuards.isHTMLAnchorElement(nameElement)) return null;
  const name = (nameElement as HTMLAnchorElement).innerText;
  
  const addressElement = resultItemElement.querySelector('.resultItem-address');
  if (tGuards.isNull(addressElement) || !tGuards.isHTMLDivElement(addressElement)) return null;
  const address = (addressElement as HTMLDivElement).innerText;

  const avatarElement = resultItemElement.querySelector('.resultItem-avatar > a > img');
  if (tGuards.isNull(avatarElement) || !tGuards.isHTMLImageElement(avatarElement)) return null;
  const imageUrl = (avatarElement as HTMLImageElement).src;

  /* price */
  const averagePriceElement = resultItemElement.querySelector('.resultItem-averagePrice');
  if (tGuards.isNull(averagePriceElement) || !tGuards.isHTMLDivElement(averagePriceElement)) return null;
  const averagePrice = parseFloat((averagePriceElement as HTMLDivElement).innerText.split('moyen ')[1].split('€')[0].trim().replace(',', '.'));

  /* grades */
  const averageElement = resultItemElement.querySelector('.rating-ratingValue');
  if (tGuards.isNull(averageElement) || !tGuards.isHTMLSpanElement(averageElement)) return null;
  const averageGrade = parseFloat((averageElement as HTMLSpanElement).innerText.trim().replace(',', '.'));

  const opinionElement = resultItemElement.querySelector('.resultItem-rating > .reviewsCount > a');
  if (tGuards.isNull(opinionElement) || !tGuards.isHTMLAnchorElement(opinionElement)) return null;
  const opinionNumber = parseFloat((opinionElement as HTMLAnchorElement).innerText.split(' ')[0]);

  /* restaurant types */
  const restaurantTypes: string[] = [...resultItemElement.querySelectorAll('.restaurantTag')]
    .map(t => {
      if (tGuards.isNull(t) || !tGuards.isHTMLSpanElement(t)) return null;
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
};

export default getAllRestaurantsInfos;