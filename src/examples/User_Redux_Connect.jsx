import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserIP } from '../store/actions/userActions';
import { buildLoggers } from '../utils/log';
import Card from '../components/Card';

const { log } = buildLoggers('User_Redux_Hooks Wrapper');

/**
 * Placeholder wrapper for testing
 *
 * @version 0.0.1
 * @author [Justin Gow](https://github.com/jaegow)
 */
function User_Redux_Connect({ ip }) {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getUserIP();
  });

  return (
    <Card title={`User IP: ${ip}`} content="using redux connect" />
  );
}

const mapStateToProps = ({ User: { ip } }) => ({ ip });
const mapDispatchToProps = { getUserIP };

export default connect(mapStateToProps, mapDispatchToProps)(User_Redux_Connect);
