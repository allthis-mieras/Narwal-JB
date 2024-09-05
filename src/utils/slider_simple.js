import Swiper from 'swiper';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';


document.addEventListener( 'DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination, EffectFade, Autoplay],
        
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
   delay: 5000,
 },
 speed: 500,
      });
});
