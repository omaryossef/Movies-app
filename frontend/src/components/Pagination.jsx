import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function Pagination({ currentPage, setCurrentPage }) {
  const maxNumber = 100; // Maximum number
  const numbersToShow = 5; // Number of numbers to show at a time
  const startIndex = Math.max(1, currentPage - Math.floor(numbersToShow / 2));
  const endIndex = Math.min(maxNumber, startIndex + numbersToShow - 1);

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => setCurrentPage(index),


    className: `rounded-full border-2 border-orange-500 text-8md text-orange-500 
    bg-transparent hover:bg-orange-500 hover:text-white hover:font-bold ${
      currentPage === index ? "bg-orange-500 text-white font-bold" : ""
    }`,

  });

  const next = () => {
    if (currentPage === maxNumber) return;

    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  };

  // Dynamically generate buttons based on the range of numbers to display
  const buttons = [];
  for (let i = startIndex; i <= endIndex; i++) {
    buttons.push(
      <IconButton key={i} {...getItemProps(i)}>
        {i}
      </IconButton>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-20 mb-20">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full border-2 border-orange-500 text-5xl text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white hover:font-bold "
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon
          strokeWidth={2}
          className="h-4 w-4"
          // style={{ backgroundColor: "red" }}
        />{" "}
      </Button>

      <div className="flex items-center gap-2">{buttons}</div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full border-2 border-orange-500 text-5xl text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white hover:font-boldborder-2   hover:font-bold"
        onClick={next}
        disabled={currentPage === maxNumber}
      >
        <ArrowRightIcon
          strokeWidth={2}
          className="h-4 w-4"
          //   style={{ backgroundColor: "red" }}
        />
      </Button>
    </div>
  );
}

export default Pagination;
