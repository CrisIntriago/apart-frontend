"use client";

import React, { createContext, useContext, useState } from "react";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  languages: string;
  photo?: string | null;
}

interface RegisterContextType {
  formData: RegisterData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterData>>;
  resetFormData: (keepEmail?: boolean) => void;
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialFormData: RegisterData = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    country: "",
    languages: "",
    photo: "",
  };

  const [formData, setFormData] = useState<RegisterData>(initialFormData);

  const resetFormData = (keepEmail: boolean = false) => {
    setFormData((prev) => ({
      ...initialFormData,
      email: keepEmail ? prev.email : "",
    }));
  };

  return (
    <RegisterContext.Provider value={{ formData, setFormData, resetFormData }}>
      {children}
    </RegisterContext.Provider>
  );
};
