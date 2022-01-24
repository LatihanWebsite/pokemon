import Link from 'next/link';
import React from 'react';

export default function NotFoundPage404() {
  return (
    <>
      <div className='flex flex-col gap-10 justify-center items-center p-10 h-[calc(100%-164px)]'>
        <img src='/images/404-image.png' width={'90%'} />
        <Link href={'/'}>
          <button className='bg-[#e3350d] hover:bg-[#ca2d0a] active:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 text-white w-full md:w-60 h-12 shadow-md font-semibold rounded-md py-2 px-4'>
            Back Home!
          </button>
        </Link>
      </div>
    </>
  );
}
