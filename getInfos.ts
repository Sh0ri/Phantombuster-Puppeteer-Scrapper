/* type guards */
const isElement = (elem: any): elem is HTMLElement => (elem instanceof HTMLElement);
const isHTMLListElement = (elem: any): elem is HTMLLIElement => (elem instanceof HTMLLIElement);
const isHTMLAnchorElement = (elem: any): elem is HTMLAnchorElement => (elem instanceof HTMLAnchorElement);
const isHTMLDivElement = (elem: any): elem is HTMLDivElement => (elem instanceof HTMLDivElement);
const isHTMLImageElement = (elem: any): elem is HTMLImageElement => (elem instanceof HTMLImageElement);
const isHTMLSpanElement = (elem: any): elem is HTMLSpanElement => (elem instanceof HTMLSpanElement);
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

    if (isNull(nameElement) || !isHTMLAnchorElement(nameElement)) return 'name error';
    const name = (nameElement as HTMLAnchorElement).innerText;
  
    const addressElement = resultItemElement.querySelector('.resultItem-address');
    if (isNull(addressElement) || !isHTMLDivElement(addressElement)) return 'address error';
    const address = (addressElement as HTMLDivElement).innerText;

    const avatarElement = resultItemElement.querySelector('.resultItem-avatar > a > img');
    if (isNull(avatarElement) || !isHTMLImageElement(avatarElement)) return 'avatar error';
    const imageUrl = (avatarElement as HTMLImageElement).src;

    /* price */
    const averagePriceElement = resultItemElement.querySelector('.resultItem-averagePrice');
    if (isNull(averagePriceElement) || !isHTMLDivElement(averagePriceElement)) return 'average price error';
    const averagePrice = parseFloat((averagePriceElement as HTMLDivElement).innerText.split('moyen ')[1].split('€')[0].trim().replace(',', '.'));

    /* grades */
    const averageElement = resultItemElement.querySelector('.rating-ratingValue');
    if (isNull(averageElement) || !isHTMLSpanElement(averageElement)) return 'average grade error';
    const averageGrade = parseFloat((averageElement as HTMLSpanElement).innerText.trim().replace(',', '.'));

    const opinionElement = resultItemElement.querySelector('.resultItem-rating > .reviewsCount > a');
    if (isNull(opinionElement) || !isHTMLAnchorElement(opinionElement)) return 'opinion grade error';
    const opinionNumber = parseFloat((opinionElement as HTMLAnchorElement).innerText.split(' ')[0]);
    //const opinionNumber = parseInt(rating.querySelector('.resultItem-rating > .reviewsCount > a').innerText.split(' ')[0]);

    /* restaurant types */
    const restaurantTypes = [...resultItemElement.querySelectorAll('.restaurantTag')].map(t => {
      if (isNull(t) || !isHTMLSpanElement(t)) return 'rest tag error';
      return t.innerText;
    });

    return {
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
  });

  return restaurants;
};

export default getInfos;