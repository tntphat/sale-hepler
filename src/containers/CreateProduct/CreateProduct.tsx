import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  DropdownSelect,
  GridLayoutTwoCol,
  InputText,
  HorizontalMedias,
  FileDropzone,
  CheckBoxControl,
  InputTextArea,
} from '../../components/common';
import './CreateProduct.scss';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SvgImage } from '../../assets/svg';
import { apiProducts } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { dataBranch, dataCategory, dataUnit, dataUnitDimension } from '../../constants';
import { apiCommon } from '../../services/api/apiCommon';
import { useModalLoading } from '../../hooks';

type TypeForm = {
  name: string;
  sku: string;
  weight: string;
  weightUnit: string;
  importPrice: string;
  exportPrice: string;
  description: string;
  type: string;
  branch: string;
  isAllowSell: boolean;
};

export const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
    resetField,
    setValue,
  } = useForm<TypeForm>();
  const refImage = useRef<HTMLInputElement | any>(null);
  const [images, setImages] = useState<any>([]);
  const navigate = useNavigate();
  const { handleOpenModalLoading, handleCloseModalLoading, handleOpenModalMessage } =
    useModalLoading();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    apiProducts.getInfoProduct(id).then((res) => {
      const { __v, updatedAt, createdAt, images, stockAvailable, ...product } =
        res.data.data.product;
      reset(product);
      resetField('type', {
        defaultValue: dataCategory[dataCategory.findIndex((cate) => cate.title === product.type)],
      });
      resetField('weightUnit', {
        defaultValue: dataUnit[dataUnit.findIndex((cate) => cate.title === product.weightUnit)],
      });
      resetField('dimensionUnit', {
        defaultValue:
          dataUnitDimension[
            dataUnitDimension.findIndex((cate) => cate.title === product.dimensionUnit)
          ],
      });
      stockAvailable?.forEach((stock) => {
        switch (stock.ecSite) {
          case 'Tiki':
            setValue('quantityTiki', stock.quantity);
            break;
          case 'Sendo':
            setValue('quantitySendo', stock.quantity);
            break;
          default:
            setValue('quantity', stock.quantity);
        }
      });
      // resetField('branch', {
      //   defaultValue: dataBranch[dataBranch.findIndex((cate) => cate.title === product.branch)],
      // });
      setImages(images);
    });
  }, [id]);

  const onSubmit = (data: TypeForm) => {
    handleOpenModalLoading();
    // console.log(data);
    const { quantity, quantityTiki, quantitySendo, ...rest } = data;
    const newForm = { ...rest };
    for (let key in newForm) {
      if (typeof newForm[key] === 'object') {
        newForm[key] = newForm[key].title;
      }
    }
    if (id) {
      newForm.stockAvailable = [];
      quantity >= 0 && newForm.stockAvailable.push({ ecSite: 'Facebook', quantity });
      quantitySendo >= 0 &&
        newForm.stockAvailable.push({ ecSite: 'Facebook', quantity: quantitySendo });
      quantityTiki >= 0 &&
        newForm.stockAvailable.push({ ecSite: 'Facebook', quantity: quantityTiki });
    } else {
      newForm.quantity = quantity;
    }
    const action = id ? apiProducts.updateProduct : apiProducts.createProduct;
    // apiProducts.createProduct({...data,inventoryNumber:2,isAllowSell:true,images:['https://cdn.pixabay.com/photo/2022/04/23/20/51/nature-7152461__340.jpg','https://cdn.pixabay.com/photo/2021/08/25/05/01/boat-6572384__340.jpg']})

    apiCommon
      .getLinkImage({ images })
      .then((res) => {
        return action({
          ...newForm,
          inventoryNumber: 2,
          // isAllowSell: true,
          images: res.data,
          image: res.data[0],
        });
      })
      .then((res) => {
        if (res.data.meta.ok) {
          navigate('/product');
          return;
        }
        handleOpenModalMessage(res.data.message);
      })
      .finally(() => {
        handleCloseModalLoading();
      });
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
            {...register('sku', {
              required: {
                value: true,
                message: 'Vui lòng nhập mã sản phẩm ',
              },
              maxLength: {
                value: 100,
                message: 'Vui lòng nhập không quá 10 kí tự',
              },
            })}
            error={errors.sku && errors.sku.message}
          />
          <InputText
            label="Số lượng tồn kho "
            placeholder="Nhập số lượng tồn kho "
            className="create-product__field"
            {...register('quantity', {
              required: {
                value: true,
                message: 'Vui lòng nhập số lượng tồn kho ',
              },
            })}
            type="number"
            error={errors.quantity && errors.quantity.message}
          />
          <div className="create-product__row">
            {watch('quantitySendo') >= 0 ? (
              <InputText
                label="Tồn kho Sendo"
                placeholder="Nhập tồn kho Sendo"
                className="create-product__field"
                type="number"
                {...register('quantitySendo', {
                  required: {
                    value: true,
                    message: 'Vui lòng nhập tồn kho Sendo ',
                  },
                })}
                error={errors.quantitySendo && errors.quantitySendo.message}
                disabled
              />
            ) : null}
            {watch('quantityTiki') >= 0 ? (
              <InputText
                label="Tồn kho Tiki"
                placeholder="Nhập tồn kho Tiki"
                className="create-product__field"
                type="number"
                {...register('quantityTiki', {
                  required: {
                    value: true,
                    message: 'Vui lòng nhập tồn kho Tiki ',
                  },
                })}
                error={errors.quantityTiki && errors.quantityTiki.message}
                disabled
              />
            ) : null}
          </div>
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
              type="number"
              error={errors.weight && errors.weight.message}
            />

            <Controller
              name="weightUnit"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  label="Đơn vị tính khối lượng"
                  data={dataUnit}
                  placeholder="Chọn đơn vị tính khối lượng"
                  onChange={onChange}
                  value={value}
                  error={errors.weightUnit?.message}
                  className="form-field--mt-0"
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
              label="Chiều cao"
              placeholder="Nhập chiều cao "
              className="create-product__field"
              {...register('height', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập chiều  cao ',
                },
              })}
              error={errors.height && errors.height.message}
              type="number"
            />
            <InputText
              label="Chiều dài"
              placeholder="Nhập chiều dài "
              className="create-product__field"
              {...register('length', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập chiều dài ',
                },
              })}
              error={errors.length && errors.length.message}
              type="number"
            />
            <InputText
              label="Chiều rộng"
              placeholder="Nhập chiều rộng "
              className="create-product__field"
              {...register('width', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập chiều rộng ',
                },
              })}
              error={errors.width && errors.width.message}
              type="number"
            />

            <Controller
              name="dimensionUnit"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  label="Đơn vị tính kích thước"
                  data={dataUnitDimension}
                  placeholder="Chọn đơn vị tính kích thước"
                  onChange={onChange}
                  value={value}
                  error={errors.dimensionUnit?.message}
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
              {...register('importPrice', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập giá ',
                },
              })}
              error={errors.importPrice && errors.importPrice.message}
              type="number"
            />

            <InputText
              label="Giá bán "
              placeholder="Nhập Giá bán "
              className="create-product__field"
              {...register('exportPrice', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập Giá bán ',
                },
              })}
              error={errors.exportPrice && errors.exportPrice.message}
              type="number"
            />
          </div>

          {/* <InputText
            label="Mô tả"
            placeholder="Nhập mô tả "
            className="create-product__field"
            {...register('description', {
              required: {
                value: true,
                message: 'Vui lòng nhập mô tả ',
              },
            })}
            error={errors.description && errors.description.message}
          /> */}
          <Controller
            name={'description'}
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <InputTextArea
                onChange={onChange}
                label={'Mô tả'}
                error={errors['description']?.message}
                value={value}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Vui lòng nhập mô tả',
              },
            }}
          />
        </Box>
        <div>
          <Box>
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  label="Loại sản phẩm"
                  data={dataCategory}
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

            {/* <Controller
              name="branch"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DropdownSelect
                  label="Nhãn hiệu"
                  data={dataBranch}
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
            /> */}

            <Controller
              name="isAllowSell"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CheckBoxControl
                  label="Bật bán"
                  onChange={onChange}
                  value={value}
                  error={errors.isAllowSell?.message}
                />
              )}
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
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
};
