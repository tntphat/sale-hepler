import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgCheck, SvgNavigate } from '../../../assets/svg';
import { SvgDots } from '../../../assets/svg/SvgDots';
import { Box, Dropdown, Pagination, SearchText, Table, Button } from '../../../components/common';
import {
  COLOR,
  dataHeaderTableAdminUsersAnalysis,
  dataHeaderTableAdminUsersSite,
} from '../../../constants';
import { convertTime, formatCurrency } from '../../../helpers';
import { useDebounce, useModalLoading } from '../../../hooks';
import { apiProducts, apiSendoProduct, apiTikiProduct } from '../../../services/api';
import { apiAdminAnalysis } from '../../../services/api/admin';
import { apiAdminUsers } from '../../../services/api/admin/apiUsers';

export const AdminAnalysis = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dbValue = useDebounce(searchText, 400);
  // const navigate = useNavigate();
  // const { handleOpenModalLoading, handleCloseModalLoading } = useModalLoading();
  const handleFetchData = () => {
    apiAdminAnalysis.getAllAnalysis({ page, name: dbValue }).then((res) => {
      setTotalPages(res.data.data.pagination.totalPages);
      setProducts(res.data.data.analysis);
    });
  };
  useEffect(() => {
    handleFetchData();
  }, [page, dbValue]);

  useEffect(() => {
    setPage(1);
  }, [dbValue]);

  const handleDltItem = (index: string, isBlocked: boolean) => {
    return () => {
      const action = !isBlocked ? apiAdminUsers.blockUser : apiAdminUsers.unBlockUser;

      action(index).then(() => {
        handleFetchData();
      });
    };
  };

  const memoizedDataTable = useMemo(() => {
    return products.map(
      (
        {
          userInfo: { name, picture, email, id, isBlocked },
          numberOrders,
          numberPosts,
          numberProducts,
        }: any,
        index,
      ) => [
        email || name,
        <React.Fragment key={id}>
          {numberPosts.facebookCount ? (
            <div
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              //   onClick={cb}
            >
              <p style={{ color: COLOR.FACEBOOK }}>Facebook: {numberPosts.facebookCount}</p>
            </div>
          ) : null}
          {numberPosts.sendoCount ? (
            <div
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              //   onClick={cb}
            >
              <p style={{ color: COLOR.SENDO }}>Sendo: {numberPosts.sendoCount}</p>
            </div>
          ) : null}
          {numberPosts.tikiCount ? (
            <div
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              //   onClick={cb}
            >
              <p style={{ color: COLOR.TIKI }}>TIki: {numberPosts.tikiCount}</p>
            </div>
          ) : null}
        </React.Fragment>,
        // name,
        numberProducts,
        numberOrders,
        <p
          key={id}
          style={{
            color: isBlocked ? '#d63031' : '#27ae60',
            //
          }}
        >
          {isBlocked ? 'Đã chặn' : 'Đang hoạt động'}
        </p>,
        <Dropdown
          key={id}
          options={[
            !isBlocked
              ? {
                  text: 'Khóa',
                  cb: handleDltItem(id, isBlocked),
                }
              : { text: 'Gỡ khóa', cb: handleDltItem(id, isBlocked) },
          ]}
        >
          <SvgDots />
        </Dropdown>,
      ],
    );
  }, [products, selected]);

  return (
    <Box>
      <div className="products__row">
        <SearchText
          placeholder="Tìm kiếm người dùng"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="products__search-input"
        />
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          {/* {selected.length ? (
            <Button onClick={handleDltItems} className="products__btn-dlt">
              Xoá
            </Button>
          ) : null} */}
        </div>
      </div>
      <Table
        dataHeader={dataHeaderTableAdminUsersAnalysis}
        dataTable={memoizedDataTable}
        minWidth={0}
        maxWidth={1000}
      />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Box>
  );
};
