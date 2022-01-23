import React from 'react';
import { MainLayout } from './Main';

export const Layout: React.FC = (props) => {
  return <MainLayout>{props.children}</MainLayout>;
};
