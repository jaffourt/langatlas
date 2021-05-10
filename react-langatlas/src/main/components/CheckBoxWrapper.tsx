import React, {PropsWithChildren} from "react";
import {CheckboxGroup} from "@createnl/grouped-checkboxes";

const CheckBoxWrapper = (props: PropsWithChildren<any>) => {
    const {products} = props;

    const handleChange = (checkboxes: any) => {
        // (1/8/2021)
        // on leaving page, checkboxes == [] and onChange event fires...
        if (checkboxes.length !== 0) {
            products.forEach((value: any, index: number) => {
                value.checked = checkboxes[index].checked;
            })
        }
    }
    return (
        <CheckboxGroup onChange={handleChange}>
            {props.children}
        </CheckboxGroup>
    );
};

export default CheckBoxWrapper;
