import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGA from "react-ga4";

import Team from "./components/Team";
import "./App.css";


ReactGA.initialize("G-ZZJZZQKWXM");


function App() {
  return (
    <div className="App">
      <header>
        <Container><Row><Col id="header"><span className="text-orange">Nuflheim</span> Team Draft List</Col></Row></Container>
      </header>
      <main>
        <Team />
      </main>
      <footer>
        <Container>
          <Row>
            <Col>
              <p>~ Nuflheim ~</p>
              <p><small>This is an unofficial and non-commercial fan website.</small></p>
              <p><small>This website uses <a href="https://www.google.com/policies/privacy/partners/" rel="noreferrer" target="_blank">Google Analytics</a>.</small></p>
              <p><small>Please report any issues via <a href="https://github.com/jonasbusk/nuflheim" rel="noreferrer" target="_blank">GitHub</a>.</small></p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
