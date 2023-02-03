import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/UI/Modal/Modal';

function mapStateToProps(state) {
    return {
        // props for show/close from redux!
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // close/send data sagas + actions
    };
}

class PlaylistForm extends Component {
    state = {
        isFormValid: false,
        controls: {
            title: {
                elementType: 'input',
                groupConfig: {
                    group: 'name',
                    label: 'Title:',
                },
                controlConfig: {
                    type: 'text',
                    placeholder: 'Video title',
                },
                validation: {
                    valid: false,
                    required: true
                },
                value: '',
                touched: false
            }
        },
    };

    render() {
        // Sections with playlist cards of your own -> the first one is +
        // if plus
        const title = 'Playlist managment';

        const content = {};
        const buttons =''

        return (
            <Modal 
                show={this.props.show}
                hide={this.props.hide}
                title={title}
                body={form}
                footer={buttons}/>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(PlaylistForm);