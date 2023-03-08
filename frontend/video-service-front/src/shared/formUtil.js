import { getGroupsBy, updateObject } from "./utility";

import Input from "../components/UI/Input/Input";
import Group from "react-bootstrap/FormGroup";

export const getUpdatedControls = (event, state) => {
    const controlName = event.target.name;
    const value = event.target.value;
    const file = event.target.type === "file" ? event.target.files[0] : "";
    const updatedControls = updateObject(state.controls, {
        [controlName]: updateObject(state.controls[controlName], {
            value: file || value,
            touched: true,
        }),
    });

    return updatedControls;
};

export const checkFormValidity = (state) => {
    const controls = [];

    for (let key of Object.keys(state.controls)) {
        if (
            Array.isArray(state.controls[key].groupConfig.form) ||
            state.controls[key].groupConfig.form === state.currentAuthForm
        )
            controls.push({
                id: key,
                config: state.controls[key],
            });
    }

    return controls
        .filter((control) => control.config.validation.required)
        .every((control) => control.config.validation.valid);
};

export const getFormInputsArray = (formElementsArray, changeHandler) => {
    return formElementsArray.map((element) => (
        <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.controlConfig}
            group={element.config.groupConfig.group}
            label={element.config.groupConfig.label}
            value={element.config.value}
            options={element.config.controlConfig.options}
            name={element.id}
            isValid={element.config.validation.valid}
            changeHandler={changeHandler}
        />
    ));
};

export const getFormControlGroups = (formInputs) => {
    let formContent = [];
    const groups = getGroupsBy(formInputs, "group");

    for (const groupKey of Object.keys(groups)) {
        let group = groups[groupKey];
        formContent.push(<Group key={group}>{group}</Group>);
    }

    return formContent;
};
