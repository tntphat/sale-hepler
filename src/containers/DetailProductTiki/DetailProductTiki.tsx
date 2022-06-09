import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SvgDots } from '../../assets/svg/SvgDots';
import { Box, Dropdown, HorizontalMedias, ScrollHorizontal } from '../../components/common';
import { useDraggable } from '../../hooks';
import { doSetModalMedia, useAppDispatch } from '../../redux';
import { apiTikiProduct } from '../../services/api';
import './DetailProductTiki.scss';

export const DetailProductTiki = () => {
  const { id } = useParams();
  const [detailRequest, setDetailRequest] = useState();
  const navigate = useNavigate();
  const refScroll = useDraggable();
  const dispatch = useAppDispatch();
  const renderDetailProduct = () => {
    if (!detailRequest) return;
    const {
      name,
      images,
      price,
      sku,
      original_sku,
      reason,
      created_at,
      state,
      image,
      _id,
      market_price,
      state_description,
    } = detailRequest;
    //   const { name, }
    const handleReplayRequest = () => {
      apiTikiProduct
        .replayProductRequest(_id)
        .then(() => {
          navigate('/manage/tiki');
        })
        .then(() => {
          window.location.reload();
        });
    };
    const handleDltRequest = () => {
      apiTikiProduct
        .deleteProductRequest(_id)
        .then(() => {
          navigate('/manage/tiki');
        })
        .then(() => {
          window.location.reload();
        });
    };
    const handleOpenMedia = (media: any) => {
      dispatch(doSetModalMedia(media));
    };

    const renderOptions = () => {
      const options = [];
      switch (state) {
        case 'md_awaiting_approve':
          options.push({ text: 'Xoá', cb: handleDltRequest });
          break;
        default:
          options.push({ text: 'Gửi lại', cb: handleReplayRequest });
      }
      return options;
    };
    return (
      <div className="detail-product">
        <Dropdown className="detail-product__dropdown" options={renderOptions()}>
          <SvgDots />
        </Dropdown>

        <img src={image} />
        <div className="detail-product__grid">
          <span>Tên sản phẩm: </span>
          <span>{name}</span>
          <span>Trạng thái: </span>
          <span>{state_description}</span>
          <span>Giá sản phẩm: </span>
          <span>{market_price}</span>
        </div>
        <ScrollHorizontal ref={refScroll}>
          {images?.map((item) => (
            <div key={item} onClick={() => handleOpenMedia(item)}>
              <img src={item} />
            </div>
          ))}
        </ScrollHorizontal>
        {reason ? (
          <>
            <p>Lý do từ chối</p>
            <ul className="detail-product__reasons">
              <li>{reason}</li>
              {/* {reasons?.map((rs, ind) => (
            <li key={ind}>{rs.reason_name}</li>
          ))} */}
            </ul>
          </>
        ) : null}
      </div>
    );
  };

  useEffect(() => {
    apiTikiProduct.getProductRequest(id).then((res) => setDetailRequest(res.data.data));
  }, []);

  return <Box title="Thông tin sản phẩm">{renderDetailProduct()}</Box>;
};
