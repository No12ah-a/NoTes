'use client';

import React from 'react';
import { Toaster, toast as hotToast } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#333',
          borderRadius: '16px',
          padding: '16px',
        },
        success: {
          iconTheme: {
            primary: '#667eea',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#f5576c',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}

export const toast = {
  success: (message: string) => hotToast.success(message),
  error: (message: string) => hotToast.error(message),
  loading: (message: string) => hotToast.loading(message),
  custom: (message: string) => hotToast(message),
};
