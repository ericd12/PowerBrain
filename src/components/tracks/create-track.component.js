import axios from "axios";
import styled from "styled-components";
import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./tracksBoard/column";

const Container = styled.div`
  width: 100%;
  overflow: inherit;
  margin-left: 3%;
`;

const Form = styled.form`
  width: 90%;
  margin-top: 1vh;
`;

const InputGroup = styled.div`
  width: 45%;
`;

const Button = styled.input`
  margin: 0 4px;
  margin-top: calc(1.5rem + 4px);
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.5rem;
  font-weight: 500;
  color: white;
`;
export default class CreateTrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackName: "",
      trackNumber: "",
      elements: [],
      columns: {
        "column-1": {
          name: "Elements",
          items: [],
        },
        "column-2": {
          name: "Track List",
          items: [],
        },
      },
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/elements/").then(response => {
      this.setState(prev => {
        const copy = { ...prev };
        const { columns } = copy;
        copy.elements = response.data;

        // const [firstColumnId] = Object.keys(columns);

        columns["column-1"].items = [
          ...copy.columns["column-1"].items,
          ...response.data,
        ];

        return copy;
      });
    });
  }

  onChangeTrackNumber = e => {
    this.setState({
      trackNumber: e.target.value,
    });
  };

  onChangeTrackName = e => {
    this.setState({
      trackName: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { trackNumber, trackName, columns } = this.state;
    const track = {
      trackNumber,
      trackName,
      trackinfo: columns["column-2"].items,
    };

    axios.post("http://localhost:5000/tracks/add", track).then(res => {
      console.log(res.data);
      console.log(track);

      this.setState(prev => {
        return {
          ...prev,
          trackName: "",
          trackNumber: "",
          columns: {
            "column-1": {
              name: "Elements",
              items: prev.elements,
            },
            "column-2": {
              name: "Track List",
              items: [],
            },
          },
        };
      });
    });
  };

  render() {
    const { trackNumber, trackName, columns } = this.state;
    return (
      <div>
        <Container>
          <h1>Create Track</h1>

          <Form
            id="submit-track"
            onSubmit={this.onSubmit} /* id="createForm" */
          >
            <InputGroup>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="number">Number</label>
                  <input
                    className="form-control"
                    onChange={this.onChangeTrackNumber}
                    placeholder="add number"
                    required
                    type="text"
                    value={trackNumber}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="name">Name</label>
                  <input
                    className="form-control"
                    onChange={this.onChangeTrackName}
                    placeholder="add name"
                    type="text"
                    value={trackName}
                  />
                </div>
                <Button
                  className="btn btn-primary"
                  form="submit-track"
                  type="submit"
                  value="Create Track"
                />
              </div>
            </InputGroup>

            <DragDropContext
              onDragEnd={({ source, destination }) => {
                if (!destination) {
                  return;
                }

                if (source.droppableId !== destination.droppableId) {
                  this.setState(prev => {
                    const sourceColumn = prev.columns[source.droppableId];
                    const destColumn = prev.columns[destination.droppableId];
                    const sourceItems = [...sourceColumn.items];
                    const destItems = [...destColumn.items];
                    const [removed] = sourceItems.splice(source.index, 1);
                    destItems.splice(destination.index, 0, removed);
                    return {
                      ...prev,
                      columns: {
                        ...prev.columns,
                        [source.droppableId]: {
                          ...sourceColumn,
                          items: sourceItems,
                        },
                        [destination.droppableId]: {
                          ...destColumn,
                          items: destItems,
                        },
                      },
                    };
                  });
                } else {
                  this.setState(prev => {
                    const column = prev.columns[source.droppableId];
                    const copiedItems = [...column.items];
                    const [removed] = copiedItems.splice(source.index, 1);
                    copiedItems.splice(destination.index, 0, removed);
                    return {
                      ...prev,
                      columns: {
                        ...prev.columns,
                        [source.droppableId]: {
                          ...column,
                          items: copiedItems,
                        },
                      },
                    };
                  });
                }
              }}
            >
              {Object.entries(columns).map(([id, column]) => {
                return <Column {...{ ...column, id, key: id }} />;
              })}
            </DragDropContext>
          </Form>
        </Container>
      </div>
    );
  }
}
