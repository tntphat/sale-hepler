import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgCheck, SvgNavigate } from '../../../assets/svg';
import { SvgDots } from '../../../assets/svg/SvgDots';
import { Box, Dropdown, Pagination, SearchText, Table, Button } from '../../../components/common';
import { COLOR, dataHeaderTableAdminUsers } from '../../../constants';
import { convertTime, formatCurrency } from '../../../helpers';
import { useDebounce, useModalLoading } from '../../../hooks';
import { apiProducts, apiSendoProduct, apiTikiProduct } from '../../../services/api';
import { apiAdminUsers } from '../../../services/api/admin/apiUsers';

export const AdminUsers = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dbValue = useDebounce(searchText, 400);
  const navigate = useNavigate();
  const { handleOpenModalLoading, handleCloseModalLoading } = useModalLoading();
  const handleFetchData = () => {
    apiAdminUsers.getAllUsers();
    apiProducts.getProducts({ page, name: dbValue }).then((res) => {
      setTotalPages(res.data.data.pagination.totalPages);
      setProducts(res.data.data.products);
    });
  };
  useEffect(() => {
    handleFetchData();
  }, [page, dbValue]);

  useEffect(() => {
    setPage(1);
  }, [dbValue]);

  const handleSelectItem = (index: string) => {
    return () => {
      const ind = selected.indexOf(index);
      if (ind > -1) {
        selected.splice(ind, 1);
      } else {
        selected.push(index);
      }
      setSelected([...selected]);
    };
  };

  const handleDltItem = (index: string) => {
    return () => {
      // apiProducts.deleteProduct(index).then(() => {
      //   handleFetchData();
      // });
    };
  };

  const handleClickSelectAll = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map((prod, ind) => prod.id));
    }
  };

  const handleDltItems = () => {
    console.log('delete multiple');

    //   apiProducts.deleteProducts(selected).then(() => {
    //     handleFetchData();
    //   });
  };

  const memoizedDataTable = useMemo(() => {
    const handleNavigateECommerceLink = (action, site) => {
      return (sku) => {
        handleOpenModalLoading();
        action(sku)
          .then((res) => {
            if (res.data.data.link) window.open(res.data.data.link);
            else {
              if (site === 'Tiki') {
                navigate('/product/tiki/' + res.data.data.id);
              }
            }
          })
          .finally(() => {
            handleCloseModalLoading();
          });
      };
    };
    return products.map(
      (
        {
          branch,
          sku,
          type,
          name,
          exportPrice,
          createdAt,
          isAllowSell,
          id,
          stockAvailable,
        }: IProduct,
        index,
      ) => [
        <SvgCheck
          isActive={selected.includes(id)}
          key={sku}
          // onClick={() => {console.log('oh no')}}
          onClick={handleSelectItem(id)}
        />,
        'tntp@gmail.com',
        'Fat To',
        <>
          {['Facebook', 'Tiki', 'Sendo'].map((site) => {
            const color = COLOR[site.toUpperCase()];
            return (
              <div
                key={site}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                //   onClick={cb}
              >
                <SvgNavigate color={color} />
                <p style={{ color }}>{site}</p>
              </div>
            );
          })}
        </>,
        10,
        10,
        13,
        <p
          key={id}
          style={{
            color: '#27ae60',
            // '#d63031'
          }}
        >
          Đang hoạt động
        </p>,
        <Dropdown
          key={sku}
          options={[
            {
              text: 'Khóa',
              cb: () => {},
            },
            { text: 'Gỡ khóa', cb: handleDltItem(id) },
          ]}
        >
          <SvgDots />
        </Dropdown>,
      ],
    );
  }, [products, selected]);

  const memoizedDataHeader = useMemo(() => {
    const cloneArr = JSON.parse(JSON.stringify(dataHeaderTableAdminUsers));
    cloneArr.unshift({
      title: (
        <SvgCheck isActive={selected.length === products.length} onClick={handleClickSelectAll} />
      ),
      width: '50px',
    });
    return cloneArr;
  }, [selected, products]);
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
          {selected.length ? (
            <Button onClick={handleDltItems} className="products__btn-dlt">
              Xoá
            </Button>
          ) : null}
        </div>
      </div>
      <Table dataHeader={memoizedDataHeader} dataTable={memoizedDataTable} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Box>
  );
};
