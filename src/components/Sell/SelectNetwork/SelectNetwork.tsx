import React, { useEffect, useState } from 'react';
import { SvgCheck } from '../../../assets/svg';
import { Box, Item } from '../../common';
import './SelectNetwork.scss';

type IListNetwork = {
  title?: string;
  className?: string;
  hideTickAll?: boolean;
  selectedGroups: Array<IResGroup>;
  setSelectedGroups: React.Dispatch<React.SetStateAction<Array<IResGroup>>>;
  optionsGroups: Array<IResGroup>;
};

export const ListNetWork: React.FC<IListNetwork> = ({
  title,
  className,
  hideTickAll,
  selectedGroups,
  setSelectedGroups,
  optionsGroups,
}) => {
  const handleClickItem = (item: IResGroup) => {
    const ind = selectedGroups.findIndex((gr) => gr.id === item.id);
    if (ind > -1) selectedGroups.splice(ind, 1);
    else selectedGroups.push(item);
    setSelectedGroups([...selectedGroups]);
  };
  const handleSelectAll = () => {
    if (selectedGroups.length === optionsGroups.length) setSelectedGroups([]);
    else setSelectedGroups(optionsGroups);
  };
  return (
    <div className={`network ${className || ''}`}>
      <div className="network__header">
        <h2>{title || 'Facebook'}</h2>
        {hideTickAll ? null : (
          <div className="network__select-all" onClick={handleSelectAll}>
            <SvgCheck isActive={optionsGroups?.length === selectedGroups.length} />
            <span>Chọn tất cả</span>
          </div>
        )}
      </div>
      <div className="network__list">
        {optionsGroups?.length === 0 && <p>Bạn chưa tham gia nhóm nào</p>}
        {optionsGroups?.map((item) => (
          <Item
            className="network__item"
            image={item.picture?.data?.url}
            name={item.name}
            //   subName="accountshopee1"
            icon={
              <SvgCheck
                onClick={() => handleClickItem(item)}
                isActive={selectedGroups.findIndex((gr) => gr.id === item.id) > -1}
              />
            }
            isOval
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

type TypeSelectNetwork = {
  selectedGroups: Array<IResGroup>;
  setSelectedGroups: React.Dispatch<React.SetStateAction<Array<IResGroup>>>;
  optionsGroups: Array<IResGroup>;
};

export const SelectNetwork: React.FC<TypeSelectNetwork> = ({
  selectedGroups,
  setSelectedGroups,
  optionsGroups,
}) => {
  return (
    <Box title="Chọn sàn đăng">
      <div className="select-network">
        <ListNetWork
          selectedGroups={selectedGroups}
          setSelectedGroups={setSelectedGroups}
          optionsGroups={optionsGroups}
        />
      </div>
    </Box>
  );
};
