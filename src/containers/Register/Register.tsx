import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import './Register.scss';
import background from '../../assets/img/bg-01.jpg';
import { useAppDispatch, useAppSelector } from '../../redux';
import { signup } from '../../redux/slice/authSlice';
import { clearMessage } from '../../redux/slice/messageSlice';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const { message } = useAppSelector((state) => state.messageSlice);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Nhập họ và tên'),
    email: Yup.string().required('Nhập email').email('Email không hợp lệ'),
    password: Yup.string().required('Nhập mật khẩu').min(6, 'Mật khẩu phải chứa ít nhất 6 kí tự'),
    confirm_password: Yup.string()
      .required('Nhập xác nhận mật khẩu')
      .oneOf([Yup.ref('password')], 'Mật khẩu và xác nhận mật khẩu không trùng nhau'),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data: any) => {
    const { name, email, password, confirm_password } = data;

    setSuccessful(false);

    appDispatch(signup({ name, email, password, confirm_password }))
      .unwrap()
      .then(() => {
        navigate('/login');
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="limiter">
      <div className="container" style={{ backgroundImage: `url(${background})` }}>
        <div className="wrap p-l-55 p-r-55 p-t-65 p-b-54">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="form-title p-b-49">Đăng ký</span>
            <div>
              <TextField
                error={errors.name?.type === 'required'}
                id="name"
                label="Họ và tên"
                helperText={errors.name?.message}
                variant="standard"
                {...register('name')}
                fullWidth
              />

              <TextField
                error={errors.email?.type === 'required' || errors.email?.type === 'email'}
                id="email"
                label="Email"
                helperText={errors.email?.message}
                variant="standard"
                {...register('email')}
                fullWidth
              />

              <TextField
                error={errors.password?.type === 'required' || errors.password?.type === 'min'}
                type="password"
                id="password"
                label="Mật khẩu"
                helperText={errors.password?.message}
                variant="standard"
                {...register('password')}
                fullWidth
              />

              <TextField
                error={
                  errors.confirm_password?.type === 'required' ||
                  errors.confirm_password?.type === 'oneOf'
                }
                type="password"
                id="confirm_password"
                label="Xác nhận mật khẩu"
                helperText={errors.confirm_password?.message}
                variant="standard"
                {...register('confirm_password')}
                fullWidth
              />

              <div className="container-form-btn p-t-31">
                <div className="wrap-form-btn">
                  <div className="form-bgbtn"></div>
                  <button type="submit" className="form-btn">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {message && <span className="warning">Đăng ký không thành công.</span>}
    </div>
  );
};
