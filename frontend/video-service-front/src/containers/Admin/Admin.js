import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { mapDataToTable } from '../../shared/utility';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

function mapStateToProps(state) {
    return {
        pending: state.admin.pendingRequests,
        users: state.admin.users,
        videos: state.video.videosInfo,
        categories: state.video.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProfiles: (token) => dispatch(actions.adminFetchProfiles(token)),
        fetchCategoreis: () => dispatch(actions.videoFetchCategoreis())
    };
}

class Admin extends Component {

    componentDidMount() {
        this.props.fetchProfiles(localStorage.getItem('token'));
        //this.props.fetchCategoreis();
    }
    
    render() {
        if (this.props.pending > 0)
            return <LoadingSpinner/>
        
        return (
            <Container className='my-5'>
                <Tabs
                    className=''
                    defaultActiveKey='users'
                    justify>
                    <Tab eventKey='users' title='users'>
                        { this.props.users.length > 0 ? 
                            mapDataToTable(this.props.users, Table) :
                            <h3>There are no users...</h3> }
                    </Tab>
                    <Tab eventKey='videos' title='videos'>
                        { this.props.videos.length > 0 ? 
                                mapDataToTable(this.props.videos, Table) :
                                <h3>There are no videos...</h3> }
                    </Tab>
                    <Tab eventKey='categories' title='categories'>
                    { this.props.categories.length > 0 ? 
                            mapDataToTable(this.props.categories, Table) :
                            <h3>There are no categories...</h3> }
                    </Tab>
                </Tabs>
            </Container>   
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Admin);