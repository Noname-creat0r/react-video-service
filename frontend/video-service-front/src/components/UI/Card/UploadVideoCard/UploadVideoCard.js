import React from 'react';

import Card from 'react-bootstrap/Card';

import UploadIcon from '../../../../assets/images/plus-sign.svg';

import './UploadVideoCard.css';

const UploadVideoCard = (props) => {
    return (
        <Card 
            className='UploadVideoCard'
            onClick={props.clicked}>
            <Card.Img 
                className='my-2'
                src={UploadIcon} 
                alt='UploadVideoCardImg'
                style={{ width: '35%' }} />
            <Card.ImgOverlay>
            </Card.ImgOverlay>
        </Card>
    );
}

export default UploadVideoCard;