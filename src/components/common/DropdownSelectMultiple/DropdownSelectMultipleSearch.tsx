import React, { useEffect, useRef, useState } from 'react';
import { SvgAngle, SvgClose } from '../../../assets/svg';
import { LIMIT_DATA } from '../../../constants';
import { useDebounce, useOnClickOutside } from '../../../hooks';
// import './DropdownSelect.scss';

export const DropdownSelectMultipleSearch: React.FC<IDropdownSelect> = ({
  data,
  label,
  placeholder,
  onChange,
  value,
  error,
  className,
  classNameInput,
  classNamePlaceholder,
  isNotAllowedEdit,
  titleProp,
  fetchData,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [openBox, setOpenBox] = useState(false);

  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [myObserver, setMyObserver] = useState(null);
  const [searchText, setSearchText] = useState('');
  const dbValue = useDebounce(searchText, 300);

  const refHasMore = useRef<boolean>(true);
  const refPage = useRef<number>(1);
  const refObserver = useRef<any>(null);
  const refDbValue = useRef<string>('');

  const callbackAfterFetchingData = (data: any[]) => {
    if (data.length === LIMIT_DATA) {
      setHasMore(true);
      setPage((pre) => pre + 1);
      return;
    }
    setHasMore(false);
  };

  const fetchMoreData = () => {
    if (refPage.current === 1) return;
    fetchData({ page: refPage.current, keyWord: refDbValue.current }, callbackAfterFetchingData);
    refObserver.current.disconnect();
  };

  useOnClickOutside(() => {
    setOpenBox(false);
  }, ref);

  const handleClickItem = (item: any) => {
    // setOpenBox(false);
    let cloneVal;
    if (!value) cloneVal = [];
    else cloneVal = JSON.parse(JSON.stringify(value));
    const index = cloneVal.findIndex((ele) => ele.id === item.id);
    if (index > -1) {
      cloneVal.splice(index, 1);
    } else cloneVal.push(item);
    onChange && onChange(cloneVal);
  };

  useEffect(() => {
    const optionsObserver = {
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          if (refHasMore.current) fetchMoreData();
        }
      });
    }, optionsObserver);

    setMyObserver(observer);
  }, []);

  useEffect(() => {
    refHasMore.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    refDbValue.current = dbValue;
  }, [dbValue]);

  useEffect(() => {
    refPage.current = page;
  }, [page]);

  useEffect(() => {
    refObserver.current = myObserver;
  }, [myObserver]);

  useEffect(() => {
    setPage(1);
    fetchData({ page: 1, keyWord: dbValue }, callbackAfterFetchingData);
  }, [dbValue]);

  useEffect(() => {
    if (data?.length) {
      const list = ref.current.querySelectorAll('.dropdown-select__select');
      myObserver?.observe(list[data.length - 1]);
    }
  }, [data, myObserver]);

  return (
    <div
      className={`dropdown-select form-field ${openBox ? 'dropdown-select--open' : ''} ${
        className ? className : ''
      }`}
    >
      {!!label && <label className="dropdown-select__label">{label}</label>}
      <div className="dropdown-select__main" ref={ref}>
        <div
          className={`dropdown-select__res ${classNameInput ? classNameInput : ''}`}
          onClick={() => {
            !isNotAllowedEdit && setOpenBox((pre) => !pre);
          }}
        >
          {value?.length ? (
            <p className="dropdown-select__selected-text">Hihi</p>
          ) : (
            <p
              className={`dropdown-select__place-holder ${
                classNamePlaceholder ? classNamePlaceholder : ''
              }`}
            >
              {placeholder}
            </p>
          )}
          {!isNotAllowedEdit && <SvgAngle />}
        </div>
        <div
          className={`dropdown-select__list-outer ${
            openBox ? 'dropdown-select__list-outer--open' : ''
          }`}
        >
          <input
            placeholder="search"
            className="dropdown-select__input-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="dropdown-select__list">
            {data.map((item) => {
              const active = value?.findIndex((ele) => ele.id === item.id) > -1;
              return (
                <div
                  className={`dropdown-select__select ${
                    active ? 'dropdown-select__select--active' : ''
                  }`}
                  key={item.id}
                  onClick={() => handleClickItem(item)}
                >
                  <p>{item[titleProp || 'title']}</p>
                  {active ? <SvgClose /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {error ? <span className="inputs__err">{error}</span> : null}
    </div>
  );
};
