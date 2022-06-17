import React, { useEffect, useState } from 'react';
import { Box, Button } from '../../components/common';
import { useAppSelector } from '../../redux';
import { apiPages } from '../../services/api';
import './ConnectFacebookPage.scss';

export const ConnectFacebookPage = () => {
  const { pageId } = useAppSelector((state) => state.pageSlice);

  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [connectedPage, setConnectedPage] = useState<any>(null);
  const [isConnectedPage, setIsConnectedPage] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    apiPages.getConnectedPages().then((res) => {
      setConnectedPage(res.data.data);
    });
  }, [isConnectedPage]);

  useEffect(() => {
    apiPages.getAll().then((res) => {
      setPages(res.data.data);
    });
  }, []);

  const handleConnectPage = () => {
    const payload = {
      pageId: selectedPage,
    };
    apiPages.connectPage(payload).then((res) => {
      const isSuccess = res.data.meta.ok;
      if (isSuccess) {
        setIsConnectedPage(true);
        setIsEdit(false);
      }
    });
  };

  const handleChangeSelectedPage = (e: any) => {
    setSelectedPage(e.target.value);
  };

  const handleChangePage = () => {
    setIsEdit(true);
  };

  return (
    <>
      {!connectedPage || isEdit ? (
        <Box classname="connect-page" title="Lựa chọn trang">
          <>
            <h4>Bạn muốn sử dụng trang nào cùng Sale Helper?</h4>
            <div className="connect-page__wrapper">
              {pages.map((page) => {
                return (
                  <div className="connect-page__page">
                    <div className="connect-page__radio-btn">
                      <input
                        type="radio"
                        id={page.id}
                        name="connected-page"
                        value={page.id}
                        onChange={(e) => handleChangeSelectedPage(e)}
                      />
                    </div>
                    <img src={page.picture.data.url} />
                    <div className="connect-page__page-info">
                      <a href={page.link}>
                        <b>{page.name}</b>
                      </a>
                      <p className="connect-page__page-id">{page.id}</p>
                    </div>
                  </div>
                );
              })}
              <div className="connect-page__btn-next">
                <Button onClick={handleConnectPage}>Tiếp</Button>
              </div>
            </div>
          </>
        </Box>
      ) : (
        <Box classname="connect-page" title={connectedPage ? 'Trang đã kết nối' : 'Lựa chọn trang'}>
          <div className="connect-page__page">
            <img src={connectedPage?.picture.data.url} />
            <div className="connect-page__page-info">
              <a href={connectedPage?.link}>
                <b>{connectedPage?.name}</b>
              </a>

              <p className="connect-page__page-id">{connectedPage?.id}</p>
            </div>
            <div>
              <Button onClick={handleChangePage} className="button--basic">
                Thay đổi
              </Button>
            </div>
          </div>
        </Box>
      )}
    </>
  );
};
