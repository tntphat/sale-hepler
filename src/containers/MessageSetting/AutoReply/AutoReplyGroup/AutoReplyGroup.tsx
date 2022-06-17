import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SvgAdd, SvgClose, SvgDelete, SvgEdit } from '../../../../assets/svg';
import { InputText, TextArea } from '../../../../components/common';
import { ModalForm } from '../../../../components/common/Modal';
import { useAppSelector } from '../../../../redux';
import { toggleLoading } from '../../../../redux/slice/apiSlice/messagesSlice';
import { apiMessages } from '../../../../services/api';
import Accordion from '../Accordion/Accordion';

interface IAutoReplyGroup {
  autoReplies: any;
  autoReply: any;
}

export const AutoReplyGroup = ({ autoReplies, autoReply }: IAutoReplyGroup) => {
  const dispatch = useDispatch();

  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTagValue, setInputTagValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const refArea = useRef<HTMLTextAreaElement | any>(null);
  const { pageId } = useAppSelector((state) => state.pageSlice);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm({ defaultValues: { title: autoReply.name } });

  const handleSubmitDelete = async (autoReplyId: any) => {
    setIsOpenDeleteModal(false);
    const payload = {
      data: {
        pageId: pageId,
        ids: [autoReplyId],
      },
    };
    dispatch(toggleLoading());
    await apiMessages.deleteAutoReply(payload);
    dispatch(toggleLoading());
  };

  const handleDeleteTag = (value: number) => {
    const tmpTags = [...tags];
    tmpTags.splice(value, 1);
    setTags(tmpTags);
  };

  const handleChangeTagValue = (e: any) => {
    setInputTagValue(e.target.value);
  };

  const handleSubmitTag = (e: any): void => {
    if (e.key === 'Enter') {
      setTags((pre) => [...pre, inputTagValue]);
      setInputTagValue('');
    }
  };

  const handleSubmitAddReply = async (data: any) => {
    if (tags.length === 0) {
      setError('Nhập từ khóa');
      return;
    }
    setIsOpenAddModal(false);
    const { text } = data;
    const payload = {
      _id: autoReply._id,
      pageId: pageId,
      mappings: [
        ...autoReply.mappings,
        {
          keys: tags,
          responseContent: text,
          active: true,
        },
      ],
    };
    dispatch(toggleLoading());
    await apiMessages.updateAutoReply(autoReply._id, payload);
    dispatch(toggleLoading());
    reset({ text: '' });
    setTags([]);
    setInputTagValue('');
    setError('');
  };

  const handleSubmitEditAutoReply = async (data: any) => {
    setIsOpenEditModal(false);
    const { title } = data;
    const payload = { ...autoReply, name: title };

    console.log(payload);

    dispatch(toggleLoading());
    await apiMessages.updateAutoReply(autoReply._id, payload);
    dispatch(toggleLoading());
  };

  useEffect(() => {
    setError('');
  }, [tags]);

  return (
    <div className="auto-reply__group">
      <div className="auto-reply__title">
        <h5>{autoReply.name}</h5>
        <div className="setting-selection__action">
          <div
            className="setting-selection__btn-edit"
            onClick={() => {
              setIsOpenEditModal(true);
            }}
          >
            <SvgEdit />
          </div>
          <div
            className="setting-selection__btn-delete"
            onClick={() => {
              setIsOpenDeleteModal(true);
            }}
          >
            <SvgDelete />
          </div>
        </div>
      </div>
      {autoReply.mappings.map((item: any, id: any) => {
        return (
          <Accordion
            key={id}
            autoReply={item}
            collectionAutoReply={autoReply}
            autoReplies={autoReplies}
          />
        );
      })}
      <div
        className="auto-reply__add"
        onClick={() => {
          //   setSelectedReplyGroup(autoReply);
          setIsOpenAddModal(true);
        }}
      >
        <SvgAdd />
      </div>

      {/* Add Auto Reply */}
      <form onSubmit={handleSubmit(handleSubmitAddReply)}>
        <ModalForm isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} agreeText="Xác nhận">
          <div className="setting-selection__edit-modal">
            <div className="setting-selection__modal-title">
              <h4>Thêm tin nhắn tự động</h4>
            </div>
            <div className="quick-reply__modal-choice">
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
                placeholder="Thêm các từ khóa"
                ref={refArea}
                error={error}
              />
            </div>
            {error ? <span className="inputs__err">{error}</span> : null}

            <div className="setting-selection__quick-text">
              <InputText
                id="text"
                placeholder="Nội dung tin nhắn trả lời tự động"
                {...register('text', {
                  required: {
                    value: true,
                    message: 'Nhập nội dung tin nhắn mẫu tự động',
                  },
                })}
                error={errors.text?.type === 'required' && errors.text.message}
              />
            </div>
          </div>
        </ModalForm>
      </form>
      {/* Delete Group Auto Reply*/}
      <ModalForm
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        agreeText="Xác nhận"
        handleSubmit={() => handleSubmitDelete(autoReply._id)}
      >
        <div className="setting-selection__confirm-modal">
          <div className="setting-selection__modal-title">
            <h4>Xác nhận xóa</h4>
          </div>
          <p>Bạn có chắc chắn muốn xóa không?</p>
        </div>
      </ModalForm>
      {/* Edit Group Auto Reply Title */}
      <form onSubmit={handleSubmit2(handleSubmitEditAutoReply)}>
        <ModalForm isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal} agreeText="Xác nhận">
          <div className="setting-selection__confirm-modal">
            <div className="setting-selection__modal-title">
              <h4>Chỉnh sửa nhóm tin nhắn tự động</h4>
            </div>
            <div className="setting-selection__quick-text">
              <InputText
                id="title"
                placeholder="Tên nhóm tin nhắn tự động"
                {...register2('title', {
                  required: {
                    value: true,
                    message: 'Nhập tên nhóm tin nhắn mẫu tự động',
                  },
                })}
                error={errors2.title?.type === 'required' && errors2.title.message}
              />
            </div>
          </div>
        </ModalForm>
      </form>
    </div>
  );
};
