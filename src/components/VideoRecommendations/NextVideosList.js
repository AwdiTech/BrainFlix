import NextVideo from './NextVideo.js';
import './NextVideosList.scss';
import { v4 as uuidv4 } from 'uuid';

/**
 * NextVideosList Component
 * 
 * Displays a list of next videos. Each video is rendered using the NextVideo component.
 * 
 * Props:
 * - videos (array): Array of video objects to be displayed.
 * - clickHandler (function): Function to handle click events on each video.
 */


function NextVideosList({ videos, clickHandler}) {

    return (
        <section className="videos-list">
            
            <p className="videos-list__header subheader special-label">NEXT VIDEOS</p>

            <section className='videos-list__links'>
                {videos.map( videoObject => <NextVideo key={uuidv4()} {...videoObject} clickHandler={clickHandler} /> )}
            </section>
            
        </section>
    );
}

export default NextVideosList;