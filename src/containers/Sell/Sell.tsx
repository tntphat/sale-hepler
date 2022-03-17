import React, { useEffect, useState } from 'react';
import { SvgEx, SvgList, SvgPlus } from '../../assets/svg';
import { Modal, SearchText, Table } from '../../components/common';
import { Box } from '../../components/common/Box/Box';
import { Post, Select, SelectNetwork } from '../../components/Sell';
import { ProgressBar } from '../../components/Sell/ProgressBar/ProgressBar';
import './Sell.scss';
import { useAppDispatch, doGetAllGroups, useAppSelector } from '../../redux';
import { ModalLoading } from '../../components/common/Modal';
import { useModalLoading } from '../../hooks';
import { apiPosts } from '../../services/api/apiPost';
import { useNavigate } from 'react-router-dom';

export const Sell = () => {
  const [step, setStep] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedGroups, setSelectedGroups] = useState<IResGroup[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { dataListGroup } = useAppSelector((state) => state.groupSlice);
  const { handleCloseModalLoading, handleOpenModalLoading } = useModalLoading();

  useEffect(() => {
    dispatch(doGetAllGroups());
  }, []);

  const handlePost = (value: string) => {
    handleOpenModalLoading();
    apiPosts
      .postMultiple(
        dataListGroup.map((gr) => ({
          groupId: +gr.id,
          content: value,
        })),
      )
      .finally(() => {
        handleCloseModalLoading();
        navigate('/');
      });
  };

  return (
    <div className="sell">
      <div className="sell__progress-bar">
        <ProgressBar setStep={setStep} step={step} />
      </div>

      {step === 0 && (
        <Select
          onClickSelect1={() => {
            setIsOpen(true);
          }}
          svg1={<SvgList />}
        />
      )}
      {step === 1 && (
        <SelectNetwork
          optionsGroups={dataListGroup}
          selectedGroups={selectedGroups}
          setSelectedGroups={setSelectedGroups}
        />
      )}
      {step === 2 && (
        <Post
          handlePost={handlePost}
          selectedGroups={selectedGroups}
          setSelectedGroups={setSelectedGroups}
        />
      )}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="sell__modal">
          <h3>Chọn sản phẩm</h3>
          <SearchText placeholder="Tìm kím sản phẩm" />
          <Table />
        </div>
      </Modal>
      {/* <ModalLoading isOpen={true} /> */}
    </div>
  );
};
