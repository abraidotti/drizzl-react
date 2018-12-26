import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Input from "@material-ui/core/Input";

import MiniParticlesContainer from "./MiniParticlesContainer";

import CircularProgress from '@material-ui/core/CircularProgress';

import Geocode from "react-geocode";
Geocode.setApiKey(`${process.env.REACT_APP_GMAPS_API_KEY}`);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  card: {
    maxWidth: 400,
    margin: "50px auto"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  input: {
    margin: theme.spacing.unit,
    width: 340
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class ForecastGetter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      locationString: "",
      gotResponse: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChange = event => {
    this.setState({ locationString: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.locationString) {
      Geocode.fromAddress(this.state.locationString)
        .then(response => {
          this.setState({ gotResponse: true });
          fetch(
            `https://sandro-cors.herokuapp.com/https://api.darksky.net/forecast/${
              process.env.REACT_APP_DARKSKY_API_KEY
            }/${response.results[0].geometry.location.lat},${
              response.results[0].geometry.location.lng
            }?exclude=minutely,hourly,daily,alerts,flags`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              },
              mode: "cors"
            }
          )
            .then(results => results.json())
            .then(forecast => {
              this.props.sendForecast(forecast.currently)
            });
        })
        .catch(error => console.log(error));
    } else {
      this.setState({ error: "Please submit a location." });
    }
  };

  render() {
    const { classes } = this.props;

    let locationForm;

    if (!this.state.gotResponse) {
      locationForm =
      <div>
      <Input
        placeholder="input a location..."
        className={classes.input}
        inputProps={{
          "aria-label": "Description"
        }}
        value={this.state.locationString}
        onChange={this.handleChange}
        autoFocus
        isrequired="true"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.handleSubmit}
      >
        launch!
      </Button>
      </div>;
    } else {
      locationForm = <CircularProgress className={classes.progress} />;
    }

    return (
      <Card className={classes.card}>
        <CardHeader title="drizzl" subheader="a forecast visualization app" />
        <MiniParticlesContainer />

        <CardContent>

          {locationForm}

          <Typography paragraph>{this.state.error}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            label="about"
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>about:</Typography>
            <Typography paragraph>Made with material ui</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

ForecastGetter.propTypes = {
  classes: PropTypes.object.isRequired,
  sendForecast: PropTypes.func.isRequired
};

export default withStyles(styles)(ForecastGetter);
