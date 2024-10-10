import React, { createContext, useState, FC, ReactNode } from 'react';


// Định nghĩa kiểu dữ liệu cho errorGlobal
interface ErrorState {
  errorEmail?: boolean;
  errorPassword?: boolean;
  errorRePassword?: boolean;
}

// Định nghĩa kiểu dữ liệu cho Context
interface DataContextType {
  errorGlobal: ErrorState;
  setErrorGlobal: (value: ErrorState) => void;
}

// Tạo một Context với kiểu dữ liệu đã định nghĩa
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Tạo một Provider Component để chia sẻ trạng thái
export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [errorGlobal, setErrorGlobal] = useState<ErrorState>({
    errorEmail:false,
    errorPassword:false,
    errorRePassword:false,
  }); 
  return (
    <DataContext.Provider value={{ errorGlobal, setErrorGlobal }}>
      {children}
    </DataContext.Provider>
  );
};
