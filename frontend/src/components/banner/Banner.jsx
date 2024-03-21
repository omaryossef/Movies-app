import { useEffect, useState } from "react";
// import useFetch from "../../hooks/useFetch.jsx";
import Img from "../lazyLoadImage/Img.jsx";
// import ContentWrapper from "../contentWrapper/ContentWrapper.jsx";
// import { useNavigate } from "react-router-dom";
import "./style.scss";

const Banner = ({ data, searchQuery, setSearchQuery }) => {
  const [background, setBackground] = useState("");
  const [query] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");

  //  const navigate = useNavigate();
  //   const { data, loading } = useFetch(`${moviePage}`);
  //   const { url } = useSelector((state) => state.home);

  useEffect(() => {
    if (data) {
      // const random = Math.floor(Math.random() * data.results.length);

      const random = Math.floor(Math.random() * data.length);
      const bg = `https://image.tmdb.org/t/p/original${data?.[random]?.backdrop_path}`;
      //   console.log("url.backdrop", url.backdrop);
      setBackground(bg);
    }
  }, [data]);
  // Filter data based on search query
  const filteredData = data.filter((item) => {
    const title = item.title || item.name;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      // navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      <div className="backdrop-img">
        <Img src={background} />
      </div>

      <div className="opacity-layer"></div>
      {/* <ContentWrapper> */}
      <div className="heroBannerContent">
        <span className="title">Welcome.</span>
        <span className="subTitle">
          Millions of Movies, TV shows and people to discover. Explore now.
        </span>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search for a Movie or TV show ...."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            // onKeyUp={searchQueryHandler}
          />
          <button
          // onClick={() => navigate(`/search/${query}`)}
          >
            Search
          </button>
        </div>
      </div>
      {/* </ContentWrapper> */}
    </div>
  );
};

export default Banner;
