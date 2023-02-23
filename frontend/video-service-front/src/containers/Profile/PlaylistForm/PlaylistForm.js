import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import * as modalModes from '../../../shared/playlistModalModes';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Placeholder from 'react-bootstrap/Placeholder';
import Image from 'react-bootstrap/Image';

import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner';
import AddImage from '../../../assets/images/plus-sign.svg';
import Modal from '../../../components/UI/Modal/Modal';


import { getFormInputsArray, getUpdatedControls,
    checkFormValidity, getFormControlGroups} from '../../../shared/formUtil';
import { updateObject } from '../../../shared/utility';


function mapStateToProps(state) {
    return {
        showPlaylistForm: state.playlist.showPlaylistForm,
        mode: state.playlist.playlistFormMode,
        playlists: state.playlist.playlists,
        fetching: state.playlist.fetching,
        videoId: state.video.videoId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        close: () => dispatch(actions.playlistCloseForm()),
        showModal: (mode) => dispatch(actions.playlistShowForm(mode)),
        upload: (data) => dispatch(actions.playlistUpload(data)),
        editPlaylist: (playlistId, actionType, videoId) =>
             dispatch(actions.playlistEdit(
                localStorage.getItem('token'),
                playlistId,
                actionType,
                videoId)
            ),
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
    };

    getBasicFormObject = (buttons) => {
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

        const content = (
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

        return {
            content: content,
            buttons: buttons,
        }
    };


    upload = (event) => {
        event.preventDefault();
        this.props.upload({
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            title: this.state.controls['title'].value,
            description: this.state.controls['description'].value,
            imageType: 'thumbnail', 
            thumbnail: this.state.controls['thumbnail'].value,
        });
    };

    render() {
        let title;
        let content = <LoadingSpinner />;
        let buttons = 
            <Container className='text-center'>
                <Placeholder.Button className='mx-2' variant='secondary' xs={2} animation='wave'/>
                <Placeholder.Button className='mx-2' variant='secondary' xs={3} animation='wave'/>
            </Container>;
        const mode = this.props.mode;

        if (this.props.fetching) 
            return (
                <Modal 
                    show={this.props.showPlaylistForm}
                    hide={this.props.close}
                    title={title}
                    body={content}
                    footer={buttons} />)

        switch (mode) {
            case modalModes.UPLOADING: 
                const formObject = this.getBasicFormObject();
                buttons = formObject.buttons;
                content = formObject.content;
                break;
            case modalModes.ADDING:
                const items = [];
                this.props.playlists.forEach((playlist) =>
                    items.push(
                        <ListGroup.Item 
                            action
                            onClick={() => this.props.editPlaylist(
                                playlist._id,
                                modalModes.ADDING,
                                this.props.videoId)}>
                            {playlist.title} 
                        </ListGroup.Item>
                    )
                );
                items.push(
                    <ListGroup.Item 
                        action 
                        onClick={() => this.props.showModal(modalModes.UPLOADING)}> 
                        <Image src={AddImage} width='15px' height='15px'/> <b>Create new </b>
                    </ListGroup.Item>
                );
                console.log(this.props.playlists);
                content=
                    <ListGroup>
                        {items}
                    </ListGroup>
                break;
            case modalModes.EDITITNG:
                
                break;
        }

        return (
            <Modal 
                show={this.props.showPlaylistForm}
                hide={this.props.close}
                title={mode}
                body={content}
                footer={buttons} />)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(PlaylistForm);