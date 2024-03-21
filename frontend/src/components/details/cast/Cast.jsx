import React from "react";
import ContentWrapper from "../../contentWrapper/ContentWrapper";
import avatar from "../../../assets/avatar.png";
import "./style.scss";

const Cast = ({ data, loading }) => {
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => (
              <div key={item.id} className="listItem">
                <div className="profileImg">
                  {item.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                      alt={item.name}
                    />
                  ) : (
                    <img src={avatar} alt={item.name} />
                  )}
                </div>
                <div className="name">{item.name}</div>
                <div className="character">{item.character}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="castSkeleton">
            {/* Used Array.from() method to create an array of length 6 for the skeleton loading instead of repeating skeleton() manually. */}
            {Array.from({ length: 6 }).map((_, index) => (
              <React.Fragment key={index}>{skeleton()}</React.Fragment>
            ))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
