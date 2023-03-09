import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import * as actions from "../../store/actions/index";
import * as validators from "../../validators/validators";
import * as modalModes from "../../shared/authModalModes";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "../../components/UI/Modal/Modal";

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (userData, mode) => dispatch(actions.auth(userData, mode)),
  };
};

class Auth extends Component {
  state = {
    avatar: null,
    avatarlURL: null,
    formMode: modalModes.SIGNIN,
  };

  authFormSwitcher = () => {
    this.setState(prevState => {
      return {
        formMode:
          prevState.formMode === modalModes.SIGNIN
            ? modalModes.SIGNUP
            : modalModes.SIGNIN,
      };
    });
  };

  render() {
    console.log(this.props.user);
    let initialValues = {
      email: "",
      password: "",
      name: "",
      avatar: null,
    };
    if (this.props.user) {
      initialValues = {
        email: this.props.email,
        password: this.props.user.password,
        name: this.props.user.name,
        avatar: null,
      };
    }

    const content = (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          email: Yup
            .string()
            .email()
            .required("email required"),
          password: Yup
            .string()
            .min(5, "short password")
            .max(40, "too long password"),
          name: Yup
            .string()
            .min(5, "short nickname")
            .max(15, "too long nickname"),
        })}
        onSubmit={values => {
          //alert(JSON.stringify(values));
          const userData = {
            email: values.email,
            password: values.password,
            imageType: "avatar",
            name: values.name,
            avatar: this.state.avatar,
          }; 
          this.props.authenticate(userData, this.state.formMode);
        }}>
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <Form
            id="authForm"
            onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="type your email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />

              {errors.email && touched.email && (
                <Form.Control.Feedback
                  className="d-block text-danger mx-2"
                  type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="strong password here"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />

              {errors.password && touched.password && (
                <Form.Control.Feedback
                  className="d-block text-danger mx-2"
                  type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {this.state.formMode === modalModes.SIGNUP && (
              <div>
                <Form.Group className="my-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="your username"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />

                  {errors.name && touched.name && (
                    <Form.Control.Feedback
                      className="d-block text-danger mx-2"
                      type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    name="avatar"
                    placeholder="coolImage.png"
                    value={values.avatar}
                    type="file"
                    onChange={event => {
                      let reader = new FileReader();
                      let file = event.target.files[0];
                      reader.onload = () => {
                        this.setState({
                          avatarURL: reader.result,
                          avatar: event.target.files[0],
                        });
                      };
                      handleChange(event);
                      if (validators.fileImgValidator(event)) {
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {touched.avatar && !this.state.avatar && (
                    <Form.Control.Feedback
                      className="d-block text-danger mx-2"
                      type="invalid">
                      invalid file type for avatar
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {this.state.avatar && (
                  <Form.Group className="my-2">
                    <Form.Label className="d-block my-1 mx-1">Preview:</Form.Label>
                    <Image
                      className="my-2 mx-2"
                      src={
                        this.state.avatarURL ||
                        process.env.REACT_APP_BASE_SERVER_URL +
                          "/image/avatar?id=" +
                          this.props.user.avatar
                      }
                      width="256"
                      height="240"
                      rounded
                    />
                  </Form.Group>
                )}
              </div>
            )}
          </Form>
        )}
      </Formik>
    );

    const buttons = (
      <Container className="text-center">
        <Button
          className="mx-2 my-2 btn-md"
          variant="secondary"
          onClick={() => {
            this.props.hide();
            this.setState({
              avatar: null,
              avatarURL: null,
            });
          }}>
          Close
        </Button>
        <Button
          className="mx-2 my-2 btn-md"
          variant="success"
          type="submit"
          form="authForm">
          {this.state.formMode}
        </Button>
        {this.state.formMode !== modalModes.EDIT && (
          <Button
            className="btn-sm mx-2 btn-success"
            onClick={() => {
              this.authFormSwitcher();
            }}>
            Switch to{" "}
            {this.state.formMode === modalModes.SIGNIN
              ? modalModes.SIGNUP
              : modalModes.SIGNIN}
          </Button>
        )}
      </Container>
    );

    return (
      <Modal
        show={this.props.show}
        hide={this.props.hide}
        title={this.state.formMode}
        body={content}
        footer={buttons}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
