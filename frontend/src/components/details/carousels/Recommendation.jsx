import CarouselDetails from "../../../components/carousel/CarouselDetails.jsx";

const Recommendation = ({ mediaType, recommendationData, loading }) => {
    console.log(recommendationData?.results);
    return (
        <CarouselDetails
            data={recommendationData?.results}
            title="Recommendations"
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;
