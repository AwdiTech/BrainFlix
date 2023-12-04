import viewsIcon from '../assets/Icons/views.svg';
import likesIcon from '../assets/Icons/likes.svg';
import { TimeAgoContext } from '../context/TimeAgoContext';
import { useContext } from 'react';
import './VideoDetails.scss';

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


function VideoDetails({ title, channel, views, likes, timestamp, description }) {

    const calculateTimeAgo = useContext(TimeAgoContext)

    return (
        <section className='vid-details'>

            <h1 className='vid-details__title page-header'>{title}</h1>

            <article className="vid-data">
                <div className='vid-data__leftside-wrapper'>
                    <h4 className="vid-data__channel subheader">By {channel}</h4>
                    <p className="vid-data__date special-label">{calculateTimeAgo(timestamp)}</p>
                </div>

                <div className='vid-data__rightside-wrapper'>
                    <div className="vid-data__views">
                        <img className="views__icon" src={viewsIcon} alt="" />
                        <p className="views__text special-label">{views}</p>
                    </div>
                    <div className="vid-data__likes">
                        <img className="likes__icon" src={likesIcon} alt="" />
                        <p className="likes__text special-label">{likes}</p>
                    </div>
                </div>
            </article>

            <p className="vid-data__description">{description}</p>
            
        </section>
    );
}

export default VideoDetails;