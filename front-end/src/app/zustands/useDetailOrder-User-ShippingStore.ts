import { create } from "zustand";

// Define the store type
interface DetailOrderState {
  groupOrderId: number | null;
  groupOrder: OrderGroup | null;
  groupOrderDetails: OrderDetailGroup[] | null;
  setGroupOrderId: (newGroupOrderId: number | null) => void;
  setGroupOrder: (newGroupOrder: OrderGroup | null) => void;
  setGroupOrderDetails: (newGroupOrder: OrderDetailGroup[]) => void;
}

// Create the store
const useGroupDetailOrderStore = create<DetailOrderState>((set, get) => ({
  groupOrderId: null,
  groupOrder: null,
  groupOrderDetails: null,
  setGroupOrderId: (newGroupOrderId) => {
    set({ groupOrderId: newGroupOrderId });
  },
  setGroupOrder: (newGroupOrder) => {
    set({ groupOrder: newGroupOrder });
  },
  setGroupOrderDetails: (newGroupOrder) => {
    set({ groupOrderDetails: newGroupOrder });
  },
}));

export default useGroupDetailOrderStore;
