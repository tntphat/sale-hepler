import React, { useEffect, useRef } from 'react';
import { template1, templateClothes } from '../../../constants/template';
import { apiFbPostTemplates } from '../../../services/api/facebook/apiPostTemplates';
import { Box, SearchText } from '../../common';
import './Templates.scss';

const TemplateItem = ({ template, setOpenTemplates, setValue, product }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.innerHTML = template();
  }, []);
  return (
    <div
      onClick={() => {
        setOpenTemplates(false);
        console.log(product);

        setValue(template(product));
      }}
      className="templates__item"
      ref={ref}
    ></div>
  );
};

export const Templates = ({ setOpenTemplates, setValue, product }) => {
  useEffect(() => {
    apiFbPostTemplates.getListTemplate().then(console.log);
  }, []);
  return (
    <Box title="Chọn bài đăng mẫu">
      <SearchText placeholder="Tìm kiếm bài đăng mẫu" />
      <div className="templates__grid">
        {[template1, templateClothes].map((item, id) => (
          <TemplateItem
            template={item}
            key={id}
            setOpenTemplates={setOpenTemplates}
            setValue={setValue}
            product={product}
          />
        ))}
      </div>
    </Box>
  );
};
