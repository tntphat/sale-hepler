import React, { useEffect, useMemo, useState } from 'react';
import { formatCurrency } from '../../../helpers';
import { useDebounce } from '../../../hooks';
import { apiProducts } from '../../../services/api';
import { Button, Pagination, SearchText, Table } from '../../common';

const dataTable = [
  [
    1,
    <img
      key="1"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="1">Chọn</Button>,
  ],

  [
    2,
    <img
      key="2"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="2">Chọn</Button>,
  ],
  [
    3,
    <img
      key="3"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="3">Chọn</Button>,
  ],
  [
    4,
    <img
      key="4"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="4">Chọn</Button>,
  ],
  [
    5,
    <img
      key="5"
      src="https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584__340.jpg"
      style={{ maxHeight: '50px', width: 'auto' }}
    />,
    'Iphone 11 Promax like new 99% 512gb',
    '',
    'Apple',
    <Button key="5">Chọn</Button>,
  ],
];

const dataHeader = [
  {
    title: 'STT',
    width: '50px',
  },
  {
    title: 'Mã SKU',
    width: '80px',
  },
  {
    title: 'Sản phẩm',
    minWidth: '300px',
  },
  {
    title: 'Loại',
    width: '80px',
  },
  {
    title: 'Giá',
    width: '80px',
  },
  {
    title: '',
    width: '80px',
  },
];

export const TableProduct: React.FC<any> = ({ setProduct, setIsOpen, setStep }) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dbValue = useDebounce(searchText, 400);

  const handleFetchData = () => {
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

  const memoizedDataTable = useMemo(() => {
    return products.map((product: IProduct, index) => {
      const { branch, sku, type, name, exportPrice, createdAt, isAllowSell, _id } = product;
      return [
        12 * (page - 1) + index + 1,
        sku,
        name,
        type,
        formatCurrency(exportPrice),
        <Button
          onClick={() => {
            setIsOpen(false);
            setProduct(product);
            setStep && setStep(1);
          }}
          key={_id}
          className="sell__btn-select"
        >
          Chọn
        </Button>,
      ];
    });
  }, [products]);

  return (
    <div className="sell__modal">
      <h3>Chọn sản phẩm</h3>
      <div style={{ margin: '10px 0' }}>
        <SearchText placeholder="Tìm kiếm sản phẩm" />
      </div>
      <Table dataHeader={dataHeader} dataTable={memoizedDataTable} minWidth={0} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
