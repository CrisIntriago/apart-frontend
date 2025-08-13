"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { StudentProfile } from "@/types/user";
import { useStudentProfile } from "@/data/api/student/studentService";
import { useAccountStore } from "@/data/store/accountStore";

interface UserContextType {
  user: StudentProfile | null;
  setUser: React.Dispatch<React.SetStateAction<StudentProfile | null>>;
  isLoading: boolean;
  error: unknown;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session } = useAccountStore();
  const { data, isLoading, error, refetch } = useStudentProfile();
  const [user, setUser] = useState<StudentProfile | null>(null);

  useEffect(() => {
    if (session?.uid) {
      refetch();
    } else {
      setUser(null);
    }
  }, [session?.uid, refetch]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  if (isLoading) return <div className="p-8 text-center">Cargando perfil...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error al cargar perfil</div>;

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
