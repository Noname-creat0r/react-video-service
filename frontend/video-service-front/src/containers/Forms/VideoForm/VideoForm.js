import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUpdatedControls, getFormControlGroups,
     getFormInputsArray, checkFormValidity } from '../../../shared/formUtil';
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
            },
            category: {
                elementType: 'select',
                groupConfig: {
                    group: 'category',
                    label: 'Category:',
                },
                controlConfig: {
                    options: this.props.categoreis,
                },
                validation: {
                    valid: true,
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
                    placeholder: 'Video description',
                },
                validation: {
                    valid: false,
                    required: true
                },
                value: '',
                touched: false
            },
            thumbnail: {
                elementType: 'input',
                groupConfig: {
                    group: 'file',
                    label: 'Thumbnail:',
                },
                controlConfig: {
                    type: 'file',
                    accept: 'image/*'
                },
                validation: {
                    valid: false,
                    required: false
                },
                value: '',
                //file: null,
                touched: false
            },
            video: {
                elementType: 'input',
                groupConfig: {
                    group: 'file',
                    label: 'Video:',
                },
                controlConfig: {
                    type: 'file',
                    accept: 'video/*'
                },
                validation: {
                    valid: false,
                    required: false
                },
                value: '',
                //file: null,
                touched: false
            }
        },
    }

    componentDidMount() {
        //this.props.fetchCategoreis();
    }

    componentDidUpdate(){
        console.log('upd vid form updated');
    }

    inputChangedHandler = (event) => {
        this.setState({ controls: getUpdatedControls(event, this.state) });
        this.setState({ isFormValid: checkFormValidity(this.state) });
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
        
        const modalTitle = "Video upload";

        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const formInputs = getFormInputsArray(formElementsArray,
             this.inputChangedHandler);
        const formContent = getFormControlGroups(getFormInputsArray(formElementsArray,
            this.inputChangedHandler));

        const form = (
            <Form id="videoUploadForm">
                {formContent}
            </Form>
        );

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
                title={modalTitle}
                body={form}
                footer={buttons}/>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
) ( UploadVideoForm );