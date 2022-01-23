import Navbar from './Navbar';

export const MainLayout: React.FC = (props) => {
  return (
    <>
      <Navbar />
      <main className='p-4'>{props.children}</main>
    </>
  );
};
