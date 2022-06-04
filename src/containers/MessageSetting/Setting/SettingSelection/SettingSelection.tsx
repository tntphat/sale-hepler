import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SvgDelete, SvgEdit } from '../../../../assets/svg';
import { CustomTextArea, TextArea } from '../../../../components/common';
import { ModalForm } from '../../../../components/common/Modal/ModalForm';
import { useAppSelector } from '../../../../redux';
import { toggleLoading } from '../../../../redux/slice/apiSlice/messagesSlice';
import { apiMessages } from '../../../../services/api';
import './SettingSelection.scss';

export const SettingSelection = ({ content }: { content: string }) => {
  const dispatch = useDispatch();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const { loadingSetting } = useAppSelector((state) => state.messagesSlice);

  const { handleSubmit } = useForm();

  const { handleSubmit: handleSubmit2 } = useForm();

  const handleSubmitEdit = async () => {
    setIsOpenEditModal(false);
    const payload = {
      greetingText: inputValue,
    };
    dispatch(toggleLoading());
    await apiMessages.updateGreeting(payload);
    dispatch(toggleLoading());
  };

  const handleSubmitDelete = async () => {
    setIsOpenDeleteModal(false);
    dispatch(toggleLoading());
    await apiMessages.turnOffGreeting();
    dispatch(toggleLoading());
  };

  return (
    <div className="setting-selection">
      <div className="setting-selection__choice">
        <div className="setting-selection__item">
          <p>{content}</p>
        </div>
        <div className="setting-selection__action">
          <div
            className="setting-selection__btn-edit"
            onClick={() => {
              setIsOpenEditModal(true);
              setInputValue(content);
            }}
          >
            <SvgEdit />
          </div>
          <div className="setting-selection__btn-delete" onClick={() => setIsOpenDeleteModal(true)}>
            <SvgDelete />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleSubmitEdit)}>
        <ModalForm
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
          agreeText="Xác nhận"
          // handleSubmit={handleSubmitEdit}
        >
          <div className="setting-selection__edit-modal">
            <div className="setting-selection__modal-title">
              <h4>Chỉnh sửa</h4>
            </div>
            <CustomTextArea
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              // error={error}
            />
          </div>
        </ModalForm>
        {/* error={errors.greetingText?.type === 'required' && errors.greetingText.message} */}
      </form>

      {/* <form onSubmit={handleSubmit2(handleSubmitDelete)}> */}
      <ModalForm
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        agreeText="Xác nhận"
        handleSubmit={handleSubmitDelete}
      >
        <div className="setting-selection__confirm-modal">
          <div className="setting-selection__modal-title">
            <h4>Xác nhận xóa</h4>
          </div>
          <p>Bạn có chắc chắn muốn xóa không?</p>
        </div>
      </ModalForm>
      {/* </form> */}
    </div>
  );
};
