import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SvgClose, SvgDelete, SvgEdit } from '../../../../assets/svg';
import { Button } from '../../../../components/common';
import { ModalForm } from '../../../../components/common/Modal';
import { useAppSelector } from '../../../../redux';
import { toggleLoading } from '../../../../redux/slice/apiSlice/messagesSlice';
import { apiMessages } from '../../../../services/api';
import { EditForm } from '../EditForm/EditForm';
import './QuickReplyItem.scss';

interface IQuickReplyItem {
  quickReply: any;
  isSample?: boolean;
  setIsOpen?: any;
}

export const QuickReplyItem = ({ quickReply, isSample, setIsOpen }: IQuickReplyItem) => {
  const dispatch = useDispatch();
  const [isHideAddButton, setIsHideAddButton] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { pageId } = useAppSelector((state) => state.pageSlice);
  const { chatUserDetails } = useAppSelector((state) => state.messagesSlice);

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

  const handleSendReply = async () => {
    const payload = {
      receiverId: chatUserDetails.id,
      quickReplyId: quickReply._id,
    };
    await apiMessages.sendQuickReply(payload);
    setIsOpen(false);
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
      {isSample ? (
        <div>
          <Button onClick={handleSendReply}>G???i</Button>
        </div>
      ) : (
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
      )}
      <EditForm
        quickReply={quickReply}
        isOpenEditModal={isOpenEditModal}
        setIsOpenEditModal={setIsOpenEditModal}
        isHideAddButton={isHideAddButton}
      />

      <ModalForm
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        agreeText="X??c nh???n"
        handleSubmit={handleSubmitDelete}
      >
        <div className="setting-selection__confirm-modal">
          <div className="setting-selection__modal-title">
            <h4>X??c nh???n x??a</h4>
          </div>
          <p>B???n c?? ch???c ch???n mu???n x??a kh??ng?</p>
        </div>
      </ModalForm>
    </div>
  );
};
