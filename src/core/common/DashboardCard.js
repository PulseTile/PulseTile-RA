import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

/**
 * This component returns synopsis list
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {array}  items
 * @param {string} list
 * @param {shape} history
 */
const ItemsList = ({ items, list, history }) => {
    return (
        <List>
            {items.slice(0, 5).map((item, key) => {
                const showRoute = "/" + list + "/" + item.sourceId + "/show";
                return (
                    <ListItem button divider onClick={() => history.push(showRoute)}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                );
            })}
        </List>
    )
}

/**
 * This component returns list of empty rows if information is loading
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const NoItems = () => {
    return (
        <List>
            <ListItem button divider>
                <ListItemText primary="Loading..." />
                <ListItemText primary="" />
                <ListItemText primary="" />
                <ListItemText primary="" />
            </ListItem>
        </List>
    );
}

/**
 * This component returns one single Dashboard Card
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param props
 */
export default props => {
    const { classes, title, items, icon, list, history } = props;
    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                alt={title}
                className={classes.media}
                height="180"
                image={icon}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                { items ? <ItemsList items={items} list={list} history={history} /> : <NoItems /> }
            </CardContent>
        </Card>
    );
}
