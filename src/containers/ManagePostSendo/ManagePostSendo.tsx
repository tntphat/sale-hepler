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
import { dataHeaderTableManagePost, dataHeaderTableProduct } from '../../constants';
import { convertTime, formatCurrency } from '../../helpers';
import { useDebounce } from '../../hooks';
import {
  apiCategory,
  apiProducts,
  apiSendoProduct,
  apiTikiProduct,
  apiTikiSeller,
} from '../../services/api';
import './ManagePostTiki.scss';

export const ManagePostSendo = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dbValue = useDebounce(searchText, 400);
  const navigate = useNavigate();

  useEffect(() => {
    // apiTikiProduct.getProducts().then(console.log);
  }, []);

  const handleFetchData = () => {
    apiSendoProduct.getProducts({ page, name: dbValue }).then((res) => {
      setTotalPages(Math.ceil(res.data.data.total_records / 12));
      console.log(res.data.data, 'haha');

      setProducts(res.data.data.data);
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
    apiProducts.deleteProducts(selected).then(() => {
      handleFetchData();
    });
  };

  const memoizedDataTable = useMemo(() => {
    return products.map(
      (
        {
          // products: [product],
          id,
          name,
          category_4_name,
          stock_quantity,
          price,
          stock,
          final_price_min,
          updated_at_timestamp,
        }: any,
        index,
      ) => [
        // <SvgCheck isActive={selected.includes(id)} key={id} onClick={handleSelectItem(id)} />,
        id,
        name,
        category_4_name || 'Loại sản pẩm',
        stock_quantity,
        formatCurrency(price || final_price_min),
        convertTime(updated_at_timestamp * 1000),
        stock ? 'Đang bán' : 'Ngừng bán',
        <Dropdown
          key={id}
          options={[
            {
              text: 'Chỉnh sửa',
              cb: () => {
                navigate(`/product/tiki/${id}`);
              },
            },
            // { text: 'Xoá', cb: handleDltItem(id) },
            {
              text: 'Chi tiết',
              cb: () => {
                navigate(`/product/tiki/${id}`);
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
    const cloneArr = JSON.parse(JSON.stringify(dataHeaderTableProduct));
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
      </div>
      <Table dataHeader={dataHeaderTableProduct} dataTable={memoizedDataTable} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Box>
  );
};
