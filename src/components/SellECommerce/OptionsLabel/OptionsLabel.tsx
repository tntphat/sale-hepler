import React, { useEffect, useState } from 'react';
import { apiCategory } from '../../../services/api';
import { DropdownSelect, DropdownSelectMultiple } from '../../common';

export const OptionsLabel: React.FC<any> = ({ categoryId, value, onChange }) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (categoryId) {
      apiCategory.getOptionsLabel(categoryId).then((res) => {
        setOptions(res.data.map((item, index) => ({ ...item, id: categoryId + index })));
      });
    }
  }, [categoryId]);

  return (
    <DropdownSelectMultiple
      data={options}
      value={value}
      onChange={onChange}
      titleProp="option_label"
    />
  );
};
