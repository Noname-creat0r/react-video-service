import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
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


function mapStateToProps(state) {
    return {
        playlists: state.playlist.playlists,
        fetching: state.playlist.fetching,
    };
}

function mapDispatchToProps(dispatch) {
    return {
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
        thumbnail: null,
        thumbnailURL: null,
    }

    componentDidUpdate() {
        console.log('pfupdate');
    }   

    render() {
        let initialValues = {};
        if (this.props.playlist){
            initialValues = {   
                title: this.props.playlist.title,
                description: this.props.playlist.description,
                thumbnail: null, 
            };
        } else {
            initialValues = { 
                title: '',
                description: '',
                thumbnail: null, 
            };
        }
       
        const content = 
            <Formik
                initialValues={initialValues}
                validationSchema={
                    Yup.object().shape({
                        title: Yup.string()
                            .min(3, "title should be at least 3 chars long")
                            .max(25, "slow down, this is too much for title")
                            .required("Required"),
                        description: Yup.string()
                            .min(3, "write a little about the video")
                            .max(500, "whoa, are writing a book here?")
                            .required("Required"),

                    })
                }
                onSubmit={(values) => {
                    //alert(JSON.stringify(values));
                    const playlistData = {
                        token: localStorage.getItem('token'),
                        userId: localStorage.getItem('userId'),
                        title: values.title,
                        description: values.description,
                        imageType: 'thumbnail', 
                        thumbnail: this.state.thumbnail,
                    };
                    this.props.playlist ? 
                        this.props.edit(playlistData) :
                        this.props.upload(playlistData);
                        
                }}>
                {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                }) => (
                    <Form id="playlistForm" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title*</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                placeholder="playlist title"
                                value={values.title}
                                onChange={handleChange}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}/>
                                
                                {errors.title && touched.title && (
                                    <Form.Control.Feedback 
                                        className="d-block text-danger mx-2"
                                        type="invalid">
                                            {errors.title}
                                    </Form.Control.Feedback>)}
                        </Form.Group>

                        <Form.Group className='my-3'>
                            <Form.Label>Description*</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                placeholder="about..."
                                value={values.description}
                                onChange={handleChange}
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}/>

                                {errors.description && touched.description && (
                                    <Form.Control.Feedback 
                                        className="d-block text-danger mx-2"
                                        type="invalid">
                                            {errors.description}
                                    </Form.Control.Feedback>)}
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Thumbnail</Form.Label>
                            <Form.Control
                                name="thumbnail" 
                                placeholder="coolImage.png" 
                                value={values.thumbnail}
                                type="file"
                                onChange={(event) => { 
                                    let reader = new FileReader();
                                    let file = event.target.files[0];
                                    reader.onload = () => {
                                        this.setState({ 
                                            thumbnailURL: reader.result,
                                            thumbnail: event.target.files[0]
                                        });
                                    }
                                    reader.readAsDataURL(file);
                                    handleChange(event);
                                }}
                                />
                        </Form.Group>
                        { (this.state.thumbnail || this.props.playlist ) && 
                            (<Form.Group className="my-2">
                                <Form.Label className='d-block my-1 mx-1'>Preview:</Form.Label>
                                <Image 
                                    className="my-2 mx-2"
                                    src={this.state.thumbnailURL || 
                                        'http://localhost:8080/video/thumbnail?id=' + this.props.playlist.thumbnail}
                                    width="256"
                                    height="240"
                                    rounded/>
                            </Form.Group>)}
                    </Form>
                )}
            </Formik>

        const buttons = (
            <Container className="text-center"> 
                <Button 
                    className="mx-2 my-2"
                    size='md'
                    variant="secondary"
                    onClick={() => { 
                        this.props.hide();
                        this.setState({ 
                            thumbnail: null,
                            thumbnailURL: null,
                        });
                    }}>
                    Close
                </Button>
                <Button 
                    className="mx-2 my-2"
                    size='md'
                    variant="success"
                    //disabled={!this.state.isFormValid}
                    type="submit"
                    //onClick={this.upload}
                    form="playlistForm">
                    { this.props.playlist ? 'Edit' : 'Upload'}
                </Button>
            </Container>
        );

            /*case modalModes.ADDING:
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
                //console.log(this.props.playlists);
                content=
                    <ListGroup>
                        {items}
                    </ListGroup>
                break;*/

        return (
            <Modal 
                show={this.props.show}
                hide={this.props.hide}
                title={this.props.playlist ? 'Editing' : 'Uploading'}
                body={content}
                footer={buttons} />)
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(PlaylistForm);