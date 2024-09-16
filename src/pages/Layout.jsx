import * as React from 'react';
import { Outlet } from 'react-router-dom';
import ButtonAppBar from '../componentes/ButtonAppBar'; 

export default function Layout() {
  return (
    <div className="container01">
      <ButtonAppBar />  
      <div className="container02">
        <Outlet />
      </div>
    </div>
  );
}
