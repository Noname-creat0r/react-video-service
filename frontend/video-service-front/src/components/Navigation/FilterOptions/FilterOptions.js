import React from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Select from 'react-bootstrap/FormSelect';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';

import './FilterOptions.css';

const FilterOptions = (props) => {
    const filtersData = props.filtersData;
    const filters = [];    

    for (const category of Object.keys(filtersData)){
        const options = filtersData[category].options;
        const type = filtersData[category].type;
        filters.push(
            <Col>
                <span className=''>{category}:</span>
                <ToggleButtonGroup
                    name={category}
                    className='my-2 mx-1 d-flex flex-wrap'
                    type={type}
                    value={filtersData[category].value}
                    onChange={(title) => props.checkHandler({category: category, title: title})}>
                    {options.map((option) => 
                        <ToggleButton
                            className='FilterOption'
                            variant='outline-info'
                            id={option.title}
                            key={option.title}
                            disabled={option.disabled}
                            value={option.title}>
                            {option.title}
                        </ToggleButton>)}
                </ToggleButtonGroup>
            </Col>
        );
    }

    filters.push(
        <Col className='w-50 my-2'>
            Category:
            <Select
                defaultValue={props.currentVideoCategory}
                value={props.currentVideoCategory}
                onChange={(category) => props.categoryChangeHandler(category)}>
                {props.videoCategories.map((category) => 
                    <option value={category.title} >
                        {category.title}
                    </option> )}
            </Select>
        </Col>
    );

    filters.push(
        <Row> 
          <Button 
            className='ClearButton' 
            variant='outline-info'
            onClick={() => props.clearFiltersHandler()}> Clear filters</Button>
        </Row>  
    );

    return (
        <Offcanvas 
            show={props.show} 
            backdrop={false}
            placement="top"
            enforceFocus={false}
            className="FilterOptions my-5">
            <Offcanvas.Header>
                <Offcanvas.Title>
                    Filter Options
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='d-flex'>
                <Row>
                    {filters}
                </Row>
            </Offcanvas.Body>
            <hr />
        </Offcanvas>
    );
};

export default FilterOptions;