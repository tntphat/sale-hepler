import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SvgTo } from '../../assets/svg';
import { Box, Item, ScrollHorizontal } from '../../components/common';
import { handleLinkToFbPost } from '../../helpers';
import { useDraggable } from '../../hooks';
import { doSetModalMedia, useAppDispatch, useAppSelector } from '../../redux';
import { apiPosts } from '../../services/api/apiPost';
import './DetailPost.scss';

export const DetailPost = ({ post: postProp }) => {
  const refScroll = useDraggable();
  const { id } = useParams();
  const [post, setPost] = useState(postProp);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const handleOpenMedia = (media: any) => {
    dispatch(doSetModalMedia(media));
  };
  useEffect(() => {
    if (!id || postProp) return;
    apiPosts.getSpecificPost(id).then((res) => {
      setPost(res.data.data.post);
    });
  }, [id]);
  return (
    <Box title="Bài viết" classname="detail-post">
      <div className="detail-post__header">
        <Item image={user?.picture} subName={user?.name} width={50} />
        <SvgTo />
        <div className="detail-post__groups">
          {post?.groups.map((gr, index) => (
            <p
              onClick={() => {
                handleLinkToFbPost(post?.fbPostIds[index]);
              }}
              key={gr.id}
            >
              {gr.name}{' '}
            </p>
          ))}
        </div>
      </div>

      <p>{post?.content}</p>
      <ScrollHorizontal ref={refScroll} className={'horizontal-medias'}>
        {post?.images.map((image) => (
          <div key={image} onClick={() => handleOpenMedia(image)}>
            <img
              src={image}
              // style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
            {/* <div className="close-wrapper" onClick={() => handleRemoveImage(ind)}>
                <SvgClose />
              </div> */}
          </div>
        ))}
      </ScrollHorizontal>
    </Box>
  );
};
