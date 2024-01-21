import Comment from './Comment';
import userIcon from './../../assets/images/Mohan-muruge.jpg';
import commentIcon from './../../assets/Icons/add_comment.svg';
import './CommentSection.scss';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

/**
 * CommentSection Component
 * 
 * Renders a section for displaying and adding comments. It includes an input area for new comments
 * and a list of existing comments.
 * 
 * Functions:
 * - postComment: Submits a new comment to the selected video.
 * - deleteComment: Removes a selected comment from the selected video.
 * - likeComment: Increments the like count for a selected comment.
 * 
 * Props:
 * - comments (array): Array of comment objects to be displayed.
 */

function CommentSection({ comments, setComments, mainVideoId }) {

    const API_URL = process.env.REACT_APP_API_URL;


    const commentSubmitHandler = function (event) {
        event.preventDefault();
        const newCommentObject = { id: uuidv4(), name: "Username", comment: event.target.comment.value, likes: 0, timestamp: Date.now() };
        postComment(newCommentObject, event.target);
    }


    // `postComment`: Posts a new comment to the backend and updates the local comments state and render without making another API call.
    const postComment = function (newCommentObject, formElement) {
        axios.post(`${API_URL}/videos/${mainVideoId}/comments`, newCommentObject)
            .then((response) => {
                alert("Comment Posted Successfully!");
                const responseCommentObject = response.data;
                setComments((currentComments) => [responseCommentObject, ...currentComments]);
                formElement.reset();
            })
            .catch((error) => {
                alert("Error: Failed to post comment. Please try again later.");
                console.error("Error:", error);
            })
    }


    // `deleteComment`: Deletes a comment from the backend and updates the local comments state.
    const deleteComment = function (commentId) {
        axios.delete(`${API_URL}/videos/${mainVideoId}/comments/${commentId}`)
            .then(() => {
                alert("Comment Deleted Successfully!");
                setComments((currentComments) => currentComments.filter((comment) => comment.id !== commentId));
            })
            .catch((error) => {
                alert("Error: Failed to Delete Comment! Please try again later.");
                console.error("Error:", error);
            })
    }

    const likeCommentHandler = function (commentId, setLikes) {
        axios.put(`${API_URL}/videos/${mainVideoId}/comments/${commentId}/likes`)
            .then((response) => {
                setLikes(response.data); // I update the like count client-side to avoid making another API call.
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }



    return (
        <section className="comment-section">

            <h4 className="comment-section__count subheader">{comments.length} Comments</h4>

            <form className="input-comment" onSubmit={commentSubmitHandler}>
                <img className="input-comment__user user-icon" src={userIcon} alt="" />
                <div className="input-comment__main">
                    <label className="input-comment__label special-label" htmlFor="comment">JOIN THE CONVERSATION</label>
                    <div className='input-comment__wrapper'>
                        <textarea className="input-comment__textarea" name="comment" placeholder="Add a new comment" rows="4" />
                        <button className='input-comment__button cta-button'>
                            <img src={commentIcon} alt="" className='input-comment__icon style-icon' />
                            COMMENT
                        </button>
                    </div>
                </div>
            </form>

            <section className="comments-list">
                {comments.map((commentObject) => <Comment
                    key={commentObject.id}
                    {...commentObject}
                    deleteCommentHandler={deleteComment}
                    likeCommentHandler={likeCommentHandler}
                />)}
            </section>

        </section>
    );
}

export default CommentSection;