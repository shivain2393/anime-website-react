import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'

export default ({ popularAnimes }) => {
  return (
    <Swiper
      // install Swiper modules
      className='carousel'
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        waitForTransition: true,
        easing: 'ease',
        speed: 3000,
      }}
    >
        {popularAnimes.map((anime, index) => (
            <SwiperSlide key={index}>
                <Link to={`/animes/${anime._id}`} state={{ anime }}>
                    <img src={anime.backgroundImage} alt="anime-image" className="carousel-img" />
                    <div className="carousel-img-overlay"></div>
                    <div className="carousel-img-title">
                      <h1>{anime.title}</h1>
                    </div>
                </Link>
            </SwiperSlide>
        ))}
    </Swiper>
  );
};