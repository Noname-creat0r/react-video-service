import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as actions from '../../../store/actions/index';

import Modal from '../../../components/UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const mapStateToProps = state => {
    return {
        uploading: state.video.uploading,
        categoreis: state.video.categories,
        fetching: state.video.fetching,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onVideoUpload: (videoData, token) =>
            dispatch(actions.videoUpload(videoData, token)),
        fetchCategoreis: () => dispatch(actions.videoFetchCategoreis()),
    };
}

class UploadVideoForm extends Component {
    state = {
        
    }

    upload = (event) => {
        event.preventDefault();
        this.props.onVideoUpload({
            title: this.state.controls.title.value,
            description: this.state.controls.description.value,
            category: this.state.controls.category.value,
            userId: localStorage.getItem('userId'),
            imageType: 'thumbnail',
            thumbnail: this.state.controls.thumbnail.value,
            video: this.state.controls.video.value,
            
        }, 
        {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId')
        });
    }

    render() {
        const buttons = (
            <Container className="text-center"> 
                <Button 
                    className="mx-2 my-2 btn-md"
                    variant="secondary"
                    onClick={this.props.hide}>
                        Close
                </Button>
                <Button 
                    className="mx-2 my-2 btn-md"
                    variant="success"
                    disabled={!this.state.isFormValid}
                    type="submit"
                    onClick={this.upload}
                    form="videoUploadForm">
                    Upload
                </Button>
            </Container>
        );

        return (
            <Modal 
                show={this.props.show}
                hide={this.props.hide}
                //title={modalTitle}
                //body={content}
                footer={buttons}/>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
) ( UploadVideoForm );