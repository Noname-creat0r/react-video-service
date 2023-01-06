import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUpdatedControls, getFormControlGroups,
     getFormInputsArray } from '../../../shared/formUtil';
 
import Modal from '../../../components/UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {

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
                touched: false
            }
        },
    }
    
    inputChangedHandler = (event) => {
        this.setState({ controls: getUpdatedControls(event, this.state) });
        this.setState({ isFormValid: this.checkFormValidity(this.state) });
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
    mapStateToProps,
) ( UploadVideoForm );