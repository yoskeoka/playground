import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

const styles = {
    paper: {
        marginTop: 10,
        overflowY: "auto",
    },
    tableRow: {
        display: "flex",
    },
    stars: {
        flex: "0 0 100px",
    },
    fullName: {
        flex: "0 0 200px",
    },
    description: {
        flex: "0 0 600px",
        whiteSpace: "normal",
        wordWrap: "break-word",
    },
    button: {
        textTransform: "none",
    },
};

// TODO: add custom search options
const apiUrl = "https://api.github.com/search/repositories?q=language:javascript&sort=stars&page=0&per_page=100";

class GithubStarRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            fetching: false,
        };
    }

    searcAsync() {
        return fetch(apiUrl).then(res => {
            return res.json();
        });
    }

    componentDidMount() {
        this.setState({ fetching: true });
        this.searcAsync().then(data => {
            this.setState({
                items: data.items,
                fetching: false,
            });
        });
    }

    render() {
        const classes = this.props.classes;

        if (this.state.fetching) {
            return (
                <div>
                    <p>Loading...</p>
                    <LinearProgress />
                </div>
            );
        }

        const items = this.state.items;
        return (
            <Paper className={classes.paper}>
                <Table>
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell numeric className={classes.stars}>
                                <Typography type="title" align="center">
                                    Stars
                                </Typography>
                            </TableCell>
                            <TableCell className={classes.fullName}>
                                <Typography type="title" align="center">
                                    Full Name
                                </Typography>
                            </TableCell>
                            <TableCell className={classes.description}>
                                <Typography type="title" align="center">
                                    Description
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => {
                            return (
                                <TableRow key={item.id} className={classes.tableRow}>
                                    <TableCell numeric className={classes.stars}>
                                        <Typography type="subheading">{item.stargazers_count}</Typography>
                                    </TableCell>
                                    <TableCell className={classes.fullName}>
                                        <Button href={item.html_url} className={classes.button}>
                                            {item.full_name}
                                        </Button>
                                    </TableCell>
                                    <TableCell className={classes.description}>
                                        <Typography>{item.description}</Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(GithubStarRating);
