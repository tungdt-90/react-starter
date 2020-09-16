import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function CustomField(props) {

    function handleChange(event) {
        event.preventDefault();
        props.onChange(props.credentialKey, event.target.value);
    }

    return (
        <FormControl error={!!props.error}>
            <InputLabel htmlFor={props.id}>{props.label} *</InputLabel>
            <Input
                required
                type={props.type}
                id={props.id}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                onChange={handleChange}
            />
            { props.error && <FormHelperText>{props.error}</FormHelperText>}
        </FormControl>
    );
}
