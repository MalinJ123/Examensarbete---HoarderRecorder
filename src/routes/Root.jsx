import React from 'react';
import { Outlet } from 'react-router-dom';
import {Header} from "../components/Header.jsx"

const Root = () => {
  return (
    <>
  <Header/> 
      <Outlet /> 
    </>
  );
};

export default Root;