import { create } from "zustand";



// Define the store type
interface DetailOrderState {
    selectedRows: DetailOrder[] | null;
  setSelectedRowState: (newSelected:DetailOrder[]) => void;
}

// Create the store
const useDetailOrderStore = create<DetailOrderState>((set, get) => ({
    selectedRows: null,
    setSelectedRowState:(newSelected) => {
            set({
                selectedRows:newSelected,
            });

      },
}));

export default useDetailOrderStore;
