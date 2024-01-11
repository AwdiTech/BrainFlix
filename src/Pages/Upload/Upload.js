import './Upload.scss';
import thumbnailPicture from './../../assets/images/Upload-video-preview.jpg';
import publishIcon from './../../assets/Icons/publish.svg';
import { useNavigate } from 'react-router-dom';

/**
 * Upload Component
 * 
 * This component serves as the Upload page for the application, where users can submit their videos.
 * 
 * Functions:
 * - `uploadButtonHandler`: A function triggered when the user clicks the 'Publish' button.
 *   It prevents the default form submission event, displays a success alert, and navigates the user back to the home page.
 * - `cancelButtonHandler`: A function triggered when the user clicks the 'Cancel' button.
 *   It prevents the default button click event, displays a cancellation alert, and redirects the user back to the home page.
 * 
 * Structure:
 * - <form>: The form element that wraps all the input fields and buttons.
 * - <header>: Upload Page Title
 * - <section className='upload-details'>: Contains the thumbnail and video details input elements.
 * - <section className='upload-options'>: Contains the action buttons for publishing or cancelling the video upload.
 * 
 */


function Upload() {

    let navigate = useNavigate();

    const uploadButtonHandler = function (event) {
        event.preventDefault();
        alert("Video Successfully Uploaded!");
        navigate('/');
    }

    const cancelButtonHandler = function (event) {
        event.preventDefault();
        alert("Video Uploading Cancelled... Redirecting to Home Page...");
        navigate('/');
    }

    return (
        <form className='upload-form'>
            <header className='upload__header'>
                <h1 className='upload__header-title'>Upload Video</h1>
            </header>

            <section className='upload-details'>
                <article className='thumbnail'>
                    <p className='thumbnail__label special-label'>VIDEO THUMBNAIL</p>
                    <img className='thumbnail__image' src={thumbnailPicture} alt='Upload Image Thumbnail' />
                </article>

                <article className='input-video-details'>
                    <label className='input-video-details__title-label special-label' htmlFor="video-title">TITLE YOUR VIDEO</label>
                    <input className='input-video-details__title-field input-field' type='text' name='video-title' placeholder='Add a title to your video' autofocus />
                    <label className='input-video-details__description-label special-label' htmlFor="video-description">ADD A VIDEO DESCRIPTION</label>
                    <textarea className='input-video-details__description-field input-field' name="video-description" placeholder='Add a description to your video' rows='4'/>
                </article>
            </section>

            <section className='upload-options'>
                <button className='upload-options__upload-button cta-button' onClick={uploadButtonHandler}>
                <img src={publishIcon} alt="" className='publish-icon style-icon' />
                PUBLISH
                </button>
                <button className='upload-options__cancel-button cta-button' id='cancel-button' onClick={cancelButtonHandler}>CANCEL</button>
            </section>
        </form>

    );
}   

export default Upload;