import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, InputText } from '../../components/common';
import { apiSendoAuth } from '../../services/api';

type TypeForm = {
  shop_key: string;
  secret_key: string;
};

export const ConnectSendo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<TypeForm>();
  const onSubmit = (data) => {
    apiSendoAuth.connection(data);
  };
  return (
    <Box title="Thông tin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          label="Mã shop"
          placeholder="Nhập mã shop"
          className="sell-ecommerce__field"
          {...register('shop_key', {
            required: {
              value: true,
              message: 'Vui lòng nhập key shop',
            },
          })}
          error={errors.shop_key && errors.shop_key.message}
        />
        <InputText
          label="Mã bảo mật"
          placeholder="Nhập mã bảo mật"
          className="sell-ecommerce__field"
          {...register('secret_key', {
            required: {
              value: true,
              message: 'Vui lòng nhập mã bảo mật shop',
            },
          })}
          type="password"
          error={errors.secret_key && errors.secret_key.message}
        />
        <Button onClick={handleSubmit(onSubmit)}>Xác nhận</Button>
      </form>
    </Box>
  );
};
