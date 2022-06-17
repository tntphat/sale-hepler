import React, { useState } from 'react';
import { SvgDelete, SvgDown, SvgEdit, SvgRight } from '../../../../assets/svg';
import { useDispatch } from 'react-redux';
import { EditForm } from '../EditForm/EditForm';
import { ModalForm } from '../../../../components/common/Modal';
import { toggleLoading } from '../../../../redux/slice/apiSlice/messagesSlice';
import { apiMessages } from '../../../../services/api';
import './Accordion.scss';
import { useAppSelector } from '../../../../redux';

interface IAccordion {
  autoReply: any;
  collectionAutoReply: any;
  autoReplies: any;
}

const Accordion = ({ autoReply, collectionAutoReply, autoReplies }: IAccordion) => {
  const dispatch = useDispatch();
  const [isHideAddButton, setIsHideAddButton] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [clicked, setClicked] = useState<any>(false);
  const { pageId } = useAppSelector((state) => state.pageSlice);

  const toggle = (index: any) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const handleSubmitDelete = async () => {
    setIsOpenDeleteModal(false);

    const selectedAutoReplies = collectionAutoReply.mappings.filter((value: any, index: any) => {
      return value._id !== autoReply._id;
    });

    const payload = {
      _id: collectionAutoReply._id,
      pageId: pageId,
      mappings: selectedAutoReplies,
    };

    dispatch(toggleLoading());
    await apiMessages.updateAutoReply(collectionAutoReply._id, payload);
    dispatch(toggleLoading());
  };

  return (
    <div className="accordion">
      <div className="accordion__text">
        <div
          className="accordion__keyword-wrapper"
          onClick={() => toggle(autoReply._id)}
          key={autoReply._id}
        >
          <div className="accordion__icon">
            {clicked === autoReply._id ? <SvgDown /> : <SvgRight />}
          </div>
          <div className="accordion__keywords">
            {autoReply.keys.map((key: any, id: any) => {
              return (
                <p key={id} className="accordion__keyword">
                  {key}
                </p>
              );
            })}
          </div>
        </div>

        {clicked === autoReply._id ? (
          <div className="accordion__response">
            <p>{autoReply.responseContent}</p>
          </div>
        ) : null}
      </div>
      <div className="accordion__action">
        <div
          className="accordion__action-edit"
          onClick={() => {
            setIsOpenEditModal(true);
            setIsHideAddButton(true);
          }}
        >
          <SvgEdit />
        </div>
        <div
          className="accordion__action-delete"
          onClick={() => {
            setIsOpenDeleteModal(true);
          }}
        >
          <SvgDelete />
        </div>
      </div>

      <EditForm
        autoReply={autoReply}
        collectionAutoReply={collectionAutoReply}
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

export default Accordion;
