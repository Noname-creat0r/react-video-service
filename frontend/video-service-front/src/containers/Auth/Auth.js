import { useState, useRef } from "react"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { useSigninMutation, useSignupMutation } from "../../store/api/slices/authApiSlice"
import { setCredentials } from "../../store/slices/authSlice"

import * as Yup from "yup"
import * as validators from "../../validators/validators"
import * as modalModes from "../../shared/authModalModes"

import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import Modal from "../../components/UI/Modal/Modal"
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner"

export default function Auth(props) {
   const [avatar, setAvatar] = useState(null)
   const [avatarUrl, setAvatarUrl] = useState(null)
   const [formMode, setFormMode] = useState(modalModes.SIGNIN)
   const [signin, { isLoading }] = useSigninMutation()
   const [signup] = useSignupMutation()
   const dispatch = useDispatch()

   const authFormSwitcher = () => {
      setFormMode(formMode === modalModes.SIGNIN ? modalModes.SIGNUP : modalModes.SIGNIN)
   }

   let initialValues = {
      email: "",
      password: "",
      name: "",
      avatar: null,
   }

   const validationSchema = Yup.object({
      email: Yup.string().email().required("email required"),
      password: Yup.string().min(5, "short password").max(40, "too long password"),
      name: Yup.string().min(5, "short nickname").max(15, "too long nickname"),
   })

   const form = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async values => {
         //alert(JSON.stringify(values));r
         const userData = {
            email: values.email,
            password: values.password,
            imageType: "avatar",
            name: values.name,
            avatar: avatar,
         }

         if (formMode === modalModes.SIGNIN) {
            const authData = await signin(userData).unwrap()
            dispatch(
               setCredentials({
                  token: authData.token,
                  userId: authData.userId,
               })
            )
         } else {
            await signup(userData)
         }
      },
   })

   const content = (
      <Form
         id="authForm"
         onSubmit={form.handleSubmit}>
         <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
               name="email"
               type="email"
               placeholder="type your email"
               value={form.values.email}
               onChange={form.handleChange}
               isValid={form.touched.email && !form.errors.email}
               isInvalid={!!form.errors.email}
            />

            {form.errors.email && form.touched.email && (
               <Form.Control.Feedback
                  className="d-block text-danger mx-2"
                  type="invalid">
                  {form.errors.email}
               </Form.Control.Feedback>
            )}
         </Form.Group>

         <Form.Group className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
               name="password"
               type="password"
               placeholder="strong password here"
               value={form.values.password}
               onChange={form.handleChange}
               isValid={form.touched.password && !form.errors.password}
               isInvalid={!!form.errors.password}
            />

            {form.errors.password && form.touched.password && (
               <Form.Control.Feedback
                  className="d-block text-danger mx-2"
                  type="invalid">
                  {form.errors.password}
               </Form.Control.Feedback>
            )}
         </Form.Group>

         {formMode === modalModes.SIGNUP && (
            <div>
               <Form.Group className="my-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                     name="name"
                     type="text"
                     placeholder="your username"
                     value={form.values.name}
                     onChange={form.handleChange}
                     isValid={form.touched.name && !form.errors.name}
                     isInvalid={!!form.errors.name}
                  />

                  {form.errors.name && form.touched.name && (
                     <Form.Control.Feedback
                        className="d-block text-danger mx-2"
                        type="invalid">
                        {form.errors.name}
                     </Form.Control.Feedback>
                  )}
               </Form.Group>

               <Form.Group>
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                     name="avatar"
                     placeholder="coolImage.png"
                     value={form.values.avatar}
                     type="file"
                     onChange={event => {
                        let reader = new FileReader()
                        let file = event.target.files[0]
                        reader.onload = () => {
                           setAvatarUrl(reader.result)
                           setAvatar(event.target.files[0])
                        }
                        form.handleChange(event)
                        if (validators.fileImgValidator(event)) {
                           reader.readAsDataURL(file)
                        }
                     }}
                  />
                  {form.touched.avatar && !avatar && (
                     <Form.Control.Feedback
                        className="d-block text-danger mx-2"
                        type="invalid">
                        invalid file type for avatar
                     </Form.Control.Feedback>
                  )}
               </Form.Group>

               {avatar && (
                  <Form.Group className="my-2">
                     <Form.Label className="d-block my-1 mx-1">Preview:</Form.Label>
                     <Image
                        className="my-2 mx-2"
                        src={
                           avatarUrl ||
                           process.env.REACT_APP_BASE_SERVER_URL +
                              "/image/avatar?id=" +
                              props.user.avatar
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
   )

   const buttons = (
      <Container className="text-center">
         <Button
            className="mx-2 my-2 btn-md"
            variant="secondary"
            onClick={() => {
               props.hide()
               setAvatarUrl(null)
               setAvatar(null)
            }}>
            Close
         </Button>
         <Button
            className="mx-2 my-2 btn-md"
            variant="success"
            type="submit"
            form="authForm">
            {formMode}
         </Button>
         {formMode !== modalModes.EDIT && (
            <Button
               className="btn-sm mx-2 btn-success"
               onClick={() => {
                  authFormSwitcher()
               }}>
               Switch to{" "}
               {formMode === modalModes.SIGNIN ? modalModes.SIGNUP : modalModes.SIGNIN}
            </Button>
         )}
      </Container>
   )

   return (
      <Modal
         show={props.show}
         hide={props.hide}
         title={formMode}
         body={isLoading ? <LoadingSpinner /> : content}
         footer={buttons}
      />
   )
}
