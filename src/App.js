import React from "react";
import MyAppBar from "./components/MyAppBar";
import LeftMenu from "./components/LeftMenu";
import GithubStarRating from "./components/GithubStarRating";
import "./App.css";

class App extends React.Component {
    state = {
        leftDrawerOpen: false,
        page: "nothing",
    };

    toggleLeftMenu = open => {
        this.setState({
            leftDrawerOpen: open,
        });
    };

    selectMenu = page => {
        this.toggleLeftMenu(false);
        // change content
        this.setState({ page: page });
    };

    render() {
        return (
            <div className="App">
                <MyAppBar title="gcoka Playground" onClickMenu={() => this.toggleLeftMenu(true)} />
                <LeftMenu
                    open={this.state.leftDrawerOpen}
                    handleClose={() => this.toggleLeftMenu(false)}
                    handleSelectMenu={this.selectMenu}
                />

                {/* TODO: use react-rounter */}
                <p className="App-intro">{this.state.page} is Selected!</p>
                {this.state.page === "github-star-rating" ? <GithubStarRating /> : null}
            </div>
        );
    }
}

export default App;
