import React, { Component } from 'react';
import axios from 'axios';

export default class ManageElement extends Component {
  constructor(props) {
    super(props);

    this.onChangeElementNumber      = this.onChangeElementNumber.bind(this);
    this.onChangeElementLabel       = this.onChangeElementLabel.bind(this);
    this.onChangeElementDescription = this.onChangeElementDescription.bind(this);
    this.onChangeElementFormat      = this.onChangeElementFormat.bind(this);
    this.onChangeElementDuration    = this.onChangeElementDuration.bind(this);
    this.onChangeElementCategory    = this.onChangeElementCategory.bind(this);
    this.onSubmit                   = this.onSubmit.bind(this);

    this.state = {
      elementnumber: '',
      elementlabel: '',
      elementDescription:'',
      elementFormat: ''     ,      
      elementDuration: '',
      elementCategory: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/elements/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          elementnumber: response.data.elementnumber,
          elementlabel: response.data.elementlabel,
          elementDescription: response.data.elementDescription,
          elementFormat: response.data.elementFormat,
          elementDuration: response.data.elementDuration,
          elementCategory: response.data.elementCategory
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeElementNumber(e) {
    this.setState({
      elementnumber: e.target.value
    })
  }
  
  onChangeElementLabel(e) {
    this.setState({
      elementlabel: e.target.value
    })
  }

  onChangeElementDescription(e) {
    this.setState({
      elementDescription: e.target.value
    });
  }

  onChangeElementFormat(e) {
    this.setState({
      elementFormat: e.target.value
    });
  }
  
  onChangeElementDuration(e) {
    this.setState({
      elementDuration: e.target.value
    });
  }
  
  onChangeElementCategory(e) {
    this.setState({
      elementCategory: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const element = {
      elementnumber: this.state.elementnumber,
      elementlabel: this.state.elementlabel,
      elementDescription: this.state.elementDescription,
      elementFormat: this.state.elementFormat ,
      elementDuration:this.state.elementDuration, 
      elementCategory: this.state.elementCategory
    }

    console.log(element);

    axios.post('http://localhost:5000/elements/update/' + this.props.match.params.id, element)
      .then(res => console.log(res.data));
    alert('updated');
    window.location = '../';
  }

  render() {
    return (
    <div>
      <h3>Manage Elements</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group row">
          <div className="form-group col"> 
            <label>Number</label>		          
            <input type="text"
              required
              className="form-control"                
              placeholder="add #" 
              value = {this.state.elementnumber}
              onChange={this.onChangeElementNumber}
            />
          </div>
          <div className="form-group col">
            <label>Label</label>	
            <input type="text"
              required
              className="form-control"    
              placeholder="add label"           
              value = {this.state.elementlabel}
              onChange={this.onChangeElementLabel}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="form-group col">
            <label>Label</label>	
            <input type="text"
              required
              className="form-control"    
              placeholder="add description"           
              value = {this.state.elementDescription}
              onChange={this.onChangeElementDescription}
            />
          </div>
          <div className="form-group col">		
            <label htmlFor="format">Format</label>	
            <select className="form-control" 
              required
              name="format" 
              id="format"
              value = {this.state.elementFormat}
              onChange={this.onChangeElementFormat}>
              <option defaultValue>Choose...</option>
              <option value="1">Video</option>
              <option value="2">#2</option>
              <option value="3">#3</option>
            </select>
          </div>	
        </div>
        <div className="form-group row">
          <div className="form-group col">
            <label htmlFor="duration">Duration</label>		
            <input type="text"
              required
              className="form-control"
              name="duration" 
              id="duration" 
              placeholder="min:secs"
              value = {this.state.elementDuration}
              onChange={this.onChangeElementDuration}
            />
          </div>                    
          <div className="form-group col">		
            <label htmlFor="category">Category</label>	
            <select className="form-control" 
              required
              name="category" 
              id="category"
              value = {this.state.elementCategory}
              onChange={this.onChangeElementCategory}>
              <option defaultValue>Choose...</option>
              <option value="1">Timing</option>
              <option value="2">#</option>
              <option value="3">#</option>
            </select>
          </div>	
        </div>

        <div className="form-group">
          <input type="submit" value="Update Element" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}