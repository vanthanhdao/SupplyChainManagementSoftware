import { create } from "zustand";


// Define the store type
interface TechnicalProductState {
  images: string | null;
  specifications:string | null;
  setTechProductState: (newImages:string, newSpecifications:string) => void;
}

// Create the store
const useTechProductStore = create<TechnicalProductState>((set, get) => ({
    images: null,
    specifications:null,
    setTechProductState:(newImages, newSpecifications) => {
            set({
              images:newImages,
              specifications:newSpecifications
            });

      },
}));

export default useTechProductStore;
