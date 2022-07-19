import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

const PostItemDetails = props => {
  const {post} = props
  const {
    caption,
    comments,
    userId,
    profilePic,
    imageUrl,
    createdAt,
    likesCount,
  } = post

  //   const postComments = comments.map(eachComment => ({
  //     userId: eachComment.user_id,
  //     userName: eachComment.user_name,
  //     comment: eachComment.comment,
  //   }))

  return (
    <li className="post-item">
      <Link to={`users/${userId}`} className="nav-link">
        <div className="profile-container">
          <img
            src={profilePic}
            alt="post author profile"
            className="post-user-profile"
          />
          <p className="post-user-id">{userId}</p>
        </div>
      </Link>
      <img src={imageUrl} alt="post" className="user-post-image" />
      <div className="react-icons">
        <button type="button" className="icon-button">
          <BsHeart className="like-icon" />
        </button>
        <button type="button" className="icon-button">
          <FaRegComment className="comment-icon" />
        </button>
        <button type="button" className="icon-button">
          <BiShareAlt className="share-icon" />
        </button>
      </div>
      <p className="user-post-likes-count">{likesCount} likes</p>
      <p className="user-post-caption">{caption}</p>
      <div className="comment-container">
        {comments.map(eachComment => (
          <div className="inner-comment-container">
            <p className="post-comment-username">{eachComment.userName}</p>
            <p className="post-comment">{eachComment.comment}</p>
          </div>
        ))}
      </div>
      <p className="post-time">{createdAt}</p>
    </li>
  )
}
export default PostItemDetails
