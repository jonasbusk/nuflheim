import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Team from './components/Team';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <header>
        <Container><Row><Col id="header">Team Draft List</Col></Row></Container>
      </header>
      <main>
        <Team />
      </main>
      <footer>
        <Container><Row><Col>~ Nuffleheim ~</Col></Row></Container>
      </footer>
    </div>
  );
}

export default App;
