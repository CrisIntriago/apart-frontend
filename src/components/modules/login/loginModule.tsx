'use client';
import React, { Suspense } from 'react';
import LoginPageContent from './_loginPageContent';

const LoginModule = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
};

export default LoginModule;
