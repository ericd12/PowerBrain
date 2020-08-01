import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import TracksTableRow from "./TracksTableRow";
import { CoolTableHead, StyledContainer } from "../../styles";
// import ComponentWrapper from "../ComponentWrapper";
import { API_URL } from "../../constants";

class TracksTable extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [], elements: [] };
  }

  componentDidMount() {
    Promise.all([
      axios.get(`${API_URL}/elements/`),
      axios.get(`${API_URL}/tracks/`),
    ]).then(([e, t]) => {
      const { data: elements } = e;
      const { data: tracks } = t;
      this.setState({
        elements: elements.reduce((all, one) => {
          return {
            ...all,
            [one._id]: one,
          };
        }, {}),
        tracks,
      });
    });
  }

  deleteTrack = id => {
    axios.delete(`${API_URL}/tracks/${id}`).then(() => {
      alert("deleted");
      this.setState(({ tracks }) => {
        return {
          tracks: tracks.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { tracks, elements } = this.state;
    return (
      <StyledContainer fluid title="Tracks">
        <Table hover>
          <thead style={{ borderBottom: "2px solid white" }}>
            <tr>
              <CoolTableHead width="200">Track #</CoolTableHead>
              <CoolTableHead width="200">Track Name</CoolTableHead>
              <CoolTableHead>Track Info</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </thead>
          <tbody>
            {tracks.map(currentTrack => {
              return (
                <TracksTableRow
                  key={currentTrack._id}
                  deleteTrack={this.deleteTrack}
                  {...{ ...currentTrack, elements: elements || [] }}
                />
              );
            })}
          </tbody>
        </Table>
      </StyledContainer>
    );
  }
}

export default TracksTable;
