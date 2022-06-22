import React, { useEffect, useMemo, useState } from 'react';
import { SvgCheck } from '../../../assets/svg';
import { formatCurrency } from '../../../helpers';
import { useDebounce } from '../../../hooks';
import { apiProducts } from '../../../services/api';
import { Pagination, SearchText } from '../../common';
import { Table } from '../Table/Table';
import './TableProduct.scss';
const dataHeader = [
  {
    title: 'Sản phẩm',
    minWidth: '300px',
  },
  {
    title: 'Loại',
    width: '100px',
  },
  {
    title: 'Giá',
    width: '100px',
  },
  {
    title: '',
    width: '80px',
  },
];

export const TableProduct: React.FC<any> = ({
  selectedProducts,
  setSelectedProducts,
  isOpenModal,
}) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const dbValue = useDebounce(searchText, 400);

  const handleFetchData = () => {
    apiProducts.getProducts({ page, name: dbValue }).then((res) => {
      setTotalPages(res.data.data.pagination.totalPages);
      const products = res.data.data.products.map((product: any) => {
        return { ...product, isSelect: false };
      });
      setProducts(products);
    });
  };

  useEffect(() => {
    handleFetchData();
  }, [page, dbValue]);

  useEffect(() => {
    setPage(1);
  }, [dbValue]);

  useEffect(() => {
    const tmpProduct = [...selectedProducts];
    let orderList = [...selectedProducts];
    selected.forEach((product) => {
      if (tmpProduct.every((item) => item.product.id !== product)) {
        const prod = products.find((value: any) => {
          return value.id === product;
        });
        orderList = [
          ...orderList,
          {
            product: prod,
            quantity: 1,
          },
        ];
      } else {
        orderList = orderList.map((value: any) => {
          if (value.product.id === product) {
            const quantity = value.quantity;
            return {
              ...value,
              quantity: quantity + 1,
            };
          }
        });
      }
    });
    setSelectedProducts(orderList);
    setSelected([]);
  }, [isOpenModal]);

  const handleSelectItem = (index: any) => {
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

  const memoizedDataTable = useMemo(() => {
    return products.map((product: IProduct, index) => {
      let { type, name, exportPrice, id } = product;
      return [
        name,
        type,
        formatCurrency(exportPrice),
        <div className="table__select-box">
          <SvgCheck onClick={handleSelectItem(id)} isActive={selected.includes(id)} />
        </div>,
      ];
    });
  }, [products, selected]);

  return (
    <div className="sell__modal">
      <h3>Chọn sản phẩm</h3>
      <SearchText
        onChange={(e: any) => setSearchText(e.target.value)}
        placeholder="Tìm kiếm sản phẩm"
        className="sell__modal-search"
      />
      <Table dataHeader={dataHeader} dataTable={memoizedDataTable} minWidth={0} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
