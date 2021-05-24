import React, { Component } from "react";
import Checkbox from "./Checkbox";
// https://github.com/fedosejev/checkboxes-in-react-16/blob/master/src/components/App.js
// https://www.npmjs.com/package/react-collapse
import {Collapse} from 'react-collapse';

export interface CheckProps  {
    check_list: any[];
    default_vals: any[];
    ID: string;
}

export interface CheckState  {
    checkboxes: any[];
}

// class Checkboxes: React.FC<BudgetProps> = ({budgets}: BudgetProps) => {
class Checkboxes extends Component<CheckProps, CheckState> {
  state = {
    checkboxes: this.props.check_list.reduce(
      (options, option) => ({
        ...options,
        [option]: this.props.default_vals
      }),
      {}
    ) 
  };

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log(checkbox, "is selected.");
      });
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
      ID={this.props.ID}
    />
  );

  createCheckboxes = () => this.props.check_list.map(this.createCheckbox);


  render() {
    return (
      <div className="center-table" id={this.props.ID}>
        <div className="row mt-12">
          <div className="col-sm-12">

                  <div className="content">
                      <form onSubmit={this.handleFormSubmit}>
                        {this.createCheckboxes()}

                        <div className="form-group mt-2">
                          <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={this.selectAll}
                          >

                          Select All
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={this.deselectAll}
                          >
                            Deselect All
                          </button>
                          
                        </div>
                      </form>
                  </div>

          </div>
        </div>
      </div>
    );
  }
}


export default Checkboxes;