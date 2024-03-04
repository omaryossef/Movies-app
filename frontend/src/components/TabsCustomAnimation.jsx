import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import PopularMovies from "../pages/movies/PopularMovies";
import NowPlayingMovies from "../pages/movies/NowPlayingMovies";
import TopRatedMovies from "../pages/movies/TopRatedMovies";
import UpcomingMovies from "../pages/movies/UpcomingMovies";

export function TabsCustomAnimation() {
  const [defaultValue, setDefaultValue] = useState("Popular"); // Set default value

  const data = [
    {
      label: "Popular",
      value: "Popular",
      desc: <PopularMovies />,
    },
    {
      label: "Now Playing",
      value: "Now Playing",
      desc: <NowPlayingMovies />,
    },

    {
      label: "Top Rated",
      value: "Top Rated",
      desc: <TopRatedMovies />,
    },

    {
      label: "Upcoming",
      value: "Upcoming",
      desc: <UpcomingMovies />,
    },
  ];

  // Set the default value to the value of the first tab
  useState(() => {
    setDefaultValue(data[0].value);
  }, []);

  return (
    <Tabs id="custom-animation" value={defaultValue}>
      <TabsHeader className="w-2/3 m-auto bg-transparent">
        {data.map(({ label, value }) => (
          <Tab
            style={{ color: "red", fontWeight: "bold" }}
            key={value}
            value={value}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>{" "}
      <TabsBody
        className="w-2/3 m-auto"
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
