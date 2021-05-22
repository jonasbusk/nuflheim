import React, {Component} from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {rosters, skills} from "../data";


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
    maMod: 0,
    stMod: 0,
    agMod: 0,
    paMod: 0,
    avMod: 0,
    skills: skills || [],
    primarySkills: [],
    secondarySkills: [],
    value: value,
    primaryAccess: primaryAccess,
    secondaryAccess: secondaryAccess
  };
};


class Team extends Component {

  state = {
    budget: 1000000,
    costMultiplierReRolls: 1,
    costOfAssistantCoaches: 10000,
    costOfCheerleaders: 10000,
    costOfDedicatedFans: 10000,
    costOfApothecary: 50000,
    playerAdvancementsCostGold: true,
    customisePlayerAdvancementCosts: false,
    costOfPrimarySkill: 20000,
    costOfSecondarySkill: 40000,
    costOfAV: 10000,
    costOfMA: 20000,
    costOfPA: 20000,
    costOfAG: 40000,
    costOfST: 80000,
    name: "",
    roster: rosters[0],
    coach: "",
    reRolls: 0,
    dedicatedFans: 0,
    assistantCoaches: 0,
    cheerleaders: 0,
    apothecary: 0,
    players: new Array(16).fill(null).map((x) => player()),
    showPlayerAdvancementModal: false,
    selectedPlayerNumber: null,
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

  setRulesPresetStandard = () => {
    this.setState({
      budget: 1000000,
      costMultiplierReRolls: 1,
      costOfAssistantCoaches: 10000,
      costOfCheerleaders: 10000,
      costOfDedicatedFans: 10000,
      costOfApothecary: 50000,
    });
  }

  setRulesPresetSevens = () => {
    this.setState({
      budget: 600000,
      costMultiplierReRolls: 2,
      costOfAssistantCoaches: 20000,
      costOfCheerleaders: 20000,
      costOfDedicatedFans: 20000,
      costOfApothecary: 80000,
    });
  }

  getCostOfReRolls = () => {
    return Math.round(this.state.roster.costOfReRolls * this.state.costMultiplierReRolls);
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
      let p = this.state.roster.positionals[positionNumber-1];
      players[playerNumber-1] = player(players[playerNumber-1].name, positionNumber, p.position, p.ma, p.st, p.ag, p.pa, p.av, p.skills, p.cost, p.primaryAccess, p.secondaryAccess);
    }
    this.setState({players: players});
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
      return this.state.players[this.state.selectedPlayerNumber-1];
    } else {
      return null;
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
      let skills = player.skills.map((s) => <span className="skill-default">{s}</span>);
      skills = skills.concat(player.primarySkills.map((s) => <span className="skill-primary">{s}</span>));
      skills = skills.concat(player.secondarySkills.map((s) => <span className="skill-secondary">{s}</span>));
      return <div>{skills.map((s, i) => i > 0 ? <span key={i}>, {s}</span> : <span key={i}>{s}</span>)}</div>;
    }
  }

  showPlayerAdvancementModal = (playerNumber) => {
    // Select player and show player advancement modal
    this.setState({
      selectedPlayerNumber: playerNumber,
      showPlayerAdvancementModal: true
    });
  }

  renderPlayerChar = (player, char, interactive) => {
    if (typeof player[char] !== "undefined") {
      let mod = player[char + "Mod"];
      if(["ma", "st"].includes(char)) {
        return <span className={mod && "text-orange"}>{player[char] + mod}</span>;
      } else if (char === "ag") {
        return <span className={mod && "text-orange"}>{player[char] - mod + "+"}</span>;
      } else if (char === "pa") {
        if (player[char] !== null) {
          return <span className={mod && "text-orange"}>{player[char] - mod + "+"}</span>;
        } else {
          return <span>-</span>;
        }
      } else if (char === "av") {
        return <span className={mod && "text-orange"}>{player[char] + mod + "+"}</span>;
      }
    }
  }

  toggleSelectedPlayerChar = (char) => {
    // Improve or reset a characteristic of the selected player
    let player = this.getSelectedPlayer();
    if (this.playerCharMayBeImproved(player, char)) {
      player[char + "Mod"] += 1;
    } else {
      player[char + "Mod"] = 0;
    }
    this.setSelectedPlayer(player);
  }

  playerCharMayBeImproved = (player, char) => {
    // Determine if a player characteristic may be improved
    return !(
      player[char + "Mod"] === 2 ||
      (char === "ma" && player.ma + player.maMod === 9) ||
      (char === "st" && player.st + player.stMod === 8) ||
      (char === "ag" && player.ag - player.agMod === 1) ||
      (char === "pa" && (player.pa === null || player.pa - player.paMod === 1)) ||
      (char === "av" && player.av + player.avMod === 11)
    );
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
    let player = this.getSelectedPlayer();
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
    let player = this.getSelectedPlayer();
    player.primarySkills = player.primarySkills.filter((s) => s !== skill);
    player.secondarySkills = player.secondarySkills.filter((s) => s !== skill);
    this.setSelectedPlayer(player);
  }

  getPlayerValue = (player) => {
    let value = player.value || 0;
    if (this.state.playerAdvancementsCostGold) {
      value += player.primarySkills.length * this.state.costOfPrimarySkill;
      value += player.secondarySkills.length * this.state.costOfSecondarySkill;
      value += player.maMod * this.state.costOfMA;
      value += player.stMod * this.state.costOfST;
      value += player.agMod * this.state.costOfAG;
      value += player.paMod * this.state.costOfPA;
      value += player.avMod * this.state.costOfAV;
    }
    return value;
  }

  getTeamValue = () => {
    // Compute the current team value
    let tv = 0;
    tv += this.state.reRolls * this.getCostOfReRolls();
    tv += this.state.assistantCoaches * this.state.costOfAssistantCoaches;
    tv += this.state.cheerleaders * this.state.costOfCheerleaders;
    tv += this.state.dedicatedFans * this.state.costOfDedicatedFans;
    tv += this.state.apothecary * this.state.costOfApothecary;
    tv += this.state.players.reduce((total, player) => {return total + this.getPlayerValue(player);}, 0);
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

  toggleCustomisePlayerAdvancementCosts = () => {
    this.setState({
      customisePlayerAdvancementCosts: !this.state.customisePlayerAdvancementCosts,
      costOfPrimarySkill: 20000,
      costOfSecondarySkill: 40000,
      costOfAV: 10000,
      costOfMA: 20000,
      costOfPA: 20000,
      costOfAG: 40000,
      costOfST: 80000,
    });
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
                      <td>Coach:</td>
                      <td><Form.Control type="text" size="sm" value={this.state.coach} onChange={(e) => this.setState({coach: e.target.value})} /></td>
                    </tr>
                    <tr>
                      <td>Roster:</td>
                      <td>
                        <Form.Control as="select" size="sm" onChange={(e) => this.setRoster(e.target.value)}>
                         {rosters.map((roster, i) => {return <option key={i} value={i}>{roster.name}</option>;})}
                        </Form.Control>
                      </td>
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
                      <td><Form.Control type="number" size="sm" value={this.state.reRolls.toString()} onChange={(e) => this.setState({reRolls: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), 8)})} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.getCostOfReRolls())} readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.reRolls * this.getCostOfReRolls())} readOnly /></td>
                    </tr>
                    <tr>
                      <td>Assistant Coaches:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.assistantCoaches.toString()} onChange={(e) => this.setState({assistantCoaches: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), 99)})} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.costOfAssistantCoaches)} plaintext readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.assistantCoaches * this.state.costOfAssistantCoaches)} readOnly /></td>
                    </tr>
                    <tr>
                      <td>Cheerleaders:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.cheerleaders.toString()} onChange={(e) => this.setState({cheerleaders: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), 99)})} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.costOfCheerleaders)} plaintext readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.cheerleaders * this.state.costOfCheerleaders)} readOnly /></td>
                    </tr>
                    <tr>
                      <td>Dedicated Fans:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.dedicatedFans.toString()} onChange={(e) => this.setState({dedicatedFans: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), 99)})} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.costOfDedicatedFans)} plaintext readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.dedicatedFans * this.state.costOfDedicatedFans)} readOnly /></td>
                    </tr>
                    <tr>
                      <td>Apothecary:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.apothecary.toString()} onChange={(e) => this.setState({apothecary: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), 1)})} readOnly={!this.state.roster.apothecaryAllowed} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.costOfApothecary)} plaintext readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.apothecary * this.state.costOfApothecary)} readOnly /></td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="budget" title="Budget">
            <Row>
              <Col md="6">
                <Table borderless size="sm" className="margin-zero budget-table">
                  <tbody>
                    <tr>
                      <td>Rules presets:</td>
                      <td>
                        <Button variant="outline-primary" size="sm" onClick={() => this.setRulesPresetStandard()}>Standard</Button>{" "}
                        <Button variant="outline-primary" size="sm" onClick={() => this.setRulesPresetSevens()}>Sevens</Button>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Team draft budget:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.budget.toString()} onChange={(e) => this.setState({budget: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Team re-roll cost multiplier:</td>
                        <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costMultiplierReRolls.toString()} onChange={(e) => this.setState({costMultiplierReRolls: e.target.value && Math.max(e.target.value || 0, 0)})} /></td>
                      <td>x</td>
                    </tr>
                    <tr>
                      <td>Cost of assistant coaches:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfAssistantCoaches.toString()} onChange={(e) => this.setState({costOfAssistantCoaches: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Cost of cheerleaders:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfCheerleaders.toString()} onChange={(e) => this.setState({costOfCheerleaders: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Cost of dedicated fans:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfDedicatedFans.toString()} onChange={(e) => this.setState({costOfDedicatedFans: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Cost of apothecary:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfApothecary.toString()} onChange={(e) => this.setState({costOfApothecary: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} /></td>
                      <td>GP</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md="6">
                <Table borderless size="sm" className="margin-zero budget-table">
                  <tbody>
                    <tr>
                      <td>Player advancements cost gold:</td>
                      <td><Form.Check inline type="checkbox" defaultChecked={this.state.playerAdvancementsCostGold} onChange={(e) => this.setState({playerAdvancementsCostGold: !this.state.playerAdvancementsCostGold})} /></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Customise cost of player advancements:</td>
                      <td><Form.Check inline type="checkbox" defaultChecked={this.state.customisePlayerAdvancementCosts} onChange={(e) => this.toggleCustomisePlayerAdvancementCosts()} /></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Cost of primary skill:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfPrimarySkill.toString()} onChange={(e) => this.setState({costOfPrimarySkill: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} readOnly={!this.state.customisePlayerAdvancementCosts} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Cost of secondary skill:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfSecondarySkill.toString()} onChange={(e) => this.setState({costOfSecondarySkill: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} readOnly={!this.state.customisePlayerAdvancementCosts} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Cost of AV:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfAV.toString()} onChange={(e) => this.setState({costOfAV: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} readOnly={!this.state.customisePlayerAdvancementCosts} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Cost of MA:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfMA.toString()} onChange={(e) => this.setState({costOfMA: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} readOnly={!this.state.customisePlayerAdvancementCosts} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Cost of PA:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfPA.toString()} onChange={(e) => this.setState({costOfPA: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} readOnly={!this.state.customisePlayerAdvancementCosts} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Cost of AG:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfAG.toString()} onChange={(e) => this.setState({costOfAG: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} readOnly={!this.state.customisePlayerAdvancementCosts} /></td>
                      <td>GP</td>
                    </tr>
                    <tr>
                      <td>Cost of ST:</td>
                      <td><Form.Control type="number" size="sm" className="text-right" value={this.state.costOfST.toString()} onChange={(e) => this.setState({costOfST: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), Number.MAX_SAFE_INTEGER)})} readOnly={!this.state.customisePlayerAdvancementCosts} /></td>
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
                        {this.state.roster.positionals.map((p, i) => {return <option key={i+1} value={i+1}>{p.position}</option>;})}
                      </Form.Control>
                    </td>
                    <td className="player-ma" onClick={() => player.positionNumber && this.showPlayerAdvancementModal(i+1)}>{this.renderPlayerChar(player, "ma")}</td>
                    <td className="player-st" onClick={() => player.positionNumber && this.showPlayerAdvancementModal(i+1)}>{this.renderPlayerChar(player, "st")}</td>
                    <td className="player-ag" onClick={() => player.positionNumber && this.showPlayerAdvancementModal(i+1)}>{this.renderPlayerChar(player, "ag")}</td>
                    <td className="player-pa" onClick={() => player.positionNumber && this.showPlayerAdvancementModal(i+1)}>{this.renderPlayerChar(player, "pa")}</td>
                    <td className="player-av" onClick={() => player.positionNumber && this.showPlayerAdvancementModal(i+1)}>{this.renderPlayerChar(player, "av")}</td>
                    <td className="player-skills" onClick={() => player.positionNumber && this.showPlayerAdvancementModal(i+1)}>{this.renderPlayerSkills(player)}</td>
                    <td className="player-value">{player.value && this.formatCost(this.getPlayerValue(player))}</td>
                  </tr>);
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
                  <td className="cursor-pointer" onClick={() => this.toggleSelectedPlayerChar("ma")}>
                    {this.getSelectedPlayer() && this.renderPlayerChar(this.getSelectedPlayer(), "ma")}
                  </td>
                  <td className="cursor-pointer" onClick={() => this.toggleSelectedPlayerChar("st")}>
                    {this.getSelectedPlayer() && this.renderPlayerChar(this.getSelectedPlayer(), "st")}
                  </td>
                  <td className="cursor-pointer" onClick={() => this.toggleSelectedPlayerChar("ag")}>
                    {this.getSelectedPlayer() && this.renderPlayerChar(this.getSelectedPlayer(), "ag")}
                  </td>
                  <td className="cursor-pointer" onClick={() => this.toggleSelectedPlayerChar("pa")}>
                    {this.getSelectedPlayer() && this.renderPlayerChar(this.getSelectedPlayer(), "pa")}
                  </td>
                  <td className="cursor-pointer" onClick={() => this.toggleSelectedPlayerChar("av")}>
                    {this.getSelectedPlayer() && this.renderPlayerChar(this.getSelectedPlayer(), "av")}
                  </td>
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
                <tr><td>{this.renderSkill(skills.catch, "A")}</td><td>{this.renderSkill(skills.block, "G")}</td><td>{this.renderSkill(skills.bigHand, "M")}</td><td>{this.renderSkill(skills.accurate, "P")}</td><td>{this.renderSkill(skills.armBar, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.divingCatch, "A")}</td><td>{this.renderSkill(skills.dauntless, "G")}</td><td>{this.renderSkill(skills.claws, "M")}</td><td>{this.renderSkill(skills.cannoneer, "P")}</td><td>{this.renderSkill(skills.brawler, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.divingTackle, "A")}</td><td>{this.renderSkill(skills.dirtyPlayer(1), "G")}</td><td>{this.renderSkill(skills.disturbingPresence, "M")}</td><td>{this.renderSkill(skills.cloudBurster, "P")}</td><td>{this.renderSkill(skills.breakTackle, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.dodge, "A")}</td><td>{this.renderSkill(skills.fend, "G")}</td><td>{this.renderSkill(skills.extraArms, "M")}</td><td>{this.renderSkill(skills.dumpOff, "P")}</td><td>{this.renderSkill(skills.grab, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.defensive, "A")}</td><td>{this.renderSkill(skills.frenzy, "G")}</td><td>{this.renderSkill(skills.foulAppearance, "M")}</td><td>{this.renderSkill(skills.fumblerooskie, "P")}</td><td>{this.renderSkill(skills.guard, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.jumpUp, "A")}</td><td>{this.renderSkill(skills.kick, "G")}</td><td>{this.renderSkill(skills.horns, "M")}</td><td>{this.renderSkill(skills.hailMaryPass, "P")}</td><td>{this.renderSkill(skills.juggernaut, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.leap, "A")}</td><td>{this.renderSkill(skills.pro, "G")}</td><td>{this.renderSkill(skills.ironHardSkin, "M")}</td><td>{this.renderSkill(skills.leader, "P")}</td><td>{this.renderSkill(skills.mightyBlow(1), "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.safePairOfHands, "A")}</td><td>{this.renderSkill(skills.shadowing, "G")}</td><td>{this.renderSkill(skills.monstrousMouth, "M")}</td><td>{this.renderSkill(skills.nervesOfSteel, "P")}</td><td>{this.renderSkill(skills.multipleBlock, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.sideStep, "A")}</td><td>{this.renderSkill(skills.stripBall, "G")}</td><td>{this.renderSkill(skills.prehensileTail, "M")}</td><td>{this.renderSkill(skills.onTheBall, "P")}</td><td>{this.renderSkill(skills.pileDriver, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.sneakyGit, "A")}</td><td>{this.renderSkill(skills.sureHands, "G")}</td><td>{this.renderSkill(skills.tentacles, "M")}</td><td>{this.renderSkill(skills.pass, "P")}</td><td>{this.renderSkill(skills.standFirm, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.sprint, "A")}</td><td>{this.renderSkill(skills.tackle, "G")}</td><td>{this.renderSkill(skills.twoHeads, "M")}</td><td>{this.renderSkill(skills.runningPass, "P")}</td><td>{this.renderSkill(skills.strongArm, "S")}</td></tr>
                <tr><td>{this.renderSkill(skills.sureFeet, "A")}</td><td>{this.renderSkill(skills.wrestle, "G")}</td><td>{this.renderSkill(skills.veryLongLegs, "M")}</td><td>{this.renderSkill(skills.safePass, "P")}</td><td>{this.renderSkill(skills.thickSkull, "S")}</td></tr>
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>

      </Container>
    );
  }
}


export default Team;
