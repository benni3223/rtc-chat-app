import React, { Component } from 'react';
import compose from 'recompose/compose'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import  classNames from 'classnames';

import { simpleAction } from '../actions/SimpleAction';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';

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

  },
  metaData: {
    display:"flex",
    justifyContent:"space-between"
  }
});
class ChatMessage extends Component {
  state = {
    renderCycle: 0
  };
  intervalId = null;

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({renderCycle: this.state.renderCycle++})
    }, 1000*60)
  }
  
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  createMessageMarkUp() {
    return  { __html: this.props.messageObject.message.replace(/\n/gi, "<br>")};
  
  }
    render() {

      const { classes,  messageObject} = this.props;
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
                <div className={classes.metaData}>
                    <Typography color="textSecondary" gutterBottom>
                      {isSendByUser ? "You" : messageObject.creator}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {moment(messageObject.timestamp).fromNow() }
                    </Typography>
                  </div>
                  <div dangerouslySetInnerHTML={this.createMessageMarkUp()}>
                    
                  </div>
                  
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
});
const mapDispatchToProps = dispatch => ({
});
  
  
  export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
  )(ChatMessage)