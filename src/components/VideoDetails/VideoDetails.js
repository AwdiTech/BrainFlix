import viewsIcon from './../../assets/Icons/views.svg';
import likesIcon from './../../assets/Icons/likes.svg';
import likedIcon from './../../assets/Icons/liked.svg';
import { TimeAgoContext } from './../../context/TimeAgoContext';
import { useContext, useEffect, useState } from 'react';
import './VideoDetails.scss';
import axios from 'axios';

/**
 * VideoDetails Component
 * 
 * Displays detailed information about a video, including its title, channel, number of views,
 * number of likes, the time since it was posted, and a brief description.
 * 
 * Props:
 * - title (string): Title of the video.
 * - channel (string): Name of the channel the video belongs to.
 * - views (number): Number of views of the video.
 * - likes (number): Number of likes the video has received.
 * - timestamp (Date|string): Original posting time of the video.
 * - description (string): Description of the video.
 */


function VideoDetails({ videoId, title, channel, views, likes, timestamp, description }) {

    const [ likesState, setLikesState ] = useState(likes);
    const [ liked, setLiked ] = useState(false);
    const calculateTimeAgo = useContext(TimeAgoContext)
    const API_URL = process.env.REACT_APP_API_URL;

    // Because I'm using a state to hold likes, I need to manually update it when the selected videoId changes.
    useEffect(() => {
        setLikesState(likes);
        setLiked(false);
    }, [videoId])
    

    const likeVideoHandler = function () {
        axios.put(`${API_URL}/videos/${videoId}/likes`)
            .then((response) => {
                setLikesState(response.data); // I update the like count client-side to avoid making another API call.
                setLiked(true);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <section className='vid-details'>

            <h1 className='vid-details__title'>{title}</h1>

            <article className="vid-data">
                <div className='vid-data__leftside-wrapper'>
                    <h4 className="vid-data__channel subheader">By {channel}</h4>
                    <p className="vid-data__date special-label">{calculateTimeAgo(timestamp)}</p>
                </div>

                <div className='vid-data__rightside-wrapper'>
                    <div className="vid-data__views">
                        <img className="views-icon" src={viewsIcon} alt="" />
                        <p className="views__text special-label">{views}</p>
                    </div>
                    <div className="vid-data__likes">
                        <img className="likes-icon" src={liked ? likedIcon : likesIcon} alt="" onClick={likeVideoHandler} />
                        <p className="likes__text special-label">{likesState}</p>
                    </div>
                </div>
            </article>

            <p className="vid-data__description">{description}</p>
            
        </section>
    );
}

export default VideoDetails;