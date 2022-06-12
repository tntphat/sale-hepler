import React, { useEffect, useState } from 'react';
import { Box, CheckBoxControl } from '../../../components/common';
import { Chip } from '../../../components/common/Chip';
import { useDebounce, useModalLoading } from '../../../hooks';
import { apiFavoriteKeywords } from '../../../services/api/facebook/apiFavoriteKeywords';
import './BuyerSetting.scss';

export const BuyerSetting = () => {
  const [listKw, setListKw] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isOnNoti, setIsOnNoti] = useState(true);
  const dbText = useDebounce(inputText, 300);
  const { handleCloseModalLoading, handleOpenModalLoading } = useModalLoading();

  useEffect(() => {
    apiFavoriteKeywords.getListKeyword(1).then((res) => {
      setListKw(res.data.data.keywords);
    });
  }, []);

  useEffect(() => {
    if (dbText.trim() === '') setInputText('');
    if (dbText.includes(' ') && dbText.trim() !== '') {
      handleAddItem(dbText.trim());
      // setHashtags([...hashtags, currentText.trim()]);
      setInputText('');
    }
  }, [dbText]);

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

  const handleDltKw = (id) => {
    handleOpenModalLoading();
    apiFavoriteKeywords
      .deleteKeyword(id)
      .then((res) => {
        const ind = listKw.findIndex((kw) => kw.id === id);
        listKw.splice(ind, 1);
        setListKw([...listKw]);
      })
      .finally(() => {
        handleCloseModalLoading();
      });
  };

  return (
    <Box title="Cài đặt" maxWidth={650}>
      <CheckBoxControl
        label={'Thông báo khi có bài đăng mới'}
        value={isOnNoti}
        onChange={setIsOnNoti}
        isRow
      />
      <div className="chips-container">
        {listKw.map((kw) => (
          <Chip text={kw.content} key={kw.id} onClick={() => handleDltKw(kw.id)} />
        ))}
        <input
          type="text"
          className="chips-container__input"
          value={inputText}
          placeholder={listKw.length ? 'Keyword' : 'Nhập Keyword'}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
    </Box>
  );
};