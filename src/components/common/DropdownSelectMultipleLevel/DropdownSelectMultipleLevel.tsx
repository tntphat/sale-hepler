import React, { useEffect, useRef, useState } from 'react';
import './DropdownSelectMultipleLevel.scss';

import { DropdownSelectMultipleLevel as DropdownSelectMultipleLevelChild } from './DropdownSelectMultipleLevel';
import { apiCategory } from '../../../services/api';
import { Loader } from '../Loader/Loader';

const Option: React.FC<
  IResOptionCategory & { onSelect: (i: IResOptionCategory) => void; apiGetSpecificCategory: any }
> = ({ onSelect, apiGetSpecificCategory, ...props }) => {
  let timeout;
  const { id, name, is_primary, level } = props;
  const isLeaf = is_primary || level === 4;
  const [options, setOptions] = useState<IResOptionCategory[]>([]);
  const [hovered, setHovered] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();
  // useEffect(() => {
  //   console.log(props);
  // }, []);
  const handleMouseMove = () => {
    setHovered(true);
    clearTimeout(timeout);
    setHovering(true);
  };
  const handleMouseLeave = (e) => {
    timeout = setTimeout(() => {
      setHovering(false);
    }, 500);
  };

  useEffect(() => {
    if (!hovered || isLeaf) return;
    setIsLoading(true);
    apiGetSpecificCategory(id).then((res) => {
      setOptions(res.data?.data || res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 50);
    });
  }, [hovered]);
  return (
    <div
      onClick={isLeaf ? () => onSelect(props) : () => false}
      className="dropdown-select-multiple-level__item"
      key={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      style={{ cursor: isLeaf ? 'pointer' : 'default' }}
    >
      {name}
      {isLeaf || !hovered || !hovering ? null : (
        <DropdownSelectMultipleLevelChild
          options={options}
          isLoading={isLoading}
          onSelect={onSelect}
          apiGetSpecificCategory={apiGetSpecificCategory}
        />
      )}
    </div>
  );
};

export const DropdownSelectMultipleLevel: React.FC<IDropdownSelectMultipleLevel> = ({
  isFirstLevel,
  options,
  isLoading,
  onSelect,
  apiGetSpecificCategory,
}) => {
  return (
    <div
      className={`dropdown-select-multiple-level ${
        isFirstLevel ? 'dropdown-select-multiple-level--first-level' : ''
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        options?.map((option) => (
          <Option
            {...option}
            key={option.id}
            onSelect={onSelect}
            apiGetSpecificCategory={apiGetSpecificCategory}
          />
        ))
      )}
    </div>
  );
};
