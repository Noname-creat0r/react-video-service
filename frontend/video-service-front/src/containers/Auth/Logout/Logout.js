import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

// Logout + profile name and link today

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render () {
        return <Navigate replace to='/'/>;
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};

export default connect(null, mapDispatchToProps) ( Logout );