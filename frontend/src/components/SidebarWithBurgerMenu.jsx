import { Dropdown } from "flowbite-react";
import {
  HiCog,
  HiLogout,
  HiOutlineUser,
  HiOutlineFilm,
  HiOutlineVideoCamera,
  HiOutlineHome,
} from "react-icons/hi";
import React, { useContext, useEffect } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { UploadContext } from "../context/UploadContext";
// import "../index.scss";
export function SidebarWithBurgerMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { user, setUser } = useContext(UserContext);

  const { photo } = useContext(UploadContext);
  const { images, setImages } = useContext(UploadContext);

  // console.log("USER IN SEIDBARWITHBURGERMENU", user);

  const getImageById = async () => {
    // console.log("user._id", user?._id);
    if (user) {
      try {
        const response = await axios.get(`/get-image/${user?._id}`);

        setImages(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
  };

  useEffect(() => {
    if (user?._id) {
      getImageById();
    }
  }, [user]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const userPfoto = (
    <img
      style={{
        width: "40px",
        height: "40px",
        objectFit: "cover",
        borderRadius: "50%",
      }}
      src={images}
      alt="img"
    />
  );

  const userIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="w-10 h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );

  async function redirect() {
    try {
      const response = await axios.get("/validate", {
        withCredentials: true,
      });
      const loggedUser = response.data;
      setUser(loggedUser);
    } catch (error) {
      console.log("useEffect weiter leitung");
      navigate("/");
    }
  }
  useEffect(() => {
    if (!user) {
      redirect();
    }
  }, []);

  async function signout() {
    const { data } = await axios.post("/signout", {});
    if (data) {
      alert("You have signed out");

      navigate("/");
      setUser("");
    }
  }

  return (
    <>
      <div
        className="flex justify-between items-center header-gradieant"
        style={{ color: "white" }}
      >
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon
              className="h-8 w-8 stroke-2"
              style={{ color: "white" }}
            />
          )}
        </IconButton>

        <p
          style={{
            position: "absolute",
            right: "90px",
            ontSize: "24px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Welcome {user?.username}
        </p>

        <div>
          <Dropdown
            label={images ? userPfoto : userIcon}
            style={{ border: "none" }}
            className="border-none rounded-t-none"
          >
            <Dropdown.Header>
              <span className="block text-sm">{user?.username}</span>
              <span className="block truncate text-sm font-medium">
                {user?.email}
              </span>
            </Dropdown.Header>
            <hr />
            <Dropdown.Item
              onClick={() => navigate("/profile")}
              icon={HiOutlineUser}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/settings")} icon={HiCog}>
              Settings
            </Dropdown.Item>
            {user?.isAdmin && (
              <Dropdown.Item onClick={() => navigate("/admin-page")}>
                <i className="pr-1 fa-solid fa-toolbox"></i>
                Admin
              </Dropdown.Item>
            )}
            <hr />
            <Dropdown.Item onClick={signout} icon={HiLogout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <Drawer
        className="sidebar-drawer"
        open={isDrawerOpen}
        onClose={closeDrawer}
      >
        <Card
          style={{ color: "white" }}
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4  "
        >
          <List style={{ color: "white" }}>
            <ListItem onClick={() => navigate("/home")}>
              <ListItemPrefix>
                <HiOutlineHome className="h-6 w-6 " />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-bold text-blue-gray-50"
              >
                Home
              </Typography>
            </ListItem>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  style={{ color: "white" }}
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  style={{ color: "white" }}
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <HiOutlineFilm className="w-6 h-6" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-bold"
                    style={{ color: "white" }}
                  >
                    Movies
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0" style={{ color: "white" }}>
                  <button onClick={closeDrawer}>
                    <ListItem onClick={() => navigate("/Popular-movies")}>
                      <ListItemPrefix>
                        <ChevronRightIcon
                          strokeWidth={3}
                          className="h-3 w-5 "
                        />
                      </ListItemPrefix>
                      Popular
                    </ListItem>
                  </button>
                  <button onClick={closeDrawer}>
                    <ListItem onClick={() => navigate("/now-playing-movies")}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Now Playing
                    </ListItem>
                  </button>
                  <button onClick={closeDrawer}>
                    <ListItem onClick={() => navigate("/top-rated-movies")}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Top Rated
                    </ListItem>
                  </button>
                  <button onClick={closeDrawer}>
                    <ListItem onClick={() => navigate("/upcoming-movies")}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Upcoming
                    </ListItem>
                  </button>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  style={{ color: "white" }}
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <HiOutlineVideoCamera
                      className="w-6 h-6"
                      style={{ color: "white" }}
                    />
                  </ListItemPrefix>
                  <Typography color="white" className="mr-auto font-bold">
                    Tv show
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0" style={{ color: "white" }}>
                  <button onClick={closeDrawer}>
                    <ListItem onClick={() => navigate("/Popular-series")}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Popular
                    </ListItem>
                  </button>
                  <button onClick={closeDrawer}>
                    <ListItem onClick={() => navigate("/Airing-today")}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Airing Today
                    </ListItem>
                  </button>
                  <button onClick={closeDrawer}>
                    <ListItem onClick={() => navigate("/on-tv-series")}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      On TV
                    </ListItem>
                  </button>
                  <button onClick={closeDrawer}>
                    <ListItem onClick={() => navigate("/top-rated-series")}>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Top Rated
                    </ListItem>
                  </button>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem onClick={() => navigate("/community-page")}>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5 " />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="mr-auto font-bold text-blue-gray-50"
              >
                Community
              </Typography>

              {/* <ListItemSuffix>
                <Chip
                  value="0"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix> */}
            </ListItem>
            <ListItem onClick={() => navigate("/profile")}>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>

              <Typography
                color="white"
                className="mr-auto font-bold text-blue-gray-50"
              >
                Profile
              </Typography>
            </ListItem>
            <ListItem onClick={() => navigate("/settings")}>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography
                color="white"
                className="mr-auto font-bold text-blue-gray-50"
              >
                Settings
              </Typography>
            </ListItem>
            <ListItem onClick={signout}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography
                color="white"
                className="mr-auto font-bold text-blue-gray-50"
              >
                Log Out
              </Typography>
            </ListItem>
          </List>
        </Card>
      </Drawer>
      <Outlet />
    </>
  );
}
