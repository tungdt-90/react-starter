import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from './layouts/header/Header';
import MainBody from "./layouts/body/MainBody";
import Footer from "./layouts/footer/Footer";
import {Container} from "@material-ui/core";
import MainBodyHook from "./layouts/body/MainBodyHook";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header/>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper} elevation={3}>
                            <MainBodyHook/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Footer/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
