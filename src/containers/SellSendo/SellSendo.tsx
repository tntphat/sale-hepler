import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SvgImage, SvgImages } from '../../assets/svg';
import {
  Box,
  DatePickerControl,
  DropdownSelect,
  DropdownSelectMultipleLevel,
  InputText,
  CheckBoxControl,
  Button,
  InputTextArea,
  FileDropzone,
  HorizontalMedias,
  Modal,
} from '../../components/common';
import { TableProduct } from '../../components/Sell';
import { FormAttributesSendo } from '../../components/SellSendo';
import { dataCategory } from '../../constants';
import { convertWeightByUnit } from '../../helpers';
import { useModalLoading, useOnClickOutside } from '../../hooks';
import { apiSendoCategory, apiSendoProduct } from '../../services/api';
import { apiCommon } from '../../services/api/apiCommon';
import { dataExtendedShipping } from './data';
import './SellSendo.scss';

export const SellSendo = () => {
  const [optionsCategory, setOptionsCategory] = useState([]);
  const [optionsUnit, setOptionsUnit] = useState([]);
  const [optionsType, setOptionsType] = useState([]);
  // const [images, setImages] = useState<any>([]);
  const [openDropdownCategory, setOpenDropdownCategory] = useState(false);
  const refImage = useRef<HTMLInputElement | any>(null);
  // const [avatar, setAvatar] = useState<any>();
  const refImageAvatar = useRef<HTMLInputElement | any>(null);
  const refDropdownCategory = useRef();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [product, setProduct] = useState();

  const { handleOpenModalLoading, handleCloseModalLoading, handleOpenModalMessage } =
    useModalLoading();
  const navigate = useNavigate();
  useOnClickOutside(() => {
    setOpenDropdownCategory(false);
  }, refDropdownCategory);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    getValues,
  } = useForm<any>();
  useEffect(() => {
    apiSendoCategory.getRoot().then((res) => {
      setOptionsCategory(res.data.data);
    });
    apiSendoProduct.getUnit().then((res) => {
      setOptionsUnit(res.data.data);
    });
    apiSendoProduct.getType().then((res) => {
      setOptionsType(res.data.data);
    });
  }, []);

  const memoizedOptionsUnit = useMemo(() => {
    return optionsUnit.map(({ code, ...rest }) => ({ id: code, ...rest }));
  }, [optionsUnit]);
  const memoizedOptionsType = useMemo(() => {
    return optionsType.map(({ code, ...rest }) => ({ id: code, ...rest }));
  }, [optionsType]);

  useEffect(() => {
    if (!product) return;
    const {
      name,
      description,
      exportPrice,
      importPrice,
      type,
      sku,
      weight,
      weightUnit,
      width,
      isAllowSell,
      dimensionUnit,
      height,
      length,
      images,
      image,
    } = product;
    setValue('name', name);
    setValue('description', description);
    setValue('price', exportPrice);
    setValue('importPrice', importPrice);
    setValue('sku', sku);
    setValue('type', dataCategory[dataCategory.findIndex((cate) => cate.title === type)]);
    setValue('height', height);
    setValue('width', width);
    setValue('length', length);
    setValue('image', image);
    setValue('images', images);
    setValue('weight', convertWeightByUnit(weight, weightUnit, 'gam'));
    setValue('stock_availability', isAllowSell);
  }, [product]);

  const onSubmit = (data) => {
    handleOpenModalLoading();
    const {
      attributes,
      category,
      extended_shipping_package,
      product_type,
      promotion_end_date,
      promotion_start_date,
      special_price,
      unit_id,
      name,
      sku,
      price,
      stock_quantity,
      description,
      height,
      length,
      width,
      weight,
      importPrice,
      type,
      image,
      images,
    } = data;
    const obj = {
      id: 0,
      cat_4_id: category.id,
      unit_id: unit_id.id,
      attributes: attributes.map((item) =>
        Array.isArray(item.attribute_values)
          ? item
          : { ...item, attribute_values: [item.attribute_values] },
      ),
      voucher: { product_type: product_type.id, is_check_date: false },
      is_config_variant: false,

      ...(special_price && {
        special_price: +special_price,
        promotion_start_date,
        promotion_end_date,
      }),
      extended_shipping_package,
      name,
      sku,
      description,
      price: +price,
      stock_quantity: +stock_quantity,
      availableQuantity: +stock_quantity,
      height: +height,
      length: +length,
      width: +width,
      weight: +weight,
      type: type.title,
      importPrice: +importPrice,
    };
    apiCommon.getLinkImage({ images: [image, ...images] }).then((res) => {
      obj.avatar = { picture_url: res.data[0] };
      obj.pictures = res.data.slice(1).map((img) => ({ picture_url: img }));
      apiSendoProduct
        .postProduct(obj)
        .then((res) => {
          navigate('/');
        })
        .catch((e) => {
          handleOpenModalMessage(e.response.data.data.error.message);
        })
        .finally(() => {
          handleCloseModalLoading();
        });
    });
  };

  const handleClickOpenInputImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    refImage.current.click();
  };

  const handleClickOpenInputImageAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    refImageAvatar.current.click();
  };

  return (
    <div className="sell-sendo">
      <Button onClick={() => setIsOpen(true)}>Chọn sản phẩm</Button>
      {product ? <p className="sell-ecommerce__name-product">{product.name}</p> : null}
      <Box title="Quản lý hình ảnh" marginTop={10}>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <FileDropzone isNotMultiple images={value} setImages={onChange}>
              <input
                type="file"
                hidden
                ref={refImageAvatar}
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    onChange(e.target.files[0]);
                  }
                }}
              />
              <div className="create-product__flex">
                <b>Ảnh đại diện sản phẩm</b>
                <p onClick={handleClickOpenInputImageAvatar}>Thêm hình</p>
              </div>
              {value ? (
                <img
                  src={typeof value === 'string' ? value : URL.createObjectURL(value)}
                  style={{
                    maxHeight: 300,
                    maxWidth: '100%',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              ) : (
                <div
                  onClick={handleClickOpenInputImageAvatar}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <SvgImage />
                </div>
              )}
              {errors?.image?.message ? (
                <span className="inputs__err">{errors?.image?.message}</span>
              ) : null}
            </FileDropzone>
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng chọn ảnh đại diện',
            },
          }}
        />

        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value, ref } }) => {
            const setImages = (val) => {
              const newVal = typeof val === 'function' ? val(value) : val;
              onChange(newVal);
            };
            return (
              <div style={{ marginTop: 20 }}>
                <FileDropzone images={value || []} setImages={setImages}>
                  <div className="create-product__flex">
                    <b>Hình ảnh chi tiết</b>
                    <p onClick={handleClickOpenInputImage}>Thêm hình</p>
                  </div>
                  {value?.length ? null : (
                    <div
                      onClick={handleClickOpenInputImage}
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <SvgImages />
                    </div>
                  )}
                  <HorizontalMedias images={value || []} setImages={setImages} ref={refImage} />
                </FileDropzone>
                {errors?.images?.message ? (
                  <span className="inputs__err">{errors?.images?.message}</span>
                ) : null}
              </div>
            );
          }}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng chọn ảnh chi tiết',
            },
          }}
        />
        {/* <FileDropzone isNotMultiple images={avatar} setImages={setAvatar}>
          <input
            type="file"
            hidden
            ref={refImageAvatar}
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length) {
                setAvatar(e.target.files[0]);
              }
            }}
          />
          <div className="create-product__flex">
            <b>Ảnh đại diện sản phẩm</b>
            <p onClick={handleClickOpenInputImageAvatar}>Thêm hình</p>
          </div>
          {avatar ? (
            <img
              src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)}
              style={{
                maxHeight: 300,
                maxWidth: '100%',
                display: 'block',
                margin: '0 auto',
              }}
            />
          ) : (
            <div
              onClick={handleClickOpenInputImageAvatar}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <SvgImage />
            </div>
          )}
        </FileDropzone>
        <div style={{ marginTop: 20 }}>
          <FileDropzone images={images} setImages={setImages}>
            <div className="create-product__flex">
              <b>Hình ảnh sản phẩm chi tiết</b>
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
        </div> */}
      </Box>
      <Box title="Chọn loại" zIndex={10} marginTop={10}>
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
        <Controller
          name="category"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <>
              <div
                className="sell-ecommerce__pick-category"
                style={{ marginTop: 10 }}
                onClick={() => setOpenDropdownCategory((pre) => !pre)}
                ref={refDropdownCategory}
              >
                {value?.name || ' Chọn loại sản phẩm Sendo'}
                {openDropdownCategory ? (
                  <DropdownSelectMultipleLevel
                    options={optionsCategory}
                    isFirstLevel
                    onSelect={onChange}
                    apiGetSpecificCategory={apiSendoCategory.getCategoryById}
                  />
                ) : null}
              </div>
              {errors?.category?.message ? (
                <span className="inputs__err">{errors?.category?.message}</span>
              ) : null}
            </>
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng chọn loại sản phẩm Sendo ',
            },
          }}
        />
        {/* <div
          className="sell-ecommerce__pick-category"
          style={{ marginTop: 10 }}
          onClick={() => setOpenDropdownCategory((pre) => !pre)}
          ref={refDropdownCategory}
        >
          {watch('category.name') || ' Chọn loại sản phẩm Sendo'}
          {openDropdownCategory ? (
            <DropdownSelectMultipleLevel
              options={optionsCategory}
              isFirstLevel
              onSelect={(opt) => setValue('category', opt)}
              apiGetSpecificCategory={apiSendoCategory.getCategoryById}
            />
          ) : null}
        </div> */}

        {memoizedOptionsUnit?.length ? (
          <Controller
            name="unit_id"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <DropdownSelect
                data={memoizedOptionsUnit}
                onChange={onChange}
                value={value}
                titleProp="unit_name"
                placeholder="Chọn đơn vị"
                label="Chọn đơn vị"
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn đơn vị ',
              },
            }}
          />
        ) : null}
        {memoizedOptionsType?.length ? (
          <Controller
            name="product_type"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <DropdownSelect
                data={memoizedOptionsType}
                onChange={onChange}
                value={value}
                titleProp="type_name"
                placeholder="Chọn kiểu sản phẩm"
                label="Chọn kiểu sản phẩm"
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn kiểu sản phẩm ',
              },
            }}
          />
        ) : null}
      </Box>

      {watch('category') ? (
        <Box title="Thuộc tính">
          <FormAttributesSendo
            register={register}
            errors={errors}
            control={control}
            arrAttributes={watch('category').attribute}
          />
        </Box>
      ) : null}

      <Box marginTop={10} title="Thông tin sản phẩm">
        <InputText
          label="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm"
          {...register('name', {
            required: {
              value: true,
              message: 'Vui lòng nhập tên sản phẩm',
            },
          })}
          error={errors.name && errors.name.message}
        />

        <InputText
          label="Mã sản phẩm"
          placeholder="Nhập mã sản phẩm"
          {...register('sku', {
            required: {
              value: true,
              message: 'Vui lòng nhập mã sản phẩm',
            },
          })}
          error={errors.sku && errors.sku.message}
        />

        <InputText
          type="number"
          label="Giá sản phẩm"
          placeholder="Nhập giá sản phẩm"
          {...register('price', {
            required: {
              value: true,
              message: 'Vui lòng nhập giá sản phẩm',
            },
          })}
          error={errors.price && errors.price.message}
        />

        <Controller
          name={'description'}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <InputTextArea
              onChange={onChange}
              label={'Mô tả( 100-1000 kí tự)'}
              error={errors['description']?.message}
              value={value}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng nhập mô tả',
            },
            maxLength: {
              value: 1000,
              message: 'Vui lòng nhập nhỏ hơn 1000 kí tự',
            },
            minLength: {
              value: 100,
              message: 'Vui lòng nhập ít nhất 100 kí tự',
            },
          }}
        />

        <InputText
          type="number"
          label="Số lượng tồn kho"
          placeholder="Nhập số lượng tồn kho"
          {...register('stock_quantity', {
            required: {
              value: true,
              message: 'Vui lòng nhập số lượng tồn kho',
            },
          })}
          error={errors.stock_quantity && errors.stock_quantity.message}
        />
        <InputText
          type="number"
          label="Chiều cao(cm)"
          placeholder="Nhập chiều cao"
          {...register('height', {
            required: {
              value: true,
              message: 'Vui lòng nhập chiều cao',
            },
          })}
          error={errors.height && errors.height.message}
        />
        <InputText
          type="number"
          label="Chiều dài(cm)"
          placeholder="Nhập chiều dài"
          {...register('length', {
            required: {
              value: true,
              message: 'Vui lòng nhập chiều dài',
            },
          })}
          error={errors.length && errors.length.message}
        />
        <InputText
          type="number"
          label="Chiều rộng(cm)"
          placeholder="Nhập chiều rộng"
          {...register('width', {
            required: {
              value: true,
              message: 'Vui lòng nhập chiều rộng',
            },
          })}
          error={errors.width && errors.width.message}
        />
        <InputText
          type="number"
          label="Khối lượng(gam)"
          placeholder="Nhập Khối lượng"
          {...register('weight', {
            required: {
              value: true,
              message: 'Vui lòng nhập Khối lượng',
            },
          })}
          error={errors.weight && errors.weight.message}
        />

        <Controller
          name={'stock_availability'}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <CheckBoxControl isRow label="Bật bán" onChange={onChange} value={value} />
          )}
        />
      </Box>

      <Box title="Giá cả" marginTop={10}>
        <InputText
          label="Giá nhập"
          placeholder="Nhập Giá nhập"
          className="sell-ecommerce__field"
          {...register('importPrice', {
            required: {
              value: true,
              message: 'Vui lòng nhập Giá nhập',
            },
          })}
          error={errors.importPrice && errors.importPrice.message}
          type="number"
        />
        <InputText
          label="Gía khuyến mãi(nếu có)"
          placeholder="Nhập giá khuyến mãi"
          {...register('special_price')}
          error={errors.special_price && errors.special_price.message}
        />
        {watch('special_price') ? (
          <>
            <Controller
              name="promotion_start_date"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DatePickerControl
                  onChange={onChange}
                  value={value}
                  label="Chọn ngày bắt đầu"
                  error={errors.promotion_start_date && errors.promotion_start_date.message}
                />
              )}
            />
            <Controller
              name="promotion_end_date"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DatePickerControl
                  onChange={onChange}
                  value={value}
                  label="Chọn ngày bắt đầu"
                  error={errors.promotion_start_date && errors.promotion_start_date.message}
                />
              )}
            />
          </>
        ) : null}

        <div className="form-field">
          <label style={{ fontWeight: '600', marginLeft: 12 }}>Chọn hình thức giao hàng</label>
          <Controller
            name="extended_shipping_package"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <>
                {dataExtendedShipping.map((item) => (
                  <CheckBoxControl
                    isRow
                    key={item.code}
                    label={item.title}
                    onChange={(val) =>
                      onChange(
                        (() => {
                          const clone = value ? JSON.parse(JSON.stringify(value)) : {};
                          // if(pre)
                          clone[item.code] = val;
                          return clone;
                        })(),
                      )
                    }
                    value={value && value[item.code]}
                  />
                ))}
              </>
            )}
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn đơn vị ',
              },
            }}
          />
        </div>
      </Box>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <TableProduct setProduct={setProduct} setIsOpen={setIsOpen} />
      </Modal>

      <Button className="submit-button" onClick={handleSubmit(onSubmit)}>
        Đăng bán
      </Button>
    </div>
  );
};
