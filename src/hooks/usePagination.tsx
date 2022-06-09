import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux';
import { doCloseModal, doOpenModal } from '../redux/slice';
import { useDebounce } from './useDebounce';

const LIMIT = 12;

export const usePagination = ({ classNameItem, fetchData }) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [myObserver, setMyObserver] = useState(null);
  const [searchText, setSearchText] = useState('');
  const dbValue = useDebounce(searchText, 300);
  const [data, setData] = useState([]);

  const refHasMore = useRef<boolean>(true);
  const refPage = useRef<number>(1);
  const refObserver = useRef<any>(null);
  const refDbValue = useRef<string>('');

  useEffect(() => {
    const optionsObserver = {
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          if (refHasMore.current) {
            fetchData({ page: refPage.current, title: dbValue }).then((res) => {
              setPage((pre) => pre + 1);
              setData((pre) => [...pre, ...res.data.data.templates]);
              if (res.data.data.templates.length !== LIMIT) {
                setHasMore(false);
              }
            });
          }
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
    // fetchData({ page: 1, title: dbValue }).then((res) => {
    //   setData(res.data.data.templates);
    //   setPage((pre) => pre + 1);
    //   if (res.data.data.templates.length !== LIMIT) {
    //     setHasMore(false);
    //   }
    // });
  }, [dbValue]);

  useEffect(() => {
    if (page === 1) {
      fetchData({ page: 1, title: dbValue }).then((res) => {
        setData(res.data.data.templates);
        setPage((pre) => pre + 1);
        if (res.data.data.templates.length !== LIMIT) {
          setHasMore(false);
        }
      });
    }
  }, [page]);

  useEffect(() => {
    if (data?.length) {
      const list = document.querySelectorAll(classNameItem);

      myObserver?.observe(list[data.length - 1]);
    }
  }, [data, myObserver]);
  return { data, page, searchText, setSearchText, setPage };
};
