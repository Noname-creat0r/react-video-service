import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeVideoCard from '../../components/UI/Card/HomeVideoCard/HomeVideoCard';

import './Home.css';

function mapStateToProps(state) {
    return {
        fetchingData: state.video.fetchingInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class Home extends Component {
   

    render() {
        let content;

        if (this.props.fetchingData){
            
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Home);