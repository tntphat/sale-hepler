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
import { convertTime } from '../../helpers';
import { useDebounce } from '../../hooks';
import { apiCategory, apiProducts, apiTikiSeller } from '../../services/api';
import { apiPosts } from '../../services/api/apiPost';
import './ManagePostFb.scss';

export const ManagePostFb = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dbValue = useDebounce(searchText, 400);
  const navigate = useNavigate();
  const handleFetchData = () => {
    apiPosts.getAll({ page }).then((res) => {
      const { docs, ...rest } = res.data.data.posts;
      setTotalPages(rest.totalPages);
      setProducts(docs);
    });
    // apiProducts.getProducts({ page, name: dbValue }).then((res) => {
    //   setTotalPages(res.data.data.pagination.totalPages);
    //   setProducts(res.data.data.products);
    // });
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
    return products.map(({ content, createdAt, groups, images, id, product }: any, index) => [
      <SvgCheck
        isActive={selected.includes(id)}
        key={id}
        // onClick={() => {console.log('oh no')}}
        onClick={handleSelectItem(id)}
      />,
      id,
      <p key={id} className="products__content">
        {content}
      </p>,
      product?.name || 'Tên sản phẩm',
      groups?.map((gr) => <li key={gr.id}>{gr.name}</li>),
      convertTime(createdAt),
      <Dropdown
        key={id}
        options={[
          {
            text: 'Chỉnh sửa',
            cb: () => {
              navigate(`/post/${id}`);
            },
          },
          // { text: 'Xoá', cb: handleDltItem(id) },
          {
            text: 'Chi tiết',
            cb: () => {
              navigate(`/product/${id}`);
            },
          },
        ]}
      >
        <SvgDots />
      </Dropdown>,
    ]);
  }, [products, selected]);

  const memoizedDataHeader = useMemo(() => {
    const cloneArr = JSON.parse(JSON.stringify(dataHeaderTableManagePost));
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

        {/* {selected.length ? (
          <Button onClick={handleDltItems} className="products__btn-dlt">
            Xoá
          </Button>
        ) : null} */}
      </div>
      <Table dataHeader={memoizedDataHeader} dataTable={memoizedDataTable} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Box>
  );
};
