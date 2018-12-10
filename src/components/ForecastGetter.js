import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Input from "@material-ui/core/Input";

import MiniParticlesContainer from "./MiniParticlesContainer";

import Geocode from "react-geocode";
Geocode.setApiKey(`${process.env.REACT_APP_GMAPS_API_KEY}`)

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
  }
});

class ForecastGetter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      location: {},
      latitude: 0,
      longitude: 0,
      locationString: '',
      coords: {},
      value: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  handleChange = (event) => {
    this.setState({ locationString: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.coords) {
      Geocode.fromLatLng(`${this.state.coords.latitude}`,`${this.state.coords.longitude}`)
      .then(
        response => {
          this.setState({
            locationString: response.results[0].formatted_address,
            coords: response.results[0].geometry.location
          })
          console.log(response.results[0]);
        },
        error => {
          console.error(error);
        }
      );
      fetch(
        `https://sandro-cors.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_API_KEY}/${this.state.latitude},${this.state.longitude}`, {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        })
        .then(response => response.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error))
    } else {
      console.log('need valid location')


    }
  }



  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('got position')
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: 'got location',
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000},
        );
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              D
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="drizzl"
          subheader="a forecast art app"
        />

        <MiniParticlesContainer />

        <CardContent>


            <Input
              placeholder='input a location...'
              className={classes.input}
              inputProps={{
                "aria-label": "Description"
              }}
              value={this.state.locationString}
              onChange={this.handleChange}
              autoFocus
              isrequired='true'
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.getLocation}
            >
              get my location
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onSubmit={this.handleSubmit}
            >
              launch!
            </Button>
            <Typography paragraph>{ this.state.error }</Typography>


        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>

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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForecastGetter);
