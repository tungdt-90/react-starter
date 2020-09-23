import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import MockApi from "../../core/mock-api/mock-api";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function ListPage() {
    const mockApi = new MockApi();
    const [items, setItems] = useState([]);

    useEffect(() => {

        function getList() {
            mockApi.getList().then(
                response => {
                    setItems(response.data);
                }
            ).catch(err => alert(err));
        }

        getList();
        // eslint-disable-next-line
    }, []);

    return(
        <div className="App-container">
            {items.length === 0 && <CircularProgress size={60}/>}
            {
                (items.length > 0) &&
                <Card>
                    <CardHeader title='List'/>
                    <CardContent>
                        <List>
                            {
                                items.map(item =>
                                    <ListItem key={item.id.toString()}>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={item.email}
                                        />
                                    </ListItem>
                                )
                            }
                        </List>
                    </CardContent>
                </Card>
            }
        </div>
    )
}