import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import background from '../../../assets/img/bg-01.jpg';
import { InputText } from '../../../components/common';
import { setCookie } from '../../../helpers';
import { LOCAL_TOKEN_ADMIN } from '../../../constants';

export const AdminLogin = (props: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const { email, password } = data;
    setLoading(true);
    if (email === 'admin' && password === 'admin') {
      setCookie(365, 'admin', LOCAL_TOKEN_ADMIN);
      navigate('/admin/users');
    } else {
      setMessage('Sai mật khẩu hoặc email');
    }
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

            {message && <span className="warning">{message}</span>}

            <div className="form__button">
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
