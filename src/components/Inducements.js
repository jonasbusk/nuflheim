import React, {Component} from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";


class Inducements extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showInducementsModal: false,
    };
  }

  renderInducementsTableRow = (inducement, i) => {
    if (inducement.quantity > 0) {
      return (<tr key={i}>
        <td>{inducement.name}</td>
        <td>{inducement.quantity}</td>
        <td>x</td>
        <td>{this.props.formatCost(inducement.cost)}</td>
        <td>{this.props.formatCost(inducement.quantity * inducement.cost)}</td>
      </tr>);
    }
  }

  renderAvailableInducementsTableRow = (inducement, i) => {
    return (<tr key={i}>
      <td>{inducement.name} (0-{inducement.max})</td>
      <td><Form.Control type="number" size="sm" value={inducement.quantity.toString()} onChange={(e) => this.props.setInducementQuantity(i, e.target.value && Math.min(Math.max(parseInt(e.target.value) || 0, 0), inducement.max))} /></td>
      <td>x</td>
      <td><Form.Control type="text" size="sm" className="text-right" value={this.props.formatCost(inducement.cost)} plaintext readOnly /></td>
      <td><Form.Control type="text" size="sm" className="text-right" value={this.props.formatCost(inducement.quantity * inducement.cost)} readOnly /></td>
    </tr>);
  }

  toggleInducementsModal = () => {
    this.setState({showInducementsModal: !this.state.showInducementsModal});
  }

  render() {
    return (
      <div className="inducements-box">
        <Table borderless size="sm" className="margin-zero inducements-table">
          <tbody>
            {this.props.inducements.map(this.renderInducementsTableRow)}
          </tbody>
        </Table>
        <div className="text-center"><Button variant="link" size="sm" onClick={() => this.toggleInducementsModal()}>Buy inducements</Button></div>
        <Modal
          show={this.state.showInducementsModal}
          onHide={() => this.setState({showInducementsModal: false})}
          animation={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Inducements
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table borderless size="sm" className="margin-zero inducements-table table-striped">
              <thead>
                <tr>
                  <th>Inducement</th>
                  <th className="text-center">Qty</th>
                  <th></th>
                  <th className="text-center">Cost</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {this.props.inducements.map(this.renderAvailableInducementsTableRow)}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


export default Inducements;
