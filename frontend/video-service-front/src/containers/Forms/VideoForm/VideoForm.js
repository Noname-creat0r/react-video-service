import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions/index';
import * as validators from '../../../validators/validators';

import Modal from '../../../components/UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const mapStateToProps = state => {
    return {
        uploading: state.video.uploading,
        categories: state.video.categories,
        fetching: state.video.fetching,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        videoUpload: (videoData, token) =>
            dispatch(actions.videoUpload(videoData, token)),
        fetchCategoreis: () => dispatch(actions.videoFetchCategoreis()),
    };
}

class UploadVideoForm extends Component {
    state = {
        video: '',
        thumbnail: '',
        thumbnailURL: '',
        category: 'Any',
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
        let initialValues = { 
            title: '',
            description: '',
            category: '',
            thumbnail: '',
            video: '',
        };
        if (this.props.playlist)
            initialValues = {   
                title: this.props.playlist.title,
                description: this.props.playlist.description,
                category: this.props.playlist.category, // fix
                thumbnail: '', 
                video: '',
            };
        
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
                    const videoData = {
                        userId: localStorage.getItem('userId'),
                        title: values.title,
                        description: values.description,
                        category: this.state.category,
                        imageType: 'thumbnail', 
                        thumbnail: this.state.thumbnail,
                        video: this.state.video,
                    };
                    alert(JSON.stringify(videoData));
                    this.props.videoUpload(videoData,{
                        token: localStorage.getItem('token'),
                        userId: localStorage.getItem('userId'),
                    })
                }}>
                {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                }) => (
                    <Form id="videoForm" onSubmit={handleSubmit}>
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
                        
                        <Form.Group className='my-3'>
                            <Form.Label>Category*</Form.Label>
                            <Form.Select
                                name="category"
                                value={this.state.category}
                                onChange={(event) => {
                                    this.setState({ category: event.target.value });
                                }}
                                isValid={true}>
                                {this.props.categories.map((category) => 
                                    <option value={category.title}>
                                        {category.title}
                                    </option> )
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Video*</Form.Label>
                            <Form.Control
                                name="video" 
                                value={values.video}
                                type="file"
                                onChange={(event) => { 
                                    handleChange(event);
                                    if (validators.fileVideoValidator(event)){ 
                                        let file = event.target.files[0];
                                        this.setState({ video: file });
                                    } else {
                                        this.setState({ video: null });
                                    }
                                }}
                                />
                                {touched.video && !this.state.video && (
                                <Form.Control.Feedback 
                                    className="d-block text-danger mx-2"
                                    type="invalid">
                                        invalid file type for thumbnail
                                </Form.Control.Feedback>)}
                        </Form.Group>

                        <Form.Group className='my-3'>
                            <Form.Label>Thumbnail*</Form.Label>
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
                                    handleChange(event);
                                    if (validators.fileImgValidator(event)){ 
                                        reader.readAsDataURL(file);
                                    }
                                    else {
                                        this.setState({ 
                                            thumbnailURL: '',
                                            thumbnail: ''
                                        });
                                    }
                                }}
                                />
                                {touched.thumbnail && !this.state.thumbnail && (
                                <Form.Control.Feedback 
                                    className="d-block text-danger mx-2"
                                    type="invalid">
                                        invalid file type for thumbnail
                                </Form.Control.Feedback>)}
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
                    className="mx-2 my-2 btn-md"
                    variant="secondary"
                    onClick={() => {
                        this.props.hide();
                        this.setState({
                            thumbnail: '',
                            thumbnailURL: '',
                            video: '',
                        })
                    }}>
                        Close
                </Button>
                <Button 
                    className="mx-2 my-2 btn-md"
                    variant="success"
                    type="submit"
                    form="videoForm">
                    Upload
                </Button>
            </Container>
        );

        return (
            <Modal 
                show={this.props.show}
                hide={this.props.hide}
                title={this.props.video ? 'Editing' : 'Uploading'}
                body={content}
                footer={buttons}/>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
) ( UploadVideoForm );