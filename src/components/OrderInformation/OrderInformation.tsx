import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SvgAdd } from '../../assets/svg/SvgAdd';
import { useLocation } from '../../hooks';
import { Button, DropdownSelect, InputText } from '../common';
import { Scrollbar } from '../common/Srollbar/Scrollbar';
import './OrderInformation.scss';
import { Product } from './Product/Product';
import { Tag } from './Tag/Tag';
export const OrderInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>();
  // const onChange = () => {};
  const { state, onSelectCity, onSelectDistrict, onSelectedWard, onSubmit } = useLocation();

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  return (
    <div className="order-info">
      <Scrollbar classname="scrollbar__order-information">
        <div className="order-info__information">
          <div className="order-info__title">
            <h5>Địa chỉ</h5>
          </div>
          <div className="order-info__two-column">
            <Controller
              name="city"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  data={cityOptions}
                  placeholder="Tỉnh/Thành phố"
                  onChange={(e: any) => {
                    onChange(e);
                    onSelectCity(e);
                  }}
                  value={selectedCity}
                  error={errors.branch?.message}
                />
              )}
            />
            <Controller
              name="district"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  data={districtOptions}
                  placeholder="Quận/Huyện"
                  onChange={(e: any) => {
                    onChange(e);
                    onSelectDistrict(e);
                  }}
                  value={selectedDistrict}
                  error={errors.branch?.message}
                />
              )}
            />

            <Controller
              name="ward"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  data={wardOptions}
                  placeholder="Phường/Xã"
                  onChange={(e: any) => {
                    onChange(e);
                    onSelectedWard(e);
                  }}
                  value={selectedWard}
                  error={errors.branch?.message}
                />
              )}
            />
            <InputText
              placeholder="Số điện thoại"
              className="create-product__field"
              {...register('desc', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập mô tả ',
                },
              })}
              error={errors.desc && errors.desc.message}
            />
          </div>
          <InputText
            placeholder="Địa chỉ cụ thể"
            className="create-product__field"
            {...register('desc', {
              required: {
                value: true,
                message: 'Vui lòng nhập mô tả ',
              },
            })}
            error={errors.desc && errors.desc.message}
          />
        </div>

        <div className="order-info__product">
          <div className="order-info__title">
            <h5>Sản phẩm</h5>
            <SvgAdd />
          </div>
          {/* <Scrollbar classname="scrollbar__order-information"> */}
          <Product
            img={
              'https://kenh14cdn.com/203336854389633024/2021/9/3/photo-1-16306417221131994914891.jpg'
            }
          />
          <Product
            img={
              'https://cdn.tgdd.vn/Products/Images/2386/92114/bhx/thung-12-hop-sua-tuoi-tiet-trung-th-true-milk-nguyen-chat-hop-1-lit-201903131359109964.jpg'
            }
          />
          <Product
            img={'https://freenice.net/wp-content/uploads/2021/08/anh-dai-dien-BTS-dep.jpg'}
          />
          <Product
            img={
              'https://cdn.tgdd.vn/Products/Images/2386/92114/bhx/thung-12-hop-sua-tuoi-tiet-trung-th-true-milk-nguyen-chat-hop-1-lit-201903131359109964.jpg'
            }
          />
          <Product
            img={
              'https://cdn.tgdd.vn/Products/Images/2386/92114/bhx/thung-12-hop-sua-tuoi-tiet-trung-th-true-milk-nguyen-chat-hop-1-lit-201903131359109964.jpg'
            }
          />
          {/* </Scrollbar> */}
          <div className="order-info__note">
            <InputText
              placeholder="Ghi chú"
              className="create-product__field"
              {...register('desc', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập mô tả ',
                },
              })}
              // error={errors.desc && errors.desc.message}
            />
          </div>
        </div>
        <div className="order-info__button">
          <Button onClick={handleSubmit(onSubmit)} className="button-right">
            Tạo đơn hàng
          </Button>
        </div>

        <div className="order-info__tag">
          <div className="order-info__title">
            <h5>Nhãn</h5>
            <SvgAdd />
          </div>
          <Tag name="Quan trọng" color="red" />
          <Tag name="VIP" color="green" />
          <Tag name="Boom hàng" color="gray" />
        </div>
      </Scrollbar>
    </div>
  );
};
