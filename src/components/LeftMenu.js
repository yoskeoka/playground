import React from "react";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemText } from "material-ui/List";

const styles = {
    list: {
        width: 250,
        flex: "initial",
    },
};

class LeftMenu extends React.Component {
    render() {
        return (
            <Drawer open={this.props.open} onRequestClose={this.props.handleClose}>
                <List className={this.props.classes.list}>
                    <ListItem
                        button
                        onClick={() => {
                            this.props.handleSelectMenu("github-star-rating");
                        }}>
                        <ListItemText primary="Github Star Rating" secondary="Search for Javascript" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            this.props.handleSelectMenu("page2");
                        }}>
                        <ListItemText primary="Page2" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles)(LeftMenu);
