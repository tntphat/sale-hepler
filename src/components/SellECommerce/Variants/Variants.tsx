import React, { useEffect, useState } from 'react';
import { SvgImage } from '../../../assets/svg';
import { apiTikiSeller } from '../../../services/api';
import { Button, DropdownSelectMultiple, FileDropzone, InputText } from '../../common';
import { InventoryTypeSelect } from '../../InventoryTypeSelect/InventoryTypeSelect';
import './Variants.scss';

const VariantItem = ({
  onChange,
  variant,
  options,
  index,
  allVariants,
  warehouses,
  sellerWareHouses,
}) => {
  const handleChangeProp = (prop: string, value: any) => {
    let newValue = value;
    if (typeof value === 'function') {
      newValue = value(variant[prop]);
    }
    const clone = [...allVariants];
    clone[index][prop] = newValue;
    onChange(clone);
  };

  useEffect(() => {
    if (!options?.length) {
      const clone = [...allVariants];
      for (let i = 1; i < 10; ++i) {
        delete clone[index]['option' + i];
      }
      onChange(clone);
    }
  }, [options?.length]);
  return (
    <div className="variant-container">
      <InputText
        label={'Mã SKU'}
        placeholder={'Nhập Mã SKU'}
        onChange={(e) => handleChangeProp('sku', e.target.value)}
        value={variant.sku || ''}
      />
      <InputText
        label={'Mã min code'}
        placeholder={'Nhập Mã min code'}
        onChange={(e) => handleChangeProp('min_code', e.target.value)}
        value={variant.min_code || ''}
      />
      <InputText
        label={'Giá'}
        placeholder={'Nhập giá'}
        onChange={(e) => handleChangeProp('price', e.target.value)}
        value={variant.price || ''}
      />

      {options?.map((opt, index) => (
        <InputText
          key={opt.id}
          label={opt.option_label}
          placeholder={'Nhập ' + opt.option_label}
          onChange={(e) => handleChangeProp('option' + (index + 1), e.target.value)}
          value={variant['option' + (index + 1)] || ''}
        />
      ))}

      {variant.warehouse_stocks?.length
        ? sellerWareHouses.map((item, index) => (
            <InputText
              key={variant.warehouse_stocks[index].warehouseId}
              label={item.name}
              placeholder={'Nhập số lượng'}
              type="number"
              onChange={(e) =>
                handleChangeProp('warehouse_stocks', (pre) => {
                  const clone = [...(pre || [])];
                  clone[index].qtyAvailable = e.target.value;
                  return clone;
                })
              }
              value={variant.warehouse_stocks[index]?.qtyAvailable || ''}
            />
          ))
        : null}
      <div className="variant-container__file-dropzone">
        <FileDropzone
          clickOpen
          setImages={(value) => handleChangeProp('image', value)}
          isNotMultiple
        >
          {variant.image && variant.image[0] ? (
            <img src={URL.createObjectURL(variant.image[0])} />
          ) : (
            <SvgImage />
          )}
        </FileDropzone>
      </div>
    </div>
  );
};

export const Variants: React.FC<any> = ({ options, value, onChange }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [sellerWareHouses, setSellerWareHouses] = useState([]);
  const [inventoryType, setInventoryType] = useState(null);
  useEffect(() => {
    apiTikiSeller.getWareHouses().then((res) => {
      setWarehouses(res.data.data);
    });
  }, []);

  useEffect(() => {
    onChange(
      value?.map((variant) => ({
        ...variant,
        inventory_type: inventoryType?.inventory_type,
        seller_warehouse: sellerWareHouses.map((item) => item.id).join(','),
        warehouse_stocks: sellerWareHouses.map((item) => {
          let quantity = 0;
          const index = variant.warehouse_stocks?.findIndex((wh) => wh.warehouseId === item.id);
          if (index > -1) quantity = variant.warehouse_stocks[index].qtyAvailable;
          return {
            qtyAvailable: quantity,
            warehouseId: item.id,
          };
        }),
      })),
    );
  }, [inventoryType, sellerWareHouses, value?.length]);

  return (
    <>
      <InventoryTypeSelect value={inventoryType} onChange={(inven) => setInventoryType(inven)} />

      <DropdownSelectMultiple
        label="Warehouse"
        value={sellerWareHouses}
        data={warehouses}
        onChange={(warehouses) => setSellerWareHouses(warehouses)}
        titleProp="name"
        placeholder="Chọn warehouse"
      />

      {value?.map((variant, index) => (
        <VariantItem
          key={index}
          onChange={onChange}
          variant={variant}
          options={options}
          index={index}
          allVariants={value}
          warehouses={warehouses}
          sellerWareHouses={sellerWareHouses}
        />
      ))}

      <Button marginTop={20} onClick={() => onChange(value ? [...value, {}] : [{}])}>
        Thêm
      </Button>
    </>
  );
};
