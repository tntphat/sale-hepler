import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SvgClose, SvgDelete, SvgEdit } from '../../../../assets/svg';
import { ModalForm } from '../../../../components/common/Modal';
import { useAppSelector } from '../../../../redux';
import { toggleLoading } from '../../../../redux/slice/apiSlice/messagesSlice';
import { apiMessages } from '../../../../services/api';
import { EditForm } from '../EditForm/EditForm';
import './QuickReplyItem.scss';

export const QuickReplyItem = ({ quickReply }: { quickReply: any }) => {
  const dispatch = useDispatch();
  const [isHideAddButton, setIsHideAddButton] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { pageId } = useAppSelector((state) => state.pageSlice);

  const handleSubmitDelete = async () => {
    setIsOpenDeleteModal(false);
    const payload = {
      data: {
        pageId: pageId,
        ids: [quickReply._id],
      },
    };
    dispatch(toggleLoading());
    await apiMessages.deleteQuickReply(payload);
    dispatch(toggleLoading());
  };

  return (
    <div className="quick-reply-item__selection">
      <div className="quick-reply-item__reply">
        <h5>{quickReply.name}</h5>
        <div className="quick-reply-item__text">
          <p>{quickReply.text}</p>
        </div>
        <div className="quick-reply-item__choice">
          {quickReply.samples.map((sample: any, id: any) => {
            return (
              <div key={id} className="quick-reply-item__choice-item">
                <span key={id}>{sample.title}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="setting-selection__action">
        <div
          className="setting-selection__btn-edit"
          onClick={() => {
            setIsOpenEditModal(true);
            setIsHideAddButton(true);
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
      <EditForm
        quickReply={quickReply}
        isOpenEditModal={isOpenEditModal}
        setIsOpenEditModal={setIsOpenEditModal}
        isHideAddButton={isHideAddButton}
      />

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
    </div>
  );
};
