import { create } from "zustand";

// Define the store type
interface DetailOrderState {
  groupOrder: OrderGroup | null;
  groupOrderDetails: OrderDetailGroup[] | null;
  setGroupOrder: (newGroupOrder: OrderGroup | null) => void;
  setGroupOrderDetails: (newGroupOrder: OrderDetailGroup[]) => void;
}

// Create the store
const useGroupDetailOrderStore = create<DetailOrderState>((set, get) => ({
  groupOrder: null,
  groupOrderDetails: null,
  setGroupOrder: (newGroupOrder) => {
    set({ groupOrder: newGroupOrder });
  },
  setGroupOrderDetails: (newGroupOrder) => {
    set({ groupOrderDetails: newGroupOrder });
  },
}));

export default useGroupDetailOrderStore;
