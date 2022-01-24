import { AutoAwesome } from '@mui/icons-material';
import { Button } from '@mui/material';
import { capitalizeFirstLetter } from 'helpers';
import Link from 'next/link';
import React from 'react';

interface CardPokemonProps {
  id: number;
  idCatch: number;
  name: string;
  nickname: string;
  image: string;
  onHandleRelease: (id: number, name: string) => void;
}

export default function CardMyPokemon(props: CardPokemonProps) {
  return (
    <div
      key={props.id}
      className='flex p-4 shadow-lg border-2 bg-white justify-between rounded-md items-center w-full h-auto'
    >
      <Link href={`/pokemon/${props.id}`}>
        <a>
          <div className='flex w-full justify-center items-center gap-4'>
            <div className='w-1/3 flex justify-center items-center'>
              <img className='bg-gray-100 rounded-md m-2' src={props.image} width={100} alt={props.name} />
            </div>
            <div className='w-2/3'>
              <p>#{props.id}</p>
              <h3 className='text-md'>{capitalizeFirstLetter(props.name)}</h3>
              <h3 className='text-lg font-semibold'>{capitalizeFirstLetter(props.nickname.slice(0, 10))}</h3>
            </div>
          </div>
        </a>
      </Link>
      <Button
        onClick={() => props.onHandleRelease(props.idCatch, props.nickname)}
        color='error'
        variant='outlined'
        startIcon={<AutoAwesome />}
      >
        Release
      </Button>
    </div>
  );
}
