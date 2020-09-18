import React, {useState} from "react";
import MockApi from "../../core/mock-api/mock-api";
import LoginForm from "../../components/login/Login";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function MainBodyHook() {
    const account = new MockApi();
    const field = {
        userName: '',
        password: ''
    }
    const errors = {
        userName: '',
        password: ''
    }

    const [fieldState, setFieldState] = useState({...field});
    const [errorsState, setErrorsState] = useState({...errors});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const renderForm =
        <div className="App-container">
            <LoginForm
                credential={fieldState}
                errors={errorsState}
                loading={submitting}
                onSubmit={onSubmit}
                onChange={value => handleChange(value)}
            />
        </div>

    const renderResult =
        <div className="App-container">
            <Card>
                <CardHeader title='Credential'/>
                <CardContent>
                    <Typography variant="body2" component="p">
                        Username: {fieldState.userName}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Password: {fieldState.password}
                    </Typography>
                </CardContent>
            </Card>
        </div>

    function validateForm() {
        if (field.userName === '') {
            errors.userName = "Username is required";
        } else if (!regexEmail(fieldState.userName)) {
            errors.userName = "Please enter valid email address";
        } else {
            errors.userName = '';
        }

        if (field.password === '') {
            errors.password = "Password is required";
        } else {
            errors.password = '';
        }

        return !(errors.userName !== '' || errors.password !== '');
    }

    function regexEmail(value) {
        return /\S+@\S+\.\S+/.test(value);
    }

    function onSubmit(event) {
        event.preventDefault();

        if (validateForm()) {
            setSubmitting(true);

            account.login(fieldState.userName, fieldState.password)
                .then(() => {
                    setFieldState({...field});
                    setErrorsState({...errors});
                    setSubmitted(true);
                })
                .catch(() => {
                    setSubmitting(false);
                });
        } else {
            setErrorsState({...errors});
            setSubmitting(false);
        }
    }

    function handleChange(params) {
        field[params.credentialKey] = params.value;
        console.log(field);
    }

    return (
            submitted ? renderResult : renderForm
    )
}