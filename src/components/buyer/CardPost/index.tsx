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
      {/* {post.link ? <img src={post.link} /> : null} */}
      {post.media.length === 1 ? (
        <img src={post.media[0].src} />
      ) : post.media.length > 1 ? (
        <div className="card-post__photo">
          <img className="photo" src={post.media[0].src} />
          <p>+{post.media.length - 1}</p>
        </div>
      ) : null}
      <div className="card-post__actions">
        <p>Xem chi tiết</p>
      </div>
    </Box>
  );
};
