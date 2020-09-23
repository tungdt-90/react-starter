import React from "react";
import './main-body.scss';
import LoginForm from "../../components/login/LoginForm";
import MockApi from "../../core/mock-api/mock-api";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class MainBody extends React.Component {
    account = new MockApi();
    field = {
        userName: '',
        password: ''
    }
    errors = {
        userName: '',
        password: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            field: this.field,
            errors: this.errors,
            submitted: false,
            submitting: false
        }
    }

    validateForm = () => {

        if (this.state.field.userName === '') {
            this.errors.userName = "Username is required";
        } else if (!this.regexEmail(this.state.field.userName)) {
            this.errors.userName = "Please enter valid email address";
        } else {
            this.errors.userName = '';
        }

        if (this.state.field.password === '') {
            this.errors.password = "Password is required";
        } else {
            this.errors.password = '';
        }

        return !(this.errors.userName !== '' || this.errors.password !== '');
    }

    regexEmail(value) {
        return /\S+@\S+\.\S+/.test(value);
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.validateForm()) {
            this.setState((prevState) => ({
                ...prevState,
                submitting: true
            }));
            this.account.login(this.state.field.userName, this.state.field.password)
            .then(() => {
                this.setState(prevState => (
                    {
                        ...prevState,
                        field: this.field,
                        errors: this.errors,
                        submitted: true
                    }
                ));
            })
            .catch(() => {
            });
        } else {
            this.setState((prevState) => ({
                ...prevState,
                errors: this.errors,
                submitting: false
            }));
        }
    }

    handleChange = (params) => {
        this.field[params.credentialKey] = params.value;
    }

    render() {
        let render;
        if (!this.state.submitted) {
            render =
                <div className="App-container">
                    <LoginForm
                        credential={this.state.field}
                        errors={this.state.errors}
                        loading={this.state.submitting}
                        onSubmit={this.onSubmit}
                        onChange={value => this.handleChange(value)}
                    />
                </div>
        } else {
            render =
                <div className="App-container">
                    <Card>
                        <CardHeader title='Credential'/>
                        <CardContent>
                            <Typography variant="body2" component="p">
                                Username: {this.state.field.userName}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Password: {this.state.field.password}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
        }

        return render;
    }
}