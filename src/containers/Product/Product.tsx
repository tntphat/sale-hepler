import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SvgCheck, SvgNavigate } from '../../assets/svg';
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
import { COLOR, dataHeaderTableProduct, dataHeaderTableProductCore } from '../../constants';
import { ImageLogoFacebook, ImageLogoShopee, ImageLogoTiki, LOGO } from '../../constants/images';
import { convertFullTime, formatCurrency } from '../../helpers';
import { useDebounce, useModalLoading } from '../../hooks';
import {
  apiCategory,
  apiProducts,
  apiSendoProduct,
  apiTikiProduct,
  apiTikiSeller,
} from '../../services/api';
import './Product.scss';

export const Product = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dbValue = useDebounce(searchText, 400);
  const navigate = useNavigate();
  const { handleOpenModalLoading, handleCloseModalLoading } = useModalLoading();
  const [isLoading, setIsLoading] = useState(false);
  const handleFetchData = () => {
    setIsLoading(true);
    apiProducts.getProducts({ page, name: dbValue }).then((res) => {
      setTotalPages(res.data.data.pagination.totalPages);
      setProducts(res.data.data.products);
      setIsLoading(false);
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
        <SvgCheck isActive={selected.includes(id)} key={sku} onClick={handleSelectItem(id)} />,
        sku,
        name,
        type,
        stockAvailable?.reduce((prev, cur) => prev + cur.quantity, 0),
        formatCurrency(exportPrice),
        stockAvailable?.map((site) => {
          const color = COLOR[site.ecSite.toUpperCase()];
          let image = LOGO[site.ecSite];
          const cb = () => {
            switch (site.ecSite) {
              case 'Facebook':
                navigate('/product/posts/fb/' + id);

                break;

              case 'Tiki':
                handleNavigateECommerceLink(apiTikiProduct.getLinkProduct, 'Tiki')(sku);

                break;
              case 'Sendo':
                handleNavigateECommerceLink(apiSendoProduct.getLinkProduct, 'Sendo')(sku);
            }
          };

          return (
            <img
              src={image}
              key={site._id}
              onClick={cb}
              style={{ width: 30, height: 30, cursor: 'pointer', marginRight: 5 }}
            />
            // <div
            //   key={site._id}
            //   style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            //   onClick={cb}
            // >
            //   <SvgNavigate color={color} />
            //   <p style={{ color }}>{site.ecSite}</p>
            // </div>
          );
        }),
        convertFullTime(createdAt),
        isAllowSell ? '??ang b??n' : 'Ng???ng b??n',
        <Dropdown
          key={sku}
          options={[
            // {
            //   text: 'Ch???nh s???a',
            //   cb: () => {
            //     navigate(`/product/${id}`);
            //   },
            // },
            { text: 'Xo??', cb: handleDltItem(id) },
            {
              text: 'Chi ti???t',
              cb: () => {
                navigate(`/product/${id}`);
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
    const cloneArr = JSON.parse(JSON.stringify(dataHeaderTableProductCore));
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
          placeholder="T??m ki???m s???n ph???m"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          className="products__search-input"
        />
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          {selected.length ? (
            <Button marginRight={15} onClick={handleDltItems} className="products__btn-dlt">
              Xo??
            </Button>
          ) : null}
          <Button onClick={() => navigate('/create-product')}>T???o s???n ph???m</Button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <Table dataHeader={memoizedDataHeader} dataTable={memoizedDataTable} />
      )}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Box>
  );
};
