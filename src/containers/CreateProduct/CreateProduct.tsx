import React, { useEffect } from 'react';
import { Box, InputText } from '../../components/common';
import './CreateProduct.scss';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';

type TypeForm = {
  name: string;
  code: string;
  weight: string;
};

export const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>();

  const onSubmit = (data: TypeForm) => {
    console.log(data);
  };
  return (
    <div className="create-product">
      <Box>
        <InputText
          label="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
          className="create-product__field"
          {...register('name', {
            required: {
              value: true,
              message: 'Vui lòng nhập tên sản phẩm',
            },
            maxLength: {
              value: 100,
              message: 'Vui lòng nhập không quá 100 kí tự',
            },
          })}
          error={errors.name && errors.name.message}
        />

        <InputText
          label="Mã sản phẩm "
          placeholder="Nhập mã sản phẩm "
          className="create-product__field"
          {...register('code', {
            required: {
              value: true,
              message: 'Vui lòng nhập mã sản phẩm ',
            },
            maxLength: {
              value: 100,
              message: 'Vui lòng nhập không quá 10 kí tự',
            },
          })}
          error={errors.code && errors.code.message}
        />

        <InputText
          label="Khối lượng "
          placeholder="Nhập khối lượng "
          className="create-product__field"
          {...register('weight', {
            required: {
              value: true,
              message: 'Vui lòng nhập khối lượng ',
            },
          })}
          error={errors.weight && errors.weight.message}
        />

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </Box>
    </div>
  );
};
