import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  CardFooter,
  Tabs,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Navigate, useNavigate } from "react-router-dom";
const img =
  "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg";
const TABLE_HEAD = ["User", "CreatedAt", "Movies", "ID", ""];
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
];
function AdminPage() {
  const [users, setUsers] = useState([]);
  const { user, setUser, admin, setAdmin } = useContext(UserContext);
  const [moviesIds, setMoviesIds] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [klick, setklick] = useState(false);
  const [delUser, setDeleteUser] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let movieIds = [];
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/delete-user/${user?._id}/${id}`);
      if (response) {
        setDeleteUser(!delUser);
        console.log("movie deleted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const usersResponse = await axios.get("/get-all");
        if (usersResponse.status === 200) {
          usersResponse.data.forEach((user) => {
            user.movies.forEach((movie) => {
              const movieId = movie.movieId;
              if (!movieIds.includes(movieId)) {
                movieIds.push(movieId);
              }
              return movieIds;
            });
          });
          setUsers(usersResponse.data);
          setMoviesIds(movieIds);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllUser();
  }, [klick, delUser]);

  async function handleRegister(e) {
    e.preventDefault();
    setklick(true);
    if (
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      try {
        const response = await axios.post(
          `/register`,
          { username, email, password },
          { withCredentials: true }
        );

        if (response.status === 201) {
          setUsername("");
          setEmail("");
          setPassword("");
          setklick(false);
        }
      } catch (error) {
        console.log("Error registering", error);
        if (error.response && error.response.status === 409) {
          alert("Email already exists. Please choose a different email.");
        } else {
          alert("An error occurred while registering. Please try again later.");
        }
      }
    }
  }
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
  console.log(user);
  if (user && !user?.isAdmin) {
    return <Navigate to={"/home"} />;
  }
  return (
    <Card className="mt-6 h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Users list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={handleRegister}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        {klick && (
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max"></Tabs>

            <div className="flex flex-col gap-2 w-full md:w-72">
              <Input
                label="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        )}
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((dataUser, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={dataUser._id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={dataUser.image || img} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {dataUser.username}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {dataUser.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(dataUser.createdAt).toLocaleDateString("de")}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      ></Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      {dataUser.movies.map((movie) => movie.title).join(", ")}
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {dataUser._id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Menu
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                      }}
                    >
                      <MenuHandler>
                        <button>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </button>
                      </MenuHandler>
                      <MenuList>
                        {console.log(dataUser._id)}
                        <MenuItem
                          onClick={() => deleteUser(dataUser._id)}
                          style={{ color: "red" }}
                        >
                          Delete user
                        </MenuItem>
                        <MenuItem>Block user</MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default AdminPage;
