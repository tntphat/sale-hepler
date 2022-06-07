import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux';
import { doCloseModal, doOpenModal, doSetModalMessage } from '../redux/slice';

export const useModalLoading = () => {
  const dispatch = useDispatch();
  const isLoadingModal = useAppSelector((state) => state.modalSlice);

  const handleCloseModalLoading = () => {
    dispatch(doCloseModal());
  };

  const handleOpenModalLoading = () => {
    dispatch(doOpenModal());
  };
  const handleOpenModalMessage = (msg) => {
    dispatch(doSetModalMessage(msg));
  };

  return {
    handleCloseModalLoading,
    handleOpenModalLoading,
    isLoadingModal,
    handleOpenModalMessage,
  };
};
