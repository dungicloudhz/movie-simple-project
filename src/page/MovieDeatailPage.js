import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { apiKey, fetcher, tmdbAPI } from "../config/config";

const MovieDeatailPage = () => {
    const { movieId } = useParams();
    const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
    // console.log(data);
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data;

    return (
        <div className="py-10">
            {data && (
                <div className="w-full h-[600px] relative">
                    <div className="absolute inset-0 bg-black bg-opacity-75"></div>
                    <div
                        className="w-full h-full bg-no-repeat bg-cover"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
                        }}
                    ></div>
                </div>
            )}
            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] z-10 relative pb-10">
                <img
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    className="object-cover w-full h-full rounded-xl"
                    alt=""
                />
            </div>
            <h1 className="mb-10 text-4xl font-bold text-center text-white">
                {title}
            </h1>
            {genres.length > 0 && (
                <div className="flex items-center justify-center mb-10 gap-x-5">
                    {genres.map((item) => (
                        <span
                            className="px-4 py-2 border rounded border-primary text-primary"
                            key={item.id}
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            )}
            <p className="text-center max-w-[600px] mx-auto leading-relaxed mb-10">
                {overview}
            </p>
            <MovieCredits></MovieCredits>
            <MovieVideos></MovieVideos>
            <MovieSimilar></MovieSimilar>
        </div>
    );
};

function MovieCredits() {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        tmdbAPI.getMovieMeta(movieId, "credits"),
        fetcher
    );
    if (!data) return null;
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
        <div className="py-10">
            <h2 className="mb-10 text-2xl text-center">Casts</h2>
            <div className="grid grid-cols-4 gap-5">
                {cast.slice(0, 4).map((item) => (
                    <div className="cast-item" key={item.id}>
                        <img
                            src={tmdbAPI.imageOriginal(item.profile_path)}
                            className="w-full h-[350px] object-cover rounded-lg"
                            alt=""
                        />
                        <h3 className="text-xl font-medium ">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

// function MovieMeta(type = 'videos') {
//     const { movieId } = useParams();
//     const { data, error } = useSWR(
//         tmdbAPI.getMovieMeta(movieId, "videos"),
//         fetcher
//     );
//     if (!data) return null;
//     const { results } = data;
//     if (!results || results.length <= 0) return null;
//     if(type === 'credits') return
// }

function MovieVideos() {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        tmdbAPI.getMovieMeta(movieId, "videos"),
        fetcher
    );
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10 ">
            <div className="flex flex-col gap-10">
                {results.slice(0, 2).map((item) => (
                    <div className="" key={item.id}>
                        <h3 className="inline-block p-3 mb-5 text-xl font-medium text-white bg-secondary">
                            {item.name}
                        </h3>
                        <div
                            key={item.id}
                            className="flex justify-center w-full aspect-video"
                        >
                            <iframe
                                className="object-fill w-full h-full"
                                width="1026"
                                height="577"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title="YÊU MỘT NGƯỜI SAO BUỒN ĐẾN THẾ (Lofi Ver.) | Noo Phước Thịnh"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MovieSimilar() {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        tmdbAPI.getMovieMeta(movieId, "similar"),
        fetcher
    );
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;

    return (
        <div className="py-10">
            <h2 className="mb-10 text-3xl font-medium">Similar movies</h2>
            <div className="movie-list">
                <Swiper
                    grabCursor={"true"}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                >
                    {results.length > 0 &&
                        results.map((item) => (
                            <SwiperSlide key={item.id}>
                                <MovieCard item={item}></MovieCard>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}

{
    /* <iframe
    width="1026"
    height="577"
    src="https://www.youtube.com/embed/BPL67g-aXbY"
    title="YÊU MỘT NGƯỜI SAO BUỒN ĐẾN THẾ (Lofi Ver.) | Noo Phước Thịnh"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
></iframe>; */
}

export default MovieDeatailPage;
