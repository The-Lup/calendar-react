import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  return {
    //props
    isDateModalOpen,

    //methods
    openDateModal,
    closeDateModal,
  };
};
