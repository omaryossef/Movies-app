import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className }) => {
    return <LazyLoadImage 
    src={src} 
    className={className || ""} 
    // effect="opacity" 
    effect="blur" 
    alt="image" />;
};

export default Img;
