import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  DropdownSelect,
  GridLayoutTwoCol,
  InputText,
  HorizontalMedias,
  FileDropzone,
} from '../../components/common';
import './CreateProduct.scss';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SvgImage } from '../../assets/svg';

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
};

export const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<TypeForm>();
  const refImage = useRef<HTMLInputElement | any>(null);
  const [images, setImages] = useState<any>([]);

  const onSubmit = (data: TypeForm) => {
    console.log(data);
  };

  const handleClickOpenInputImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    refImage.current.click();
  };
  return (
    <div className="create-product">
      <GridLayoutTwoCol>
        <Box>
          <InputText
            label="Tên sản phẩm"
            placeholder="Nhập tên sản phẩm"
            className="create-product__field"
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

          <InputText
            label="Mã sản phẩm "
            placeholder="Nhập mã sản phẩm "
            className="create-product__field"
            {...register('code', {
              required: {
                value: true,
                message: 'Vui lòng nhập mã sản phẩm ',
              },
              maxLength: {
                value: 100,
                message: 'Vui lòng nhập không quá 10 kí tự',
              },
            })}
            error={errors.code && errors.code.message}
          />
          <div className="create-product__row">
            <InputText
              label="Khối lượng "
              placeholder="Nhập khối lượng "
              className="create-product__field"
              {...register('weight', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập khối lượng ',
                },
              })}
              error={errors.weight && errors.weight.message}
            />

            <Controller
              name="unit"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  label="tét"
                  data={[
                    {
                      id: 1,
                      title: 'ABC',
                    },
                    {
                      id: 2,
                      title: 'XYZ',
                    },
                  ]}
                  placeholder="hixhix"
                  onChange={onChange}
                  value={value}
                  error={errors.unit?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Vui lòng chọn dơn vị',
                },
              }}
            />
            <InputText
              label="Giá nhập"
              placeholder="Nhập giá "
              className="create-product__field"
              {...register('priceIn', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập giá ',
                },
              })}
              error={errors.priceIn && errors.priceIn.message}
            />

            <InputText
              label="Giá bán "
              placeholder="Nhập Giá bán "
              className="create-product__field"
              {...register('priceOut', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập Giá bán ',
                },
              })}
              error={errors.priceOut && errors.priceOut.message}
            />
          </div>

          <InputText
            label="Mô tả"
            placeholder="Nhập mô tả "
            className="create-product__field"
            {...register('desc', {
              required: {
                value: true,
                message: 'Vui lòng nhập mô tả ',
              },
            })}
            error={errors.desc && errors.desc.message}
          />

          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </Box>
        <div>
          <Box>
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
                      title: 'Gia dụng',
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
                  label="Nhãn hiệu"
                  data={[
                    {
                      id: 1,
                      title: 'Nike',
                    },
                    {
                      id: 2,
                      title: 'Adidaphat',
                    },
                  ]}
                  placeholder="Chọn nhãn hiệu"
                  onChange={onChange}
                  value={value}
                  error={errors.branch?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Vui lòng chọn dơn vị',
                },
              }}
            />
          </Box>

          <Box classname="create-product__image">
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
        </div>
      </GridLayoutTwoCol>
    </div>
  );
};
