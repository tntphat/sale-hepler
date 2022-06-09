import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Item, ScrollHorizontal } from '../../components/common';
import { useDraggable } from '../../hooks';
import { doSetModalMedia, useAppDispatch, useAppSelector } from '../../redux';
import { apiPosts } from '../../services/api/apiPost';
import './DetailPost.scss';

export const DetailPost = () => {
  const refScroll = useDraggable();
  const { id } = useParams();
  const [isExtended, setIsExtended] = useState(false);
  const [post, setPost] = useState();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const handleOpenMedia = (media: any) => {
    dispatch(doSetModalMedia(media));
  };
  useEffect(() => {
    if (!id) return;
    apiPosts.getSpecificPost(id).then((res) => {
      setPost(res.data.data.post);
    });
  }, [id]);
  return (
    <Box title="Bài viết" classname="detail-post">
      <Item
        image="https://cdn.pixabay.com/photo/2022/02/14/02/39/animal-7012354__340.jpg"
        subName={user?.name}
        width={50}
      />

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
