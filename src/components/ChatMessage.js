import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import  classNames from 'classnames';

import { simpleAction } from '../actions/SimpleAction';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
/*
{ 
    creator:"Hans Müller",
    message: "Testmessage",
    timestamp: new Date().toString()
}
*/
const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    marginBottom: 10
  },
  rootOwnMessage: {
    justifyContent:"flex-end"
  },
  message: {
    maxWidth:"80%",
    minWidth:"40%",
    padding:"10px"
  },
  ownMessage: {
    backgroundColor: "#e6e6ff",
    justifySelf:"flex-end"
  },
  receivedMessage: {
    backgroundColor: "#ffe6e6",

  }
});
class ChatMessage extends Component {


    render() {

      const { classes, theme, messageObject} = this.props;
      const isSendByUser = messageObject.creator === undefined;

      var rootClassesObj = {};
      rootClassesObj[classes.root] = true;
      rootClassesObj[classes.rootOwnMessage] = isSendByUser;
      const rootClasses = classNames(rootClassesObj);

      var cardClassesObj = {};
      cardClassesObj[classes.message] = true;
      cardClassesObj[classes.ownMessage] = isSendByUser;
      cardClassesObj[classes.receivedMessage] = !isSendByUser;
      const cardClasses = classNames(cardClassesObj);

      return (
            <div className={rootClasses}>

            
              <Card className={cardClasses}>
                  {
                    !isSendByUser ? 
                    ( 
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      {messageObject.creator}
                    </Typography>
                    ) : undefined
                  }
                  <Typography component="p">
                    {messageObject.message}
                  </Typography>
              </Card>

            </div>
        );
    
    }
}



ChatMessage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
    

const mapStateToProps = state => ({
    ...state
  });
  const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
  });
  
  
  export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
  )(ChatMessage)