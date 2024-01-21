import { useState, useRef, useEffect } from 'react';
import playIcon from './../../assets/Icons/play.svg';
import pauseIcon from './../../assets/Icons/pause.svg';
import scrubIcon from './../../assets/Icons/scrub.svg';
import fullscreenIcon from './../../assets/Icons/fullscreen.svg';
import volumeIcon from './../../assets/Icons/volume_up.svg';
import volumeOffIcon from './../../assets/Icons/volume_off.svg';
import './VideoPlayer.scss';

//import closeFullscreenIcon from './../../assets/Icons/close_fullscreen.svg'; // TO DO: Style fullscreen mode for the videoplayer

// --- Helper Function ---
/**
 * Formats a time in seconds into a string "mm:ss".
 * @param {number} seconds - The time in seconds.
 * @returns {string} The formatted time string.
 */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}


/*
 * VideoPlayer Component
 * Renders a video player with custom controls and functionalities such as play, pause, fullscreen, volume control, and progress tracking.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.poster - URL of the poster image to display when the video is not playing.
 * @param {string} props.video - URL of the video to be played.
 */

function VideoPlayer({ poster, video }) {

    // State hooks for various video player functionalities

    const [isPlaying, setIsPlaying] = useState(false);
    //const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    // Ref hooks for DOM elements
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);
    const videoContainerRef = useRef(null);

    let isUsingVolume = false;


    useEffect(() => {
        // If the video element exists and the video source has changed
        if (videoRef.current && video) {
            videoRef.current.load();
        }
    }, [video]); // Watch for changes in the video prop


    // ----- EVENT HANDLER FUNCTIONS ----- For video player controls

    // ---Play/Pause button handler---
    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            }
            else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // ---Progress Bar Functions---
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
            setCurrentTime(formatTime(videoRef.current.currentTime));
            if (videoRef.current.duration) {
                setDuration(formatTime(videoRef.current.duration));
            }
        }
    }

    const handleMouseDownOnProgress = (e) => {
        if (!isScrubbing) {
            setIsScrubbing(true);
            updateProgressBar(e.clientX);
        }

        document.addEventListener('mousemove', handleMouseMoveOnProgress);
        document.addEventListener('mouseup', handleMouseUpOnProgress);
    }

    const handleMouseMoveOnProgress = (e) => {
        if (isScrubbing) {
            updateProgressBar(e.clientX);
        }
    };

    const handleMouseUpOnProgress = (e) => {
        setIsScrubbing(false);
        updateProgressBar(e.clientX);
        document.removeEventListener('mousemove', handleMouseMoveOnProgress);
        document.removeEventListener('mouseup', handleMouseUpOnProgress);
    }

    const updateProgressBar = (clientX) => {
        const progressBar = progressBarRef.current.getBoundingClientRect();
        const clickXDistance = clientX - progressBar.left;
        const newTime = (clickXDistance / progressBar.width) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(progress);
    }


    // Fullscreen button Handler.
    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (!document.fullscreenElement) {
                if (videoRef.current.requestFullscreen) {
                    videoRef.current.requestFullscreen();
                } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
                    videoRef.current.mozRequestFullScreen();
                } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    videoRef.current.webkitRequestFullscreen();
                } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
                    videoRef.current.msRequestFullscreen();
                }
                //setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE/Edge */
                    document.msExitFullscreen();
                }
                //setIsFullscreen(false);
            }
        }
    };



    // --- Volume Button Handling Functions ---
    const handleVolumeClick = (event) => {
        const slider = event.currentTarget.getBoundingClientRect();
        const volumeLevel = 1 - (event.clientY - slider.top) / slider.height;
        const newVolume = Math.min(Math.max(volumeLevel, 0), 1);  //This makes sure the newVolume is between 0 and 1.

        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0); // If the volume is 0, we consider the video to be muted
        }
    };

    const handleMouseDownOnVolume = (e) => {
        setIsScrubbing(true);
        handleVolumeClick(e);
        setShowVolumeSlider(true);
    };

    const handleMouseMoveOnVolume = (e) => {
        if (showVolumeSlider && isScrubbing) {
            handleVolumeClick(e);
        }
    };

    const handleMouseMoveUpOnVolume = (e) => {
        setIsScrubbing(false);
    }

    const toggleMute = () => {
        if (videoRef.current) {
            if (isMuted) {
                videoRef.current.muted = false;
                videoRef.current.volume = volume > 0 ? volume : 0.01; // if the volume was 0, set it to 1. Else, go back to previous volume.
            }
            else {
                videoRef.current.muted = true;
                videoRef.current.volume = 0;
            }
            setIsMuted(!isMuted);
        }
    }


    const volumeHoverHandler = () => {
        setShowVolumeSlider(true);
        isUsingVolume = true;
    };

    const exitVolumeHoverHandler = (e) => {
        isUsingVolume = false;

        setTimeout(() => {
            if (!isUsingVolume)
                setShowVolumeSlider(false);
        }, 1200);
    };


    // JSX for rendering the video player component
    return (
        <section className="video-player__wrapper" ref={videoContainerRef} >

            {/* Video element with reference and event handlers */}
            <video className="video-player"
                ref={videoRef}
                width="100%"
                height="auto"
                poster={process.env.REACT_APP_API_URL + poster}
                onClick={togglePlayPause}
                onTimeUpdate={handleTimeUpdate}
            >
                <source src={process.env.REACT_APP_API_URL + video} type='video/mp4' />
            </video>


            {/* Custom video player controls */}
            <div className='video-controls'>

                {/* Play/Pause Buttons */}
                <div className='play-pause-wrapper' onClick={togglePlayPause}>
                    <img src={playIcon} className={`video-controls__play ${isPlaying ? 'hidden' : ''}`} alt='play'/>
                    <img src={pauseIcon} className={`video-controls__pause ${!isPlaying ? 'hidden' : ''}`} alt='pause'/>
                </div>

                {/* Progress bar with scrubbing functionality */}
                <div className='progress-wrapper'>
                    <div className='progress' ref={progressBarRef} onMouseDown={handleMouseDownOnProgress}>
                        <div className='progress__filled' style={{ width: `${progress}%` }}></div>
                        <img src={scrubIcon} className='scrubber' style={{ left: `${progress}%` }} alt='progress scrubber'/>
                    </div>
                    <div className='video-controls__time'>{currentTime} / {duration}</div>
                </div>

                {/* Utility Buttons including Fullscreen toggle and Volume Control*/}
                <div className='utility-buttons-wrapper'>
                    <img src={fullscreenIcon} className='video-controls__close-fullscreen' onClick={toggleFullscreen} alt='fullscreen toggle'/>

                    <div className='volume-wrapper' onMouseOver={volumeHoverHandler} onMouseLeave={exitVolumeHoverHandler}>
                        {isMuted ? (
                            <img src={volumeOffIcon} className='video-controls__volume-off' onClick={toggleMute} alt='volume off'/>
                        ) : (
                            <img src={volumeIcon} className='video-controls__volume-up' onClick={toggleMute} alt='volume'/>
                        )}

                        <div className='volume-slider'
                            style={{ display: showVolumeSlider ? 'block' : 'none' }}
                            onMouseDown={handleMouseDownOnVolume}
                            onMouseMove={handleMouseMoveOnVolume}
                            onMouseUp={handleMouseMoveUpOnVolume}
                            onMouseLeave={exitVolumeHoverHandler}
                            onMouseOver={volumeHoverHandler}
                        >
                            <div className='slider-track' onClick={handleVolumeClick}>
                                <div className='slider-track__filled' style={{ height: `${volume * 100}%` }}></div>
                            </div>
                            <div className='slider-track__thumb' style={{ bottom: `${volume * 100}%` }}></div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default VideoPlayer;