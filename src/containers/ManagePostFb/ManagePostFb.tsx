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
import { Loader } from '../../components/common/Loader/Loader';
import { dataHeaderTableManagePost, dataHeaderTableProduct } from '../../constants';
import { convertFullTime } from '../../helpers';
import { useDebounce } from '../../hooks';
import { apiProducts } from '../../services/api';
import { apiPosts } from '../../services/api/apiPost';
import './ManagePostFb.scss';

export const ManagePostFb = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dbValue = useDebounce(searchText, 400);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleFetchData = () => {
    setIsLoading(true);
    apiPosts.getAll({ page }).then((res) => {
      const { posts, pagination } = res.data.data;
      setTotalPages(pagination.totalPages);
      setProducts(posts);
      setIsLoading(false);
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
      // <SvgCheck
      //   isActive={selected.includes(id)}
      //   key={id}
      //   onClick={handleSelectItem(id)}
      // />,
      // id,
      <p key={id} className="products__content">
        {content}
      </p>,
      product?.name || 'Tên sản phẩm',
      groups?.map((gr) => <li key={gr.id}>{gr.name}</li>),
      convertFullTime(createdAt),
      <Dropdown
        key={id}
        options={[
          // {
          //   text: 'Chỉnh sửa',
          //   cb: () => {
          //     navigate(`/product/${id}`);
          //   },
          // },
          // { text: 'Xoá', cb: handleDltItem(id) },
          {
            text: 'Chi tiết',
            cb: () => {
              navigate(`/post/${id}`);
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
      {isLoading ? (
        <Loader />
      ) : (
        <Table dataHeader={dataHeaderTableManagePost} dataTable={memoizedDataTable} />
      )}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Box>
  );
};
