import React, {Component} from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Tabs from 'react-bootstrap/Tabs'
import Form from 'react-bootstrap/Form'

import rosters from '../data'


// A player in the player list
const player = (name, position, ma, st, ag, pa, av, skills, value, primary, secondary) => {
  return {
    name: name,
    position: position,
    ma: ma,
    st: st,
    ag: ag,
    pa: pa,
    av: av,
    skills: skills,
    value: value,
    primary: primary,
    secondary: secondary
  }
}


class Team extends Component {

  state = {
    budget: 1000000,
    name: '',
    roster: rosters[0],
    coach: '',
    reRolls: 0,
    dedicatedFans: 0,
    assistantCoaches: 0,
    cheerleaders: 0,
    apothecary: 0,
    players: new Array(16).fill(null).map((x) => player())
  }

  setRoster = (roster_index) => {
    // Select a team roster
    this.setState({
      roster: rosters[roster_index],
      reRolls: 0,
      dedicatedFans: 0,
      assistantCoaches: 0,
      cheerleaders: 0,
      apothecary: 0,
      players: new Array(16).fill(null).map((x) => player())
    });
  }

  setPlayer = (player_number, player_position) => {
    // Set a player in the player list
    // Note: inputs player_number and player_position are one-indexed
    let players = this.state.players;
    if (player_position === 0) {
      // No position is selected: insert empty player
      players[player_number-1] = player(players[player_number-1].name);
    } else {
      // Position is selected: insert player
      let p = this.state.roster.players[player_position-1];
      players[player_number-1] = player(players[player_number-1].name, player_position, p.ma, p.st, p.ag, p.pa, p.av, p.skills, p.cost, p.primary, p.secondary);
    }
    this.setState({players: players})
  }

  setPlayerName = (player_number, player_name) => {
    // Set the name of a player in the player list
    let players = this.state.players;
    players[player_number-1].name = player_name;
    this.setState({players: players});
  }

  getTeamValue = () => {
    // Compute the current team value
    let tv = 0;
    tv += this.state.reRolls * this.state.roster.reRollsCost;
    tv += this.state.dedicatedFans * 10000;
    tv += this.state.assistantCoaches * 10000;
    tv += this.state.cheerleaders * 10000;
    tv += this.state.apothecary * 50000;
    tv += this.state.players.reduce((total, player) => {return total + (player.value || 0)}, 0);
    return tv;
  }

  getTreasury = () => {
    // Compute the current treasury value
    return this.state.budget - this.getTeamValue();
  }

  formatCost = (x) => {
    // Format a number into a cost string, example: 10000 -> 10,000 GP
    return `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} GP`;
  }

  render() {
    return (
      <Container>

        <Tabs defaultActiveKey="team">
          <Tab eventKey="team" title="Team">
            <Row>
              <Col md="5">
                <Table borderless size="sm" className="margin-zero team-table-1">
                  <tbody>
                    <tr>
                      <td>Team Name:</td>
                      <td><Form.Control type="text" size="sm" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} /></td>
                    </tr>
                    <tr>
                      <td>Team Roster:</td>
                      <td>
                        <Form.Control as="select" size="sm" onChange={(e) => this.setRoster(e.target.value)}>
                         {rosters.map((roster, i) => {return <option key={i} value={i}>{roster.name}</option>})}
                        </Form.Control>
                      </td>
                    </tr>
                    <tr>
                      <td>Coach:</td>
                      <td><Form.Control type="text" size="sm" value={this.state.coach} onChange={(e) => this.setState({coach: e.target.value})} /></td>
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
                      <td>Team re-rolls:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.reRolls} onChange={(e) => this.setState({reRolls: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 8)})} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.roster.reRollsCost)} readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.reRolls * this.state.roster.reRollsCost)} readOnly /></td>
                    </tr>
                    <tr>
                      <td>Dedicated Fans:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.dedicatedFans} onChange={(e) => this.setState({dedicatedFans: Math.max(parseInt(e.target.value) || 0, 0)})} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" defaultValue={this.formatCost(10000)} plaintext readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.dedicatedFans * 10000)} readOnly /></td>
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
                      <td><Form.Control type="number" size="sm" value={this.state.apothecary} onChange={(e) => this.setState({apothecary: Math.min(Math.max(parseInt(e.target.value) || 0, 0), 1)})} readOnly={!this.state.roster.apothecaryAllowed} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" defaultValue={this.formatCost(50000)} plaintext readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.apothecary * 50000)} readOnly /></td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="budget" title="Budget">
            <Row>
              <Col md="5">
                <Table borderless size="sm" className="margin-zero budget-table">
                  <tbody>
                    <tr>
                      <td>Budget:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.budget} onChange={(e) => this.setState({budget: e.target.value})} /></td>
                      <td>GP</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Tab>
        </Tabs>

        <Row>
          <Col>
            <Table bordered hover size="sm" className="player-table table-striped">
              <thead>
                <tr>
                  <th className="text-center"></th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Position</th>
                  <th className="text-center">MA</th>
                  <th className="text-center">ST</th>
                  <th className="text-center">AG</th>
                  <th className="text-center">PA</th>
                  <th className="text-center">AV</th>
                  <th className="text-left">Skills</th>
                  <th className="text-center">Value</th>
                </tr>
              </thead>
              <tbody>
                {this.state.players.map((player, i) => {
                  return (<tr key={i+1}>
                    <td className="player-number">{i+1}</td>
                    <td className="player-name"><Form.Control type="text" id={i+1} plaintext value={player.name || ""} onChange={(e) => this.setPlayerName(parseInt(e.target.id), e.target.value)} /></td>
                    <td className="player-position">
                      <Form.Control as="select" id={i+1} size="sm" plaintext value={player.position || 0} onChange={(e) => this.setPlayer(parseInt(e.target.id), parseInt(e.target.value))}>
                        <option key="0" value="0">-</option>
                        {this.state.roster.players.map((p, i) => {return <option key={i+1} value={i+1}>{p.position}</option>})}
                      </Form.Control>
                    </td>
                    <td className="player-ma">{player.ma}</td>
                    <td className="player-st">{player.st}</td>
                    <td className="player-ag">{player.ag && player.ag + '+'}</td>
                    <td className="player-pa">{(player.pa && player.pa + '+') || (player.pa === null && '-')}</td>
                    <td className="player-av">{player.av && player.av + '+'}</td>
                    <td className="player-skills">{player.skills && player.skills.join(", ")}</td>
                    <td className="player-value">{player.value && this.formatCost(player.value)}</td>
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

export default Team;
