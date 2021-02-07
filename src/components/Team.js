import React, {Component} from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'
import Tabs from 'react-bootstrap/Tabs'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import {rosters, skills} from '../data'


// A player in the player list
const player = (name, positionNumber, positionName, ma, st, ag, pa, av, skills, value, primaryAccess, secondaryAccess) => {
  return {
    name: name,
    positionNumber: positionNumber,
    positionName: positionName,
    ma: ma,
    st: st,
    ag: ag,
    pa: pa,
    av: av,
    skills: skills || [],
    primarySkills: [],
    secondarySkills: [],
    value: value,
    primaryAccess: primaryAccess,
    secondaryAccess: secondaryAccess
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
    players: new Array(16).fill(null).map((x) => player()),
    showPlayerAdvancementModal: false,
    selectedPlayerNumber: null
  }

  setRoster = (rosterIndex) => {
    // Select a team roster
    this.setState({
      roster: rosters[rosterIndex],
      reRolls: 0,
      dedicatedFans: 0,
      assistantCoaches: 0,
      cheerleaders: 0,
      apothecary: 0,
      players: new Array(16).fill(null).map((x) => player())
    });
  }

  setPlayer = (playerNumber, positionNumber) => {
    // Set a player in the player list
    // Note: inputs playerNumber and playerPosition are one-indexed
    let players = this.state.players;
    if (positionNumber === 0) {
      // No position is selected: insert empty player
      players[playerNumber-1] = player(players[playerNumber-1].name);
    } else {
      // Position is selected: insert new player
      let p = this.state.roster.players[positionNumber-1];
      players[playerNumber-1] = player(players[playerNumber-1].name, positionNumber, p.position, p.ma, p.st, p.ag, p.pa, p.av, p.skills, p.cost, p.primaryAccess, p.secondaryAccess);
    }
    this.setState({players: players})
  }

  setPlayerName = (playerNumber, playerName) => {
    // Set the name of a player in the player list
    let players = this.state.players;
    players[playerNumber-1].name = playerName;
    this.setState({players: players});
  }

  getSelectedPlayer = () => {
    // Get the player selected for advancement
    if (this.state.showPlayerAdvancementModal && this.state.selectedPlayerNumber) {
      return this.state.players[this.state.selectedPlayerNumber-1]
    } else {
      return null
    }
  }

  setSelectedPlayer = (player) => {
    // Save player to state at the index of the selected player
    let players = this.state.players;
    players[this.state.selectedPlayerNumber-1] = player;
    this.setState({players: players});
  }

  renderPlayerSkills = (player) => {
    // Render player skill list including skill advancements
    if (player.positionNumber) {
      let skills = [...player.skills];
      skills = skills.concat(player.primarySkills.map((s) => s + '*'));
      skills = skills.concat(player.secondarySkills.map((s) => s + '**'));
      return <span>{skills.join(", ")}</span>;
    }
  }

  showPlayerAdvancementModal = (playerNumber) => {
    // Select player and show player advancement modal
    this.setState({
      selectedPlayerNumber: playerNumber,
      showPlayerAdvancementModal: true
    });
  }

  renderSkill = (skill, category) => {
    // Render a skill in the skill advancement table
    let player = this.getSelectedPlayer();
    if (player) {
      if (player.skills.includes(skill)) {
        // Selected player has the skill as a starting skill
        return <span className="text-orange">{skill}</span>;
      } else if (!player.primaryAccess.includes(category) && !player.secondaryAccess.includes(category)) {
        // Selected player does not have access to the skill
        return <span className="text-muted">{skill}</span>;
      } else if (player.primarySkills.includes(skill) || player.secondarySkills.includes(skill)) {
        // Selected player has already added the skill
        return <span className="skill-selected" onClick={() => this.removeSkill(skill)}>{skill}</span>;
      } else {
        // Skill is available
        return <span className="skill-available" onClick={() => this.addSkill(skill, category)}>{skill}</span>;
      }
    }
  }

  addSkill = (skill, category) => {
    // Add skill to selected player
    let player = this.getSelectedPlayer()
    if (player.primaryAccess.includes(category)) {
      player.primarySkills.push(skill);
      player.primarySkills.sort();
    } else if (player.secondaryAccess.includes(category)) {
      player.secondarySkills.push(skill);
      player.secondarySkills.sort();
    }
    this.setSelectedPlayer(player);
  }

  removeSkill = (skill) => {
    // Remove skill from selected player
    let player = this.getSelectedPlayer()
    player.primarySkills = player.primarySkills.filter((s) => s !== skill)
    player.secondarySkills = player.secondarySkills.filter((s) => s !== skill)
    this.setSelectedPlayer(player);
  }

  getPlayerValue = (player) => {
    let value = player.value || 0;
    value += player.primarySkills.length * 20000;
    value += player.secondarySkills.length * 40000;
    return value;
  }

  getTeamValue = () => {
    // Compute the current team value
    let tv = 0;
    tv += this.state.reRolls * this.state.roster.reRollsCost;
    tv += this.state.dedicatedFans * 10000;
    tv += this.state.assistantCoaches * 10000;
    tv += this.state.cheerleaders * 10000;
    tv += this.state.apothecary * 50000;
    tv += this.state.players.reduce((total, player) => {return total + this.getPlayerValue(player)}, 0);
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
                      <Form.Control as="select" id={i+1} size="sm" plaintext value={player.positionNumber || 0} onChange={(e) => this.setPlayer(parseInt(e.target.id), parseInt(e.target.value))}>
                        <option key="0" value="0">-</option>
                        {this.state.roster.players.map((p, i) => {return <option key={i+1} value={i+1}>{p.position}</option>})}
                      </Form.Control>
                    </td>
                    <td className="player-ma">{player.ma}</td>
                    <td className="player-st">{player.st}</td>
                    <td className="player-ag">{player.ag && player.ag + '+'}</td>
                    <td className="player-pa">{(player.pa && player.pa + '+') || (player.pa === null && '-')}</td>
                    <td className="player-av">{player.av && player.av + '+'}</td>
                    <td className="player-skills" onClick={() => player.positionNumber && this.showPlayerAdvancementModal(i+1)}>{this.renderPlayerSkills(player)}</td>
                    <td className="player-value">{player.value && this.formatCost(this.getPlayerValue(player))}</td>
                  </tr>)
                })}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal
          show={this.state.showPlayerAdvancementModal}
          onHide={() => this.setState({showPlayerAdvancementModal: false})}
          animation={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.getSelectedPlayer() && this.getSelectedPlayer().positionName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Table size="sm" className="advancement-table">
              <thead>
                <tr>
                  <th>MA</th>
                  <th>ST</th>
                  <th>AG</th>
                  <th>PA</th>
                  <th>AV</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.getSelectedPlayer() && this.getSelectedPlayer().ma}</td>
                  <td>{this.getSelectedPlayer() && this.getSelectedPlayer().st}</td>
                  <td>{this.getSelectedPlayer() && this.getSelectedPlayer().ag + '+'}</td>
                  <td>{this.getSelectedPlayer() && this.getSelectedPlayer().pa + '+'}</td>
                  <td>{this.getSelectedPlayer() && this.getSelectedPlayer().av + '+'}</td>
                </tr>
              </tbody>
            </Table>

            <Table size="sm" className="advancement-table">
              <thead>
                <tr>
                  <th>Primary skill access</th>
                  <th>Secondary skill access</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.getSelectedPlayer() && this.getSelectedPlayer().primaryAccess}</td>
                  <td>{this.getSelectedPlayer() && this.getSelectedPlayer().secondaryAccess}</td>
                </tr>
              </tbody>
            </Table>

            <Table size="sm" className="advancement-table table-striped">
              <thead>
                <tr>
                  <th>Agility</th>
                  <th>General</th>
                  <th>Mutations</th>
                  <th>Passing</th>
                  <th>Strength</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>{this.renderSkill(skills.catch, 'A')}</td><td>{this.renderSkill(skills.block, 'G')}</td><td>{this.renderSkill(skills.bigHand, 'M')}</td><td>{this.renderSkill(skills.accurate, 'P')}</td><td>{this.renderSkill(skills.armBar, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.divingCatch, 'A')}</td><td>{this.renderSkill(skills.dauntless, 'G')}</td><td>{this.renderSkill(skills.claws, 'M')}</td><td>{this.renderSkill(skills.cannoneer, 'P')}</td><td>{this.renderSkill(skills.brawler, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.divingTackle, 'A')}</td><td>{this.renderSkill(skills.dirtyPlayer(1), 'G')}</td><td>{this.renderSkill(skills.disturbingPresence, 'M')}</td><td>{this.renderSkill(skills.cloudBurster, 'P')}</td><td>{this.renderSkill(skills.breakTackle, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.dodge, 'A')}</td><td>{this.renderSkill(skills.fend, 'G')}</td><td>{this.renderSkill(skills.extraArms, 'M')}</td><td>{this.renderSkill(skills.dumpOff, 'P')}</td><td>{this.renderSkill(skills.grab, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.defensive, 'A')}</td><td>{this.renderSkill(skills.frenzy, 'G')}</td><td>{this.renderSkill(skills.foulAppearance, 'M')}</td><td>{this.renderSkill(skills.fumblerooskie, 'P')}</td><td>{this.renderSkill(skills.guard, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.jumpUp, 'A')}</td><td>{this.renderSkill(skills.kick, 'G')}</td><td>{this.renderSkill(skills.horns, 'M')}</td><td>{this.renderSkill(skills.hailMaryPass, 'P')}</td><td>{this.renderSkill(skills.juggernaut, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.leap, 'A')}</td><td>{this.renderSkill(skills.pro, 'G')}</td><td>{this.renderSkill(skills.ironHardSkin, 'M')}</td><td>{this.renderSkill(skills.leader, 'P')}</td><td>{this.renderSkill(skills.mightyBlow(1), 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.safePairOfHands, 'A')}</td><td>{this.renderSkill(skills.shadowing, 'G')}</td><td>{this.renderSkill(skills.monstrousMouth, 'M')}</td><td>{this.renderSkill(skills.nervesOfSteel, 'P')}</td><td>{this.renderSkill(skills.multipleBlock, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.sideStep, 'A')}</td><td>{this.renderSkill(skills.stripBall, 'G')}</td><td>{this.renderSkill(skills.prehensileTail, 'M')}</td><td>{this.renderSkill(skills.onTheBall, 'P')}</td><td>{this.renderSkill(skills.pileDriver, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.sneakyGit, 'A')}</td><td>{this.renderSkill(skills.sureHands, 'G')}</td><td>{this.renderSkill(skills.tentacles, 'M')}</td><td>{this.renderSkill(skills.pass, 'P')}</td><td>{this.renderSkill(skills.standFirm, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.sprint, 'A')}</td><td>{this.renderSkill(skills.tackle, 'G')}</td><td>{this.renderSkill(skills.twoHeads, 'M')}</td><td>{this.renderSkill(skills.runningPass, 'P')}</td><td>{this.renderSkill(skills.strongArm, 'S')}</td></tr>
                <tr><td>{this.renderSkill(skills.sureFeet, 'A')}</td><td>{this.renderSkill(skills.wrestle, 'G')}</td><td>{this.renderSkill(skills.veryLongLegs, 'M')}</td><td>{this.renderSkill(skills.safePass, 'P')}</td><td>{this.renderSkill(skills.thickSkull, 'S')}</td></tr>
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>

      </Container>
    )
  }
}


export default Team;
