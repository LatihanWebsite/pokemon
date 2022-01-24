import { capitalizeFirstLetter } from 'helpers';
import Link from 'next/link';
import React from 'react';

interface CardPokemonProps {
  id: number;
  name: string;
  image: string;
}

export default function CardPokemon(props: CardPokemonProps) {
  return (
    <Link href={`/pokemon/${props.id}`}>
      <a>
        <div
          key={props.id}
          className='flex shadow-lg border-2 bg-white justify-between rounded-md items-center w-full h-auto'
        >
          <div className='w-1/3 flex justify-center items-center'>
            <img className='bg-gray-100 rounded-md m-2' src={props.image} width={100} alt={props.name} />
          </div>
          <div className='w-2/3'>
            <p>#{props.id}</p>
            <h3 className='text-lg font-semibold'>{capitalizeFirstLetter(props.name)}</h3>
          </div>
        </div>
      </a>
    </Link>
  );
}
