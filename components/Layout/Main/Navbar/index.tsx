import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className='sticky z-10 top-0 h-16 bg-[#F5DB13] w-full drop-shadow-lg'>
      <div className=' h-full flex justify-between items-center p-2 md:py-2 md:px-8'>
        <Link href='/'>
          <a>
            <div className='p-1'>
              <img src={'/icons/pokemon-logo.svg'} width={120} alt='logo-pokemon' />
            </div>
          </a>
        </Link>
        <div>
          <Link href='/my-pokemon-list'>
            <a>
              <Button color='inherit'>My Pokemon List</Button>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
