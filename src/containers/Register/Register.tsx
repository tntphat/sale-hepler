import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import './Register.scss';
import background from '../../assets/img/bg-01.jpg';
import { useAppDispatch, useAppSelector } from '../../redux';
import { signup } from '../../redux/slice/apiSlice/authSlice';
import { clearMessage } from '../../redux/slice';
import { InputText } from '../../components/common';
import { SvgFacebook } from '../../assets/svg/SvgFacebook';
import { SvgGoogle } from '../../assets/svg/SvgGoogle';

export const Register = () => {
  const navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const { message } = useAppSelector((state) => state.messageSlice);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

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
        <div className="register">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <span className="form__title">Đăng ký</span>
            <div>
              {/* <InputText
                error={errors.name?.type === 'required' && errors.name.message}
                id="name"
                label="Họ và tên"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Nhập Họ và tên',
                  },
                })}
              /> */}

              <InputText
                error={errors.email && errors.email.message}
                id="email"
                label="Email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Nhập Email',
                  },
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Email không hợp lệ',
                  },
                })}
              />

              <InputText
                error={errors.password && errors.password.message}
                type="password"
                id="password"
                label="Mật khẩu"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Nhập Mật khẩu',
                  },
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu tối thiểu 6 kí tự',
                  },
                })}
              />

              <InputText
                error={errors.confirm_password && errors.confirm_password.message}
                type="password"
                id="confirm_password"
                label="Xác nhận mật khẩu"
                {...register('confirm_password', {
                  required: {
                    value: true,
                    message: 'Nhập Xác nhận mật khẩu',
                  },
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Mật khẩu và mật khẩu xác nhận không trùng khớp';
                    }
                  },
                })}
              />

              <div className="form__button">
                <div className="wrap-form-btn">
                  <div className="form-bgbtn"></div>
                  <button type="submit" className="form-btn">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="form__selection">
            <span>Hoặc đăng ký bằng</span>
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
      {message && <span className="warning">Đăng ký không thành công.</span>}
    </div>
  );
};
