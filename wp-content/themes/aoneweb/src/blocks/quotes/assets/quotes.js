import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/pagination';

var swiper = new Swiper(".quotes_slider", {
    lazy: true,
    lazyPreloadPrevNext: 2,
    slidesPerView: 1,
    speed: 100,
    pagination: {
      el: ".swiper-pagination",
    },
    // breakpoints: {
    //     // when window width is >= 640px
    //     640: {
    //         slidesPerView: 2,
    //     },
    // },
    modules: [ Pagination ],
    simulateTouch: true
  });