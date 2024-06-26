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

import {rosters, rosterSpecialRules, starPlayers} from "../data";
import PlayerTable from "./PlayerTable";
import PlayerAdvancement from "./PlayerAdvancement";
import Inducements from "./Inducements";
import CreatePDF from "./CreatePDF";


const player = (name, positionNumber, positionName, ma, st, ag, pa, av, skills, value, primaryAccess="", secondaryAccess="", specialRules=[], isStar=false) => {
  // A player in the player list
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
    secondaryAccess: secondaryAccess,
    specialRules: specialRules,
    isStar: isStar,
  };
};


const inducement = (name, quantity, max, cost) => {
  return {
    name: name,
    quantity: quantity,
    max: max,  // max quantity
    cost: cost,
  };
};


class Team extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      coach: "",
      roster: rosters[0],
      reRolls: 0,
      dedicatedFans: 0,
      assistantCoaches: 0,
      cheerleaders: 0,
      apothecary: 0,
      players: new Array(16).fill(null).map((x) => player()),
      showPlayerAdvancementModal: false,
      advancementPlayerNumber: null,  // player selected for advancement, indexed 1-16
      swapPlayerNumber: null,  // player selected for swap, indexed 1-16
      availableStarPlayers: this.getAvailableStarPlayers(rosters[0]),
      inducements: this.getAvailableInducements(rosters[0]),
    };
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
      players: new Array(16).fill(null).map((x) => player()),
      availableStarPlayers: this.getAvailableStarPlayers(rosters[rosterIndex]),
      inducements: this.getAvailableInducements(rosters[rosterIndex]),
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
    if (players[playerNumber-1].isStar) {
      // If player was a star player, clear the name
      players[playerNumber-1].name = "";
    }
    if (positionNumber === 0) {
      // No position is selected: insert empty player
      players[playerNumber-1] = player(players[playerNumber-1].name);
    } else if (positionNumber > 100) {
      // Star player is selected: insert star player
      let p = this.state.availableStarPlayers[positionNumber-101];
      players[playerNumber-1] = player(p.name, positionNumber, "Star", p.ma, p.st, p.ag, p.pa, p.av, p.skills, p.cost, "", "", p.specialRules, true);
    } else {
      // Positional player is selected: insert new player
      let p = this.state.roster.positionals[positionNumber-1];
      players[playerNumber-1] = player(players[playerNumber-1].name, positionNumber, p.position, p.ma, p.st, p.ag, p.pa, p.av, p.skills, p.cost, p.primaryAccess, p.secondaryAccess);
    }
    this.setState({players: players});
    // Remove focus from dropdown menu to trigger onblur event
    document.activeElement.blur();
  }

  setPlayerName = (playerNumber, playerName) => {
    // Set the name of a player in the player list
    let players = this.state.players;
    players[playerNumber-1].name = playerName;
    this.setState({players: players});
  }

  getAdvancementPlayer = () => {
    // Get the player selected for advancement
    if (this.state.showPlayerAdvancementModal && this.state.advancementPlayerNumber) {
      return this.state.players[this.state.advancementPlayerNumber-1];
    } else {
      return null;
    }
  }

  setAdvancementPlayer = (player) => {
    // Save player to state at the index of the selected player
    let players = this.state.players;
    players[this.state.advancementPlayerNumber-1] = player;
    this.setState({players: players});
  }

  togglePlayerAdvancementModal = (playerNumber) => {
    if (this.state.showPlayerAdvancementModal) {
      // Hide player advancement modal
      this.setState({
        showPlayerAdvancementModal: false
      });
    } else {
      // Select player and show player advancement modal
      this.setState({
        advancementPlayerNumber: playerNumber,
        showPlayerAdvancementModal: true,
      });
    }
  }

  togglePlayerSwap = (playerNumber) => {
    if (this.state.swapPlayerNumber === null) {
      // Select player for swap
      this.setState({swapPlayerNumber: playerNumber});
    } else if (this.state.swapPlayerNumber === playerNumber) {
      // Deselect player for swap
      this.setState({swapPlayerNumber: null});
    } else {
      // Swap selected players
      let players = this.state.players;
      let player = players[this.state.swapPlayerNumber-1];
      players[this.state.swapPlayerNumber-1] = players[playerNumber-1];
      players[playerNumber-1] = player;
      this.setState({
        players: players,
        swapPlayerNumber: null,
      });
    }
  }

  renderPlayerChar = (player, char) => {
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

  toggleCharAdvancement = (char) => {
    // Improve or reset a characteristic of the selected player
    let player = this.getAdvancementPlayer();
    if (this.playerCharCanBeImproved(player, char)) {
      player[char + "Mod"] += 1;
    } else {
      player[char + "Mod"] = 0;
    }
    this.setAdvancementPlayer(player);
  }

  playerCharCanBeImproved = (player, char) => {
    // Determine if the player characteristic can be improved
    return !(
      player[char + "Mod"] === 2 ||
      (char === "ma" && player.ma + player.maMod === 9) ||
      (char === "st" && player.st + player.stMod === 8) ||
      (char === "ag" && player.ag - player.agMod === 1) ||
      (char === "pa" && (player.pa === null || player.pa - player.paMod === 1)) ||
      (char === "av" && player.av + player.avMod === 11)
    );
  }

  addSkillAdvancement = (skill, category) => {
    // Add skill to selected player
    let player = this.getAdvancementPlayer();
    if (player.primaryAccess.includes(category)) {
      player.primarySkills.push(skill);
      player.primarySkills.sort();
    } else if (player.secondaryAccess.includes(category)) {
      player.secondarySkills.push(skill);
      player.secondarySkills.sort();
    }
    this.setAdvancementPlayer(player);
  }

  removeSkillAdvancement = (skill) => {
    // Remove skill from selected player
    let player = this.getAdvancementPlayer();
    player.primarySkills = player.primarySkills.filter((s) => s !== skill);
    player.secondarySkills = player.secondarySkills.filter((s) => s !== skill);
    this.setAdvancementPlayer(player);
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
    // players
    tv += this.state.players.reduce((total, player) => {return total + this.getPlayerValue(player);}, 0);
    // sideline staff
    tv += this.state.assistantCoaches * this.state.costOfAssistantCoaches;
    tv += this.state.cheerleaders * this.state.costOfCheerleaders;
    tv += this.state.apothecary * this.state.costOfApothecary;
    // team re-rolls
    tv += this.state.reRolls * this.getCostOfReRolls();
    // (fans and treasury do not add to team value)
    // inducements
    tv += this.state.inducements.reduce((total, inducement) => {return total + inducement.quantity * inducement.cost;}, 0);
    return tv;
  }

  getTreasury = () => {
    // Compute the current treasury value
    let treasury = this.state.budget;
    treasury -= this.getTeamValue();
    treasury -= this.state.dedicatedFans * this.state.costOfDedicatedFans;
    return treasury;
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

  getAvailableStarPlayers = (roster) => {
    // Get list of available star players for the given roster
    return starPlayers.filter(starPlayer => {
      return starPlayer.playsFor.includes("Any team") || starPlayer.playsFor.some(r => roster.specialRules.includes(r));
    });
  }

  getAvailableInducements = (roster) => {
    // Get list of available inducements for the given roster
    var inducements = [];
    inducements.push(inducement("Temp Agency Cheerleaders", 0, 4, 20000));
    inducements.push(inducement("Part-time Assistant Coaches", 0, 3, 20000));
    inducements.push(inducement("Weather Mage", 0, 1, 30000));
    inducements.push(inducement("Bloodweiser Kegs", 0, 2, 50000));
    inducements.push(inducement("Special Plays", 0, 5, 100000));
    inducements.push(inducement("Extra Team Training", 0, 8, 100000));
    if (roster.specialRules.includes(rosterSpecialRules.briberyAndCorruption)) {
      inducements.push(inducement("Bribes", 0, 3, 50000));
    } else {
      inducements.push(inducement("Bribes", 0, 3, 100000));
    }
    if (roster.apothecaryAllowed) {
      inducements.push(inducement("Wandering Apothecaries", 0, 2, 100000));
    }
    if (roster.specialRules.includes(rosterSpecialRules.sylvanianSpotlight)) {
      inducements.push(inducement("Mortuary Assistant", 0, 1, 100000));
    }
    if (roster.specialRules.includes(rosterSpecialRules.favouredOfNurgle)) {
      inducements.push(inducement("Plague Doctor", 0, 1, 100000));
    }
    if (roster.specialRules.includes(rosterSpecialRules.lowCostLinemen)) {
      inducements.push(inducement("Riotous Rookies", 0, 1, 100000));
    }
    if (roster.name === "Halfling") {
      inducements.push(inducement("Halfling Master Chef", 0, 1, 100000));
    } else {
      inducements.push(inducement("Halfling Master Chef", 0, 1, 300000));
    }
    inducements.push(inducement("Josef Bugman", 0, 1, 100000));
    inducements.push(inducement("Hireling Sports-Wizard", 0, 1, 150000));
    if (roster.specialRules.includes(rosterSpecialRules.briberyAndCorruption)) {
      inducements.push(inducement("Biased Referee", 0, 1, 80000));
    } else {
      inducements.push(inducement("Biased Referee", 0, 1, 120000));
    }
    return inducements;
  }

  setInducementQuantity = (i, quantity) => {
    // Set the quantity of an inducement
    // i is the index in the list of available inducements
    let inducements = this.state.inducements;
    inducements[i].quantity = quantity;
    this.setState({inducements: inducements});
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
                      <td>Team Re-rolls:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.reRolls.toString()} onChange={(e) => this.setState({reRolls: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), 8)})} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.getCostOfReRolls())} readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.reRolls * this.getCostOfReRolls())} readOnly /></td>
                    </tr>
                    <tr>
                      <td>Assistant Coaches:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.assistantCoaches.toString()} onChange={(e) => this.setState({assistantCoaches: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), 6)})} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.costOfAssistantCoaches)} plaintext readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.assistantCoaches * this.state.costOfAssistantCoaches)} readOnly /></td>
                    </tr>
                    <tr>
                      <td>Cheerleaders:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.cheerleaders.toString()} onChange={(e) => this.setState({cheerleaders: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), 12)})} /></td>
                      <td>x</td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.costOfCheerleaders)} plaintext readOnly /></td>
                      <td><Form.Control type="text" size="sm" className="text-right" value={this.formatCost(this.state.cheerleaders * this.state.costOfCheerleaders)} readOnly /></td>
                    </tr>
                    <tr>
                      <td>Dedicated Fans:</td>
                      <td><Form.Control type="number" size="sm" value={this.state.dedicatedFans.toString()} onChange={(e) => this.setState({dedicatedFans: e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), 6)})} /></td>
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
            <Row>
              <Col>
                <PlayerTable
                  roster={this.state.roster}
                  players={this.state.players}
                  availableStarPlayers={this.state.availableStarPlayers}
                  setPlayer={this.setPlayer}
                  setPlayerName={this.setPlayerName}
                  renderPlayerChar={this.renderPlayerChar}
                  getPlayerValue={this.getPlayerValue}
                  formatCost={this.formatCost}
                  togglePlayerAdvancementModal={this.togglePlayerAdvancementModal}
                  swapPlayerNumber={this.state.swapPlayerNumber}
                  togglePlayerSwap={this.togglePlayerSwap}
                />
                <Inducements
                  inducements={this.state.inducements}
                  setInducementQuantity={this.setInducementQuantity}
                  formatCost={this.formatCost}
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <CreatePDF
                  name={this.state.name}
                  rosterName={this.state.roster.name}
                  coach={this.state.coach}
                  treasury={this.getTreasury()}
                  teamValue={this.getTeamValue()}
                  reRolls={this.state.reRolls}
                  costOfReRolls={this.getCostOfReRolls()}
                  assistantCoaches={this.state.assistantCoaches}
                  costOfAssistantCoaches={this.state.costOfAssistantCoaches}
                  cheerleaders={this.state.cheerleaders}
                  costOfCheerleaders={this.state.costOfCheerleaders}
                  dedicatedFans={this.state.dedicatedFans}
                  costOfDedicatedFans={this.state.costOfDedicatedFans}
                  apothecary={this.state.apothecary}
                  costOfApothecary={this.state.costOfApothecary}
                  players={this.state.players}
                  getPlayerValue={this.getPlayerValue}
                  inducements={this.state.inducements}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <Row>
              <Col md="8">
                <Table borderless size="sm" className="margin-zero settings-table">
                  <tbody>
                    <tr>
                      <td>Rules presets:</td>
                      <td>
                        <Button variant="dark" size="sm" onClick={() => this.setRulesPresetStandard()}>Standard</Button>{" "}
                        <Button variant="dark" size="sm" onClick={() => this.setRulesPresetSevens()}>Sevens</Button>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
                <hr />
                <Table borderless size="sm" className="margin-zero settings-table">
                  <tbody>
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
                <hr />
                <Table borderless size="sm" className="margin-zero settings-table">
                  <tbody>
                    <tr>
                      <td>Player advancements cost gold:</td>
                      <td><Form.Check inline type="checkbox" defaultChecked={this.state.playerAdvancementsCostGold} onChange={(e) => this.setState({playerAdvancementsCostGold: !this.state.playerAdvancementsCostGold})} /></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Custom player advancement costs:</td>
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
              Player Advancement
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlayerAdvancement
              getAdvancementPlayer={this.getAdvancementPlayer}
              renderPlayerChar={this.renderPlayerChar}
              toggleCharAdvancement={this.toggleCharAdvancement}
              addSkillAdvancement={this.addSkillAdvancement}
              removeSkillAdvancement={this.removeSkillAdvancement}
            />
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}


export default Team;
