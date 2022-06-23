import React, { useEffect, useState } from 'react';
import { CardPost } from '../../../components/buyer/CardPost';
import { Box, SearchText } from '../../../components/common';
import { Chip } from '../../../components/common/Chip';
import { Loader } from '../../../components/common/Loader/Loader';
import { useModalLoading } from '../../../hooks';
import { apiFbPosts } from '../../../services/api';
import { apiFavoriteKeywords } from '../../../services/api/facebook/apiFavoriteKeywords';
import './BuyerHome.scss';

export const BuyerHome = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [listKw, setListKw] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoadingNf, setIsLoadingNf] = useState(false);

  useEffect(() => {
    if (listKw.length) return;
    apiFavoriteKeywords.getListKeyword(1).then((res) => {
      setListKw(res.data.data.keywords);
    });
  }, []);

  useEffect(() => {
    setIsLoadingNf(true);
    const controller = new AbortController();
    const task = new Promise((resolve, reject) => {
      controller.signal.addEventListener('abort', () => {
        reject();
      });
      apiFbPosts
        .getInterestedPosts({
          keyword: listKw.map((kw: any) => kw.content).join(','),
        })
        .then((res) => {
          resolve(res.data.data.posts);
        });
    }).then((res: any) => {
      setPosts(res);
      setIsLoadingNf(false);
    });
    return () => {
      controller.abort();
    };
  }, [listKw]);

  const handleDltKw = (id: string | number) => {
    const ind = listKw.findIndex((kw: any) => kw._id === id);
    listKw.splice(ind, 1);
    setListKw([...listKw]);
  };

  const handleAddItem = (text: string) => {
    const ind = listKw.findIndex((kw: any) => kw.content.toLowerCase() === text.toLowerCase());
    if (ind > -1) {
      return;
    }
    setListKw((pre) => [...pre, { content: text }]);
  };

  const onKeyPress = (e: any) => {
    if (e.code === 'Enter' && inputText) {
      handleAddItem(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="buyer-home">
      <div>
        {isLoadingNf ? (
          <Loader />
        ) : (
          posts.map((post: any) => <CardPost key={post.id} post={post} />)
        )}
      </div>
      <Box title="Tìm kiếm" classname="buyer-home__search">
        <SearchText
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <div className="buyer-home__chips-container">
          {listKw.map((kw: any, index: number) => (
            <Chip text={kw.content} key={index} onClick={() => handleDltKw(kw._id)} />
          ))}
        </div>
      </Box>
    </div>
  );
};
