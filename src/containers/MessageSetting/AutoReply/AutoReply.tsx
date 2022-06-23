import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SvgPlus } from '../../../assets/svg';
import { Button, InputText } from '../../../components/common';
import { ModalForm } from '../../../components/common/Modal/ModalForm';
import { useAppSelector } from '../../../redux';
import { toggleLoading } from '../../../redux/slice/apiSlice/messagesSlice';
import { apiMessages } from '../../../services/api';
import './AutoReply.scss';
import { AutoReplyGroup } from './AutoReplyGroup/AutoReplyGroup';

export const AutoReply = () => {
  const dispatch = useDispatch();
  const [isOpenAddReplyTitleModal, setIsOpenAddReplyTitleModal] = useState<boolean>(false);
  const [autoReplies, setAutoReplies] = useState<any[]>([]);
  const { loadingSetting } = useAppSelector((state) => state.messagesSlice);
  const { pageId } = useAppSelector((state) => state.pageSlice);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSubmitAddAutoReply = async (data: any) => {
    setIsOpenAddReplyTitleModal(false);
    const { title } = data;
    const payload = {
      pageId: 110681441599820,
      name: title,
      mappings: [],
    };
    dispatch(toggleLoading());
    await apiMessages.addAutoReply(payload);
    dispatch(toggleLoading());
    reset({ title: '' });
  };

  useEffect(() => {
    const fetchAutoReplies = async () => {
      const autoReplies = await apiMessages.getAutoReply(pageId);
      setAutoReplies(autoReplies.data.data);
    };
    fetchAutoReplies();
  }, [loadingSetting]);

  return (
    <div className="auto-reply">
      <div className="auto-reply__begining">
        <div className="message-setting__title">
          <p>Tin nhắn tự động</p>
        </div>

        {autoReplies.map((autoReply: any, id: any) => {
          return <AutoReplyGroup key={id} autoReplies={autoReplies} autoReply={autoReply} />;
        })}

        <form onSubmit={handleSubmit(handleSubmitAddAutoReply)}>
          <ModalForm
            isOpen={isOpenAddReplyTitleModal}
            setIsOpen={setIsOpenAddReplyTitleModal}
            agreeText="Xác nhận"
          >
            <div className="setting-selection__confirm-modal">
              <div className="setting-selection__modal-title">
                <h4>Thêm nhóm tin nhắn tự động</h4>
              </div>
              <div className="setting-selection__quick-text">
                <InputText
                  id="title"
                  placeholder="Tên nhóm tin nhắn tự động"
                  {...register('title', {
                    required: {
                      value: true,
                      message: 'Nhập tên nhóm tin nhắn mẫu tự động',
                    },
                  })}
                  error={errors.title?.type === 'required' && errors.title.message}
                />
              </div>
            </div>
          </ModalForm>
        </form>

        <div
          className="auto-reply__add"
          onClick={() => {
            setIsOpenAddReplyTitleModal(true);
          }}
        >
          <Button className="button--basic">
            <SvgPlus color={'#1877f2'} />
            <span>Thêm</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
