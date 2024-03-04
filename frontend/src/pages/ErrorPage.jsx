import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <figure className="relative h-96 w-full">
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(80%-10rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-8 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h3" color="py-4 blue-gray">
            Error 404!
          </Typography>
          <Typography variant="h5">Page not found</Typography>
          <Typography color="gray" className="font-normal">
            The page you are looking for, might not yet exist.
          </Typography>
          <Typography color="blue-gray">
            <button onClick={() => navigate("/home")}>click here</button>
          </Typography>
        </div>
      </figcaption>
    </figure>
  );
}

export default ErrorPage;
