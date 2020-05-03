import React, { useEffect, useState } from 'react';
import './style/App.scss';
import URLForm from './components/URLForm';
import { Container, Table } from 'reactstrap';
import DeploymentList from './components/DeploymentList';

import { useDispatch } from 'react-redux';
import { fetchServers, fetchTemplateData } from './store/actions/index';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTemplateData());
    dispatch(fetchServers());
  });
  
  return (
    <Container fluid>
      <URLForm></URLForm>
      <DeploymentList></DeploymentList>

    </Container>
  );
}

export default App;
