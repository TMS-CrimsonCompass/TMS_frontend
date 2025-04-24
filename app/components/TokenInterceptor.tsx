"use client";

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

function TokenInterceptorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      signIn('credentials', {
        token,
        redirect: false,
      }).then((result) => {
        if (result?.ok) {
          router.replace('/');
        } else {
          console.error('Authentication failed:', result?.error);
        }
      });
    }
  }, [searchParams, router]);

  return null;
}

// Wrapper component with Suspense boundary
export default function TokenInterceptor() {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <TokenInterceptorContent />
    </Suspense>
  );
}
