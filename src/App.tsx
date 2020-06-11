import React from 'react';
import './App.css';
import styled from 'styled-components';
import Draggable from 'components/Draggable';

const App: React.FC = () => {
  return (
    <Draggable>
      <Box>Drag Me</Box>
    </Draggable>
  );
}

export default App;

const Box = styled.button`
  padding: 1.75rem 2.5rem;
  border-radius: 3px;
  border: solid 1px;
  background-color: #ed553b;
`;