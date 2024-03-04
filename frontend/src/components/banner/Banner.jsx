import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { useSelector } from "react-redux";
import Img from "../lazyLoadImage/Img.jsx";
import ContentWrapper from "../contentWrapper/ContentWrapper.jsx";
// import { useNavigate } from "react-router-dom";
import "./style.scss";

const Banner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    //  const navigate = useNavigate();
    const { data, loading } = useFetch("/movie/upcoming");
    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        if (!loading && data) {
            // const random = Math.floor(Math.random() * data.results.length);

            const random = Math.floor(Math.random() * data.results.length);
            const bg = url.backdrop + data?.results?.[random]?.backdrop_path;
            setBackground(bg);
            console.log("background", background);
            console.log("data", data);
        }
    }, [data, loading]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            //  navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of Movies, TV shows and people to discover. Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a Movie or TV show ...."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button
                        // onClick={() => navigate(`/search/${query}`)}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Banner;
