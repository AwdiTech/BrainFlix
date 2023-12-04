import './VideoPlayer.scss';

/**
 * VideoPlayer Component
 * 
 * Renders a video player for the given video source. It displays a video element with
 * customizable poster image and controls.
 * 
 * Props:
 * - poster (string): URL of the poster image to display when the video is not playing.
 * - video (string): URL of the video to be played.
 * - duration (string|number): Duration of the video (For later use).
 */


function VideoPlayer({ poster, video, duration }) {

    return (
        <section className="video-player__wrapper">
            <video className="video-player" width="100%" height="auto" poster={poster} controls>
                <source src={video} />
            </video>
        </section>
    );
}

export default VideoPlayer;