import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/UI/Modal/Modal';
import Form from 'react-bootstrap/Form';

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

    }
    
    render() {

        const modalTitle = "Vide upload";

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
                    form="authForm"
                    onClick={this.authenticate}>
                    Upload
                </Button>
            </Container>
        );

        return (
            <Modal 
                title={modalTitle}
                body={form}
                footer={buttons}/>
        );
    }
}

export default connect(
    mapStateToProps,
) ( UploadVideoForm );