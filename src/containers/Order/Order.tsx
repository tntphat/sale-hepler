import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgCheck } from '../../assets/svg';
import { SvgDots } from '../../assets/svg/SvgDots';
import {
  Box,
  Button,
  CheckBox,
  Dropdown,
  Pagination,
  SearchText,
  Table,
} from '../../components/common';
import { dataHeaderTableOrder, dataHeaderTableProduct } from '../../constants';
import { convertFullTime, formatCurrency } from '../../helpers';
import { useDebounce } from '../../hooks';
import { apiCategory, apiOrder, apiProducts, apiTikiSeller } from '../../services/api';
import './Order.scss';

export const Order = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [products, setProducts] = useState([]);
  // const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const dbValue = useDebounce(searchText, 400);
  const navigate = useNavigate();
  const handleFetchData = () => {
    apiOrder.getAllOrders(page).then((res) => {
      setTotalPages(res.data.data.pagination.totalPages);
      console.log('data: ', res.data.data.orders);
      setProducts(res.data.data.orders);
    });
  };
  useEffect(() => {
    handleFetchData();
  }, [page]);

  // useEffect(() => {
  //   setPage(1);
  // }, [dbValue]);

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
      apiProducts.deleteProduct(index).then(() => {
        handleFetchData();
      });
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
    apiProducts.deleteProducts(selected).then(() => {
      handleFetchData();
    });
  };

  const memoizedDataTable = useMemo(() => {
    return products.map(
      (
        {
          products,
          state,
          type,
          name,
          exportPrice,
          createdAt,
          total_payment,
          id,
          customer_name,
        }: any,
        index,
      ) => [
        // <SvgCheck isActive={selected.includes(id)} key={id} onClick={handleSelectItem(id)} />,
        id,
        customer_name || 'Fat To',
        products.map((prod) => <li key={prod._id}>{prod.product.name}</li>),
        'Facebook',
        formatCurrency(total_payment),
        convertFullTime(createdAt),
        state,
        <Dropdown
          key={id}
          options={[
            // {
            //   text: 'Chỉnh sửa',
            //   cb: () => {
            //     navigate(`/order/${id}`);
            //   },
            // },
            { text: 'Xoá', cb: handleDltItem(id) },
            {
              text: 'Chi tiết',
              cb: () => {
                navigate(`/order/${id}`);
              },
            },
          ]}
        >
          <SvgDots />
        </Dropdown>,
      ],
    );
  }, [products, selected]);

  const memoizedDataHeader = useMemo(() => {
    const cloneArr = JSON.parse(JSON.stringify(dataHeaderTableOrder));
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
      {/* <div className="products__row">
        <SearchText
          placeholder="Tìm kiếm sản phẩm"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="products__search-input"
        />

        {selected.length ? (
          <Button onClick={handleDltItems} className="products__btn-dlt">
            Xoá
          </Button>
        ) : null}
      </div> */}
      <Table dataHeader={dataHeaderTableOrder} dataTable={memoizedDataTable} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Box>
  );
};
