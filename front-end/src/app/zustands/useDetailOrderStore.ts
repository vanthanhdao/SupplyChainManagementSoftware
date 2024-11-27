import { create } from "zustand";

// Define the store type
interface DetailOrderState {
  selectedRows: DetailOrder[] | null;
  subTotalRows: number;
  setSelectedRowState: (newSelected: DetailOrder[]) => void;
  setSubTotalRows: (newTotalRows: DetailOrder[]) => void;
}

// Create the store
const useDetailOrderStore = create<DetailOrderState>((set, get) => ({
  selectedRows: null,
  subTotalRows: 0,
  setSelectedRowState: (newSelected) => {
    set({
      selectedRows: newSelected,
    });
  },
  setSubTotalRows: (newTotalRows) => {
    const newSubTotal = newTotalRows.reduce((acc, row) => acc + row.money, 0);
    console.log(newSubTotal);
    set({ subTotalRows: Number(newSubTotal) });
  },
}));

export default useDetailOrderStore;
