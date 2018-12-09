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
    width: 200
  }
});

class ForecastGetter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      lat: 0,
      lng: 0,
      locationString: '',
      coords: {},
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChange(event) {
    this.setState({locationString: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.locationString === `${this.state.lat},${this.state.lng}`) {
      console.log('retrieved location submitted')
    } else {
      console.log('A name was submitted: ' + this.state.locationString);
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(state => ({
          coords: position.coords,
          lat: position.coords.latitude.toFixed(4),
          lng: position.coords.longitude.toFixed(4),
          locationString: `${position.coords.latitude.toFixed(4)},${position.coords.longitude.toFixed(4)}`
        }))
      })
    }
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
          <Typography component="p">Let's start with a location:</Typography>
          <form onSubmit={this.handleSubmit}>
            <Input
              placeholder='waiting for location...'
              className={classes.input}
              inputProps={{
                "aria-label": "Description"
              }}
              value={this.state.locationString}
              onChange={this.handleChange}
            />


            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              value="Submit"
            >
              drizzl it!
            </Button>
          </form>
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
