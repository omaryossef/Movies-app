import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import FavoritePage from "../pages/FavoritePage";
import WatchListPage from "../pages/WatchListPage";
function ProfileTabsAnimation() {
  const [defaultValue, setDefaultValue] = useState("Favorite"); // Set default value
  const data = [
    {
      label: "Favorite",
      value: "Favorite",
      desc: <FavoritePage />,
    },
    {
      label: "Watch List",
      value: "Watch List",
      desc: <WatchListPage />,
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
        className="w-full m-auto flex"
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

export default ProfileTabsAnimation;
