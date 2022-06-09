import { Controller } from 'react-hook-form';
import { DropdownSelect, DropdownSelectMultiple } from '../../common';
import React, { useMemo } from 'react';

const renderField = (item: any, register: any, errors: any, control: any) => {
  const { name, id, control_type, is_required, attribute_values, is_custom, is_checkout } = item;

  const Component = control_type === 'CheckBox' ? DropdownSelectMultiple : DropdownSelect;

  const memoizedAttrValues = useMemo(() => {
    return attribute_values.map((item) => ({
      ...item,
      is_selected: true,
      attribute_img: 'https://cdn.pixabay.com/photo/2022/03/30/14/01/rose-7101236__340.jpg',
      is_custom: false,
    }));
  }, [attribute_values]);

  return (
    <Controller
      name={`attributes`}
      control={control}
      key={id}
      render={({ field: { onChange, value, ref } }) => {
        const index = value?.findIndex((item) => item.id === id);

        return (
          <Component
            label={name}
            data={memoizedAttrValues}
            titleProp="value"
            placeholder={'Chọn loại' + name}
            onChange={(val) => {
              const clone = JSON.parse(JSON.stringify(value || []));
              // const newVal = { ...val, is_selected: true };
              if (index > -1) {
                clone[index].attribute_values = val;
              } else {
                clone.push({
                  id,
                  is_checkout,
                  is_custom: false,
                  attribute_values: val,
                });
              }
              onChange(clone);
            }}
            value={index > -1 ? value[index].attribute_values : []}
            error={errors['attributes']?.message}
          />
        );
      }}
      rules={
        is_required && {
          required: {
            value: true,
            message: 'Vui lòng chọn loại',
          },
        }
      }
    />
  );

  // return <React.Fragment key={id}>{ItemRender}</React.Fragment>;
};
export const FormAttributesSendo: React.FC<any> = ({
  register,
  errors,
  arrAttributes,
  control,
}) => {
  return <div>{arrAttributes.map((item) => renderField(item, register, errors, control))}</div>;
};
