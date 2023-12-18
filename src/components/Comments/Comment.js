import './Comment.scss';
import { TimeAgoContext } from './../../context/TimeAgoContext';
import deleteIcon from './../../assets/Icons/icon-delete.svg';
import { useContext } from 'react';

/**
 * Comment Component
 * 
 * Displays a single comment with user name, comment text, and the timestamp.
 * The timestamp is processed through the TimeAgoContext to display relative time.
 * 
 * Props:
 * - id (string): Unique identifier for the comment.
 * - name (string): Name of the user who posted the comment.
 * - comment (string): Text content of the comment.
 * - likes (number): Number of likes the comment has received.
 * - timestamp (Date|string): Original time when the comment was posted.
 */


function Comment({ id, name, comment, timestamp, deleteCommentHandler }) {

    const calculateTimeAgo = useContext(TimeAgoContext)

    return (
        <article className="comment">

            <div className="comment__user-icon-wrapper">
                <img src="" className="comment__user-icon user-icon" alt="" />
            </div>

            <div className="comment-body">
                <p className="comment-body__name">{name}</p>
                <p className="comment-body__text">{comment}</p>
                <p className="comment-body__date">{calculateTimeAgo(timestamp)}</p>
                <img src={deleteIcon} alt='delete icon' className='comment-body__delete' onClick={() => deleteCommentHandler(id)} />
            </div>
            
        </article>
    );
}

export default Comment;