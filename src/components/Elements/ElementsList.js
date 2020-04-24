import React, { Component } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import ElementsTableRow from "./ElementsTableRow";
import { CoolTableHead } from "../../styles";

class ElementsList extends Component {
  constructor(props) {
    super(props);
    this.state = { elements: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/elements/")
      .then(response => {
        this.setState({ elements: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteElement = id => {
    axios.delete(`http://localhost:5000/elements/${id}`).then(response => {
      console.log(response.data);
      alert("deleted");
      this.setState(prev => {
        return {
          elements: prev.elements.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { elements } = this.state;
    return (
      <Container>
        <h1>Manage Elements</h1>
        <Table>
          <thead>
            <tr>
              <CoolTableHead>Number</CoolTableHead>
              <CoolTableHead>Label</CoolTableHead>
              <CoolTableHead>Description</CoolTableHead>
              <CoolTableHead>Format</CoolTableHead>
              <CoolTableHead>Duration</CoolTableHead>
              <CoolTableHead>Category</CoolTableHead>
              <CoolTableHead>Subcategory</CoolTableHead>
              <CoolTableHead>Market</CoolTableHead>
              <CoolTableHead>Cognitive Rating</CoolTableHead>
              <CoolTableHead>Physical Rating</CoolTableHead>
              <CoolTableHead>Vimeo Link</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </thead>
          <tbody>
            {elements.map(currentelement => {
              return (
                <ElementsTableRow
                  key={currentelement._id}
                  deleteElement={this.deleteElement}
                  {...currentelement}
                />
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default ElementsList;
