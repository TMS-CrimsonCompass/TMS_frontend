"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function TokenInterceptor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Sign in with the token
      signIn('credentials', {
        token,
        redirect: false,
      }).then((result) => {
        if (result?.ok) {
          // Remove the token from URL by redirecting to the same page without query params
          router.replace('/');
        } else {
          console.error('Failed to authenticate with token', result?.error);
        }
      });
    }
  }, [searchParams, router]);
  
  return null; // This component doesn't render anything
}
