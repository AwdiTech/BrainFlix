/**
 * Home Component
 * 
 * The Home component is the central page of the application, showcasing the main video 
 * content alongside detailed information and related video recommendations.
 * 
 * Features:
 * - Dynamically fetches and displays video details and a list of recommended videos.
 * - Allows users to post new comments (postComment) and delete existing comments (deleteComment) on the main video.
 * 
 * State Management:
 * - mainVideo: Holds the details of the currently selected video.
 * - videosList: Contains a list of recommended videos, excluding the main video.
 * - error: Tracks any errors that occur during data fetching.
 * - comments: Manages the list of comments for the main video.
 * 
 * API Integration:
 * - Utilizes Axios for API requests to fetch video details and manage comments.
 * 
 * Component Structure:
 * - VideoPlayer: Renders the video player for the selected video.
 * - VideoDetails: Displays detailed information about the main video.
 * - CommentSection: Handles the display and interaction of comments.
 * - NextVideosList: Shows a list of recommended videos.
 * 
 * @module Home
 */


// Imports and Constants
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import VideoPlayer from '../../components/VideoPlayer/VideoPlayer.js';
import VideoDetails from '../../components/VideoDetails/VideoDetails.js';
import CommentSection from '../../components/Comments/CommentSection.js';
import NextVideosList from '../../components/VideoRecommendations/NextVideosList.js';
import './Home.scss';


const API_URL = process.env.REACT_APP_API_URL;
//const API_KEY = process.env.REACT_APP_API_KEY;
const DEFAULT_VIDEO_ID = "84e96018-4022-434e-80bf-000ce4cd12b8";


function Home() {

    // -----State Variables-----
    const [mainVideo, setMainVideo] = useState(null);
    const [videosList, setVideosList] = useState(null);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    
    const { videoId } = useParams();

    
    // -----UseEffect Hooks-----
    
    /**
     * Fetches video data and updates state accordingly.
     * Handles both initial data loading and updates based on videoId changes.
     */
    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

        const fetchVideoData = async function () {
            try {
                const videosResponse = axios.get(`${API_URL}/videos`, { 
                    cancelToken: cancelTokenSource.token 
                });
                const videoDetailsResponse = axios.get(`${API_URL}/videos/${videoId ? videoId : DEFAULT_VIDEO_ID}`, { 
                    cancelToken: cancelTokenSource.token 
                });

                const [videos, videoDetails] = await Promise.all([videosResponse, videoDetailsResponse]); //This allows both GET requests to run simultaneously, and awaits until they both completed
                setMainVideo(videoDetails.data);

                if (videoId) {
                setVideosList(videos.data.filter(video => video.id !== videoId));
                } else {
                    setVideosList(videos.data.filter(video => video.id !== DEFAULT_VIDEO_ID));
                }
                
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.log("Error encountered:", err);
                    setError("Sorry, we're having trouble loading this content. Please try again later.");
                }
            }
        }            

        fetchVideoData ();

        return () => cancelTokenSource.cancel("Component unmounted, API request cancelled"); // Cleanup to cancel in-progress API calls
        
    }, [videoId]); // Dependency array includes videoId to trigger re-fetching of data when it changes.


    /**
     * Updates the comments state when the main video changes.
     * Sorts comments by most recent using their timestamp.
     */
    useEffect( () => {
        if (mainVideo) {
        setComments([...mainVideo.comments].sort((a, b) => b.timestamp - a.timestamp));
        }
    }, [mainVideo]);


    // -----Render Screens - Error Screen, Loading Screen, Successful Loading Screen

    // Error Screen (Styled using tailwindcss)
    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-40 ml-8 mr-8" role="alert">
                <strong className="font-bold">Error: &ensp;</strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )
    }

    // Loading Screen (Styled using tailwindcss)
    if (!mainVideo || !videosList || !comments) {
        return (
            <>
                <div className="flex items-center justify-center space-x-3 mt-60">
                    <strong className='text-blue-500'>Loading...</strong>
                    <div
                        className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-blue-300"
                        role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                </div>
            </>
        )
    }

    //Successful Home and Video Page Screen
    return (
        <>
            <VideoPlayer poster={mainVideo.image} video={mainVideo.video} />

            <section className='main-content'>
                <section className='main-content__leftside'>
                    <VideoDetails
                        videoId={mainVideo.id}
                        title={mainVideo.title}
                        channel={mainVideo.channel}
                        views={mainVideo.views}
                        likes={mainVideo.likes}
                        timestamp={mainVideo.timestamp}
                        description={mainVideo.description}
                    />
                    <CommentSection comments={comments} setComments={setComments} mainVideoId={mainVideo.id} />
                </section>

                <section className='main-content__rightside'>
                    <NextVideosList videos={videosList} />
                </section>
            </section>
        </>
    );

}

export default Home;