import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

const Loading = ({ disableShrink, left }) => (
  <CircularProgress
    disableShrink={disableShrink} // disable under heavy loads to avoid animation problems
    style={{
      position: 'fixed',
      top: '50%',
      bottom: '50%',
      left: left,
      right: '50%',
      zIndex: 100,
    }}
  />
);

Loading.propTypes = {
  disableShrink: PropTypes.bool,
  left: PropTypes.string,
  right: PropTypes.string,
  top: PropTypes.string,
  bottom: PropTypes.string
};

Loading.defaultProps = {
  disableShrink: false,
  left: '50%',
  right: '50%',
  top: '50%',
  bottom: '50%'
};

export default Loading;