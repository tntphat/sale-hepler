import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SvgTo } from '../../assets/svg';
import { Box, Item, ScrollHorizontal } from '../../components/common';
import { handleLinkToFbPost } from '../../helpers';
import { useDraggable } from '../../hooks';
import { doSetModalMedia, useAppDispatch, useAppSelector } from '../../redux';
import { apiProducts } from '../../services/api';
import { apiPosts } from '../../services/api/apiPost';
import { DetailPost } from './DetailPost';
import './DetailPost.scss';

export const DetailMultiPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!id) return;
    apiProducts.getPostsProduct(id).then((res) => {
      setPosts(res.data.data);
    });
  }, [id]);
  return (
    <div>
      {posts?.map((post) => (
        <DetailPost post={post} key={post._id} />
      ))}
    </div>
  );
};
