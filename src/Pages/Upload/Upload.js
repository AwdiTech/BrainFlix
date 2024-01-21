import './Upload.scss';
import thumbnailDefault from './../../assets/images/Upload-video-preview.jpg';
import publishIcon from './../../assets/Icons/publish.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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

    const [thumbnailSrc, setThumbnailSrc] = useState(thumbnailDefault);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newVideoTitle, setNewVideoTitle] = useState('');
    const [newVideoDesc, setNewVideoDesc] = useState('');


    let navigate = useNavigate();


    const uploadButtonHandler = function (event) {
        event.preventDefault();

        if (newVideoTitle && newVideoDesc) {

            const newVideoID = uuidv4();

            const newVideo = {
                "id": newVideoID,
                "title": newVideoTitle,
                "channel": "UserName123_Channel",
                "image": ''
            }
            const newVideoDetails = {
                "id": newVideoID,
                "title": newVideoTitle,
                "channel": "UserName123_Channel",
                "image": '',
                "description": newVideoDesc,
                "views": "0",
                "likes": "0",
                "duration": "0:00",
                "video": "",
                "timestamp": new Date(),
                "comments": []
            }

            const formData = new FormData();
            formData.append("newVideo", JSON.stringify(newVideo));
            formData.append("newVideoDetails", JSON.stringify(newVideoDetails));
            formData.append('image', selectedFile);

            axios.post('http://localhost:8080/videos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log("Success response: ", response)
                    alert("Video Successfully Uploaded!");
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err)
                });

        }
        else {
            alert("Error: Title and Description required.");
        }
    }


    const cancelButtonHandler = function (event) {
        event.preventDefault();
        alert("Video Uploading Cancelled... Redirecting to Home Page...");
        navigate('/');
    }


    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const imageFile = event.target.files[0];
            setSelectedFile(imageFile)

            let reader = new FileReader();

            reader.onload = () => {
                setThumbnailSrc(reader.result);
            }
            reader.readAsDataURL(imageFile);
        }
    }


    return (
        <form className='upload-form' encType="multipart/form-data">
            <header className='upload__header'>
                <h1 className='upload__header-title'>Upload Video</h1>
            </header>

            <section className='upload-details'>
                <article className='thumbnail'>
                    <p className='thumbnail__label special-label'>VIDEO THUMBNAIL</p>
                    <img className='thumbnail__image' src={thumbnailSrc} alt='Upload Thumbnail' />
                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                        className='thumbnail__input'
                    />
                </article>

                <article className='input-video-details'>
                    <label className='input-video-details__title-label special-label' htmlFor="video-title">TITLE YOUR VIDEO</label>
                    <input
                        className='input-video-details__title-field input-field'
                        type='text' name='video-title'
                        placeholder='Add a title to your video'
                        autoFocus
                        value={newVideoTitle}
                        onChange={(event) => setNewVideoTitle(event.target.value)}
                    />
                    <label className='input-video-details__description-label special-label' htmlFor="video-description">ADD A VIDEO DESCRIPTION</label>
                    <textarea
                        className='input-video-details__description-field input-field'
                        name="video-description"
                        placeholder='Add a description to your video'
                        rows='4'
                        value={newVideoDesc}
                        onChange={(event) => setNewVideoDesc(event.target.value)}
                    />
                </article>
            </section>

            <section className='upload-options'>
                <button className='upload-options__upload-button cta-button' onClick={uploadButtonHandler}>
                    <img src={publishIcon} alt="" className='publish-icon style-icon' />
                    PUBLISH
                </button>
                <button type='submit' className='upload-options__cancel-button cta-button' id='cancel-button' onClick={cancelButtonHandler}>CANCEL</button>
            </section>
        </form>

    );
}

export default Upload;