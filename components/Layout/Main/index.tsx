import Navbar from './Navbar';

export const MainLayout: React.FC = (props) => {
  return (
    <>
      <Navbar />
      <main className='p-4 md:p-10'>{props.children}</main>
    </>
  );
};
