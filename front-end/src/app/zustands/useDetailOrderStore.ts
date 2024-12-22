import { create } from "zustand";

// Define the store type
interface DetailOrderState {
  selectedRows: DetailOrder[] | null;
  subTotalRows: number;
  orderCode: number | null;
  setSelectedRowState: (newSelected: DetailOrder[] | null) => void;
  setSubTotalRows: (newTotalRows: DetailOrder[] | null) => void;
  setOrderCode: (newOrderCode: number | null) => void;
}

// Create the store
const useDetailOrderStore = create<DetailOrderState>((set, get) => ({
  selectedRows: null,
  subTotalRows: 0,
  orderCode: null,
  setSelectedRowState: (newSelected) => {
    set({
      selectedRows: newSelected,
    });
  },
  setSubTotalRows: (newTotalRows) => {
    const newSubTotal = newTotalRows?.reduce((acc, row) => acc + row.money, 0);
    set({ subTotalRows: Number(newSubTotal) });
  },
  setOrderCode: (newOrderCode) => {
    set({ orderCode: newOrderCode });
  },
}));

export default useDetailOrderStore;
