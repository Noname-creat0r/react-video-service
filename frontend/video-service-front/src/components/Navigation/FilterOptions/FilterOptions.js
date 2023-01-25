import React from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import FilterOption from './FilterOption/FilterOption';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './FilterOptions.css';

const FilterOptions = (props) => {
    const filterOptions = props.options;
    const filters = filterOptions.map(filter => {
        const options = filter.options.map(option => 
            <FilterOption 
                type={option.type}
                label={option.title}
                checked={option.checked}
                category={filter.category}
                handler={props.checkHandler}
                />);
        return (
            <Col>
                <span>{filter.category}</span>
                {options}
            </Col>);
    });

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