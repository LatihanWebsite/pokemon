import ListPokemon from 'components/ListPokemon';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pokemon</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <ListPokemon />
    </>
  );
};

export default Home;
