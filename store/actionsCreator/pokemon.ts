import axios from 'axios';
import { Dispatch } from 'react';
import { Action, ActionType } from 'store/actionTypes';

export const getAllDataPokemon = (offset: number, limit: number) => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.SET_LOADING,
    payload: true,
  });

  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

    let listPokemon: any = [];
    data &&
      data?.results?.map((data: any) => {
        let dataPokemon = data.url.split('/');
        let num = dataPokemon[dataPokemon.length - 2];

        let pokemon = {
          id: +num,
          name: data.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`,
        };

        listPokemon.push(pokemon);
      });

    dispatch({
      type: ActionType.SET_DATA_OWNED,
      payload: data.count,
    });

    dispatch({
      type: ActionType.GET_ALL_DATA_POKEMON,
      payload: listPokemon,
    });

    dispatch({
      type: ActionType.SET_LOADING,
      payload: false,
    });
  } catch (err: any) {
    const { data } = err.response;
    console.log(data);
  }
};
