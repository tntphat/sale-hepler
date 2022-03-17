import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

import './Login.scss';
import background from '../../assets/img/bg-01.jpg';
import { useAppDispatch, useAppSelector } from '../../redux';
import { login } from '../../redux/slice/authSlice';
import { clearMessage } from '../../redux/slice/messageSlice';

export const Login = (props: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { message } = useAppSelector((state) => state.messageSlice);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    const { email, password } = data;
    setLoading(true);

    appDispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Tên đăng nhập hoặc mật khẩu sai.');
      });
  };

  return (
    <div className="limiter">
      <div className="container" style={{ backgroundImage: `url(${background})` }}>
        <div className="wrap p-l-55 p-r-55 p-t-65 p-b-54">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <span className="form-title p-b-49">Đăng nhập</span>
            <TextField
              error={errors.email?.type === 'required'}
              id="email"
              label="Email"
              helperText={errors.email?.type === 'required' && 'Nhập email'}
              variant="standard"
              {...register('email', {
                required: true,
              })}
              fullWidth
            />

            <TextField
              error={errors.password?.type === 'required'}
              id="password"
              type="password"
              label="Mật khẩu"
              helperText={errors.password?.type === 'required' && 'Nhập mật khẩu'}
              variant="standard"
              {...register('password', {
                required: true,
                minLength: 6,
              })}
              fullWidth
            />
            <div className="text-right p-t-8 p-b-31">
              <a href="#">Quên mật khẩu?</a>
            </div>

            {message && <span className="warning">{error}</span>}

            <div className="container-form-btn p-t-31">
              <div className="wrap-form-btn">
                <div className="form-bgbtn"></div>
                <button type="submit" disabled={loading} className="form-btn">
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
