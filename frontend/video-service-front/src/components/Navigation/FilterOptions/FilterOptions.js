import React from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import FilterOption from './FilterOption/FilterOption';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './FilterOptions.css';

const FilterOptions = (props) => {
    const filters = [];
    for (const category of Object.keys(props.options)){
        const options = [];
        for (const optionKey of Object.keys(props.options[category])){
            const option = props.options[category][optionKey];
            options.push( <FilterOption 
                type={option.type}
                label={optionKey}
                checked={option.checked}
                category={category}
                disabled={option.disabled}
                handler={props.checkHandler}
            />);
        }
        filters.push(
            <Col>
                {category}
                {options}  
            </Col>
        );
    }

    return (
        <Offcanvas 
            show={props.show} 
            backdrop={false}
            placement="top"
            enforceFocus={false}
            className="FilterOptions my-5">
            <hr />
            <Offcanvas.Header>
                <Offcanvas.Title>
                    Filter Options
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row>
                    {filters}
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default FilterOptions;