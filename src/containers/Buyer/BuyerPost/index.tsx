import React, { useEffect, useState } from 'react';
import { SvgList } from '../../../assets/svg';
import { Modal } from '../../../components/common';
import { Post, Select, SelectNetwork, TableProduct } from '../../../components/Sell';
import { ProgressBar } from '../../../components/Sell/ProgressBar/ProgressBar';
// import './Sell.scss';
import { useAppDispatch, doGetAllGroups, useAppSelector } from '../../../redux';
import { useModalLoading } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { apiFbPosts } from '../../../services/api';
import { apiCommon } from '../../../services/api/apiCommon';

export const BuyerPost = () => {
  const [step, setStep] = useState<number>(0);
  const [selectedGroups, setSelectedGroups] = useState<IResGroup[]>([]);

  const [product, setProduct] = useState();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { dataListGroup } = useAppSelector((state) => state.groupSlice);
  const { handleCloseModalLoading, handleOpenModalLoading } = useModalLoading();

  useEffect(() => {
    dispatch(doGetAllGroups());
  }, []);

  const handlePost = ({
    content,
    images,
    schedulePostTime,
  }: {
    content: string;
    images: File[];
    schedulePostTime: number;
  }) => {
    handleOpenModalLoading();
    console.log(images);
    apiCommon
      .getLinkImage({ images })
      .then((res) => {
        return apiFbPosts.postMultiple({
          groupsId: selectedGroups.map((gr) => +gr.id),
          content,
          images: res.data,
          //   productId: product.id,
          schedulePostTime,
          //   is_seller: true,
        });
      })

      .finally(() => {
        handleCloseModalLoading();
        navigate('/');
      });
  };

  return (
    <div className="sell">
      <div className="sell__progress-bar">
        <ProgressBar setStep={setStep} step={step} data={['Chọn nhóm', 'Viết bài đăng']} />
      </div>

      {/* {step === 0 && (
        <Select
          onClickSelect1={() => {
            setIsOpen(true);
          }}
          svg1={<SvgList />}
        />
      )} */}
      {step === 0 && (
        <SelectNetwork
          optionsGroups={dataListGroup}
          selectedGroups={selectedGroups}
          setSelectedGroups={setSelectedGroups}
        />
      )}
      {step === 1 && (
        <Post
          handlePost={handlePost}
          selectedGroups={selectedGroups}
          setSelectedGroups={setSelectedGroups}
          product={product}
          isBuyer
        />
      )}

      {/* <ModalLoading isOpen={true} /> */}
    </div>
  );
};
