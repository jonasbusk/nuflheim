import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Roster from './components/Roster';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <header>
        <Container><Row><Col id="header"><i>FF Roster</i></Col></Row></Container>
      </header>
      <main>
        <Roster />
      </main>
      <footer>
        <Container><Row><Col>~ FF Roster ~</Col></Row></Container>
      </footer>
    </div>
  );
}

export default App;
