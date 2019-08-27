import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import './DatePicker.css';


export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  getDay() {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  render() {
    return (
      <div className="container">

        <TextField
          className="textField"
          id="date"
          type="date"
          defaultValue={this.getDay()}

          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event, date) => {
            this.setState({ value: date });
            this.props.onChange(event);
          }
          }
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};
