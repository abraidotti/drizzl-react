import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Input from '@material-ui/core/Input';

import MiniParticlesContainer from './MiniParticlesContainer'

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: '50px auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  input: {
    margin: theme.spacing.unit,
  },
});




class ForecastGetter extends React.Component {
  state = {
    expanded: false,
    locationString: 'cheese'
  };

  componentDidMount(){
    if (navigator.geolocation) {
      this.setState({locationString: navigator.geolocation.getCurrentPosition()})
    } else {
      this.setState({locationString: 'cannot get location'})
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

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
          <Typography component="p">
            Let's start with a location:
          </Typography>
          <Input
        defaultValue={this.state.locationString}
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
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
              [classes.expandOpen]: this.state.expanded,
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
            <Typography paragraph>
              Made with material ui
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

ForecastGetter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForecastGetter);
