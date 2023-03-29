import { Fragment, lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import MovieCard from "./components/movie/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import MovieList from "./components/movie/MovieList";
import Banner from "./components/banner/Banner";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import MoviePageV2 from "./page/MoviePageV2";
// import HomePage from "./page/HomePage";
// import MoviePage from "./page/MoviePage";
// import MovieDeatailPage from "./page/MovieDeatailPage";

const HomePage = lazy(() => import("./page/HomePage"));
const MoviePage = lazy(() => import("./page/MoviePage"));
const MovieDeatailPage = lazy(() => import("./page/MovieDeatailPage"));
function App() {
    return (
        <Fragment>
            <Suspense fallback={<></>}>
                <Routes>
                    <Route
                        element={
                            <>
                                <Main></Main>
                            </>
                        }
                    >
                        <Route
                            path="/"
                            element={
                                <>
                                    <Banner></Banner>
                                    <HomePage></HomePage>
                                </>
                            }
                        ></Route>
                        <Route
                            path="/movies"
                            element={<MoviePageV2></MoviePageV2>}
                        ></Route>
                        <Route
                            path="/movie/:movieId"
                            element={<MovieDeatailPage></MovieDeatailPage>}
                        ></Route>
                    </Route>
                </Routes>
            </Suspense>
        </Fragment>
    );
}

export default App;
