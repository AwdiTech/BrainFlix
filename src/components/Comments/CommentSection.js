import Comment from './Comment';
import userIcon from './../../assets/images/Mohan-muruge.jpg';
import commentIcon from './../../assets/Icons/add_comment.svg';
import { v4 as uuidv4 } from 'uuid';
import './CommentSection.scss';

/**
 * CommentSection Component
 * 
 * Renders a section for displaying and adding comments. It includes an input area for new comments
 * and a list of existing comments.
 * 
 * Props:
 * - comments (array): Array of comment objects to be displayed.
 */

function CommentSection({ comments, postComment, deleteComment }) {

    const commentSubmitHandler = function (event) {
        event.preventDefault();
        const newCommentObject = { name: "Username", comment: event.target.comment.value};
        postComment(newCommentObject, event.target);
    }

    const deleteCommentHandler = function (commentId) {
        deleteComment(commentId);
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
                { comments.map((commentObject) => <Comment key={commentObject.id} {...commentObject} deleteCommentHandler={deleteCommentHandler} /> ) }
            </section>

        </section>
    );
}

export default CommentSection;