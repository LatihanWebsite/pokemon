import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Button } from '@mui/material';
import { capitalizeFirstLetter } from 'helpers';
import { useTypedSelector } from 'hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllDataPokemon } from 'store/actionsCreator/pokemon';

export default function ListPokemon() {
  const dispatch = useDispatch();
  const { data_owned } = useTypedSelector((state) => state.pokemon);
  const { data_fetch_pokemon } = useTypedSelector((state) => state.pokemon);

  const [offsite, setOffsite] = useState<number>(0);
  const [limit, setLimit] = useState<number>(21);

  useEffect(() => {
    dispatch(getAllDataPokemon(offsite, limit));
  }, [offsite]);

  const handleNext = () => {
    setOffsite(offsite + limit);
  };

  const handleBack = () => {
    setOffsite(offsite - limit);
  };

  return (
    <>
      <h1 className='text-center text-2xl'>
        <span className='font-bold'>{data_owned} Pokemons</span> that you can catch and save to your pokemon list
      </h1>
      <div className='m-4'>
        <div className='flex my-8 justify-between md:justify-end gap-4'>
          <Button
            color='info'
            variant='outlined'
            size='small'
            startIcon={<NavigateBefore />}
            onClick={handleBack}
            disabled={offsite === 0 ? true : false}
          >
            Previous
          </Button>
          <Button color='info' variant='outlined' size='small' endIcon={<NavigateNext />} onClick={handleNext}>
            Next
          </Button>
        </div>
        <div className='grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3'>
          {data_fetch_pokemon.map((pokemon: any) => (
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <div
                  key={pokemon.id}
                  className='flex shadow-xl bg-white justify-between rounded-md items-center w-full h-auto'
                >
                  <div className='w-1/3 flex justify-center items-center'>
                    <img className='bg-gray-100 rounded-md m-2' src={pokemon.image} width={100} alt={pokemon.name} />
                  </div>
                  <div className='w-2/3'>
                    <p>#{pokemon.id}</p>
                    <h3 className='text-lg font-semibold'>{capitalizeFirstLetter(pokemon.name)}</h3>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
