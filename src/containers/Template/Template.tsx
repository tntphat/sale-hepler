import React, { useEffect, useRef, useState } from 'react';
import { template1, templateClothes } from '../../constants/template';
import { apiFbPostTemplates } from '../../services/api/facebook/apiPostTemplates';
import { Box, Dropdown, SearchText } from '../../components/common';
import { convertTemplateToText } from '../../helpers';
import { usePagination } from '../../hooks';
import { SvgPlus } from '../../assets/svg';
import { useNavigate } from 'react-router-dom';
import { SvgDots } from '../../assets/svg/SvgDots';
// import './Templates.scss';

const TemplateItem = ({ template, title, id, setPage, product, setOpenTemplates, setValue }) => {
  const ref = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    ref.current.innerHTML = ref.current.innerHTML + convertTemplateToText(template, title, true);
  }, []);
  return (
    <div
      onClick={() => {
        if (!product?.id) return;
        apiFbPostTemplates.generatePost(id, product.id).then((res) => {
          setOpenTemplates(false);
          setValue(res.data.data.post);
        });
        // setOpenTemplates(false);
        // setValue(template(product));
      }}
      className="templates__item"
    >
      <Dropdown
        options={[
          {
            text: 'Xoá',
            cb: () => {
              apiFbPostTemplates.deleteTemplate(id).then(() => setPage(1));
            },
          },
          { text: 'Chỉnh sửa', cb: () => navigate(`create/${id}`) },
        ]}
        className="templates__item-dropdown"
      >
        <SvgDots />
      </Dropdown>
      <div ref={ref} />
    </div>
  );
};

export const Template: React.FC<any> = ({ setOpenTemplates, setValue, product }) => {
  const [templates, setTemplates] = useState([]);
  const { data, searchText, setSearchText, setPage } = usePagination({
    fetchData: apiFbPostTemplates.getListTemplate,
    classNameItem: '.templates__item',
  });
  const navigate = useNavigate();
  // useEffect(() => {
  //   apiFbPostTemplates.getListTemplate().then((res) => {
  //     setTemplates(res.data.data.templates);
  //   });
  // }, []);
  return (
    <Box title="Chọn bài đăng mẫu">
      <div className="templates__add" onClick={() => navigate('create')}>
        <SvgPlus />
      </div>
      <SearchText
        placeholder="Tìm kiếm bài đăng mẫu"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="templates__grid">
        {data.map((item, id) => (
          <TemplateItem
            template={item.content}
            title={item.title}
            id={item._id}
            key={id}
            // setOpenTemplates={setOpenTemplates}
            // setValue={setValue}
            product={product || {}}
            setPage={setPage}
            setValue={setValue}
            setOpenTemplates={setOpenTemplates}
          />
        ))}
      </div>
    </Box>
  );
};
