import React from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.scss";
const CircleRatingSample = ({ rating, useStyle1 }) => {
  const circleStyles = {
    root: {},
    path: { stroke: rating < 5 ? "red" : rating < 7 ? "orange" : "green" },
    trail: { stroke: 'transparent' }, // Versteckter Trail
    text: { fill: useStyle1 ? 'darkblue' : 'white' }, // Textfarbe basierend auf useStyle1
  };

  const containerStyle = {
    background: useStyle1 ? 'white' : 'blue', // Hintergrundfarbe basierend auf useStyle1
    // width: '60px',
    // height: '60px',
    // marginTop: '380px',
    // position: 'relative',
    // bottom: '70px',
    // left: '20px',
    // marginLeft: '10px',
    // borderRadius: '50%'
  };

  return (
    <div className="circleRating" style={containerStyle}>
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default CircleRatingSample;
