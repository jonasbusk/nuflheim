import React, {Component} from "react";
import Table from "react-bootstrap/Table";

import {skills} from "../data";


class PlayerAdvancement extends Component {

  renderSkill = (skill, category) => {
    // Render a skill in the skill advancement table
    let player = this.props.getAdvancementPlayer();
    if (player) {
      if (player.skills.includes(skill)) {
        // Selected player has the skill as a starting skill
        return <span className="text-orange">{skill}</span>;
      } else if (!player.primaryAccess.includes(category) && !player.secondaryAccess.includes(category)) {
        // Selected player does not have access to the skill
        return <span className="text-muted">{skill}</span>;
      } else if (player.primarySkills.includes(skill) || player.secondarySkills.includes(skill)) {
        // Selected player has already added the skill
        return <span className="skill-selected" onClick={() => this.props.removeSkillAdvancement(skill)}>{skill}</span>;
      } else {
        // Skill is available
        return <span className="skill-available" onClick={() => this.props.addSkillAdvancement(skill, category)}>{skill}</span>;
      }
    }
  }

  render() {
    return (
      <div>
        <Table size="sm" className="advancement-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Primary skill access</th>
              <th>Secondary skill access</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.getAdvancementPlayer() && this.props.getAdvancementPlayer().positionName}</td>
              <td>{this.props.getAdvancementPlayer() && this.props.getAdvancementPlayer().primaryAccess}</td>
              <td>{this.props.getAdvancementPlayer() && this.props.getAdvancementPlayer().secondaryAccess}</td>
            </tr>
          </tbody>
        </Table>

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
              <td className="cursor-pointer" onClick={() => this.props.toggleCharAdvancement("ma")}>
                {this.props.getAdvancementPlayer() && this.props.renderPlayerChar(this.props.getAdvancementPlayer(), "ma")}
              </td>
              <td className="cursor-pointer" onClick={() => this.props.toggleCharAdvancement("st")}>
                {this.props.getAdvancementPlayer() && this.props.renderPlayerChar(this.props.getAdvancementPlayer(), "st")}
              </td>
              <td className="cursor-pointer" onClick={() => this.props.toggleCharAdvancement("ag")}>
                {this.props.getAdvancementPlayer() && this.props.renderPlayerChar(this.props.getAdvancementPlayer(), "ag")}
              </td>
              <td className="cursor-pointer" onClick={() => this.props.toggleCharAdvancement("pa")}>
                {this.props.getAdvancementPlayer() && this.props.renderPlayerChar(this.props.getAdvancementPlayer(), "pa")}
              </td>
              <td className="cursor-pointer" onClick={() => this.props.toggleCharAdvancement("av")}>
                {this.props.getAdvancementPlayer() && this.props.renderPlayerChar(this.props.getAdvancementPlayer(), "av")}
              </td>
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
      </div>
    );
  }
}


export default PlayerAdvancement;
