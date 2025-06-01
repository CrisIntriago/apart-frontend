'use client';
import React, { Suspense } from 'react';
import SigninPageContent from './SigninPageContent';

const SigninPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SigninPageContent />
    </Suspense>
  );
};

export default SigninPage;
