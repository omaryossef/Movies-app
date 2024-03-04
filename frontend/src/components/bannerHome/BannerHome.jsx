import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUrl, setGenres } from "../../sort/homeSlice.js";
import { fetchDataFromApi } from "../../utils/api.jsx";
import Banner from "../../components/banner/Banner.jsx";

const BannerHome = () => {
    const dispatch = useDispatch();
    // state.url = {url}
    // state.genres= {genres}
    const { url } = useSelector((state) => state.home);
    const { genres } = useSelector((state) => state.home);

    console.log(url);
    console.log(genres);
    const fetchApiConfig = () => {
        fetchDataFromApi(`/configuration`)
            .then((res) => {
                console.log(res);
                const url = {
                    backdrop: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                };
                dispatch(setUrl(url));
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        apiTesting();
        fetchApiConfig();
        // genresCall();
    }, []);

    const apiTesting = () => {
        // fetchDataFromApi('/movie/popular')
        fetchDataFromApi("/configuration")
            .then((res) => {
                console.log(res);
                dispatch(setUrl(res));
                dispatch(setGenres(res));
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <div>
            <Banner />
        </div>
    );
};

export default BannerHome;
