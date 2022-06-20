import React, { useState } from 'react';
import { Box, Button, Item, Modal } from '../../../components/common';
import './BuyerGroups.scss';

export const BuyerGroups = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box classname="buyer-groups" title="Quản lý nhóm" maxWidth={650}>
      <h3>Danh sách nhóm quan tâm</h3>
      <Item
        className="buyer-groups__item"
        image="https://cdn.pixabay.com/photo/2022/05/06/17/09/sheep-7178748__340.jpg"
        subName="NHóm bán Iphone"
        icon={<Button isSecondary>Gỡ</Button>}
      />
      <Item
        className="buyer-groups__item"
        image="https://cdn.pixabay.com/photo/2022/05/06/17/09/sheep-7178748__340.jpg"
        subName="NHóm bán Iphone"
        icon={<Button isSecondary>Gỡ</Button>}
      />
      <Item
        className="buyer-groups__item"
        image="https://cdn.pixabay.com/photo/2022/05/06/17/09/sheep-7178748__340.jpg"
        subName="NHóm bán Iphone"
        icon={<Button isSecondary>Gỡ</Button>}
      />

      <Button onClick={() => setIsOpen(true)} className="buyer-groups__button" isSecondary>
        Thêm
      </Button>
      <Modal isOpen={isOpen} className="buyer-groups__modal" setIsOpen={setIsOpen}>
        <h3>Danh sách nhóm </h3>
        <Item
          className="buyer-groups__item"
          image="https://cdn.pixabay.com/photo/2022/05/06/17/09/sheep-7178748__340.jpg"
          subName="NHóm bán Iphone"
          icon={<Button isSecondary>Thêm</Button>}
        />
        <Item
          className="buyer-groups__item"
          image="https://cdn.pixabay.com/photo/2022/05/06/17/09/sheep-7178748__340.jpg"
          subName="NHóm bán Iphone"
          icon={<Button isSecondary>Thêm</Button>}
        />
        <Item
          className="buyer-groups__item"
          image="https://cdn.pixabay.com/photo/2022/05/06/17/09/sheep-7178748__340.jpg"
          subName="NHóm bán Iphone"
          icon={<Button isSecondary>Thêm</Button>}
        />
      </Modal>
    </Box>
  );
};
