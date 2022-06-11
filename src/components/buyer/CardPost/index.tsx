import React from 'react';
import { convertTime } from '../../../helpers';
import { AvatarUser, Box } from '../../common';
import './CardPost.scss';

export const CardPost: React.FC<any> = ({ post }) => {
  return (
    <Box
      classname="card-post"
      onClick={() => {
        const [grId, postId] = post.id.split('_');
        window.open(`https://www.facebook.com/groups/${grId}/posts/${postId}`, '_blank');
      }}
    >
      <div className="card-post__top">
        {/* <img src="https://cdn.pixabay.com/photo/2022/02/20/09/34/animal-7024072__340.png" /> */}
        <AvatarUser img={post?.from?.picture} />
        <div className="card-post__info">
          <p className="card-post__name">{post?.from?.name}</p>
          <span className="card-post__time">{convertTime(post.updated_time)}</span>
        </div>
      </div>
      <p className="card-post__content">{post.message}</p>
      {post.link ? <img src={post.link} /> : null}
      <div className="card-post__actions">
        <p>Like</p>
        <p>Comment</p>
        <p>Share</p>
      </div>
    </Box>
  );
};
