import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { doFilter } from '../actions/FilterAction';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    paddingRight:10
  },
  grow: {
    flexGrow: 1,
  },
  title: {
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 'auto',
  },
  searchIcon: {
    width: theme.spacing.unit * 4,
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
    paddingLeft: theme.spacing.unit * 4,
    transition: theme.transitions.create('width'),
    width:75,
    '&:focus': {
      width: 235,
    },
    [theme.breakpoints.up('sm')]: {
      '&:focus': {
        width: 225,
      },
    },
  },
});
class ListHeader extends Component {

  
  handleChange = () => event => {
    this.props.doFilter(this.props.filterKey, event.target.value )
  };


    
  render() {
      const { classes, filter, filterKey} = this.props;
      
      return (
        <div className={classes.root}>
          <AppBar position="static" >
            <Toolbar variant="dense" className={classes.appBar}>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                {this.props.title}
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  
                  onChange={this.handleChange()}
                  value={filter[filterKey] ||''}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    
    }
}



ListHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
    

const mapStateToProps = state => ({
    filter: state.filter
  });
const mapDispatchToProps = dispatch => ({
  doFilter: (filterKey, filterValue) => dispatch(doFilter(filterKey, filterValue))
});


export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(ListHeader)