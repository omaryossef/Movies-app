import { useState } from "react";
import "./style.scss";

const Genres = ({ data }) => {
  const [genres, setGenres] = useState("");
  return (
    <div className="genres">
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
