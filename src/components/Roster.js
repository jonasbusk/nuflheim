import React, {Component} from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

import races from '../data'


class Roster extends Component {

  state = {
    budget: 1000000,
    name: '',
    race: races[0],
    coach: '',
    reRolls: 0,
    fanFactor: 0,
    assistantCoaches: 0,
    cheerleaders: 0,
    apothecary: 0,
  }

  getTeamValue = () => {
    let tv = 0;
    tv += this.state.reRolls * this.state.race.reRollsCost;
    tv += this.state.fanFactor * 10000;
    tv += this.state.assistantCoaches * 10000;
    tv += this.state.cheerleaders * 10000;
    tv += this.state.apothecary * 50000;
    return tv;
  }

  getTreasury = () => {
    return this.state.budget - this.getTeamValue();
  }

  formatCost = (x) => {
    return `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} GP`;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} className="budget-header" eventKey="0">
                  Budget
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form inline>
                      Budget: <Form.Control type="number" size="sm" className="text-right" value={this.state.budget} onChange={(e) => this.setState({budget: e.target.value})} />GP
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Table borderless size="sm" className="margin-zero team-table-1">
              <tbody>
                <tr>
                  <td>Team Name:</td>
                  <td><Form.Control type="text" size="sm" className="text-center" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} /></td>
                </tr>
                <tr>
                  <td>Team Race:</td>
                  <td><Form.Control type="text" size="sm" className="text-center" value={this.state.race.name} readOnly /></td>
                </tr>
                <tr>
                  <td>Coach:</td>
                  <td><Form.Control type="text" size="sm" className="text-center" value={this.state.coach} onChange={(e) => this.setState({coach: e.target.value})} /></td>
                </tr>
                <tr>
                  <td>Treasury:</td>
                  <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.getTreasury())} readOnly /></td>
                </tr>
                <tr>
                  <td>Team Value:</td>
                  <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.getTeamValue())} readOnly /></td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md="7">
            <Table borderless size="sm" className="margin-zero team-table-2">
              <tbody>
                <tr>
                  <td>Re-rolls:</td>
                  <td><Form.Control type="number" size="sm" value={this.state.reRolls} onChange={(e) => this.setState({reRolls: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 8)})} /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.race.reRollsCost)} readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.reRolls * this.state.race.reRollsCost)} readOnly /></td>
                </tr>
                <tr>
                  <td>Fan Factor:</td>
                  <td><Form.Control type="number" size="sm" value={this.state.fanFactor} onChange={(e) => this.setState({fanFactor: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 9)})} /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue={this.formatCost(10000)} plaintext readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.fanFactor * 10000)} readOnly /></td>
                </tr>
                <tr>
                  <td>Assistant Coaches:</td>
                  <td><Form.Control type="number" size="sm" value={this.state.assistantCoaches} onChange={(e) => this.setState({assistantCoaches: Math.max(parseInt(e.target.value) || 0, 0)})} /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue={this.formatCost(10000)} plaintext readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.assistantCoaches * 10000)} readOnly /></td>
                </tr>
                <tr>
                  <td>Cheerleaders:</td>
                  <td><Form.Control type="number" size="sm" value={this.state.cheerleaders} onChange={(e) => this.setState({cheerleaders: Math.max(parseInt(e.target.value) || 0, 0)})} /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue={this.formatCost(10000)} plaintext readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.cheerleaders * 10000)} readOnly /></td>
                </tr>
                <tr>
                  <td>Apothecary:</td>
                  <td><Form.Control type="number" size="sm" value={this.state.apothecary} onChange={(e) => this.setState({apothecary: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 1)})} readOnly={!this.state.race.apothecaryAllowed} /></td>
                  <td>x</td>
                  <td><Form.Control type="text" size="sm" className="text-right" defaultValue={this.formatCost(50000)} plaintext readOnly /></td>
                  <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.apothecary * 50000)} readOnly /></td>
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
                  return (<tr key={i}>
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
