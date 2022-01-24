import {
  Chip,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { capitalizeFirstLetter, clearWord } from 'helpers';
import { useTypedSelector } from 'hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOneDataPokemon } from 'store/actionsCreator/pokemon';

export default function PokemonDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { loading } = useTypedSelector((state) => state.status);
  const { data_pokemon } = useTypedSelector((state) => state.pokemon);

  useEffect(() => {
    id && dispatch(getOneDataPokemon(id));
  }, [id]);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <>
      <h1 className='mb-8 mt-4 text-3xl font-bold'>
        #{data_pokemon.id} {data_pokemon.name}
      </h1>
      <div className='md:grid md:grid-cols-2 mb-8'>
        <div className='flex mb-8 md:mb-0 justify-center bg-gray-100 rounded-xl w-full'>
          <img src={data_pokemon.image} alt={data_pokemon.name} />
        </div>
        <div className='w-full md:pl-10'>
          <div className='grid grid-cols-2 rounded-xl gap-4 my-4 p-4 md:mt-0 items-start bg-[#E3350D]'>
            <div>
              <p className='font-semibold mb-1 text-white'>Height</p>
              <p className='text-white'>{data_pokemon.height / 10} m</p>
            </div>
            <div>
              <p className='font-semibold mb-1 text-white'>Weight</p>
              <p className='text-white'>{data_pokemon.weight / 10} kg</p>
            </div>
            <div>
              <p className='font-semibold mb-1 text-white'>Abilities</p>
              {data_pokemon.abilities?.map((data: any) => (
                <p className='text-white'>{clearWord(data.ability.name)}</p>
              ))}
            </div>
            <div>
              <p className='font-semibold mb-1 text-white'>Types</p>
              {data_pokemon.types?.map((data: any) => (
                <p className='text-white'>{clearWord(data.type.name)}</p>
              ))}
            </div>
          </div>
          <div className='py-4 md:pt-4 md:pb-0'>
            <TableContainer component={Paper}>
              <Table size='small' aria-label='simple table'>
                <TableHead className='bg-[#EE6B2F]'>
                  <TableRow>
                    <TableCell>
                      <p className='font-semibold text-lg text-white'>Stats</p>
                    </TableCell>
                    <TableCell align='center'>
                      <p className='font-semibold text-lg text-white'>Value</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data_pokemon.stats?.map((data: any) => (
                    <TableRow key={data.name} hover>
                      <TableCell className='font-semibold' component='th' scope='row'>
                        {capitalizeFirstLetter(clearWord(data.stat.name))}
                      </TableCell>
                      <TableCell align='center'>{data.base_stat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <div className='rounded-xl my-4 bg-gray-50 border-2 p-4'>
        <p className='font-semibold mb-2'>Moves</p>
        <div className='flex flex-wrap gap-2'>
          {data_pokemon.moves?.map((data: any) => (
            <Chip label={clearWord(data.move.name)} />
          ))}
        </div>
      </div>
    </>
  );
}
