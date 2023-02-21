import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class Admin extends Component {
    render() {
        return (
            <Container className='my-5'>
                <Tabs
                    className=''
                    defaultActiveKey='users'
                    justify>
                    <Tab eventKey='users' title='users'>
                    </Tab>
                    <Tab eventKey='videos' title='videos'>
                        
                    </Tab>
                    <Tab eventKey='categories' title='categories'>
                        
                    </Tab>
                </Tabs>
            </Container>   
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Admin);