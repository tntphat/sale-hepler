import React from 'react';
import './ProgressBar.scss';

const dataDefault = ['Chọn sản phẩm', 'Chọn nhóm', 'Viết bài đăng'];

export const ProgressBar: React.FC<IProgressBar> = ({
  step,
  setStep,
  isDisabled,
  data = dataDefault,
}) => {
  return (
    <div className="progress-bar">
      {data.map((item, index) => {
        let className = 'progress-bar__step';
        if (index === step) className += ' progress-bar__step--active';
        if (step > index) className += ' progress-bar__step--passed';
        if (isDisabled) className += ' progress-bar__step--disabled';
        return (
          <React.Fragment key={index}>
            <div className={className} onClick={() => !isDisabled && setStep(index)}>
              {index + 1}
              <p>{item}</p>
            </div>
            {index !== data.length - 1 ? (
              <div
                className={`progress-bar__line ${step > index ? 'progress-bar__line--passed' : ''}`}
              ></div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};
