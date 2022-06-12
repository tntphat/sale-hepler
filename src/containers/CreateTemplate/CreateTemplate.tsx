import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, EmojiPicker, InputText, TextArea } from '../../components/common';
import { dataFieldsTemplate, dataFieldsTemplateReverse } from '../../constants';
import { convertTemplateToText, convertTextToTemplate } from '../../helpers';
import { apiFbPostTemplates } from '../../services/api/facebook/apiPostTemplates';
import './CreateTemplate.scss';

export const CreateTemplate = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const refArea = useRef<HTMLTextAreaElement | any>(null);
  const navigate = useNavigate();
  const [cursorPos, setCursorPos] = useState();
  const { id } = useParams();
  const handleClickField = (event: React.MouseEvent, text: string) => {
    event.stopPropagation();
    const newText = `<${text}>`;
    refArea.current?.focus();

    const ref = refArea.current;
    const start = ref.value.substring(0, ref.selectionStart);
    const end = ref.value.substring(ref.selectionStart);
    const finalText = start + newText + end;
    setValue(finalText);
    setCursorPos(start.length + newText.length);
  };

  const handleClickEmoji = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    event.stopPropagation();
    refArea.current?.focus();

    const ref = refArea.current;
    const start = ref.value.substring(0, ref.selectionStart);
    const end = ref.value.substring(ref.selectionStart);
    const finalText = start + emojiObject.emoji + end;
    setValue(finalText);
    setCursorPos(start.length + emojiObject.emoji.length);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    refArea.current.selectionEnd = cursorPos;
  }, [cursorPos]);

  const renderFieldsTemplate = () => {
    return Object.keys(dataFieldsTemplate).map((item, i) => {
      return (
        <div
          className="create-template__chip"
          onClick={(e) => handleClickField(e, dataFieldsTemplate[item])}
        >
          {dataFieldsTemplate[item]}
        </div>
      );
    });
  };

  //   const handleKeyPress = (e) => {
  //     //   if(e.which === 18 )
  //     console.log(e.code, e.which, e);
  //   };
  const handleSubmit = () => {
    const obj = { content: convertTextToTemplate(value), title };
    const action = id
      ? apiFbPostTemplates.editTemplate({ id, ...obj })
      : apiFbPostTemplates.createTemplatePost(obj);
    action.then(() => {
      navigate('/templates');
    });
  };

  useEffect(() => {
    if (!id) return;
    apiFbPostTemplates.getSpecificTemplate(id).then((res) => {
      const { content, title } = res.data.data.template;
      setValue(convertTemplateToText(content));
      setTitle(title);
    });
  }, [id]);

  return (
    <Box>
      <InputText
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Nhập tiêu đề"
        label="Tiêu đề"
      />
      <TextArea ref={refArea} value={value} onChange={handleChange} />
      <EmojiPicker onClickEmoji={handleClickEmoji} refArea={refArea} />

      <div className="create-template__chips-container">{renderFieldsTemplate()}</div>
      <Button isDisabled={!(title && value)} onClick={handleSubmit}>
        Lưu
      </Button>
    </Box>
  );
};
