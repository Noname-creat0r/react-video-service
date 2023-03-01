import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions/index';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from '../../../components/UI/Modal/Modal';

const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadCategory: (payload) => dispatch(actions.categoryUpload(payload)),
        editCategory: (payload) => dispatch(actions.categoryEdit(payload))
    };
};

class CategoryForm extends Component {
    render(){
        const title = this.props.category ? "Editing" : "Uploading";

        let initialValues = {
            title: '',
           
        };
        if (this.props.category) {
            initialValues = {
                title: this.props.category.title,
            }
        } 

        const content = (
            <Formik 
                initialValues={initialValues}
                validationSchema={
                    Yup.object().shape({
                        title: Yup
                            .string()
                            .min(3)
                            .max(20)
                            .required("title required"),
                    })
                }
                onSubmit={(values) => {
                    const categoryData = {
                        title: values.title,
                        token: localStorage.getItem('token')
                    };

                    if (this.props.category) 
                        this.props.editCategory({ 
                            categoryId: this.props.category.id, 
                            ...categoryData});
                    else 
                        this.props.uploadCategory(categoryData);
                }}>
                {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                }) => (
                    <Form id="categoryForm" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name="title"
                                type="text"
                                placeholder="type in title"
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
                    </Form>
                )}
            </Formik>
        );

        const buttons = (
            <Container className="text-center"> 
                <Button 
                    className="mx-2 my-2 btn-md"
                    variant="secondary"
                    onClick={ () => { this.props.hide(); }}>
                    Close
                </Button>
                <Button 
                    className="mx-2 my-2 btn-md"
                    variant="success"
                    type="submit"
                    form="categoryForm">
                   {this.props.category ? "Edit" : "Upload"}
                </Button>
            </Container>
        );

        return (
            <Modal 
                show={this.props.show}
                hide={this.props.hide} 
                title={title}
                body={content}
                footer={buttons}/>
        );
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( CategoryForm );