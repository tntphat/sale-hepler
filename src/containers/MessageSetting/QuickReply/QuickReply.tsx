import React, { useEffect, useRef, useState } from 'react';
import { SvgClose, SvgPlus } from '../../../assets/svg';
import { Button, InputText, TextArea } from '../../../components/common';
import { ModalForm } from '../../../components/common/Modal';
import { apiMessages } from '../../../services/api';
import { QuickReplyItem } from './QuickReplyItem/QuickReplyItem';
import './QuickReply.scss';
import { useAppSelector } from '../../../redux';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toggleLoading } from '../../../redux/slice/apiSlice/messagesSlice';

export const QuickReply = () => {
  const dispatch = useDispatch();
  const { loadingSetting } = useAppSelector((state) => state.messagesSlice);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [inputTagValue, setInputTagValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [isHideAddButton, setIsHideAddButton] = useState<boolean>(false);
  const refArea = useRef<HTMLTextAreaElement | any>(null);
  const [quickReplies, setQuickReplies] = useState<any[]>([]);
  const { pageId } = useAppSelector((state) => state.pageSlice);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleToggleDiplayAddButton = () => {
    setIsHideAddButton((pre) => !pre);
  };

  const handleChangeTagValue = (e: any) => {
    setInputTagValue(e.target.value);
  };

  const handleSubmitTag = (e: any): void => {
    if (e.key === 'Enter') {
      setTags((pre) => [...pre, inputTagValue.trim()]);
      setInputTagValue('');
    }
  };

  const handleDeleteTag = (value: number) => {
    const tmpTags = [...tags];
    tmpTags.splice(value, 1);
    setTags(tmpTags);
  };

  const handleSubmitAddReply = async (data: any) => {
    setIsOpenAddModal(false);
    const { name, text } = data;

    const tagList = tags.map((tag: any, id: any) => {
      return {
        content_type: 'text',
        title: tag,
        payload: tag.toLowerCase().replace(' ', '/'),
      };
    });
    const payload = {
      pageId: pageId,
      name: name,
      text: text,
      samples: tagList,
    };

    dispatch(toggleLoading());
    await apiMessages.addQuickReply(payload);
    dispatch(toggleLoading());
    data = {
      name: '',
      text: '',
    };
    reset({ name: '', text: '' });
    setTags([]);
    setInputTagValue('');
  };

  useEffect(() => {
    const fetchAutoReplies = async () => {
      const quickReplies = await apiMessages.getQuickReply(pageId);
      setQuickReplies(quickReplies.data.data);
    };
    fetchAutoReplies();
  }, [loadingSetting]);

  return (
    <div className="quick-reply">
      <div className="message-setting__title">
        <p>Tin nhắn soạn sẵn</p>
      </div>
      {quickReplies.map((quickReply, id) => {
        return <QuickReplyItem key={id} quickReply={quickReply} />;
      })}
      <div
        className="setting-selection__btn-add"
        onClick={() => {
          setIsOpenAddModal(true);
        }}
      >
        <Button className="button--basic">
          <SvgPlus color={'#1877f2'} />
          <span>Thêm</span>
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleSubmitAddReply)}>
        <ModalForm isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} agreeText="Xác nhận">
          <div className="setting-selection__edit-modal">
            <div className="setting-selection__modal-title">
              <h4>Thêm tin nhắn mẫu</h4>
            </div>
            <div className="setting-selection__quick-text">
              <InputText
                id="name"
                placeholder="Tiêu đề tin nhắn"
                {...register('name', {
                  // required: {
                  // value: true,
                  // message: 'Nhập tiêu đề tin nhắn mẫu',
                  // },
                })}
                error={errors.name?.type === 'required' && errors.name.message}
              />
              <InputText
                id="text"
                placeholder="Nội dung tin nhắn mẫu (*)"
                {...register('text', {
                  required: {
                    value: true,
                    message: 'Nhập nội dung tin nhắn mẫu',
                  },
                })}
                error={errors.text?.type === 'required' && errors.text.message}
              />
            </div>

            {tags && (
              <div className="quick-reply__modal-choice" hidden={!isHideAddButton}>
                {tags.map((tag, id) => {
                  return (
                    <div
                      key={id}
                      className="quick-reply-item__choice-item"
                      onClick={() => handleDeleteTag(id)}
                    >
                      <span>{tag}</span>
                      <SvgClose />
                    </div>
                  );
                })}
                <TextArea
                  onChange={handleChangeTagValue}
                  value={inputTagValue}
                  onKeyPress={handleSubmitTag}
                  placeholder="Thêm các lựa chọn"
                  ref={refArea}
                />
              </div>
            )}

            <div
              hidden={isHideAddButton}
              className="setting-selection__btn-add"
              onClick={() => {
                setIsOpenAddModal(true);
                handleToggleDiplayAddButton();
              }}
            >
              <Button className="button--basic">
                <SvgPlus color={'#1877f2'} />
                <span>Thêm lựa chọn</span>
              </Button>
            </div>
          </div>
        </ModalForm>
      </form>
    </div>
  );
};
