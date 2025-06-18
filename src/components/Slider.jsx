import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import MovieCard from './MovieCard';

export default function HeroCarousel({ movies }) {
    return (
        <section className="mb-5">
            <h2 className="mb-4 ms-3">🔥 Trending Now</h2>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={2}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                // pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                    576: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    992: { slidesPerView: 5 },
                    1200: { slidesPerView: 6 },
                }}
                className="px-3 position-relative"
            >
                {movies.sort((a,b) => b.id-a.id).map(movie => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard movie={movie} />
                    </SwiperSlide>
                ))}

                {/* Red Bootstrap-style buttons */}
                <div className="swiper-button-prev btn btn-danger rounded-5 p-4 position-absolute top-50 start-0 translate-middle-y z-3"></div>
                <div className="swiper-button-next btn btn-danger rounded-5 p-4 position-absolute top-50 end-0 translate-middle-y z-3"></div>
            </Swiper>
        </section>
    );
}
