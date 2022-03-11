import React, { useEffect, useState } from 'react';
import { SvgEx, SvgList, SvgPlus } from '../../assets/svg';
import { Modal } from '../../components/common';
import { Box } from '../../components/common/Box/Box';
import { Select } from '../../components/Sell';
import { ProgressBar } from '../../components/Sell/ProgressBar/ProgressBar';
import './Sell.scss';

export const Sell = () => {
  const [step, setStep] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      {step === 1 && <Box title="Chọn bài đăng" />}
      {step === 2 && <Box title="Viết bài đăng" />}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
