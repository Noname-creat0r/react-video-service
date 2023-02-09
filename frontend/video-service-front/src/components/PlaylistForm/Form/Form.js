import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from '../../UI/Modal/Modal';

import { getFormInputsArray, getFormControlGroups } 
    from '../../../shared/formUtil';

const FormContent = (props) => {

    const title = ('Upload playlist');

    const formElementsArray = [];
    for (let key in props.state.controls){
        formElementsArray.push({
            id: key,
            config: props.state.controls[key]
        });
    }

    const formContent = getFormControlGroups(
        getFormInputsArray(formElementsArray,
            props.inputChangedHandler)
    );

    const form = (
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
                onClick={props.close}>
                    Close
            </Button>
            <Button 
                className="mx-2 my-2"
                size='md'
                variant="success"
                disabled={!props.state.isFormValid}
                type="submit"
                onClick={props.upload}
                form="playlistUploadForm">
                Upload
            </Button>
        </Container>
    )

    return (
        <Modal 
            show={props.showPlaylistForm}
            hide={props.close}
            title={title}
            body={form}
            footer={buttons} />)
    
};

export default FormContent;