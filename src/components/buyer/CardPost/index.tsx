import React from 'react';
import { SvgTo } from '../../../assets/svg';
import {
  convertFullTime,
  convertTime,
  fromNowTranslation,
  handleLinkToFbPost,
} from '../../../helpers';
import { AvatarUser, Box } from '../../common';
import moment from 'moment';
import './CardPost.scss';

export const CardPost: React.FC<any> = ({ post }) => {
  return (
    <Box
      classname="card-post"
      onClick={() => {
        handleLinkToFbPost(post.id);
      }}
    >
      <div className="card-post__top">
        {/* <img src="https://cdn.pixabay.com/photo/2022/02/20/09/34/animal-7024072__340.png" /> */}
        <AvatarUser img={post?.from?.picture} />
        <div className="card-post__info">
          <div className="card-post__from">
            <p className="card-post__name">{post?.from?.name}</p>
            <SvgTo />
            <p>{post.groupInfo.name}</p>
          </div>
          <span className="card-post__time">
            {fromNowTranslation(moment(post.updated_time), moment(new Date()))}
          </span>
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
