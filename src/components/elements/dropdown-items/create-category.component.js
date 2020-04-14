import React, { Component } from "react";
import axios from "axios";

export default class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementCategory: "",
    };
  }

  onChangeElementCategory = e => {
    this.setState({
      elementCategory: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { elementCategory } = this.state;
    axios
      .post("http://localhost:5000/categories/add", { elementCategory })
      .then(res => console.log(res.data))
      .catch(error => console.log(error.response));

    this.setState({
      elementCategory: "",
    });
  };

  render() {
    const { elementCategory } = this.state;
    return (
      <div className="container">
        <h3>Create New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Format: </label>
            <input
              className="form-control"
              onChange={this.onChangeElementCategory}
              required
              type="text"
              value={elementCategory}
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-primary"
              type="submit"
              value="Create New Format"
            />
          </div>
        </form>
      </div>
    );
  }
}
