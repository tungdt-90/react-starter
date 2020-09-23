import MockApi from "../../core/mock-api/mock-api";
import React, {useState} from "react";
import LoginForm from "./LoginForm";

export default function LoginPage(props) {
    const mockApi = new MockApi();
    const field = {
        userName: '',
        password: ''
    }
    const errors = {
        userName: '',
        password: ''
    }

    const [formState, setFormState] = useState({
        userName: '',
        password: ''
    });
    const [errorsState, setErrorsState] = useState({
        userName: '',
        password: ''
    });
    const [submitting, setSubmitting] = useState(false);


    function validateForm() {
        if (formState.userName === '') {
            errors.userName = "Username is required";
        } else if (!regexEmail(formState.userName)) {
            errors.userName = "Please enter valid email address";
        } else {
            errors.userName = '';
        }

        if (formState.password === '') {
            errors.password = "Password is required";
        } else {
            errors.password = '';
        }

        return !(errors.userName !== '' || errors.password !== '');
    }

    function regexEmail(value) {
        return /\S+@\S+\.\S+/.test(value);
    }

    function handleChange(event) {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    function onSubmit(event) {
        event.preventDefault();

        if (validateForm()) {
            setSubmitting(true);

            mockApi.login(formState.userName, formState.password)
                .then(() => {
                    setFormState({...field});
                    setErrorsState({...errors});
                    props.onSubmit(true);
                })
                .catch(() => {
                    setSubmitting(false);
                });
        } else {
            setErrorsState({...errors});
            setSubmitting(false);
        }
    }

    return(
        <div className="App-container">
            <LoginForm
                credential={formState}
                errors={errorsState}
                loading={submitting}
                onSubmit={onSubmit}
                onChange={handleChange}
            />
        </div>
    )
}