import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SvgClose } from '../../../../assets/svg';
import { InputText, TextArea } from '../../../../components/common';
import { ModalForm } from '../../../../components/common/Modal';
import { useAppSelector } from '../../../../redux';
import { toggleLoading } from '../../../../redux/slice/apiSlice/messagesSlice';
import { apiMessages } from '../../../../services/api';
import './EditForm.scss';

interface IEditForm {
  quickReply: any;
  isOpenEditModal: any;
  setIsOpenEditModal: any;
  isHideAddButton: any;
}
export const EditForm = ({
  quickReply,
  isOpenEditModal,
  setIsOpenEditModal,
  isHideAddButton,
}: IEditForm) => {
  const dispatch = useDispatch();
  const [inputTagValue, setInputTagValue] = useState<string>('');
  const [editTags, setEditTags] = useState<any[]>([]);
  const refArea = useRef<HTMLTextAreaElement | any>(null);
  const { pageId } = useAppSelector((state) => state.pageSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: quickReply.name, text: quickReply.text } });

  const handleDeleteTag = (value: number) => {
    const tmpTags = [...editTags];
    tmpTags.splice(value, 1);
    setEditTags(tmpTags);
  };

  const handleChangeTagValue = (e: any) => {
    setInputTagValue(e.target.value);
  };

  const handleSubmitTag = (e: any): void => {
    if (e.key === 'Enter') {
      setEditTags((pre: any) => [...pre, inputTagValue.trim()]);
      setInputTagValue('');
    }
  };

  const handleSubmitEdit = async (data: any) => {
    setIsOpenEditModal(false);
    const { name, text } = data;

    const tags = editTags.map((tag: any, id: any) => {
      return {
        content_type: 'text',
        title: tag,
        payload: tag.toLowerCase().replace(' ', '/'),
      };
    });
    const payload = {
      _id: quickReply._id,
      pageId: pageId,
      name: name,
      text: text,
      samples: tags,
    };

    dispatch(toggleLoading());
    await apiMessages.updateQuickReply(quickReply._id, payload);
    dispatch(toggleLoading());
  };

  useEffect(() => {
    const tags = quickReply.samples.map((sample: any, id: any) => {
      return sample.title;
    });
    setEditTags(tags);
  }, [isOpenEditModal]);

  return (
    <form onSubmit={handleSubmit(handleSubmitEdit)}>
      <ModalForm isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal} agreeText="Xác nhận">
        <div className="setting-selection__edit-modal">
          <div className="setting-selection__modal-title">
            <h4>Chỉnh sửa tin nhắn mẫu</h4>
          </div>
          <div className="setting-selection__quick-text">
            <InputText
              id="name"
              {...register('name', {
                // required: {
                //   value: true,
                //   message: 'Nhập tiêu đề tin nhắn mẫu',
                // },
              })}
              // error={errors.name?.type === 'required' && errors.name.message}
            />
            <InputText
              id="text"
              {...register('text', {
                required: {
                  value: true,
                  message: 'Nhập nội dung tin nhắn mẫu',
                },
              })}
              error={errors.text?.type === 'required' && errors.text.message}
            />
          </div>

          {editTags.length > 0 ? (
            <div className="edit-form__modal-choice" hidden={!isHideAddButton}>
              {editTags?.map((tag: any, id: any) => {
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
          ) : (
            <></>
          )}
        </div>
      </ModalForm>
    </form>
  );
};
