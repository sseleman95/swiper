import { elementChildren, elementIndex, nextTick } from '../../shared/utils.js';

export default function slideToClickedSlide() {
  const swiper = this;
  const { params, wrapperEl } = swiper;

  const slidesPerView =
    params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        slideToIndex < swiper.loopedSlides - slidesPerView / 2 ||
        slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2
      ) {
        swiper.loopFix();
        slideToIndex = elementIndex(
          elementChildren(wrapperEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0],
        );

        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = elementIndex(
        elementChildren(wrapperEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0],
      );

      nextTick(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
