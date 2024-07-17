import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AnimeCard from '../components/AnimeCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'

export default ({ recentAnimes }) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={7}
      loop={true}
      autoplay={{
        delay: 3000,
        waitForTransition: true,
        easing: 'ease',
        speed: 2000,
      }}
    >
        {recentAnimes.map((anime, index) => (
            <SwiperSlide key={index}>
                <AnimeCard anime={anime} />
            </SwiperSlide>
        ))}
    </Swiper>
  );
};