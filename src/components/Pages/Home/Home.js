import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import VideoPlayer from '../../VideoPlayer/VideoPlayer.js';
import VideoDetails from '../../VideoDetails/VideoDetails.js';
import CommentSection from '../../Comments/CommentSection.js';
import NextVideosList from '../../VideoRecommendations/NextVideosList.js';
import './Home.scss';



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

//Constants
const DEFAULT_VIDEO_ID = "84e96018-4022-434e-80bf-000ce4cd12b8";
const API_KEY = "3cbff5a7-5a14-46bc-a661-53871ee9b327";
const API_URL = "https://project-2-api.herokuapp.com";


function Home() {

    // State Variables
    const [mainVideo, setMainVideo] = useState(null);
    const [videosList, setVideosList] = useState(null);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    
    const { videoId } = useParams();

    // Data retrieval from Back End with Axios
    // useEffect is used to fetch video details and list of videos initially, and whenever the videoId changes.
    useEffect(() => {
        const fetchVideoData = async function () {
            try {
                const videosResponse = axios.get(`${API_URL}/videos?api_key=${API_KEY}`)
                const videoDetailsResponse = axios.get(`${API_URL}/videos/${videoId ? videoId : DEFAULT_VIDEO_ID}?api_key=${API_KEY}`)
                const [videos, videoDetails] = await Promise.all([videosResponse, videoDetailsResponse]); //This allows both GET requests to run simultaneously, and awaits until they both completed

                setVideosList(videos.data.filter(video => video.id !== videoId));
                setMainVideo(videoDetails.data);
            } catch (err) {
                console.log("Error encountered:", err);
                setError("Sorry, we're having trouble loading this content. Please try again later.");
            }
        }

        fetchVideoData ();
    }, [videoId]); // Dependency array includes videoId to trigger re-fetching of data when it changes.


    //This useEffect updates comments when mainVideo changes.
    useEffect( () => {
        if (mainVideo) {
        setComments(mainVideo.comments);
        }
    }, [mainVideo]);


    // Post Comment with API Function
    const postComment = function (newCommentObject, formElement) {
        axios.post(`${API_URL}/videos/${mainVideo.id}/comments?api_key=${API_KEY}`, newCommentObject)
        .then( (response) => {
            alert("Comment Posted Successfully!");
            const responseCommentObject = response.data;
            setComments( (currentComments) => [...currentComments, responseCommentObject]); 
            formElement.reset();
                // Used a functional update here to avoid stale state.
                // Adding the newCommentObject into a new separate comments state variable to avoid
                //   making another API call, and in order to only trigger re-rendering for just the CommentSection. 
        })
        .catch ( (error) => {
            alert("Error: Failed to post comment. Please try again later.");
            console.error("Error:", error);
        })
    }



    // Error Screen (Styled using tailwindcss)
    if (error) {
        return (
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-40 ml-8 mr-8" role="alert">
                <strong class="font-bold">Error: &ensp;</strong>
                <span class="block sm:inline">{error}</span>
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
                    <CommentSection comments={comments} postComment={postComment} />
                </section>

                <section className='main-content__rightside'>
                    <NextVideosList videos={videosList} />
                </section>
            </section>
        </>
    );

}

export default Home;