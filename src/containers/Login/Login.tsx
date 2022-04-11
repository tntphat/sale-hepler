import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './Login.scss';
import background from '../../assets/img/bg-01.jpg';
import { useAppDispatch, useAppSelector } from '../../redux';
import { login } from '../../redux/slice/authSlice';
import { clearMessage } from '../../redux/slice/messageSlice';
import { SvgFacebook, SvgGoogle } from '../../assets/svg';
import { InputText } from '../../components/common';

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
        <div className="login">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <span className="form__title">Đăng nhập</span>
            <InputText
              error={errors.email?.type === 'required' && errors.email.message}
              id="email"
              label="Email"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Nhập Email',
                },
              })}
            />

            <InputText
              error={errors.password?.type === 'required' && errors.password?.message}
              id="password"
              type="password"
              label="Mật khẩu"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Nhập mật khẩu',
                },
              })}
            />
            <div className="form__forgot-password">
              <a href="#">Quên mật khẩu?</a>
            </div>

            {message && <span className="warning">{error}</span>}

            <div className="form__button">
              <div className="wrap-form-btn">
                <div className="form-bgbtn"></div>
                <button type="submit" disabled={loading} className="form-btn">
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>

          <div className="form__selection">
            <span>Hoặc đăng nhập bằng</span>
          </div>

          <div className="form__social-login">
            <div className="form__social-login__item">
              <SvgFacebook />
            </div>
            <div className="form__social-login__item">
              <SvgGoogle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
