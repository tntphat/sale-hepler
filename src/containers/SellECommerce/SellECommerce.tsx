import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SvgImage } from '../../assets/svg';
import {
  Box,
  Button,
  DropdownSelect,
  FileDropzone,
  HorizontalMedias,
  InputText,
  TextArea,
} from '../../components/common';
import './SellECommerce.scss';

type TypeForm = {
  name: string;
  code: string;
  weight: string;
  unit: string;
  priceIn: string;
  priceOut: string;
  desc: string;
  type: string;
  branch: string;
  left: string;
  width: string;
  height: string;
  length: string;
};

export const SellECommerce = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<TypeForm>();
  const refArea = useRef();
  const refImage = useRef<HTMLInputElement | any>(null);
  const [images, setImages] = useState<any>([]);
  const handleClickOpenInputImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    refImage.current.click();
  };
  const onSubmit = console.log;

  return (
    <div className="sell-ecommerce">
      <Box title="Thông tin cơ bản">
        <InputText
          label="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
          className="sell-ecommerce__field"
          {...register('name', {
            required: {
              value: true,
              message: 'Vui lòng nhập tên sản phẩm',
            },
            maxLength: {
              value: 100,
              message: 'Vui lòng nhập không quá 100 kí tự',
            },
          })}
          error={errors.name && errors.name.message}
        />
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <DropdownSelect
              label="Loại sản phẩm"
              data={[
                {
                  id: 1,
                  title: 'Điện tử',
                },
                {
                  id: 2,
                  title: 'Chin',
                },
              ]}
              placeholder="Chọn loại sản phẩm"
              onChange={onChange}
              value={value}
              error={errors.type?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng chọn loại sản phẩm',
            },
          }}
        />
        <Controller
          name="branch"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <DropdownSelect
              label="Loại thương hiệu"
              data={[
                {
                  id: 1,
                  title: 'Samsung',
                },
                {
                  id: 2,
                  title: 'Apple',
                },
              ]}
              placeholder="Chọn loại thương hiệu"
              onChange={onChange}
              value={value}
              error={errors.branch?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng chọn loại thương hiệu',
            },
          }}
        />
      </Box>
      <Box title="Giá và tồn kho" marginTop={10}>
        <div className="sell-ecommerce__row">
          <InputText
            label="Tên SKU"
            placeholder="Nhập tên SKU"
            className="sell-ecommerce__field"
            {...register('code', {
              required: {
                value: true,
                message: 'Vui lòng nhập tên SKU',
              },
              maxLength: {
                value: 100,
                message: 'Vui lòng nhập không quá 100 kí tự',
              },
            })}
            error={errors.code && errors.code.message}
          />
          <InputText
            label="Giá gốc"
            placeholder="Nhập Giá gốc"
            className="sell-ecommerce__field"
            {...register('priceIn', {
              required: {
                value: true,
                message: 'Vui lòng nhập Giá gốc',
              },
            })}
            error={errors.priceIn && errors.priceIn.message}
            marginTop={0}
          />
          <InputText
            label="Tồn kho"
            placeholder="Nhập Tồn kho"
            className="sell-ecommerce__field"
            {...register('left', {
              required: {
                value: true,
                message: 'Vui lòng nhập Tồn kho',
              },
              maxLength: {
                value: 100,
                message: 'Vui lòng nhập không quá 100 kí tự',
              },
            })}
            error={errors.left && errors.left.message}
          />
          <InputText
            label="Giá khuyến mãi"
            placeholder="Nhập Giá khuyến mãi"
            className="sell-ecommerce__field"
            {...register('priceOut', {
              required: {
                value: true,
                message: 'Vui lòng nhập Giá khuyến mãi',
              },
            })}
            error={errors.priceOut && errors.priceOut.message}
          />
        </div>
      </Box>

      <Box title="Quản lý hình ảnh" marginTop={10}>
        <FileDropzone images={images} setImages={setImages}>
          <div className="create-product__flex">
            <p>Hình ảnh</p>
            <p onClick={handleClickOpenInputImage}>Thêm hình</p>
          </div>
          {images.length ? null : (
            <div
              onClick={handleClickOpenInputImage}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <SvgImage />
            </div>
          )}
          <HorizontalMedias images={images} setImages={setImages} ref={refImage} />
        </FileDropzone>
      </Box>

      <Box title="Mô tả sản phẩm" marginTop={10}>
        <Controller
          name="desc"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <TextArea ref={refArea} value={value} onChange={(e) => onChange(e.target.value)} />
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng chọn loại thương hiệu',
            },
          }}
        />
      </Box>

      <Box marginTop={10} title="Thông tin khác">
        <InputText
          label=" Cân nặng"
          placeholder="Nhập  Cân nặng"
          className="sell-ecommerce__field"
          {...register('weight', {
            required: {
              value: true,
              message: 'Vui lòng nhập  Cân nặng',
            },
          })}
          error={errors.weight && errors.weight.message}
        />
        <div className="grid-3">
          <InputText
            label="Kích thước rộng"
            placeholder="Nhập Kích thước rộng"
            className="sell-ecommerce__field"
            {...register('width', {
              required: {
                value: true,
                message: 'Vui lòng nhập Kích thước rộng',
              },
            })}
            error={errors.width && errors.width.message}
          />
          <InputText
            label="Kích thước cao"
            placeholder="Nhập Kích thước cao"
            className="sell-ecommerce__field"
            marginTop={0}
            {...register('height', {
              required: {
                value: true,
                message: 'Vui lòng nhập Kích thước cao',
              },
            })}
            error={errors.height && errors.height.message}
          />
          <InputText
            label="Kích thước dài"
            placeholder="Nhập Kích thước dài"
            className="sell-ecommerce__field"
            {...register('length', {
              required: {
                value: true,
                message: 'Vui lòng nhập Kích thước dài',
              },
            })}
            error={errors.length && errors.length.message}
            marginTop={0}
          />
        </div>
      </Box>
      <Button onClick={handleSubmit(onSubmit)} width={50} marginLeft="auto">
        Lưu
      </Button>
    </div>
  );
};
