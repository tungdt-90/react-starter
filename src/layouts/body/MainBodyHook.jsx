import React, {useState} from "react";
import {
    Switch,
    Route,
    Redirect,
    useHistory
} from "react-router-dom";
import LoginPage from "../../components/login/LoginPage";
import ListPage from "../../components/list/ListPage";

export default function MainBodyHook() {
    const [submitted, setSubmitted] = useState(false);

    const history = useHistory();

    function checkSubmitted(isSubmitted) {
        setSubmitted(isSubmitted);
        history.replace('/list');
    }

    function PrivateRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    submitted ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        );
    }

    return (
        <>
            <Switch>
                <Route path="/login">
                    <LoginPage onSubmit={isSubmitted => checkSubmitted(isSubmitted)}/>
                </Route>
                <PrivateRoute path="/list">
                    <ListPage/>
                </PrivateRoute>
                <Route path="/">
                    <LoginPage onSubmit={isSubmitted => checkSubmitted(isSubmitted)}/>
                </Route>
            </Switch>
        </>
    )
}