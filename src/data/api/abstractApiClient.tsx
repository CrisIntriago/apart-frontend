"use client"
import axios, { AxiosRequestConfig } from "axios";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from "react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  timeout: 10000,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

export const ClientProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

export interface RequestConfig<V = any> {
  path: string;
  queryParameters?: Record<string, any>;
  body?: any;
  config?: AxiosRequestConfig;
}

export interface ApartResponseApi<V = any> {
  data?: V;
  error?: string;
  status?: number;
}

const processSuccessResponse = <V,>(data: V): ApartResponseApi<V> => ({
  data,
  status: 200,
});

const processErrorResponse = <V,>(error: any): ApartResponseApi<V> => {
  if (axios.isAxiosError(error)) {
    return {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
  }
  return { error: String(error), status: 500 };
};

export async function get<V = any>(requestConfig: RequestConfig): Promise<ApartResponseApi<V>> {
  try {
    const response = await api.get<V>(requestConfig.path, {
      params: requestConfig.queryParameters,
      ...requestConfig.config,
    });
    return processSuccessResponse<V>(response.data);
  } catch (error) {
    return processErrorResponse<V>(error);
  }
}

export async function post<V = any>(requestConfig: RequestConfig): Promise<ApartResponseApi<V>> {
  try {
    const response = await api.post<V>(
      requestConfig.path,
      requestConfig.body,
      {
        params: requestConfig.queryParameters,
        ...requestConfig.config,
      }
    );
    if (response.status !== 200) {
      throw {
        error: response.statusText,
        status: response.status,
        data: response.data,
      };
    }
    return processSuccessResponse<V>(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
    throw error;
  }
}

export async function put<V = any>(requestConfig: RequestConfig): Promise<ApartResponseApi<V>> {
  try {
    const response = await api.put<V>(
      requestConfig.path,
      requestConfig.body,
      {
        params: requestConfig.queryParameters,
        ...requestConfig.config,
      }
    );
    return processSuccessResponse<V>(response.data);
  } catch (error) {
    return processErrorResponse<V>(error);
  }
}

export async function del<V = any>(requestConfig: RequestConfig): Promise<ApartResponseApi<V>> {
  try {
    const response = await api.delete<V>(requestConfig.path, {
      params: requestConfig.queryParameters,
      ...requestConfig.config,
    });
    return processSuccessResponse<V>(response.data);
  } catch (error) {
    return processErrorResponse<V>(error);
  }
}
