import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

const Loading = ({ disableShrink }) => (
  <CircularProgress
    disableShrink={disableShrink} // disable under heavy loads to avoid animation problems
    style={{
      position: 'fixed',
      top: '50%',
      bottom: '50%',
      left: '50%',
      right: '50%',
      zIndex: 100,
    }}
  />
);

Loading.propTypes = {
  disableShrink: PropTypes.bool,
};

Loading.defaultProps = {
  disableShrink: false,
};

export default Loading;