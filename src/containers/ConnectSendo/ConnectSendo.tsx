import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, InputText } from '../../components/common';
import { useModalLoading } from '../../hooks';
import { apiSendoAuth } from '../../services/api';

type TypeForm = {
  shop_key: string;
  secret_key: string;
};

export const ConnectSendo = () => {
  const navigate = useNavigate();
  const { handleCloseModalLoading, handleOpenModalLoading } = useModalLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<TypeForm>();
  const onSubmit = (data) => {
    handleOpenModalLoading();
    apiSendoAuth.connection(data).then(() => {
      navigate('/');
      handleCloseModalLoading();
    });
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
