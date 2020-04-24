import React, { Component } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import { Col, Container, Form, Button } from "react-bootstrap";
import Column from "./TracksBoard/Column";

class ManageTrack extends Component {
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
    axios
      .get(`http://localhost:5000/tracks/${this.props.match.params.id}`)
      .then(response => {
        console.log({ response });
        this.setState(oldState => {
          console.log({ oldState });
          oldState.columns["column-2"].items = response.data.trackinfo;
          return {
            ...oldState,
            ...response.data,
          };
        });
      });

    const tracksPromise = axios
      .get(`http://localhost:5000/tracks/${this.props.match.params.id}`)
      .then(response => {
        return response.data;
      });

    const elementsPromise = axios
      .get("http://localhost:5000/elements/")
      .then(response => {
        return response.data;
      });

    Promise.all([tracksPromise, elementsPromise]).then(data => {
      const tracks = data[0];
      const elements = data[1];

      this.setState(oldState => {
        oldState.columns["column-1"].items = elements.reduce((all, one) => {
          const test = tracks.trackinfo.find(item => item._id === one._id);
          if (!test) {
            all.push(one);
          }
          return all;
        }, []);
        oldState.columns["column-2"].items = tracks.trackinfo;
        return {
          ...oldState,
          ...tracks,
          // trackinfo: response.data.trackinfo
        };
      });
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { trackNumber, trackName, columns } = this.state;
    const track = {
      trackNumber,
      trackName,
      trackinfo: columns["column-2"].items,
    };

    axios
      .post(
        `http://localhost:5000/tracks/update/${this.props.match.params.id}`,
        track
      )
      .then(res => {
        console.log(res.data);
        console.log(track);
        alert("updated");
        window.location = "../";
      });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { trackNumber, trackName, columns } = this.state;

    return (
      <Container>
        <h1>Update Track</h1>
        <Form id="submit-track" onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="trackNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                name="trackNumber"
                onChange={this.onChange}
                placeholder="add #"
                required
                type="text"
                value={trackNumber}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="trackName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="trackName"
                onChange={this.onChange}
                placeholder="add label"
                required
                type="text"
                value={trackName}
              />
            </Form.Group>

            <Col>
              <Button type="submit" variant="primary">
                Update Track
              </Button>
            </Col>
          </Form.Row>
        </Form>

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
      </Container>
    );
  }
}

export default ManageTrack;
