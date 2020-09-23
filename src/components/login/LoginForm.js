import React from "react";
import CustomField from "../custom-field/CustomField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function LoginForm(props) {
    const classes = useStyles();
    let loading = props.loading;
    const formFields = Object.keys(props.credential).map(key => {
        return (
            <CustomField key={key}
                         label={setStaticTextValue(key).label}
                         type={setStaticTextValue(key).type}
                         id={key}
                         error={getError(key)}
                         placeholder={setStaticTextValue(key).placeholder}
                         defaultValue={props.credential[key]}
                         credentialKey={key}
                         onChange={props.onChange}
            />
        )
    });

    function getError(key) {
        return props.errors[key];
    }

    function setStaticTextValue(key) {
        let label;
        let type;
        let placeholder;
        switch (key) {
            case 'userName': {
                label = 'Email';
                type = 'text';
                placeholder = 'Enter email';
                break;
            }

            case 'password': {
                label = 'Password';
                type = 'password';
                placeholder = 'Enter password';
                break;
            }

            default: {
                label = 'Label';
                type = 'text';
                placeholder = '';
                break;
            }
        }

        return {label, type, placeholder};
    }

    return (
        <form onSubmit={props.onSubmit} className={classes.root} noValidate autoComplete="off">
            {formFields}
            <div>
                <Button
                    type="submit"
                    variant="contained"
                    color="default"
                    disabled={loading}
                >
                    Submit {loading && <CircularProgress size={20}/>}
                </Button>
            </div>
        </form>
    );
}


