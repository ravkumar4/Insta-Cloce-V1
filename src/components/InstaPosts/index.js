import {Link} from 'react-router-dom'

// BsHeart, FaRegComment, BiShareAlt

import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'

import './index.css'

const InstaPosts = props => {
  const {eachPost, updatingLikeButton, updatingUnLikeButton} = props

  const {
    comments,
    createdAt,
    likesCount,
    postDetails,
    postId,
    profilePic,
    userId,
    userName,
    likeStatus,
  } = eachPost
  const {caption, imageUrl} = postDetails
  const clickingLikeButton = () => {
    updatingLikeButton(postId)
  }
  const clickingUnlikeButton = () => {
    updatingUnLikeButton(postId)
  }
  return (
    <li className="insta-post-container">
      <div className="profile-pic-container">
        <div className="profile-pic-design">
          <img
            alt="post author profile"
            className="profile-pic"
            src={profilePic}
          />
        </div>
        <Link className="link-style-profile" to={`/users/${userId}`}>
          <p className="profile-name">{userName}</p>
        </Link>
      </div>
      <img className="post-image" alt="post" src={imageUrl} />
      <div className="bottom-section">
        <div className="buttons-container">
          {likeStatus ? (
            <button
              onClick={clickingUnlikeButton}
              type="button"
              className="like-comment-share un-like-button "
              testid="unLikeIcon"
            >
              <FcLike />
            </button>
          ) : (
            <button
              onClick={clickingLikeButton}
              type="button"
              className="like-comment-share "
              testid="likeIcon"
            >
              <BsHeart />
            </button>
          )}

          <button className="like-comment-share" type="button">
            <BiShareAlt />
          </button>
          <button className="like-comment-share" type="button">
            <FaRegComment />
          </button>
        </div>
        <p className="likes-count">{likesCount} Likes</p>
        <p className="post-description">{caption}</p>
        {comments.map(eachComment => (
          <div key={eachComment.comment}>
            <p className="comment">
              <span className="comment-user">{eachComment.username}</span>{' '}
              {eachComment.comment}
            </p>
          </div>
        ))}
        <p className="created-time">{createdAt}</p>
      </div>
    </li>
  )
}

export default InstaPosts
