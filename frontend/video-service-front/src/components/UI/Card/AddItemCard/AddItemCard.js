import React from 'react';

import Card from 'react-bootstrap/Card';

import UploadIcon from '../../../../assets/images/plus-sign.svg';

import './AddItemCard.css';

const AddItemCard = (props) => {
    return (
        <Card 
            className='AddItemCard'
            onClick={props.clicked}>
            <Card.Img 
                className='my-2'
                src={UploadIcon} 
                alt='AddItemCardImg'
                style={{ width: '35%' }} />
            <Card.ImgOverlay>
            </Card.ImgOverlay>
        </Card>
    );
}

export default AddItemCard;