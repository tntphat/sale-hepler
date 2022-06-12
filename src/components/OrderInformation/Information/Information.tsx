import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from '../../../hooks';
import { useAppSelector } from '../../../redux';
import { apiMessages } from '../../../services/api';
import { DropdownSelect, InputText } from '../../common';
import { Modal, ModalForm } from '../../common/Modal';
import './Information.scss';
export const Information = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
    setValue,
  } = useForm();

  const { selectedChat } = useAppSelector((state) => state.messagesSlice);

  const { state, onSelectCity, onSelectDistrict, onSelectedWard, onSubmit } = useLocation();

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  // const [city, setCity] = useState<string>('');
  // const [district, setDistrict] = useState<string>('');
  // const [ward, setWard] = useState<string>('');
  // const [phone, setPhone] = useState<string>('');
  // const [detailAddress, setDetailAddress] = useState<string>('');
  // const [remark, setRemark] = useState<string>('');
  // const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [city, setCity] = useState<any>('');
  const [district, setDistrict] = useState<any>('');
  const [ward, setWard] = useState<any>('');
  const [phone, setPhone] = useState<any>('');
  const [detailAddress, setDetailAddress] = useState<any>('');
  const [remark, setRemark] = useState<any>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  // const [defaultCity, setDefaultCity] = useState<any>(null);
  // const [defaultDistrict, setDefaultDistrict] = useState<any>(null);
  // const [defaultWard, setDefaultWard] = useState<any>(null);

  // const handleChangeRemark = (e: any)=>{
  //   setRemark(e.target.value);
  // }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await apiMessages.getCustomerInfo(selectedChat);
      const info = data.data.data.customerInfo;
      // setCity(info.city);
      // setDistrict(info.district);
      // setWard(info.subDistrict);
      setDetailAddress(info.detailAddress);
      setPhone(info.phoneNumber);
      setRemark(info.remark);
      setValue('phoneNumber', info.phoneNumber);
      setValue('remark', info.remark);
      setValue('detailAddress', info.detailAddress);
    };
    fetchUserInfo();
  }, [selectedChat, isOpenModal]);

  const handleSubmitForm = async (data: any) => {
    setIsOpenModal(false);
    const newForm = { ...data };
    for (let key in newForm) {
      if (typeof newForm[key] === 'object') {
        newForm[key] = newForm[key].title;
      }
    }

    await apiMessages.updateCustomerInfo(newForm, selectedChat);
  };

  return (
    <>
      <div>
        <div className="information__title">
          <h4 className="information__section-title">Thông tin</h4>
          <h4
            className="information__section-action"
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            Chỉnh sửa
          </h4>
        </div>
        <div className="information__content">
          <div className="information__detail">
            <div className="information__detail--title">Địa chỉ:</div>
            <div className="information__detail--content">
              {detailAddress && (
                <span>
                  {`${detailAddress},`}
                  {/* <br /> */}
                  {/* {`${ward}, ${district}, ${city}`} */}
                </span>
              )}
            </div>
          </div>

          <div className="information__detail">
            <div className="information__detail--title">Số điện thoại: </div>
            <div className="information__detail--content">{phone}</div>
          </div>

          <div className="information__detail">
            <span className="information__detail--title">Ghi chú: </span>
            <span className="information__detail--content">{remark}</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ModalForm isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
          <div className="setting-selection__modal-title">
            <h4>Chỉnh sửa thông tin</h4>
          </div>
          {/* <div className="information__two-column">
            <Controller
              name="city"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  data={cityOptions}
                  placeholder="Tỉnh/Thành phố (*)"
                  onChange={(e: any) => {
                    onChange(e);
                    onSelectCity(e);
                    // setCity(selectedCity);
                  }}
                  value={selectedCity || defaultCity}
                  // defaultValue={city}
                  error={errors.city?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Vui lòng chọn Tỉnh/Thành phố',
                },
              }}
            />
            <Controller
              name="district"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  data={districtOptions}
                  placeholder="Quận/Huyện (*)"
                  onChange={(e: any) => {
                    onChange(e);
                    onSelectDistrict(e);
                    // setDistrict(selectedDistrict);
                  }}
                  value={selectedDistrict || defaultDistrict}
                  // defaultValue={district}
                  error={errors.district?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Vui lòng chọn Quận/Huyện',
                },
              }}
            />

            <Controller
              name="subDistrict"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  data={wardOptions}
                  placeholder="Phường/Xã (*)"
                  onChange={(e: any) => {
                    onChange(e);
                    // onSelectedWard(e);
                    setWard(selectedWard);
                  }}
                  value={selectedWard || defaultWard}
                  // defaultValue={selectedWard}
                  error={errors.subDistrict?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Vui lòng chọn Phường/Xã',
                },
              }}
            />
          </div> */}

          <InputText
            label="Địa chỉ (*)"
            // className="create-product__field"
            {...register('detailAddress', {
              required: {
                value: true,
                message: 'Vui lòng nhập địa chỉ cụ thể ',
              },
            })}
            error={errors.detailAddress && errors.detailAddress.message}
          />

          <InputText
            label="Số điện thoại (*)"
            // className="create-product__field"
            {...register('phoneNumber', {
              required: {
                value: true,
                message: 'Vui lòng nhập số điện thoại',
              },
            })}
            error={errors.phoneNumber && errors.phoneNumber.message}
          />
          <InputText
            label="Ghi chú"
            // className="create-product__field"
            // value={remark}
            {...register('remark', {})}
          />
        </ModalForm>
      </form>
    </>
  );
};
