import axios from 'axios';
import '../../App.css';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import Column from './tracksBoard/column';
import React, { Component} from "react";
import { DragDropContext } from "react-beautiful-dnd";
// import ReactDOM from "react-dom";

// import AddItemForm from "./AddItemForm";
      
const Container = styled.div`
  display: flex;
  justify-content: left;
  width: 95%;
  overflow: auto;
  
  `;

  export default class CreateTrack extends Component {
    constructor(props){
      super(props);
        this.state = {
          "column-1": {
            name: "Elements",
            items: [],
          },
          "column-2": {
            name: "Track List",
            items: [],
          },
        };
        
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {
      axios.get("http://localhost:5000/elements/").then(response => {
        this.setState(prev => {
          const copy = { ...prev };
          const [firstColumnId] = Object.keys(copy);
  
          copy[firstColumnId].items = [
            ...copy[firstColumnId].items,
            ...response.data,
          ];
          return copy;
        });
      });
    }



    onSubmit(e){
      e.preventDefault();

      const track = {
        trackname: this.state['column-2'].items,

      }
      console.log(track);

      axios.post('http://localhost:5000/tracks/add', track)
      .then(res => console.log(res.data));       
 
      this.setState({
        // "column-1": {
        //   name: "Elements",
        //   items: [],
        // },
        "column-2": {
          name: "Track List",
          items: [],
      }});    

    }
  
    render() {
      return (
        <div>
            <h1>Create Track</h1>

          <Container>
            <form onSubmit={this.onSubmit} /*id="createForm" */ > 
            <div className="form">
              <input type="submit" value="Create Track" className="btn btn-primary" />
            </div>
            
              <DragDropContext
                onDragEnd={({ source, destination }) => {
                  if (!destination) {
                    return;
                  }
      
                  if (source.droppableId !== destination.droppableId) {
                    this.setState(prev => {
                      const sourceColumn = prev[source.droppableId];
                      const destColumn = prev[destination.droppableId];
                      const sourceItems = [...sourceColumn.items];
                      const destItems = [...destColumn.items];
                      const [removed] = sourceItems.splice(source.index, 1);
                      destItems.splice(destination.index, 0, removed);
                      return {
                        ...prev,
                        [source.droppableId]: {
                          ...sourceColumn,
                          items: sourceItems,
                        },
                        [destination.droppableId]: {
                          ...destColumn,
                          items: destItems,
                        },
                      };
                    });
                  } else {
                    this.setState(prev => {
                      const column = prev[source.droppableId];
                      const copiedItems = [...column.items];
                      const [removed] = copiedItems.splice(source.index, 1);
                      copiedItems.splice(destination.index, 0, removed);
                      return {
                        ...prev,
                        [source.droppableId]: {
                          ...column,
                          items: copiedItems,
                        },
                      };
                    });
                  }
                }}
              >
                {Object.entries(this.state).map(([id, column]) => {
                  return <Column {...{ ...column, id, key: id }} />;
                })}
              </DragDropContext>        
          
            </form>
          </Container>
        </div>
      );
    }
  }


      

