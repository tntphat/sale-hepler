import React, { useEffect, useState } from 'react';
import { apiTikiInventory, apiTikiSeller } from '../../services/api';
import { DropdownSelect } from '../common';

export const InventoryTypeSelect = ({ onChange, value }) => {
  const [inventories, setInventories] = useState([]);
  useEffect(() => {
    apiTikiInventory.getAll().then((res) => {
      setInventories(res.data.map((inven, index) => ({ ...inven, id: index })));
    });
  }, []);

  return (
    <DropdownSelect
      data={inventories}
      value={value}
      titleProp="customer"
      onChange={onChange}
      placeholder="Chọn loại"
      label="Chọn loại kiểm kê"
    />
  );
};
