import { create } from "zustand";

// Define the store type
interface InputPurchaseOrderState {
  inputs: IInputPurchaseOrder;
  setInputPO: (newInputs: Partial<IInputPurchaseOrder>) => void;
}

const date = new Date();

const initialState: IInputPurchaseOrder = {
  companyName: "Company Name",
  companyAddress: "123 Street BD",
  deliveryDate: date.toLocaleDateString(),
  shippingVia: "Shipping Company",
  terms: "Shipping and Payment Terms",
  shipTo: "123 Street BD",
  seller: "Company Name",
  notes: "Note*",
};

// Create the store
const useInputPOStore = create<InputPurchaseOrderState>((set, get) => ({
  inputs: initialState,
  setInputPO: (newInputs) => {
    set({
      inputs: { ...get().inputs, ...newInputs },
    });
  },
}));

export default useInputPOStore;
