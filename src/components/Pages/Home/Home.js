import videos from '../../../data/videos.json';
import videoDetails from '../../../data/video-details.json';
import { useEffect, useState } from 'react';

import VideoPlayer from '../../VideoPlayer/VideoPlayer.js';
import VideoDetails from '../../VideoDetails/VideoDetails.js';
import CommentSection from '../../Comments/CommentSection.js';
import NextVideosList from '../../VideoRecommendations/NextVideosList.js';
import './Home.scss';
import { useParams } from 'react-router-dom';

/**
 * Home Component
 * 
 * This component serves as the Home page for the application, responsible for rendering the main video content along with associated details and recommendations.
 * 
 * State Management:
 * - The component maintains its own state for the currently selected main video (`mainVideo`) and a list of other recommended videos (`videosList`).
 * - State is initialized with a default starting video, and the list of videos excludes the main video.
 * 
 * Functionalities:
 * - `selectVideo`: A function to update the `mainVideo` based on the selected video ID. This also updates the `videosList` to reflect the change.
 * 
 * Structure:
 * - VideoPlayer: Displays the currently selected video.
 * - VideoDetails: Shows details of the current video (title, channel, views, likes, timestamp, and description).
 * - CommentSection: Manages comments for the current video, including display and new comment input area.
 * - NextVideosList: Provides a list of recommended videos, which updates the main video view on selection.
 * 
 */


function Home() {

    const defaultVideo = videoDetails.find(video => video.id === "84e96018-4022-434e-80bf-000ce4cd12b8");

    // State Variables initialized with default starting video ID 
    const [mainVideo, setMainVideo] = useState(videoDetails.find(video => video.id === "84e96018-4022-434e-80bf-000ce4cd12b8"));
    const [videosList, setVideosList] = useState(videos.filter(video => video.id !== mainVideo.id));

    // Function to update the main video and videos list based on the selected video ID
    // const selectVideo = function (id) {
    //     setMainVideo(videoDetails.find((video) => video.id === id));
    //     setVideosList(videos.filter(video => video.id !== id));
    // }

    const { videoId } = useParams();

    useEffect(() => {
        if (videoId) {
        setMainVideo(videoDetails.find((video) => video.id === videoId));
        setVideosList(videos.filter(video => video.id !== videoId));
        } else {
            setMainVideo(videoDetails.find(video => video.id === "84e96018-4022-434e-80bf-000ce4cd12b8"));
        }
    }, [videoId])



    
    return (
        <>
            <VideoPlayer poster={mainVideo.image} video={mainVideo.video} duration={mainVideo.duration} />

            <section className='main-content'>
                <section className='main-content__leftside'>
                    <VideoDetails 
                        title={mainVideo.title} 
                        channel={mainVideo.channel} 
                        views={mainVideo.views} 
                        likes={mainVideo.likes} 
                        timestamp={mainVideo.timestamp} 
                        description={mainVideo.description} 
                    />
                    <CommentSection comments={mainVideo.comments} />
                </section>

                <section className='main-content__rightside'>
                    <NextVideosList videos={videosList} />
                </section>
            </section>
        </>
    );
}

export default Home;