import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { apiCategory } from '../../../services/api';
import {
  CheckBox,
  DropdownSelect,
  DropdownSelectMultiple,
  DropdownSelectMultipleSearch,
  DropdownSelectSearch,
  InputGallery,
  InputText,
  InputTextArea,
} from '../../common';
import DatePicker from 'react-datepicker';
import './FormFieldsTiki.scss';
import { LIMIT_DATA } from '../../../constants';

const DropdownSelectTiki: React.FC<any> = ({
  code,
  control,
  errors,
  display_name,
  id,
  isMultiple,
}) => {
  const [options, setOptions] = useState([]);

  // useEffect(() => {
  //   if (id) {
  //     apiCategory.getValuesOfAttributeCategory(id, { page: 2, limit: 15, q: '' }).then((res) => {
  //       setOptions(res.data.data);
  //     });
  //   }
  // }, [id]);

  const fetchData = ({ page, keyWord }: IParamsPaganation, callbackAfterFetchingData) => {
    apiCategory
      .getValuesOfAttributeCategory(id, { page, limit: LIMIT_DATA, keyWord })
      .then((res) => {
        if (page === 1) {
          setOptions(res.data.data);
        } else setOptions((pre) => [...pre, ...res.data.data]);
        callbackAfterFetchingData(res.data.data);
        // setOptions(res.data.data);
      });
  };
  const Component = isMultiple ? DropdownSelectMultipleSearch : DropdownSelectSearch;
  return (
    <Controller
      name={code}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <Component
          label={display_name}
          data={options}
          titleProp="value"
          placeholder={'Chọn loại' + display_name}
          onChange={onChange}
          value={value}
          error={errors[code]?.message}
          fetchData={fetchData}
        />
      )}
      // rules={{
      //   required: {
      //     value: true,
      //     message: 'Vui lòng chọn loại thương hiệu',
      //   },
      // }}
    />
  );
};

const renderField = (item: IAttributeCategory, register: any, errors: any, control: any) => {
  const { code, display_name, id } = item;
  let ItemRender;
  switch (item.input_type) {
    case 'text':
    case 'price':
      ItemRender = (
        <InputText
          label={display_name}
          placeholder={display_name}
          {...register(code, {
            required: {
              value: true,
              message: 'Vui lòng nhập ' + display_name,
            },
          })}
          error={errors[code] && errors[code].message}
          type={item.data_type === 'int' ? 'number' : 'text'}
        />
      );
      break;
    case 'select':
      ItemRender = (
        <DropdownSelectTiki
          code={code}
          id={id}
          display_name={display_name}
          errors={errors}
          control={control}
        />
      );
      break;
    case 'multiselect':
      ItemRender = (
        <DropdownSelectTiki
          code={code}
          id={id}
          display_name={display_name}
          errors={errors}
          control={control}
          isMultiple
        />
      );
      break;

    case 'boolean':
      ItemRender = (
        <div className="form-field ">
          <label className="inputs__label">{display_name}</label>
          <Controller
            name={code}
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <CheckBox isActive={value} handleClick={() => onChange(!value)} />
            )}
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn loại thương hiệu',
              },
            }}
          />
        </div>
      );
      break;
    case 'date':
      ItemRender = (
        <div className="form-field">
          <label className="inputs__label">{display_name}</label>
          <Controller
            name={code}
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <DatePicker onChange={onChange} selected={value} />
            )}
            rules={{
              required: {
                value: true,
                message: 'Vui lòng chọn ' + display_name,
              },
            }}
          />
          {errors[code] && errors[code].message && (
            <span className="inputs__err">{errors[code].message}</span>
          )}
        </div>
      );
      break;

    case 'gallery':
    case 'media_image':
      ItemRender = (
        <Controller
          name={code}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <InputGallery onChange={onChange} label={display_name} error={errors[code]?.message} />
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng chọn ' + display_name,
            },
          }}
        />
      );
      break;
    case 'textarea':
      ItemRender = (
        <Controller
          name={code}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <InputTextArea
              onChange={onChange}
              label={display_name}
              error={errors[code]?.message}
              value={value}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Vui lòng nhập ' + display_name,
            },
          }}
        />
      );
      break;

    default:
      ItemRender = null;
  }
  return <React.Fragment key={id}>{ItemRender}</React.Fragment>;
};

export const FormFieldsTiki: React.FC<any> = ({ register, errors, arrAttributes, control }) => {
  return (
    <div className="form-fields-tiki">
      {arrAttributes.map((item) => renderField(item, register, errors, control))}
    </div>
  );
};
