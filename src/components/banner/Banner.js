import useSWR from "swr";
import { fetcher } from "../../config/config";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=2d057043a5e8ae2214e448a3e7335e7a`,
        fetcher
    );
    const movies = data?.results || [];
    return (
        <section className="banner h-[500px] mb-10 page-container overflow-hidden">
            <Swiper
                grabCursor={"true"}
                slidesPerView={"auto"}
                className="h-full"
            >
                {movies.length > 0 &&
                    movies.map((item) => (
                        <SwiperSlide key={item.id}>
                            <BannerItems item={item}></BannerItems>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
};

function BannerItems({ item }) {
    const navigate = useNavigate();
    const { title, vote_average, release_date, poster_path } = item;

    return (
        <div className="relative w-full h-full bg-white rounded-lg ">
            <div className="absolute inset-0 overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt=""
                className="object-top w-full rounded-lg"
            />
            <div className="absolute w-full text-white bottom-5 left-5">
                <h2 className="mb-5 text-3xl font-bold">{title}</h2>
                <div className="flex items-center mb-8 gap-x-3">
                    <span className="px-4 py-2 border border-white rounded-md">
                        Action
                    </span>
                    <span className="px-4 py-2 border border-white rounded-md">
                        Adventure
                    </span>
                    <span className="px-4 py-2 border border-white rounded-md">
                        Drama
                    </span>
                </div>
                <Button
                    className="w-auto"
                    onClick={() => navigate(`movie/${item.id}`)}
                >
                    Watch now
                </Button>
                {/* <button className="px-6 py-3 font-medium text-white rounded-lg bg-primary">
                    Watch now
                </button> */}
            </div>
        </div>
    );
}

export default Banner;
