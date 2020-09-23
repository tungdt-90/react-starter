import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function CustomField(props) {

    function checkError(error) {
        return error !== '';
    }

    return (
        <FormControl error={checkError(props.error)}>
            <InputLabel htmlFor={props.id}>{props.label} *</InputLabel>
            <Input
                required
                type={props.type}
                id={props.id}
                name={props.credentialKey}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
            { checkError(props.error) && <FormHelperText>{props.error}</FormHelperText>}
        </FormControl>
    );
}
