var React = require('react')
var ReactNative = require('react-native');
var moment = require('moment');
var koLocale = require('moment/locale/ko');
var TimerMixin = require('react-timer-mixin');
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

// var { PropTypes } = React;
var { Text } = ReactNative;

var TimeAgo = createReactClass({
  mixins: [TimerMixin],
  propTypes: {
    time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.instanceOf(Date)
    ]).isRequired,
    interval: PropTypes.number,
    hideAgo: PropTypes.bool
  },

  getDefaultProps() {
    return {
      hideAgo: false,
      interval: 60000
    }
  },

  componentDidMount() {
    var {interval} = this.props;
    this.setInterval(this.update, interval);
  },

  componentWillUnmount() {
    this.clearInterval(this.update);
  },

  // We're using this method because of a weird bug
  // where autobinding doesn't seem to work w/ straight this.forceUpdate
  update() {
    this.forceUpdate();
  },

  render() {
    var before = moment(this.props.time);
    var now = moment();

    moment.updateLocale('ko', koLocale);

    if( now.diff(before)/(24*60*60*1000) > 1 ) {
    <Text {...this.props}>{moment(this.props.time).format('YYYY.MM.DD')}</Text>
    } else {
      return (
        <Text {...this.props}>{moment(this.props.time).fromNow(this.props.hideAgo)}</Text>
    );
    }
  }
});

module.exports = TimeAgo;
