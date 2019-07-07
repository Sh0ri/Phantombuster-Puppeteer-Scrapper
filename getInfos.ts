/* type guards */
const isElement = (elem: any): elem is HTMLElement => (elem instanceof HTMLElement);
const isHTMLListElement = (elem: any): elem is HTMLLIElement => (elem instanceof HTMLLIElement);
const isHTMLAnchorElement = (elem: any): elem is HTMLAnchorElement => (elem instanceof HTMLAnchorElement);
const isHTMLDivElement = (elem: any): elem is HTMLDivElement => (elem instanceof HTMLDivElement);
const isHTMLImageElement = (elem: any): elem is HTMLImageElement => (elem instanceof HTMLImageElement);
const isNull = (elem: any): elem is null => (null === elem);

const getInfos = () => {
  const RESULT_ITEM_SELECTOR = '.resultItem';

  const restaurants = [...document.querySelectorAll(RESULT_ITEM_SELECTOR)].map(resultItem => {
    const parentNode = resultItem.parentNode;
    if(!isElement(parentNode) || isNull(parentNode)) return;
    const parentElement = parentNode as HTMLElement;

    /* main dom objects */
    const resultItemElement = parentElement.querySelector(RESULT_ITEM_SELECTOR);
    if (isNull(resultItemElement) || !isHTMLListElement(resultItemElement)) return 'result item error';

    const nameElement = resultItemElement.querySelector('.resultItem-name > a');
    console.log(nameElement);
    if (isNull(nameElement) || !isHTMLAnchorElement(nameElement)) return 'name error';
    const name = (nameElement as HTMLAnchorElement).innerText;
  
    const addressElement = resultItemElement.querySelector('.resultItem-address');
    if (isNull(addressElement) || !isHTMLDivElement(addressElement)) return 'address error';
    const address = (addressElement as HTMLDivElement).innerText;

    const avatarElement = resultItemElement.querySelector('.resultItem-avatar > a > img');
    if (isNull(avatarElement) || !isHTMLImageElement(avatarElement)) return 'avatar error';
    const imageUrl = (avatarElement as HTMLImageElement).src;

    // /* price */
    // const averagePriceInfo = informations.querySelector('.resultItem-averagePrice').innerText;
    // const averagePrice = parseFloat(averagePriceInfo.split('moyen ')[1].split('€')[0].trim());

    // /* grades */
    // const average = parseFloat(rating.querySelector('.rating-ratingValue').innerText);
    // const opinionNumber = parseInt(rating.querySelector('.resultItem-rating > .reviewsCount > a').innerText.split(' ')[0]);

    // /* restaurant types */
    // const restaurantTypes = [...informations.querySelectorAll('.restaurantTag')].map(t => t.innerText);

    return {
      imageUrl,
      name,
      address,
      // averagePrice,
      // grade: {
      //   average,
      //   opinionNumber,
      // },
      // restaurantTypes,
    };
  });

  return restaurants;
};

export default getInfos;