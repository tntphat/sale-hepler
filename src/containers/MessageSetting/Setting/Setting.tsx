import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SvgPlus } from '../../../assets/svg';
import { Button, CustomTextArea } from '../../../components/common';
import { ModalForm } from '../../../components/common/Modal';
import { useAppSelector } from '../../../redux';
import { apiMessages } from '../../../services/api';
import { SettingSelection } from './SettingSelection/SettingSelection';
import './Setting.scss';
import { useDispatch } from 'react-redux';
import { toggleLoading } from '../../../redux/slice/apiSlice/messagesSlice';

export const Setting = () => {
  // const timeOptions = [
  //   {
  //     id: 1,
  //     title: '3 giờ',
  //   },
  //   {
  //     id: 2,
  //     title: '6 giờ',
  //   },
  //   {
  //     id: 3,
  //     title: '12 giờ',
  //   },
  // ];
  const dispatch = useDispatch();
  const { loadingSetting } = useAppSelector((state) => state.messagesSlice);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSubmitAdd = async () => {
    if (inputValue.trim() === '') {
      setError('Nhập từ khóa');
      return;
    }
    setIsOpenAddModal(false);
    const payload = {
      greetingText: inputValue,
    };
    dispatch(toggleLoading());
    await apiMessages.turnOnGreeting(payload);
    dispatch(toggleLoading());
    setInputValue('');
  };

  useEffect(() => {
    const fetchGreeting = async () => {
      const greeting = await apiMessages.getGreeting();
      setGreeting(greeting.data.data);
      // if (greeting.data.data.greeting) {
      // }
    };
    fetchGreeting();
  }, [loadingSetting]);
  // console.log(greeting?.greeting);

  return (
    <div className="setting">
      <div className="setting__section">
        <div className="message-setting__title">
          <p>Khi khách hàng bắt đầu cuộc trò chuyện</p>
        </div>

        {greeting?.isOn && <SettingSelection content={greeting?.greeting} />}

        {!greeting?.isOn ? (
          <>
            <div className="setting__btn-add" onClick={() => setIsOpenAddModal(true)}>
              <Button className="button--basic">
                <SvgPlus color={'#1877f2'} />
                <span>Thêm</span>
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* <div className="setting__section">
        <div className="setting__header">
          <p>Khi vắng mặt</p>
          <ToggleButton />
        </div>

      </div>

      <div className="setting__section">
        <div className="setting__header">
          <p>Khi khách hàng không trả lời</p>
          <ToggleButton />
        </div>
        <div className="setting__time-option">
          <span>Trong</span>
          <div className="selection">
            <Controller
              name="city"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  data={timeOptions}
                  placeholder="Thời gian"
                  onChange={(e: any) => {
                    onChange(e);
                  }}
                  value={value}
                  error={errors.branch?.message}
                  className="dropdown-select--small"
                />
              )}
            />
          </div>
        </div>
      </div> */}

      <form onSubmit={handleSubmit(handleSubmitAdd)}>
        <ModalForm
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          agreeText="Xác nhận"
          // handleSubmit={handleSubmitAdd}
        >
          <div className="setting__edit-modal">
            <div className="setting__modal-title">
              <h4>Thêm tin nhắn mẫu</h4>
            </div>
            <CustomTextArea
              id="greeting"
              placeholder="Nhập lời chào"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              error={error}
            />
          </div>
        </ModalForm>
      </form>
    </div>
  );
};
