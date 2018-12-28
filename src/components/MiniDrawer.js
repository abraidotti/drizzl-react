import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { fade } from '@material-ui/core/styles/colorManipulator'

import { Album, ChemicalWeapon, CursorPointer, FormatColorFill, Palette } from 'mdi-material-ui'
import * as baseParticleParams from '../utilities/baseParticleParams'

import ParticlesContainer from './ParticlesContainer'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarTitle: {
    fontFamily: "'Lily Script One', cursive"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  progress: {
    position: 'absolute',
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  },
})

class MiniDrawer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      lineLinksActive: false,
      particleBackgroundColor: "#282C34",
      particleData: baseParticleParams
    }
  }

  componentDidMount(){
    console.log('forecast in MiniDrawer', this.props.forecast)
    console.log('params in state', this.state.particleData)
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  toggleClickMode = () => {
    let currentMode = this.state.particleData.interactivity.events.onclick.mode
    let modes = Object.keys(this.state.particleData.interactivity.modes)
    let nextMode = modes[( modes.indexOf(currentMode) + 1) % modes.length]

    if (nextMode === "bubble") nextMode = modes[( modes.indexOf(currentMode) + 2) % modes.length]

    const newState = this.state.particleData
    newState.interactivity.events.onclick.mode = nextMode
    this.setState({ particleData: newState })
  }

  toggleHoverMode = () => {
    let currentMode = this.state.particleData.interactivity.events.onhover.mode
    let modes = Object.keys(this.state.particleData.interactivity.modes)
    let nextMode = modes[( modes.indexOf(currentMode) + 1) % modes.length]

    const newState = this.state.particleData
    newState.interactivity.events.onhover.mode = nextMode
    this.setState({ particleData: newState })
  }

  toggleLineLinks = () => {
    const newState = this.state.particleData

    if (!this.state.lineLinksActive) {
        newState.particles.line_linked.enable = true
        newState.particles.line_linked.distance = this.props.forecast.nearestStormDistance
        this.setState({
          particleData: newState,
          lineLinksActive: true
        })
    } else {
        newState.particles.line_linked.enable = false
        this.setState({
          particleData: newState,
          lineLinksActive: false
        })
    }
  }

  changeParticleColor = () => {
    const newState = this.state.particleData

    newState.particles.color.value = {r:182, g:25, b:36}

    this.setState({ particleData: newState })
  }

  changeParticleSize = () => {
    console.log('change particle size')
  }

  changeBackgroundColor = () => {
    const hslString =
    `hsla(
      ${this.props.forecast.windBearing},
      ${this.props.forecast.windGust}%,
      ${this.props.forecast.windSpeed}%,
      0.3)`

    this.setState({ particleBackgroundColor: hslString })
  }


  render() {
    const { classes, theme } = this.props

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" color="inherit" noWrap className={classNames(classes.appBarTitle)}>
              drizzl.
            </Typography>
            <Hidden only="xs">
              <Typography variant="h6" color="textSecondary">{this.props.address}</Typography>
            </Hidden>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />

          <List>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
              <ListItem >
                <ListItemIcon><CursorPointer /></ListItemIcon>
                <ListItemText primary="Results for:"
                  secondary={this.props.address} />
              </ListItem>
            </Hidden>
            <ListItem button onClick={this.toggleLineLinks}>
              <ListItemIcon><ChemicalWeapon /></ListItemIcon>
              <ListItemText primary="Line Links" secondary={`closest storm: ${this.props.forecast.nearestStormDistance} miles`} />
            </ListItem>
            <ListItem button onClick={this.changeParticleSize}>
              <ListItemIcon><Album /></ListItemIcon>
              <ListItemText primary="Particle Size" secondary="particle size" />
            </ListItem>
            <ListItem button onClick={this.changeParticleColor}>
              <ListItemIcon><Palette /></ListItemIcon>
              <ListItemText primary="Particle Color" secondary="particle color" />
            </ListItem>
            <ListItem button onClick={this.changeBackgroundColor}>
              <ListItemIcon><FormatColorFill /></ListItemIcon>
              <ListItemText primary="Background Color" secondary="based on wind speeds" />
            </ListItem>

          </List>
          <Divider />
          <List>
            <ListItem button onClick={this.toggleClickMode}>
              <ListItemIcon><CursorPointer /></ListItemIcon>
              <ListItemText primary="When you click"
                secondary={this.state.particleData.interactivity.events.onclick.mode} />
            </ListItem>
            <ListItem button onClick={this.toggleHoverMode}>
              <ListItemIcon><CursorPointer /></ListItemIcon>
              <ListItemText primary="When you hover"
                secondary={this.state.particleData.interactivity.events.onhover.mode} />
            </ListItem>

          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

            <ParticlesContainer
              backgroundColor={this.state.particleBackgroundColor}
              params={this.state.particleData} />

        </main>
      </div>
    )
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MiniDrawer)
