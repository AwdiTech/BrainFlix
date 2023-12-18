import './Upload.scss';
import thumbnailPicture from './../../../assets/images/Upload-video-preview.jpg';
import publishIcon from './../../../assets//Icons/publish.svg';
import { useNavigate } from 'react-router-dom';


function Upload() {

    let navigate = useNavigate();

    const uploadButtonHandler = function (event) {
        event.preventDefault();
        alert("Video Successfully Uploaded!");
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
                    <img className='thumbnail__image' src={thumbnailPicture} ></img>
                </article>

                <article className='input-video-details'>
                    <label className='input-video-details__title-label special-label' htmlFor="video-title">TITLE YOUR VIDEO</label>
                    <input className='input-video-details__title-field input-field' type='text' name='video-title' placeholder='Add a title to your video' />
                    <label className='input-video-details__description-label special-label' htmlFor="video-description">ADD A VIDEO DESCRIPTION</label>
                    <textarea className='input-video-details__description-field input-field' name="video-description" placeholder='Add a description to your video' rows='4'/>
                </article>
            </section>

            <section className='upload-options'>
                <button className='upload-options__upload-button cta-button' onClick={uploadButtonHandler}>
                <img src={publishIcon} alt="" className='publish-icon style-icon' />
                PUBLISH
                </button>
                <button className='upload-options__cancel-button cta-button' id='cancel-button'>CANCEL</button>
            </section>
        </form>

    );
}   

export default Upload;