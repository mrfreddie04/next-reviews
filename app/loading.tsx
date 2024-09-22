
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function LoadingPage() {
  return(
    <div className='flex justify-center items-center vertical-center'>        
      <ArrowPathIcon className='animate-spin h-6 w-6/12 text-orange-700'/>
    </div>
  );
}