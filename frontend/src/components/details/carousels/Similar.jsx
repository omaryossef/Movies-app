import CarouselDetails from "../../../components/carousel/CarouselDetails.jsx";

const Similar = ({ mediaType, id, similarData, loading }) => {
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    console.log(similarData?.results);
    return (
        <>
            <CarouselDetails
                data={similarData?.results}
                title={title}
                loading={loading}
                endpoint={mediaType}
            />
        </>
    );
};

export default Similar;
