import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SvgClose } from '../../../../assets/svg';
import { InputText, TextArea } from '../../../../components/common';
import { ModalForm } from '../../../../components/common/Modal';
import { useAppSelector } from '../../../../redux';
import { toggleLoading } from '../../../../redux/slice/apiSlice/messagesSlice';
import { apiMessages } from '../../../../services/api';
import '../../QuickReply/EditForm/EditForm.scss';

interface IEditForm {
  autoReply: any;
  collectionAutoReply: any;
  isOpenEditModal: any;
  setIsOpenEditModal: any;
  isHideAddButton: any;
}

export const EditForm = ({
  autoReply,
  collectionAutoReply,
  isOpenEditModal,
  setIsOpenEditModal,
  isHideAddButton,
}: IEditForm) => {
  const dispatch = useDispatch();
  const [inputTagValue, setInputTagValue] = useState<string>('');
  const [editKeyword, setEditKeyword] = useState<any[]>([]);
  const refArea = useRef<HTMLTextAreaElement | any>(null);
  const { pageId } = useAppSelector((state) => state.pageSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { text: autoReply.responseContent } });

  const handleDeleteTag = (value: number) => {
    const tmpTags = [...editKeyword];
    tmpTags.splice(value, 1);
    setEditKeyword(tmpTags);
  };

  const handleChangeTagValue = (e: any) => {
    setInputTagValue(e.target.value);
  };

  const handleSubmitTag = (e: any): void => {
    if (e.key === 'Enter') {
      setEditKeyword((pre: any) => [...pre, inputTagValue]);
      setInputTagValue('');
    }
  };

  const selectedAutoReplies = collectionAutoReply.mappings.filter((value: any, index: any) => {
    return value._id !== autoReply._id;
  });

  const handleSubmitEdit = async (data: any) => {
    setIsOpenEditModal(false);
    const { name, text } = data;

    const selectedAutoReplies = collectionAutoReply.mappings.map((value: any, index: any) => {
      if (value._id === autoReply._id)
        return { ...value, keys: editKeyword, responseContent: text };
      else return value;
    });

    const payload = {
      _id: collectionAutoReply._id,
      pageId: pageId,
      mappings: selectedAutoReplies,
    };
    console.log(payload);

    dispatch(toggleLoading());
    await apiMessages.updateAutoReply(collectionAutoReply._id, payload);
    dispatch(toggleLoading());
  };

  useEffect(() => {
    setEditKeyword(autoReply.keys);
  }, [isOpenEditModal]);

  return (
    <form onSubmit={handleSubmit(handleSubmitEdit)}>
      <ModalForm isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal} agreeText="Xác nhận">
        <div className="setting-selection__edit-modal">
          <div className="setting-selection__modal-title">
            <h4>Chỉnh sửa tin nhắn tự động</h4>
          </div>
          <div className="setting-selection__quick-text">
            {editKeyword.length > 0 ? (
              <div className="edit-form__modal-choice" hidden={!isHideAddButton}>
                {editKeyword?.map((tag: any, id: any) => {
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
                  placeholder="Thêm các từ khóa"
                  ref={refArea}
                />
              </div>
            ) : (
              <></>
            )}

            <InputText
              id="text"
              {...register('text', {
                required: {
                  value: true,
                  message: 'Nhập câu trả lời',
                },
              })}
              error={errors.text?.type === 'required' && errors.text.message}
            />
          </div>
        </div>
      </ModalForm>
    </form>
  );
};
