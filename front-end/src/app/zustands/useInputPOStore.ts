import { create } from "zustand";

// Define the store type
interface InputPurchaseOrderState {
  inputs: IInputPurchaseOrder;
  selectShippingCost: number;
  setInputPO: (newInputs: Partial<IInputPurchaseOrder>) => void;
  setShippingCost: (newShippingCost: number) => void;
}

const date = new Date();

const initialState: IInputPurchaseOrder = {
  companyName: null,
  companyAddress: null,
  deliveryDate: date.toLocaleDateString(),
  shippingVia: "Shipping Company",
  shippingViaId: 0,
  terms: "Shipping and Payment Terms",
  shipTo: null,
  seller: "DAEWOO",
  notes: "Note*",
  taxRate: 8.6,
};

// Create the store
const useInputPOStore = create<InputPurchaseOrderState>((set, get) => ({
  inputs: initialState,
  selectShippingCost: 0,
  setInputPO: (newInputs) => {
    set({
      inputs: { ...get().inputs, ...newInputs },
    });
  },
  setShippingCost: (newShippingCost) => {
    set({ selectShippingCost: newShippingCost });
  },
}));

export default useInputPOStore;
