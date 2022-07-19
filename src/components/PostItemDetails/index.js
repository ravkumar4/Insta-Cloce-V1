import './index.css'

const PostItemDetails = props => {
  const {post} = props
  const {
    caption,
    comments,
    userId,
    userName,
    profilePic,
    imageUrl,
    createdAt,
    likesCount,
    postId,
  } = post

  return (
    <li className="post-item">
      <div className="user-profile-container">
        <img
          src={profilePic}
          alt="user profile"
          className="post-user-profile"
        />
        <p className="post-user-id">{userId}</p>
      </div>
      <img src={imageUrl} alt="user post" className="user-post-image" />
    </li>
  )
}
export default PostItemDetails
