import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux';
import { doCloseModal, doOpenModal } from '../redux/slice';

export const useModalLoading = () => {
  const dispatch = useDispatch();
  const isLoadingModal = useAppSelector((state) => state.modalSlice);

  const handleCloseModalLoading = () => {
    dispatch(doCloseModal());
  };

  const handleOpenModalLoading = () => {
    dispatch(doOpenModal());
  };

  return { handleCloseModalLoading, handleOpenModalLoading, isLoadingModal };
};
