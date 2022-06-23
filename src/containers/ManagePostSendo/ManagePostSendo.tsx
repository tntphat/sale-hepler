import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgAngle, SvgCheck } from '../../assets/svg';
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
import { dataHeaderTableProduct } from '../../constants';
import { convertFullTime, formatCurrency } from '../../helpers';
import { useDebounce, useModalLoading } from '../../hooks';
import { apiProducts, apiSendoProduct } from '../../services/api';
import './ManagePostTiki.scss';

export const ManagePostSendo = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState('');
  const [previousToken, setPreviousToken] = useState();
  const [nextToken, setNextToken] = useState();
  const dbValue = useDebounce(searchText, 400);
  const navigate = useNavigate();
  const { handleOpenModalLoading, handleCloseModalLoading } = useModalLoading();

  const handleFetchData = () => {
    apiSendoProduct.getProducts({ page_size: 12, product_name: dbValue, token }).then((res) => {
      setTotalPages(Math.ceil(res.data.data.total_records / 12));
      setPreviousToken(res.data.data.previous_token);
      setNextToken(res.data.data.next_token);
      setProducts(res.data.data.data);
    });
  };
  useEffect(() => {
    handleFetchData();
  }, [token, dbValue]);

  useEffect(() => {
    setToken('');
  }, [dbValue]);

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

  const handleNavigateECommerceLink = (action: any, site: any) => {
    return (sku: string) => {
      handleOpenModalLoading();
      action(sku)
        .then((res: any) => {
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
          sku,
        }: any,
        index,
      ) => [
        id,
        name,
        category_4_name || 'Loại sản pẩm',
        stock_quantity,
        formatCurrency(price || final_price_min),
        convertFullTime(updated_at_timestamp * 1000),
        stock ? 'Đang bán' : 'Ngừng bán',
        <Dropdown
          key={id}
          options={[
            {
              text: 'Chi tiết',
              cb: () => {
                // navigate(`/product/tiki/${id}`);
                handleNavigateECommerceLink(apiSendoProduct.getLinkProduct, 'Sendo')(sku);
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
      <div className="pagination">
        <span
          className={!previousToken ? 'disable' : 'active'}
          onClick={() => previousToken && setToken(previousToken)}
        >
          <SvgAngle />
        </span>

        <span
          className={!nextToken ? 'disable' : 'active'}
          onClick={() => nextToken && setToken(nextToken)}
        >
          <SvgAngle />
        </span>
      </div>
    </Box>
  );
};
