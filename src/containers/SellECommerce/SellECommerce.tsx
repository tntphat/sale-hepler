import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SvgImage } from '../../assets/svg';
import {
  Box,
  Button,
  DropdownSelect,
  DropdownSelectMultipleLevel,
  DropdownSelectSearch,
  FileDropzone,
  HorizontalMedias,
  InputText,
  Modal,
  TextArea,
} from '../../components/common';
import { InventoryTypeSelect } from '../../components/InventoryTypeSelect/InventoryTypeSelect';
import { TableProduct } from '../../components/Sell';
import { FormFieldsTiki } from '../../components/SellECommerce/FormFieldsTiki/FormFieldsTiki';
import { OptionsLabel } from '../../components/SellECommerce/OptionsLabel/OptionsLabel';
import { Variants } from '../../components/SellECommerce/Variants/Variants';
import { dataCategory } from '../../constants';
import { convertWeightByUnit } from '../../helpers';
import { useModalLoading, useOnClickOutside } from '../../hooks';
import {
  apiCategory,
  apiProducts,
  apiTikiInventory,
  apiTikiProduct,
  apiTikiSeller,
} from '../../services/api';
import { apiCommon } from '../../services/api/apiCommon';
import './SellECommerce.scss';
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
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
  category: IResOptionCategory;
};

export const SellECommerce = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<TypeForm>();
  const refArea = useRef();
  const navigate = useNavigate();
  const refImage = useRef<HTMLInputElement | any>(null);
  const [images, setImages] = useState<any>([]);
  const [arrAttribute, setArrAttribute] = useState<IAttributeCategory[]>([]);
  const [optionsCategory, setOptionsCategory] = useState<IResOptionCategory[]>([]);
  const [openDropdownCategory, setOpenDropdownCategory] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [product, setProduct] = useState();

  const { handleOpenModalLoading, handleCloseModalLoading, handleOpenModalMessage } =
    useModalLoading();
  const refDropdownCategory = useRef();
  useOnClickOutside(() => {
    setOpenDropdownCategory(false);
  }, refDropdownCategory);
  const handleClickOpenInputImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    refImage.current.click();
  };

  useEffect(() => {
    if (!(arrAttribute.length && product)) return;
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
    } = product;
    setValue('name', name);
    setValue('description', description);
    setValue('price', exportPrice);
    setValue('importPrice', importPrice);
    setValue('sku', sku);
    setValue('type', dataCategory[dataCategory.findIndex((cate) => cate.title === type)]);
    setValue('product_height', height);
    setValue('product_width', width);
    setValue('product_length', length);
    setValue('product_weight_kg', convertWeightByUnit(weight, weightUnit, 'kg'));
    setImages(images);
  }, [arrAttribute, product]);

  const onSubmit = (data: any) => {
    handleOpenModalLoading();
    const {
      name,
      description,
      price: market_price,
      category,
      option_attributes,
      variants,
      importPrice,
      sku,
      type,
      ...rest
    } = data;

    const { product_height, product_length, product_weight_kg, product_width } = rest;

    const newForm = {
      name,
      description,
      market_price,
      category_id: category.id,
      category_name: category.name,
      attributes: [],
      importPrice,
      variants,
      option_attributes,
      sku,
      height: product_height,
      length: product_length,
      width: product_width,
      weight: product_weight_kg,
      type: type.title,
    };

    apiCommon
      .getLinkImage({ images: [...images, ...variants.map((variant) => variant.image[0])] })
      .then((res) => {
        newForm.image = res.data[0];
        newForm.images = res.data.slice(0, images.length);
        newForm.variants = newForm.variants.map((variant, index) => ({
          ...variant,
          image: res.data[index + images.length],
        }));
        for (const key in rest) {
          const item = arrAttribute.find((item) => item.code === key);
          // newForm.attributes[key] = typeof rest[key] === 'string' ? rest[key] : rest[key].value;
          newForm.attributes.push({
            attribute_code: item?.code,
            display_name: item?.display_name,
            value:
              typeof rest[key] === 'string' || typeof rest[key] === 'number'
                ? rest[key]
                : rest[key].value,
          });
        }
        newForm.option_attributes = newForm.option_attributes.map((item) => item.option_label);
        newForm.certificate_files = [
          {
            url: 'https://i.pinimg.com/236x/16/83/c3/1683c385af85d756f8fab83a93d48063.jpg',
            type: 'brand',
          },
          {
            url: 'https://kenh14cdn.com/2020/7/15/legialinhmeo672472714514751590239205770621637245080975n-15948258251531626115845.jpg',
            type: 'category',
            document_id: 17,
          },
          {
            url: 'https://kenh14cdn.com/2020/7/15/legialinhmeo672472714514751590239205770621637245080975n-15948258251531626115845.jpg',
            type: 'category',
            document_id: 4,
          },
          {
            url: 'https://i.pinimg.com/236x/16/83/c3/1683c385af85d756f8fab83a93d48063.jpg',
            type: 'category',
            document_id: 18,
          },
        ];
        newForm.meta_data = {
          is_auto_turn_on: true,
        };
        return apiTikiProduct.requestProduct(newForm);
      })
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        handleOpenModalMessage(e.response.data.data.errors[0]);
      })
      .finally(() => {
        handleCloseModalLoading();
      });
  };

  useEffect(() => {
    // apiTikiInventory.getAll().then(console.log);
    // apiTikiSeller.getWareHouses({ limit: 10, page: 1 }).then(console.log);
    apiProducts.getCategories().then(console.log);
    apiCategory
      .getAllCategory()
      .then((res) => {
        return apiCategory.getCategory();
      })
      .then((res) => setOptionsCategory(res.data));
  }, []);

  useEffect(() => {
    if (!watch('category')?.id) return;
    setValue('option_attributes', []);
    apiCategory.getAttributesOfCategory(watch('category').id).then((res) => {
      const arr = res.data.data;
      setArrAttribute(arr.filter((item: IAttributeCategory) => item.is_required));

      // const obj = {};
      // arr.forEach((ele) => {
      //   if (!obj[ele.input_type]) {
      //     obj[ele.input_type] = [ele.data_type];
      //   } else if (!obj[ele.input_type].includes(ele.data_type)) {
      //     obj[ele.input_type].push(ele.data_type);
      //   }
      // });
      // console.log(
      //   arr.map(({ code, description, is_required }) => ({ code, description, is_required })),
      // );
    });
  }, [watch('category')?.id]);

  return (
    <div className="sell-ecommerce">
      <Button onClick={() => setIsOpen(true)}>Chọn sản phẩm</Button>
      {product ? <p className="sell-ecommerce__name-product">{product.name}</p> : null}
      {/* <Box title="Thông tin cơ bản">
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
   
      </Box> */}
      {/* <Box title="Giá và tồn kho" marginTop={10}>
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
      </Box> */}

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

      <Box marginTop={10} title="Loại sản phẩm" zIndex={3}>
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
        <div
          style={{ marginTop: 10 }}
          className="sell-ecommerce__pick-category"
          onClick={() => setOpenDropdownCategory((pre) => !pre)}
          ref={refDropdownCategory}
        >
          {watch('category.name') || ' Chọn loại'}

          {openDropdownCategory ? (
            <DropdownSelectMultipleLevel
              options={optionsCategory}
              isFirstLevel
              onSelect={(opt) => setValue('category', opt)}
              apiGetSpecificCategory={apiCategory.getCategoryChild}
            ></DropdownSelectMultipleLevel>
          ) : null}
        </div>
      </Box>

      {watch('category.id') ? (
        <Box marginTop={10} title="Thông tin Tiki">
          <InputText
            label="Mã sản phẩm"
            placeholder="Nhập mã sản phẩm"
            className="sell-ecommerce__field"
            {...register('sku', {
              required: {
                value: true,
                message: 'Vui lòng nhập mã sản phẩm',
              },
            })}
            error={errors.sku && errors.sku.message}
          />
          <FormFieldsTiki
            arrAttributes={arrAttribute}
            register={register}
            errors={errors}
            control={control}
          />
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
        </Box>
      ) : null}

      <Box title="Chi tiết sản phẩm" marginTop={10} zIndex={2}>
        {watch('category.id') ? (
          <Controller
            name="option_attributes"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <OptionsLabel onChange={onChange} value={value} categoryId={watch('category')?.id} />
            )}
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn loại ',
              },
            }}
          />
        ) : null}
        <Controller
          name="variants"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Variants onChange={onChange} value={value} options={watch('option_attributes')} />
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng chọn loại ',
            },
          }}
        />
      </Box>

      {/* <Box marginTop={10} title="Thông tin khác">
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
      </Box> */}
      <Button onClick={handleSubmit(onSubmit)} width={50} marginLeft="auto">
        Lưu
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <TableProduct setProduct={setProduct} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};
