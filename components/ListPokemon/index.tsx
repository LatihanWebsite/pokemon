import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Button, LinearProgress } from '@mui/material';
import { capitalizeFirstLetter } from 'helpers';
import { useTypedSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllDataPokemon } from 'store/actionsCreator/pokemon';

export default function ListPokemon() {
  const dispatch = useDispatch();
  const { data_owned } = useTypedSelector((state) => state.pokemon);
  const { data_fetch_pokemon } = useTypedSelector((state) => state.pokemon);
  const { loading } = useTypedSelector((state) => state.status);

  const [ListPokemon, setListPokemon] = useState<any[]>([]);
  const [offsite, setOffsite] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);

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
        <span className='font-bold'>{data_owned} Pokemons</span> that you can catch to your pokemon list
      </h1>
      <div className='m-4'>
        <div className='flex justify-between md:justify-end gap-2 '>
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
        {data_fetch_pokemon.map((pokemon: any) => (
          <div
            key={pokemon.id}
            className='flex my-4 shadow-md bg-white justify-between rounded-md items-center w-full h-auto'
          >
            <div className='w-1/3 flex justify-center items-center'>
              <img className='bg-gray-100 rounded-md m-2' src={pokemon.image} width={80} alt={pokemon.name} />
            </div>
            <div className='w-2/3'>
              <p>#{pokemon.id}</p>
              <h3 className='text-lg font-semibold'>{capitalizeFirstLetter(pokemon.name)}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
