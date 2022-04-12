import React from 'react';
import { SvgAngle, SvgFlag, SvgGroup, SvgMsg, SvgOrder, SvgPacket } from '../../../assets/svg';
import { SvgPlusRound } from '../../../assets/svg/SvgPlusRound';
import { ImageEmptyConnect } from '../../../constants/images';
import { Box, Button, Item } from '../../common';
import './BoxChannel.scss';

type TypeBoxChannel = {
  color?: string;
  onClick?: () => void;
  onClickConnect?: () => void;
  count?: number;
  channel?: string;
  isEmpty?: boolean;
};

export const BoxChannel: React.FC<TypeBoxChannel> = ({
  color,
  onClick,
  count,
  channel,
  isEmpty,
  onClickConnect,
}) => {
  const renderItem = () => {
    return (
      <div className="box-channel__item">
        <Item
          image="https://cdn.pixabay.com/photo/2022/03/20/14/41/bee-7081014__340.jpg"
          name="Nguyễn Văn Anh"
          subName="tntp@gmail.com"
          className="box-channel__item-info"
          width={40}
        />
        <div className="box-channel__item-detail">
          <div>
            <div>
              <SvgFlag color={color} />
              <b style={{ color }}>2</b>
              <p>Trang đã được kết nổi</p>
            </div>
            <div>
              <SvgPacket color={color} />
              <b style={{ color }}>2</b>
              <p>Món hàng đang được bán</p>
            </div>
            <div>
              <SvgMsg color={color} />
              <b style={{ color }}>2</b>
              <p>Tin nhắn mới</p>
            </div>
          </div>

          <div>
            <div>
              <SvgGroup color={color} />
              <b style={{ color }}>2</b>
              <p>Nhóm đã được kết nổi</p>
            </div>
            <div>
              <SvgPacket color={color} />
              <b style={{ color }}>2</b>
              <p>Món hàng đang được bán</p>
            </div>
            <div>
              <SvgMsg color={color} />
              <b style={{ color }}>2</b>
              <p>Tin nhắn mới</p>
            </div>
          </div>
        </div>

        <SvgAngle className="box-channel__item-arrow" color={color} />
      </div>
    );
  };
  const renderItemECommerce = () => {
    return (
      <div className="box-channel__item box-channel__item--ecommerce">
        <Item
          image="https://cdn.pixabay.com/photo/2022/03/20/14/41/bee-7081014__340.jpg"
          name="Nguyễn Văn Anh"
          subName="tntp@gmail.com"
          className="box-channel__item-info"
          width={40}
        />
        <div className="box-channel__item-detail box-channel__item-detail--ecommerce">
          <div>
            <div>
              <SvgOrder color={color} />
              <b style={{ color }}>2</b>
              <p>/4 Đơn hàng đã được kết nổi</p>
            </div>
            <div>
              <SvgPacket color={color} />
              <b style={{ color }}>2</b>
              <p>/8 Món hàng đã được kết nối</p>
            </div>
          </div>
        </div>

        <SvgAngle
          className="box-channel__item-arrow box-channel__item-arrow--ecommerce"
          color={color}
        />
      </div>
    );
  };
  return (
    <Box background={color} classname="box-channel">
      <div className="box-channel__header">{channel}</div>
      <div className={`box-channel__body ${isEmpty ? 'box-channel__body--center' : ''}`}>
        {isEmpty ? (
          <>
            <img src={ImageEmptyConnect} />
            <p style={{ color }}>Bạn chưa kết nối tài khoản {channel} nào</p>
            <Button
              onClick={onClickConnect}
              background={color}
              className="box-channel__btn-connect"
            >
              Kết nối ngay
            </Button>
          </>
        ) : (
          <>
            {channel === 'Facebook' ? renderItem() : renderItemECommerce()}
            {channel === 'Facebook' ? renderItem() : renderItemECommerce()}
            {/* {renderItem()} */}
          </>
        )}
      </div>
      <div className="box-channel__footer"></div>
    </Box>
  );
};
