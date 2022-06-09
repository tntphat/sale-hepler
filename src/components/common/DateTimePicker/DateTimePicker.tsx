import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { SvgClock, SvgDate } from '../../../assets/svg';
import './DateTimePicker.scss';

type TypeDateTimePicker = {
  onChange?: any;
};

export const DateTimePicker: React.FC<TypeDateTimePicker> = ({ onChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState('');
  useEffect(() => {
    const date = new Date(startDate);
    const splitTime = time.split(':');
    if (time) {
      date.setHours(splitTime[0]);
      date.setMinutes(splitTime[1]);
    }
    onChange && onChange(date);
  }, [time, startDate]);
  return (
    <div className="datetime-picker">
      <div>
        <SvgDate />
        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
      </div>
      <div>
        <SvgClock />
        <input
          value={time}
          type="time"
          className="datetime-picker__time-input"
          onChange={(e) => {
            setTime(e.target.value);
          }}
          maxLength={5}
          placeholder="HH:MM"
        />
      </div>
    </div>
  );
};
