import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";
import VideoPopup from "../videoPopup/VideoPopup.jsx";
import { PlayIcon } from "../../../components/details/Playbtn.jsx";

import "./style.scss";

const VideosSection = ({ movieInfo, video, id }) => {
    console.log("movieInfo:", movieInfo);
    console.log("video:", video);

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const [loading, setLoading] = useState(false);


    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {video?.length > 0 ? (
                            video?.map((item) => (
                                <div
                                    key={item.id}
                                    className="videoItem"
                                    onClick={() => {
                                        setShow(true);
                                        setVideoId(item.key);
                                    }}
                                >
                                    <div className="videoThumbnail">
                                        <img
                                            src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                                            alt={item.name}
                                        />
                                        <PlayIcon />
                                    </div>
                                    <div className="videoTitle">{item.name}</div>
                                    {/* <div className="row2" style={{color:"white"}} >{item.type}</div> */}
                                </div>
                            ))
                        ) : (
                            <div className="noVideos">No videos found</div>
                        )}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
        </div>
    );
};

export default VideosSection;
