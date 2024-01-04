// import React, {Component} from "react";

import Button from "react-bootstrap/Button";
import {pdf, StyleSheet, Document, Font, Page, View, Text} from "@react-pdf/renderer";
import FileSaver from "file-saver";


// disable hyphenation
Font.registerHyphenationCallback(word => [word]);


const formatCost = (x) => {
  // Format a number into a cost string, example: 10000 -> 10,000 GP
  return `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} GP`;
};


const formatPlayerChar = (player, char) => {
  if (typeof player[char] !== "undefined") {
    let mod = player[char + "Mod"];
    if(["ma", "st"].includes(char)) {
      return player[char] + mod;
    } else if (char === "ag") {
      return player[char] - mod + "+";
    } else if (char === "pa") {
      if (player[char] !== null) {
        return player[char] - mod + "+";
      } else {
        return "-";
      }
    } else if (char === "av") {
      return player[char] + mod + "+";
    }
  }
};


const formatPlayerSkills = (player) => {
  // Render player skill list including skill advancements
  if (player.positionNumber) {
    let skills = player.skills;
    skills = skills.concat(player.primarySkills.map((s) => s + "*"));
    skills = skills.concat(player.secondarySkills.map((s) => s + "**"));
    skills = skills.concat(player.specialRules);
    return skills.join(", ");
  }
};


const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontSize: 10,
  },
  title: {
    fontSize: 20
  },
  container: {
    width: "100%",
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    border: 1,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    width: "100%",
    flexDirection: "column",
    marginRight: 5,
    padding: 5,
    border: 1,
  },
  table: {},
  tableRow: {
    flexDirection: "row",
  },
  tableRowUnderline: {
    flexDirection: "row",
    borderBottom: 1,
  },
  tableRowUnderlineLight: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#eee",
  },
  tableData: {
    padding: 2,
  },
  info11: {
    width: "30%",
    padding: 2,
  },
  info12: {
    width: "70%",
    padding: 2,
    textAlign: "right",
  },
  info21: {
    width: "100%",
    padding: 2,
    textAlign: "center",
  },
  info31: {
    width: "40%",
    padding: 2,
  },
  info32: {
    width: "5%",
    padding: 2,
    textAlign: "right",
  },
  info33: {
    width: "5%",
    padding: 2,
    textAlign: "center",
  },
  info34: {
    width: "25%",
    padding: 2,
    textAlign: "right",
  },
  info35: {
    width: "25%",
    padding: 2,
    textAlign: "right",
  },
  playerNumber: {
    width: ".8cm",
    padding: 2,
    textAlign: "center",
  },
  playerName: {
    width: "5cm",
    padding: 2,
  },
  playerPosition: {
    width: "4cm",
    padding: 2,
  },
  playerChar: {
    width: ".8cm",
    padding: 2,
    textAlign: "center",
  },
  playerSkills: {
    width: "10cm",
    padding: 2,
  },
  playerNotes: {
    width: "3cm",
    padding: 2,
  },
  playerValue: {
    width: "2.5cm",
    padding: 2,
    textAlign: "right",
  },
  inducement1: {
    width: "80.9%",
    padding: 2,
    textAlign: "left",
  },
  inducement2: {
    width: "1.55%",
    padding: 2,
    textAlign: "right",
  },
  inducement3: {
    width: "1.55%",
    padding: 2,
    textAlign: "center",
  },
  inducement4: {
    width: "8%",
    padding: 2,
    textAlign: "right",
  },
  inducement5: {
    width: "8%",
    padding: 2,
    textAlign: "right",
  },
});


const TeamDocument = (props) => (
  <Document creator="nuflheim">
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={styles.title}>Nuflheim Team Draft List</Text>
      <View style={styles.container}>

        <View style={styles.row}>

          <View style={styles.column}>
            <View style={styles.table}>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info11}>Team Name:</Text><Text style={styles.info12}>{props.name}</Text></View>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info11}>Coach:</Text><Text style={styles.info12}>{props.coach}</Text></View>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info11}>Roster:</Text><Text style={styles.info12}>{props.rosterName}</Text></View>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info11}>Treasury:</Text><Text style={styles.info12}>{formatCost(props.treasury)}</Text></View>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info11}>Team Value:</Text><Text style={styles.info12}>{formatCost(props.teamValue)}</Text></View>
            </View>
          </View>

          <View style={styles.column}>
            <Text style={styles.info21}>Team Badge:</Text>
          </View>

          <View style={styles.column}>
            <View style={styles.table}>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info31}>Team Re-rolls:</Text><Text style={styles.info32}>{props.reRolls}</Text><Text style={styles.info33}>x</Text><Text style={styles.info34}>{formatCost(props.costOfReRolls)}</Text><Text style={styles.info35}>{formatCost(props.reRolls * props.costOfReRolls)}</Text></View>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info31}>Assistant Coaches:</Text><Text style={styles.info32}>{props.assistantCoaches}</Text><Text style={styles.info33}>x</Text><Text style={styles.info34}>{formatCost(props.costOfAssistantCoaches)}</Text><Text style={styles.info35}>{formatCost(props.assistantCoaches * props.costOfAssistantCoaches)}</Text></View>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info31}>Cheerleaders:</Text><Text style={styles.info32}>{props.cheerleaders}</Text><Text style={styles.info33}>x</Text><Text style={styles.info34}>{formatCost(props.costOfCheerleaders)}</Text><Text style={styles.info35}>{formatCost(props.cheerleaders * props.costOfCheerleaders)}</Text></View>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info31}>Dedicated Fans:</Text><Text style={styles.info32}>{props.dedicatedFans}</Text><Text style={styles.info33}>x</Text><Text style={styles.info34}>{formatCost(props.costOfDedicatedFans)}</Text><Text style={styles.info35}>{formatCost(props.dedicatedFans * props.costOfDedicatedFans)}</Text></View>
              <View style={styles.tableRowUnderlineLight}><Text style={styles.info31}>Apothecary:</Text><Text style={styles.info32}>{props.apothecary}</Text><Text style={styles.info33}>x</Text><Text style={styles.info34}>{formatCost(props.costOfApothecary)}</Text><Text style={styles.info35}>{formatCost(props.apothecary * props.costOfApothecary)}</Text></View>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.table}>
              <View style={styles.tableRowUnderline} key={0}>
                <Text style={styles.playerNumber}></Text>
                <Text style={styles.playerName}>Name</Text>
                <Text style={styles.playerPosition}>Position</Text>
                <Text style={styles.playerChar}>MA</Text>
                <Text style={styles.playerChar}>ST</Text>
                <Text style={styles.playerChar}>AG</Text>
                <Text style={styles.playerChar}>PA</Text>
                <Text style={styles.playerChar}>AV</Text>
                <Text style={styles.playerSkills}>Skills</Text>
                <Text style={styles.playerNotes}>Notes</Text>
                <Text style={styles.playerValue}>Value</Text>
              </View>
              {props.players.map((player, i) => {
                return <View style={styles.tableRowUnderlineLight} key={i+1}>
                  <Text style={styles.playerNumber}>{i+1}</Text>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerPosition}>{player.positionName}</Text>
                  <Text style={styles.playerChar}>{formatPlayerChar(player, "ma")}</Text>
                  <Text style={styles.playerChar}>{formatPlayerChar(player, "st")}</Text>
                  <Text style={styles.playerChar}>{formatPlayerChar(player, "ag")}</Text>
                  <Text style={styles.playerChar}>{formatPlayerChar(player, "pa")}</Text>
                  <Text style={styles.playerChar}>{formatPlayerChar(player, "av")}</Text>
                  <Text style={styles.playerSkills}>{formatPlayerSkills(player)}</Text>
                  <Text style={styles.playerNotes}></Text>
                  <Text style={styles.playerValue}>{player.value && formatCost(props.getPlayerValue(player))}</Text>
                </View>;
              })}
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            {/* <Text>Inducements</Text> */}
            {props.inducements.map((inducement, i) => {
              if (inducement.quantity > 0) {
                return <View style={styles.tableRowUnderlineLight} key={i}>
                  <Text style={styles.inducement1}>{inducement.name}</Text>
                  <Text style={styles.inducement2}>{inducement.quantity}</Text>
                  <Text style={styles.inducement3}>x</Text>
                  <Text style={styles.inducement4}>{formatCost(inducement.cost)}</Text>
                  <Text style={styles.inducement5}>{formatCost(inducement.quantity * inducement.cost)}</Text>
                </View>;
              }
            })}
          </View>
        </View>

      </View>
    </Page>
  </Document>
);


const onCreatePDF = async (props) => {
  const blob = await pdf(<TeamDocument {...props}/>).toBlob();
  FileSaver.saveAs(blob, "team.pdf");
};


const CreatePDF = (props) => {
    return <Button variant="dark" size="sm" onClick={() => onCreatePDF(props)}>Download PDF</Button>;
};


export default CreatePDF;
