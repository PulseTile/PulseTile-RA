import React from "react";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function Dashboard(props) {
    const { classes, title, items, icon, list, history } = props;
    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                alt="Allergies"
                className={classes.media}
                height="140"
                image={icon}
                title="Allergies"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <List>
                    {items.map((item, key) => {
                        const showRoute = "/" + list + "/" + item.id + "/show";
                        return (
                            <ListItem button divider onClick={() => history.push(showRoute)}>
                                <ListItemText primary={item.synopsis} />
                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
}

export default Dashboard;