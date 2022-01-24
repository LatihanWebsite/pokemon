import { CatchingPokemon } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CardMyPokemon from 'components/General/CardMyPokemon';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function MyPokemonList() {
  const [listPokemon, setListPokemon] = useState<any[]>([]);

  const [open, setOpen] = useState<boolean>(false);

  const [tempName, setTempName] = useState<string>('');
  const [tempId, setTempId] = useState<number>(0);

  function handleRelease() {
    let arrNew = listPokemon.filter((pokemon) => pokemon.idCatch !== tempId);

    if (arrNew.length === 0) {
      localStorage.removeItem('MyPokemon');
      setListPokemon([]);
    } else {
      localStorage.setItem('MyPokemon', JSON.stringify(arrNew));
      setListPokemon(arrNew);
    }

    setOpen(false);
  }

  useEffect(() => {
    let data = localStorage.getItem('MyPokemon');

    if (data) {
      let storage = JSON.parse(localStorage.getItem('MyPokemon') || '');
      setListPokemon(storage);
    } else {
      setListPokemon([]);
    }
  }, []);

  const handleClickOpen = (idCatch: number, name: string) => {
    setOpen(true);
    setTempId(idCatch);
    setTempName(name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1 className='text-center text-4xl font-bold'>My Pokemon List</h1>
      <div className='m-4'>
        {listPokemon.length === 0 ? (
          <div className='flex flex-col items-center justify-between mt-12 h-40'>
            <h1>You dont have any Pokemons</h1>
            <Link href='/'>
              <button className='bg-[#e3350d] hover:bg-[#ca2d0a] active:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 text-white w-full md:w-60 h-12 shadow-md font-semibold rounded-md py-2 px-4'>
                <CatchingPokemon /> Catch Pokemon
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className='grid gap-4 md:grid-cols-2 md:gap-4 mt-12 lg:grid-cols-3'>
              {listPokemon.length !== 0 &&
                listPokemon.map((pokemon: any) => (
                  <CardMyPokemon
                    key={pokemon.id}
                    id={pokemon.id}
                    idCatch={pokemon.idCatch}
                    name={pokemon.name}
                    nickname={pokemon.nickName}
                    image={pokemon.image}
                    onHandleRelease={(id, name) => handleClickOpen(id, name)}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      {/* Dialog Delete */}
      <Dialog open={open} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>{`Do want to release ${tempName} ?`}</DialogTitle>
        <DialogActions>
          <Button color='error' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleRelease}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
