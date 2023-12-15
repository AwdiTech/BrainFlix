import './NextVideo.scss';
import LinesEllipsis from 'react-lines-ellipsis';

/**
 * NextVideo Component
 * 
 * Represents a single video item in a list of next videos. Displays the video's thumbnail,
 * title, and channel name.
 * 
 * Props:
 * - id (string): Unique identifier for the video.
 * - title (string): Title of the video.
 * - channel (string): Name of the channel the video belongs to.
 * - image (string): URL of the video's thumbnail image.
 * - clickHandler (function): Function to handle click events on the video.
 */


function NextVideo({ id, title, channel, image, clickHandler }) {

    // TO DO: fix bug with LinesEllipsis. Need to add a state variable and a 
        //      listener to track window size changes, so that the ellipsis can
            //  render properly. May need to use a combination of hooks 
            //  useState, and useEffect.


    return (
        <article className="next-video" onClick={ () => clickHandler(id) }>

            <div className="next-video__thumbnail-wrapper">
                <img className="next-video__thumbnail" src={image} alt={title} />
            </div>

            <div className="next-video__details">
                <h4 className="next-video__title">
                    <LinesEllipsis
                        text={title}
                        maxLine={2}
                        ellipsis='...'
                        trimRight
                        basedOn='words'
                    />
                </h4>
                <p className="next-video__channel">{channel}</p>
            </div>
            
        </article>
    );
}

export default NextVideo;