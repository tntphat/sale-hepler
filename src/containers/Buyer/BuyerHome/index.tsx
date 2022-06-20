import React, { useEffect, useState } from 'react';
import { CardPost } from '../../../components/buyer/CardPost';
import { Box, SearchText } from '../../../components/common';
import { Chip } from '../../../components/common/Chip';
import { Loader } from '../../../components/common/Loader/Loader';
import { useModalLoading } from '../../../hooks';
import { apiFbPosts } from '../../../services/api';
import { apiPosts } from '../../../services/api/apiPost';
import { apiFavoriteKeywords } from '../../../services/api/facebook/apiFavoriteKeywords';
import './BuyerHome.scss';

export const BuyerHome = () => {
  const [posts, setPosts] = useState([]);
  const [listKw, setListKw] = useState([]);
  const [inputText, setInputText] = useState('');
  const { handleCloseModalLoading, handleOpenModalLoading } = useModalLoading();
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
          keyword: listKw.map((kw) => kw.content).join(','),
        })
        .then((res) => {
          resolve(res.data.data.posts);
        });
    }).then((res) => {
      setPosts(res);
      setIsLoadingNf(false);
    });

    // const pm: any = apiFbPosts.getInterestedPosts({
    //   keyword: listKw.map((kw) => kw.content).join(','),
    // })
    // pm.then((res) => {
    //   setPosts(res.data.data.posts);
    //   setIsLoadingNf(false);
    // });

    return () => {
      controller.abort();
    };
  }, [listKw]);

  const handleDltKw = (id) => {
    handleOpenModalLoading();
    apiFavoriteKeywords
      .deleteKeyword(id)
      .then((res) => {
        const ind = listKw.findIndex((kw) => kw._id === id);
        listKw.splice(ind, 1);
        setListKw([...listKw]);
      })
      .finally(() => {
        handleCloseModalLoading();
      });
  };

  const handleAddItem = (text) => {
    const ind = listKw.findIndex((kw) => kw.content.toLowerCase() === text.toLowerCase());
    if (ind > -1) {
      return;
    }
    handleOpenModalLoading();
    apiFavoriteKeywords
      .createKeyword(text)
      .then((res) => {
        setListKw((pre) => [...pre, res.data.data.keyword]);
      })
      .finally(() => {
        handleCloseModalLoading();
      });
  };

  const onKeyPress = (e) => {
    if (e.code === 'Enter' && inputText) {
      handleAddItem(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="buyer-home">
      <div>
        {isLoadingNf ? <Loader /> : posts.map((post) => <CardPost key={post.id} post={post} />)}
      </div>
      <Box title="Tìm kiếm">
        <SearchText
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <div className="buyer-home__chips-container">
          {listKw.map((kw) => (
            <Chip text={kw.content} key={kw._id} onClick={() => handleDltKw(kw._id)} />
          ))}
        </div>
      </Box>
    </div>
  );
};
