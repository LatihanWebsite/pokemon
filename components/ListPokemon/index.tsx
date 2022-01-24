import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Button } from '@mui/material';
import CardPokemon from 'components/General/CardPokemon';
import { useTypedSelector } from 'hooks';
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
            <CardPokemon key={pokemon.id} id={pokemon.id} name={pokemon.name} image={pokemon.image} />
          ))}
        </div>
      </div>
    </>
  );
}
