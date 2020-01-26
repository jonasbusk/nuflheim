import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'


class Roster extends Component {

  state = {
    team: {}
  }

  render() {
    let { team } = this.state;

    return(
      <Container>

        <Row>
          <Col md="5">
            <Table borderless size="sm" className="team-table team-table-1">
              <tbody>
                <tr>
                  <td>Team Name:</td>
                  <td><Form.Control type="text" size="sm" className="text-center" /></td>
                </tr>
                <tr>
                  <td>Team Race:</td>
                  <td><Form.Control type="text" size="sm" className="text-center" /></td>
                </tr>
                <tr>
                  <td>Coach:</td>
                  <td><Form.Control type="text" size="sm" className="text-center" /></td>
                </tr>
                <tr>
                  <td>Treasury:</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="0 GP" readOnly /></td>
                </tr>
                <tr>
                  <td>Team Value:</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="0 GP" readOnly /></td>
                </tr>
              </tbody>
            </Table>
          </Col>

          <Col md="7">
            <Table borderless size="sm" className="team-table team-table-2">
              <tbody>
                <tr>
                  <td>Re-rolls:</td>
                  <td><Form.Control type="number" size="sm" defaultValue="0" /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="50,000 GP" readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="0 GP" readOnly /></td>
                </tr>
                <tr>
                  <td>Fan Factor:</td>
                  <td><Form.Control type="number" size="sm" defaultValue="0" /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="10,000 GP" plaintext readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="0 GP" readOnly /></td>
                </tr>
                <tr>
                  <td>Assistant Coaches:</td>
                  <td><Form.Control type="number" size="sm" defaultValue="0" /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="10,000 GP" plaintext readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="0 GP" readOnly /></td>
                </tr>
                <tr>
                  <td>Cheerleaders:</td>
                  <td><Form.Control type="number" size="sm" defaultValue="0" /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="10,000 GP" plaintext readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="0 GP" readOnly /></td>
                </tr>
                <tr>
                  <td>Apothecary:</td>
                  <td><Form.Control type="number" size="sm" defaultValue="0" /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="10,000 GP" plaintext readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue="0 GP" readOnly /></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table bordered hover size="sm" className="player-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player Name</th>
                  <th>Position</th>
                  <th>MA</th>
                  <th>ST</th>
                  <th>AG</th>
                  <th>AV</th>
                  <th>Starting Skills</th>
                  <th>Improvements</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((i) => {
                  return (<tr id={i}>
                    <td className="player-number">{i}</td>
                    <td className="player-name"><Form.Control type="text" plaintext /></td>
                    <td className="player-position"></td>
                    <td className="player-ma"></td>
                    <td className="player-st"></td>
                    <td className="player-ag"></td>
                    <td className="player-av"></td>
                    <td className="player-starting-skills"></td>
                    <td className="player-improvements"></td>
                    <td className="player-value"></td>
                  </tr>)
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Roster;
