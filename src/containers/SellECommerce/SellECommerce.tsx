import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SvgImage, SvgImages } from '../../assets/svg';
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
  const refImageAvatar = useRef<HTMLInputElement | any>(null);
  // const [images, setImages] = useState<any>([]);
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
  const handleClickOpenInputImageAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    refImageAvatar.current.click();
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
      image,
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
    setValue('images', images);
    setValue('image', image);
    setValue('product_weight_kg', convertWeightByUnit(weight, weightUnit, 'kg'));
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
      image,
      images,
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
      .getLinkImage({ images: [image, ...images, ...variants.map((variant) => variant.image[0])] })
      .then((res) => {
        newForm.image = res.data[0];
        newForm.images = res.data.slice(1, images.length);
        newForm.variants = newForm.variants.map((variant, index) => ({
          ...variant,
          image: res.data[index + images.length + 1],
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
    apiCategory
      .getAllCategory()
      .then((res) => {
        return apiCategory.getCategory();
      })
      .then((res) => setOptionsCategory(res.data.data));
  }, []);

  useEffect(() => {
    if (!watch('category')?.id) return;
    setValue('option_attributes', []);
    apiCategory.getAttributesOfCategory(watch('category').id).then((res) => {
      const arr = res.data.data;
      setArrAttribute(arr.filter((item: IAttributeCategory) => item.is_required));
    });
  }, [watch('category')?.id]);

  return (
    <div className="sell-ecommerce">
      <Button onClick={() => setIsOpen(true)}>Ch???n s???n ph???m</Button>
      {product ? <p className="sell-ecommerce__name-product">{product.name}</p> : null}
      {/* <Box title="Th??ng tin c?? b???n">
        <InputText
          label="T??n s???n ph???m"
          placeholder="Nh???p t??n s???n ph???m"
          className="sell-ecommerce__field"
          {...register('name', {
            required: {
              value: true,
              message: 'Vui l??ng nh???p t??n s???n ph???m',
            },
            maxLength: {
              value: 100,
              message: 'Vui l??ng nh???p kh??ng qu?? 100 k?? t???',
            },
          })}
          error={errors.name && errors.name.message}
        />

        <div className="sell-ecommerce__row">
          <InputText
            label="T??n SKU"
            placeholder="Nh???p t??n SKU"
            className="sell-ecommerce__field"
            {...register('code', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p t??n SKU',
              },
              maxLength: {
                value: 100,
                message: 'Vui l??ng nh???p kh??ng qu?? 100 k?? t???',
              },
            })}
            error={errors.code && errors.code.message}
          />
          <InputText
            label="Gi?? g???c"
            placeholder="Nh???p Gi?? g???c"
            className="sell-ecommerce__field"
            {...register('priceIn', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p Gi?? g???c',
              },
            })}
            error={errors.priceIn && errors.priceIn.message}
            marginTop={0}
          />
          <InputText
            label="T???n kho"
            placeholder="Nh???p T???n kho"
            className="sell-ecommerce__field"
            {...register('left', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p T???n kho',
              },
              maxLength: {
                value: 100,
                message: 'Vui l??ng nh???p kh??ng qu?? 100 k?? t???',
              },
            })}
            error={errors.left && errors.left.message}
          />
          <InputText
            label="Gi?? khuy???n m??i"
            placeholder="Nh???p Gi?? khuy???n m??i"
            className="sell-ecommerce__field"
            {...register('priceOut', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p Gi?? khuy???n m??i',
              },
            })}
            error={errors.priceOut && errors.priceOut.message}
          />
        </div>
   
      </Box> */}
      {/* <Box title="Gi?? v?? t???n kho" marginTop={10}>
        <div className="sell-ecommerce__row">
          <InputText
            label="T??n SKU"
            placeholder="Nh???p t??n SKU"
            className="sell-ecommerce__field"
            {...register('code', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p t??n SKU',
              },
              maxLength: {
                value: 100,
                message: 'Vui l??ng nh???p kh??ng qu?? 100 k?? t???',
              },
            })}
            error={errors.code && errors.code.message}
          />
          <InputText
            label="Gi?? g???c"
            placeholder="Nh???p Gi?? g???c"
            className="sell-ecommerce__field"
            {...register('priceIn', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p Gi?? g???c',
              },
            })}
            error={errors.priceIn && errors.priceIn.message}
            marginTop={0}
          />
          <InputText
            label="T???n kho"
            placeholder="Nh???p T???n kho"
            className="sell-ecommerce__field"
            {...register('left', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p T???n kho',
              },
              maxLength: {
                value: 100,
                message: 'Vui l??ng nh???p kh??ng qu?? 100 k?? t???',
              },
            })}
            error={errors.left && errors.left.message}
          />
          <InputText
            label="Gi?? khuy???n m??i"
            placeholder="Nh???p Gi?? khuy???n m??i"
            className="sell-ecommerce__field"
            {...register('priceOut', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p Gi?? khuy???n m??i',
              },
            })}
            error={errors.priceOut && errors.priceOut.message}
          />
        </div>
      </Box> */}

      <Box title="Qu???n l?? h??nh ???nh" marginTop={10}>
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
                <b>???nh ?????i di???n s???n ph???m</b>
                <p onClick={handleClickOpenInputImageAvatar}>Th??m h??nh</p>
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
              message: 'Vui l??ng ch???n ???nh ?????i di???n',
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
                    <b>H??nh ???nh chi ti???t</b>
                    <p onClick={handleClickOpenInputImage}>Th??m h??nh</p>
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
              message: 'Vui l??ng ch???n ???nh chi ti???t',
            },
          }}
        />
      </Box>

      <Box marginTop={10} title="Lo???i s???n ph???m" zIndex={3}>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <DropdownSelect
              label="Lo???i s???n ph???m"
              data={dataCategory}
              placeholder="Ch???n lo???i s???n ph???m"
              onChange={onChange}
              value={value}
              error={errors.type?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui l??ng ch???n lo???i s???n ph???m',
            },
          }}
        />
        <div
          style={{ marginTop: 10 }}
          className="sell-ecommerce__pick-category"
          onClick={() => setOpenDropdownCategory((pre) => !pre)}
          ref={refDropdownCategory}
        >
          {watch('category.name') || ' Ch???n lo???i'}

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
        <Box marginTop={10} title="Th??ng tin Tiki">
          <InputText
            label="M?? s???n ph???m"
            placeholder="Nh???p m?? s???n ph???m"
            className="sell-ecommerce__field"
            {...register('sku', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p m?? s???n ph???m',
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
            label="Gi?? nh???p"
            placeholder="Nh???p Gi?? nh???p"
            className="sell-ecommerce__field"
            {...register('importPrice', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p Gi?? nh???p',
              },
            })}
            error={errors.importPrice && errors.importPrice.message}
            type="number"
          />
        </Box>
      ) : null}

      <Box title="Chi ti???t s???n ph???m" marginTop={10} zIndex={2}>
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
                message: 'Vui l??ng ch???n lo???i ',
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
              message: 'Vui l??ng ch???n lo???i ',
            },
          }}
        />
      </Box>

      {/* <Box marginTop={10} title="Th??ng tin kh??c">
        <InputText
          label=" C??n n???ng"
          placeholder="Nh???p  C??n n???ng"
          className="sell-ecommerce__field"
          {...register('weight', {
            required: {
              value: true,
              message: 'Vui l??ng nh???p  C??n n???ng',
            },
          })}
          error={errors.weight && errors.weight.message}
        />
        <div className="grid-3">
          <InputText
            label="K??ch th?????c r???ng"
            placeholder="Nh???p K??ch th?????c r???ng"
            className="sell-ecommerce__field"
            {...register('width', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p K??ch th?????c r???ng',
              },
            })}
            error={errors.width && errors.width.message}
          />
          <InputText
            label="K??ch th?????c cao"
            placeholder="Nh???p K??ch th?????c cao"
            className="sell-ecommerce__field"
            marginTop={0}
            {...register('height', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p K??ch th?????c cao',
              },
            })}
            error={errors.height && errors.height.message}
          />
          <InputText
            label="K??ch th?????c d??i"
            placeholder="Nh???p K??ch th?????c d??i"
            className="sell-ecommerce__field"
            {...register('length', {
              required: {
                value: true,
                message: 'Vui l??ng nh???p K??ch th?????c d??i',
              },
            })}
            error={errors.length && errors.length.message}
            marginTop={0}
          />
        </div>
      </Box> */}
      <Button
        className="submit-button"
        onClick={handleSubmit(onSubmit)}
        width={50}
        marginLeft="auto"
      >
        L??u
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <TableProduct setProduct={setProduct} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};
