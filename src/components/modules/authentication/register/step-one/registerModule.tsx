'use client';
import React, { Suspense } from 'react';
import RegisterPageContent from './_registerPageContent';

const RegisterModule = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterPageContent />
    </Suspense>
  );
};

export default RegisterModule;
