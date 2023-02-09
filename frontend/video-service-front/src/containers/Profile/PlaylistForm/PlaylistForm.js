import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from '../../../components/UI/Modal/Modal';
import Button from 'react-bootstrap/Button';
import FormContent from '../../../components/PlaylistForm/Form/Form';

import { getFormInputsArray, getUpdatedControls,
    checkFormValidity, getFormControlGroups} from '../../../shared/formUtil';
import { updateObject } from '../../../shared/utility';


function mapStateToProps(state) {
    return {
        showPlaylistForm: state.playlist.showPlaylistForm,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        close: () => dispatch(actions.playlistCloseForm()),
        show: () => dispatch(actions.playlistShowForm()),
        upload: (data) => dispatch(actions.playlistUpload(data)),
    };
}

class PlaylistForm extends Component {
    state = {
        isFormValid: false,
        controls: {
            title: {
                elementType: 'input',
                groupConfig: {
                    group: 'title',
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
            },
            description: {
                elementType: 'input',
                groupConfig: {
                    group: 'description',
                    label: 'Description:',
                },
                controlConfig: {
                    type: 'text',
                    placeholder: 'Playlist description',
                },
                validation: {
                    valid: false,
                    required: false
                },
                value: '',
                touched: false
            },
            thumbnail: {
                elementType: 'input',
                groupConfig: {
                    group: 'thumbnail',
                    label: 'Thumbnail:',
                },
                controlConfig: {
                    type: 'file',
                    placeholder: 'Playlist thumbnail',
                },
                validation: {
                    valid: false,
                    required: true
                },
                value: '',
                file: null,
                touched: false
            }
        },
        currentMode: 'Uploading',
    };

    inputChangedHandler = (event) => {
        this.setState({ controls: getUpdatedControls(event, this.state) });
        this.setState({ isFormValid: checkFormValidity(this.state) });
    }

    upload = (event) => {
        event.preventDefault();
        this.props.upload({
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            title: this.state.controls['title'].value,
            description: this.state.controls['description'].value,
            imageType: 'thumbnail', 
            thumbnail: this.state.controls['thumbnail'].file,
        });
    }

    render() {
       
        const title = 'Uploading';
          
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const formContent = getFormControlGroups(
            getFormInputsArray(formElementsArray, this.inputChangedHandler)
        );

        const form = (
            <Form id="playlistUploadForm">
                {formContent}
            </Form>
        );

        const buttons = (
            <Container className="text-center"> 
                <Button 
                    className="mx-2 my-2"
                    size='md'
                    variant="secondary"
                    onClick={this.props.close}>
                        Close
                </Button>
                <Button 
                    className="mx-2 my-2"
                    size='md'
                    variant="success"
                    disabled={!this.state.isFormValid}
                    type="submit"
                    onClick={this.upload}
                    form="playlistUploadForm">
                    Upload
                </Button>
            </Container>
        );
    

        return (
            <Modal 
                show={this.props.showPlaylistForm}
                hide={this.props.close}
                title={title}
                body={form}
                footer={buttons} />)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(PlaylistForm);