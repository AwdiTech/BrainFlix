import './App.scss';
import videos from './data/videos.json';
import videoDetails from './data/video-details.json';
import { useState } from 'react';
import Header from './components/Header.js';
import VideoPlayer from './components/VideoPlayer.js';
import VideoDetails from './components/VideoDetails.js';
import CommentSection from './components/Comments/CommentSection.js';
import NextVideosList from './components/VideoRecommendations/NextVideosList.js';


/**
 * App Component
 * 
 * The main component of the application, serving as the root of the component tree.
 * It handles the main layout and state management for BrainFlix.
 * 
 * State:
 * - mainVideo (object): The currently selected video's details.
 * - videosList (array): List of videos excluding the main video.
 * 
 * Functions:
 * - selectVideo (function): Updates the state to reflect the selected video.
 * 
 * Structure:
 * - Header: The top navigation header.
 * - VideoPlayer: Displays the currently selected video.
 * - VideoDetails: Shows details of the current video (Channel, Date, Views, Likes).
 * - CommentSection: Displays comments for the current video, and includes an input area for new comments.
 * - NextVideosList: Shows a list of recommended videos.
 */

function App() {

    // State Variables initialized with default starting video ID 
    const [mainVideo, setMainVideo] = useState(videoDetails.find(video => video.id === "84e96018-4022-434e-80bf-000ce4cd12b8"));
    const [videosList, setVideosList] = useState(videos.filter(video => video.id !== mainVideo.id));


    // Function to update the main video and videos list based on the selected video ID
    const selectVideo = function (id) {
        setMainVideo(videoDetails.find((video) => video.id === id));
        setVideosList(videos.filter(video => video.id !== id));
    }


    return (
        <div className="App">

            <Header />

            <VideoPlayer poster={mainVideo.image} video={mainVideo.video} duration={mainVideo.duration} />

            <section className='main-content'>
                <section className='main-content__leftside'>
                    <VideoDetails title={mainVideo.title} channel={mainVideo.channel} views={mainVideo.views} likes={mainVideo.likes} timestamp={mainVideo.timestamp} description={mainVideo.description} />
                    <CommentSection comments={mainVideo.comments} />
                </section>

                <section className='main-content__rightside'>
                    <NextVideosList videos={videosList} clickHandler={selectVideo} />
                </section>
            </section>

        </div>
    );
}

export default App;
