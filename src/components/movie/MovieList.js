import React, { useEffect, useState } from "react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config/config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1

const MovieList = ({ type = "now_playing" }) => {
    const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
    const isLoading = !data && !error;

    const movies = data?.results || [];

    return (
        <div className="movie-list">
            {isLoading && (
                <>
                    <Swiper
                        grabCursor={"true"}
                        spaceBetween={40}
                        slidesPerView={"auto"}
                    >
                        <SwiperSlide>
                            <MovieCardSkeleton></MovieCardSkeleton>
                        </SwiperSlide>
                        <SwiperSlide>
                            <MovieCardSkeleton></MovieCardSkeleton>
                        </SwiperSlide>
                        <SwiperSlide>
                            <MovieCardSkeleton></MovieCardSkeleton>
                        </SwiperSlide>
                        <SwiperSlide>
                            <MovieCardSkeleton></MovieCardSkeleton>
                        </SwiperSlide>
                    </Swiper>
                </>
            )}
            {!isLoading && (
                <Swiper
                    grabCursor={"true"}
                    spaceBetween={40}
                    slidesPerView={"auto"}
                >
                    {movies.length > 0 &&
                        movies.map((item) => (
                            <SwiperSlide key={item.id}>
                                <MovieCard item={item}></MovieCard>
                            </SwiperSlide>
                        ))}
                </Swiper>
            )}
        </div>
    );
};
MovieList.protoTypes = {
    type: PropTypes.string.isRequired,
};

function FallbackComponent() {
    return (
        <p className="text-red-400 bg-red-50">
            Something went wrong with this component
        </p>
    );
}

export default withErrorBoundary(MovieList, {
    FallbackComponent,
});
