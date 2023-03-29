import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config/config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
    const { title, vote_average, release_date, poster_path, id } = item;
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-full p-3 rounded-lg select-none movie-card bg-slate-800">
            <img
                src={tmdbAPI.image500(poster_path)}
                alt=""
                className="w-full h-[250px] object-cover rounded-lg mb-5"
            />
            <div className="flex flex-col justify-between flex-1">
                <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
                <div>
                    <div className="flex items-center justify-between mb-4 text-sm text-white opacity-50">
                        <span>{new Date(release_date).getFullYear()}</span>
                        <span>{vote_average}</span>
                    </div>
                    {/* <button
                        onClick={() => navigate(`/movie/${id}`)}
                        className="w-full px-6 py-3 capitalize rounded-lg bg-primary"
                    >
                        Watch now
                    </button> */}
                    <Button
                        onClick={() => navigate(`/movie/${id}`)}
                        full={true}
                    >
                        Watch now
                    </Button>
                </div>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
        poster_path: PropTypes.string,
        id: PropTypes.string,
    }),
};
function FallbackComponent() {
    return (
        <p className="text-red-400 bg-red-50">
            Something went wrong with this component
        </p>
    );
}

export default withErrorBoundary(MovieCard, {
    FallbackComponent,
});

export const MovieCardSkeleton = () => {
    return (
        <div className="flex flex-col h-full p-3 rounded-lg select-none movie-card bg-slate-800">
            <LoadingSkeleton
                width="100%"
                height="250px"
                radius="8px"
                className="mb-5"
            ></LoadingSkeleton>
            <div className="flex flex-col justify-between flex-1">
                <h3 className="mb-2 text-lg font-bold text-white">
                    <LoadingSkeleton
                        width="100%"
                        height="20px"
                    ></LoadingSkeleton>
                </h3>
                <div>
                    <div className="flex items-center justify-between mb-4 text-sm text-white opacity-50">
                        <span>
                            <LoadingSkeleton
                                width="50px"
                                height="10px"
                            ></LoadingSkeleton>
                        </span>
                        <span>
                            <LoadingSkeleton
                                width="30px"
                                height="10px"
                            ></LoadingSkeleton>
                        </span>
                    </div>
                    <LoadingSkeleton
                        width="100%"
                        height="45px"
                        radius="6px"
                    ></LoadingSkeleton>
                </div>
            </div>
        </div>
    );
};
