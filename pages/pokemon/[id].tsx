import { CatchingPokemon } from '@mui/icons-material';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { capitalizeFirstLetter, clearWord } from 'helpers';
import { useTypedSelector } from 'hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOneDataPokemon } from 'store/actionsCreator/pokemon';
import { setLoading } from 'store/actionsCreator/status';

export default function PokemonDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { loading } = useTypedSelector((state) => state.status);
  const { data_pokemon } = useTypedSelector((state) => state.pokemon);

  const [listPokemon, setListPokemon] = useState<any[]>([]);

  const [nickName, setNickName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogDone, setOpenDialogDone] = useState<boolean>(false);
  const [openDialogFailed, setOpenDialogFailed] = useState<boolean>(false);

  useEffect(() => {
    id && dispatch(getOneDataPokemon(id));

    let data = localStorage.getItem('MyPokemon');

    if (data) {
      let storage = JSON.parse(localStorage.getItem('MyPokemon') || '');
      setListPokemon(storage);
    } else {
      setListPokemon([]);
    }
  }, [id]);

  if (loading) {
    return <LinearProgress />;
  }

  const handleCatchPokemon = () => {
    let data = localStorage.getItem('MyPokemon');
    var newId = 0;

    if (data) {
      console.log('masuk if');
      let storage = JSON.parse(data || '');
      newId = storage[storage.length - 1].idCatch;
    }

    let catchPokemon = {
      idCatch: newId + 1,
      id: data_pokemon.id,
      name: data_pokemon.name,
      nickName: nickName.trim(),
      image: data_pokemon.image,
    };

    localStorage.setItem('MyPokemon', JSON.stringify([...listPokemon, catchPokemon]));
    router.push('/my-pokemon-list');
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpenDialogDone(false);
    setOpenDialogFailed(false);
  };

  const handleLoadCathing = () => {
    dispatch(setLoading(true));
    setOpenDialog(false);

    setTimeout(() => {
      // probably 50%
      let num = Math.random() >= 0.5;

      if (num) {
        dispatch(setLoading(false));
        setOpenDialogDone(true);
      } else {
        dispatch(setLoading(false));
        setOpenDialogFailed(true);
      }
    }, 5000);
  };

  const handleSavePokemon = () => {
    if (nickName === '') {
      setError(true);
      console.log('Please input nickname!');
    } else {
      setOpenDialogDone(false);
      handleCatchPokemon();
    }
  };

  const handleChangeInput = (value: string) => {
    setError(false);
    setNickName(value);
  };

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
          <button
            onClick={handleClickOpen}
            className='bg-[#e3350d] hover:bg-[#ca2d0a] active:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 text-white w-full h-12 shadow-md font-semibold mb-4 rounded-md py-2 px-4'
          >
            <CatchingPokemon /> Try to Catch {data_pokemon.name}
          </button>
          <div className='grid grid-cols-2 rounded-xl gap-4 my-4 p-4 md:mt-0 items-start bg-[#30A7D7]'>
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
              {data_pokemon.abilities?.map((data: any, idx: React.Key | null | undefined) => (
                <p key={idx} className='text-white'>
                  {clearWord(data.ability.name)}
                </p>
              ))}
            </div>
            <div>
              <p className='font-semibold mb-1 text-white'>Types</p>
              {data_pokemon.types?.map((data: any, idx: React.Key | null | undefined) => (
                <p key={idx} className='text-white'>
                  {clearWord(data.type.name)}
                </p>
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
                  {data_pokemon.stats?.map((data: any, idx: React.Key | null | undefined) => (
                    <TableRow key={idx} hover>
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
          {data_pokemon.moves?.map((data: any, idx: React.Key | null | undefined) => (
            <Chip key={idx} label={clearWord(data.move.name)} />
          ))}
        </div>
      </div>

      {/* Dialog Notice */}
      <Dialog open={openDialog} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>{`Do want to catch ${data_pokemon.name} ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            The probability level in catching pokemon is 50%
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleLoadCathing}>Go!</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Done */}
      <Dialog open={openDialogDone} keepMounted aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>{`Congratulation! you have got ${data_pokemon.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText className='mb-4' id='alert-dialog-slide-description'>
            Before you save pokemon please give the pokemon a nickname!
          </DialogContentText>
          <TextField
            error={error}
            value={nickName}
            onChange={(e) => handleChangeInput(e.target.value)}
            fullWidth
            label={error ? 'Error' : 'Nickname'}
            id='fullWidth'
            helperText={error ? 'Please input nickname' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSavePokemon}>Save!</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Lose */}
      <Dialog open={openDialogFailed} keepMounted aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>{`Sorry you haven't been lucky enough to catch ${data_pokemon.name}, please try later!`}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
