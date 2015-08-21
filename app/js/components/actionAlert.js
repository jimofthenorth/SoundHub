'use strict';

import React from 'react';
import { Alert } from 'react-bootstrap';

class ActionAlert extends React.Component {
  constructor() {
    super()
  }

  render() {
    if(this.props.alertVisible) { 
      return (
        <Alert onDismiss={this.props.onDismiss} bsStyle='success' dismissAfter={1000}>
          <h4>{this.props.alertMessage}</h4>
        </Alert>
      )
    } else {
      return null;
    }
  }

};

export default ActionAlert;