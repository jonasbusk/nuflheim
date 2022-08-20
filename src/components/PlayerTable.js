import React, {Component} from "react";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";


class PlayerTable extends Component {

  renderPlayerSkills = (player) => {
    // Render player skill list including skill advancements
    if (player.positionNumber) {
      let skills = player.skills.map((s) => <span className="skill-default">{s}</span>);
      skills = skills.concat(player.primarySkills.map((s) => <span className="skill-primary">{s}</span>));
      skills = skills.concat(player.secondarySkills.map((s) => <span className="skill-secondary">{s}</span>));
      skills = skills.concat(player.specialRules.map((s) => <span className="skill-special">{s}</span>));
      return <div>{skills.map((s, i) => i > 0 ? <span key={i}>, {s}</span> : <span key={i}>{s}</span>)}</div>;
    }
  }

  onSelectPlayerOpen = (options) => {
    // Show quantity (0-16) in dropdown options
    for (let i = 0; i < this.props.roster.positionals.length; i++) {
      let p = this.props.roster.positionals[i];
      options[i+1].textContent = p.position + " (0-" + p.quantity + ")";
    }
    for (let i = 0; i < this.props.availableStarPlayers.length; i++) {
      let p = this.props.availableStarPlayers[i];
      options[i+this.props.roster.positionals.length+1].textContent = p.name;
    }
  }

  onSelectPlayerClose = (options) => {
    // Remove quantity (0-16) in dropdown options
    for (let i = 0; i < this.props.roster.positionals.length; i++) {
      let p = this.props.roster.positionals[i];
      options[i+1].textContent = p.position;
    }
    for (let i = 0; i < this.props.availableStarPlayers.length; i++) {
      options[i+this.props.roster.positionals.length+1].textContent = "Star Player";
    }
  }

  renderPlayerTableRow = (player, i) => {
    return (<tr key={i+1}>
      <td className="player-number">{i+1}</td>
      <td className="player-name"><Form.Control type="text" id={i+1} readOnly={player.isStar} plaintext value={player.name || ""} onChange={(e) => this.props.setPlayerName(parseInt(e.target.id), e.target.value)} /></td>
      <td className="player-position">
        <Form.Control as="select" id={i+1} size="sm" plaintext value={player.positionNumber || 0}
          onChange={(e) => this.props.setPlayer(parseInt(e.target.id), parseInt(e.target.value))}
          onFocus={(e) => this.onSelectPlayerOpen(e.target.children)}
          onBlur={(e) => this.onSelectPlayerClose(e.target.children)}
        >
          <option key="0" value="0">-</option>
          {this.props.roster.positionals.map((p, i) => {return <option key={i+1} value={i+1}>{p.position}</option>;})}
          {this.props.availableStarPlayers.map((p, i) => {return <option key={i+101} value={i+101}>{p.name}</option>;})}
        </Form.Control>
      </td>
      <td className={"player-ma" + (player.positionNumber && !player.isStar && " cursor-pointer" || "")} onClick={() => player.positionNumber && !player.isStar && this.props.togglePlayerAdvancementModal(i+1)}>{this.props.renderPlayerChar(player, "ma")}</td>
      <td className={"player-st" + (player.positionNumber && !player.isStar && " cursor-pointer" || "")} onClick={() => player.positionNumber && !player.isStar && this.props.togglePlayerAdvancementModal(i+1)}>{this.props.renderPlayerChar(player, "st")}</td>
      <td className={"player-ag" + (player.positionNumber && !player.isStar && " cursor-pointer" || "")} onClick={() => player.positionNumber && !player.isStar && this.props.togglePlayerAdvancementModal(i+1)}>{this.props.renderPlayerChar(player, "ag")}</td>
      <td className={"player-pa" + (player.positionNumber && !player.isStar && " cursor-pointer" || "")} onClick={() => player.positionNumber && !player.isStar && this.props.togglePlayerAdvancementModal(i+1)}>{this.props.renderPlayerChar(player, "pa")}</td>
      <td className={"player-av" + (player.positionNumber && !player.isStar && " cursor-pointer" || "")} onClick={() => player.positionNumber && !player.isStar && this.props.togglePlayerAdvancementModal(i+1)}>{this.props.renderPlayerChar(player, "av")}</td>
      <td className={"player-skills" + (player.positionNumber && !player.isStar && " cursor-pointer" || "")} onClick={() => player.positionNumber && !player.isStar && this.props.togglePlayerAdvancementModal(i+1)}>{this.renderPlayerSkills(player)}</td>
      <td className="player-value">{player.value && this.props.formatCost(this.props.getPlayerValue(player))}</td>
    </tr>);
  }

  render() {
    return (
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
          {this.props.players.map(this.renderPlayerTableRow)}
        </tbody>
      </Table>
    );
  }
}


export default PlayerTable;
