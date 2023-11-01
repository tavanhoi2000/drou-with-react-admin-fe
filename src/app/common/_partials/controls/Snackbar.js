import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
// import { amber, green } from '@material-ui/core/colors';
import {IconButton} from '@material-ui/core';
import {Snackbar, SnackbarContent} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import makeStyles from '@material-ui/core/styles/makeStyles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
  },
  error: {
  },
  info: {
  },
  warning: {
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function SnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

SnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSnackbar({
  open,
  id,
  vertical = 'top',
  horizontal = 'right',
  content = 'Thông báo!',
  variant = 'success',
  autoHideDuration = 3000,
  options={open: false, id: null, message: 'Thông báo'}
}) {
  const classes = useStyles2();
  
  const [snackOpen, setSnackNopen] = useState(false);
  useEffect(() => {
    setSnackNopen(options.open);
  },[options, open, id])


  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setSnackNopen(false);
  }

  const getVariantClassName = (variant) => {
    if (variant === 'info') {
      return 'bg-info';
    } else if (variant === 'error') {
      return 'bg-danger';
    } else if (variant === 'success') {
      return 'bg-success';
    } else if (variant === 'warning') {
      return 'bg-warning';
    } else {
      return '';
    }
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: vertical,
          horizontal: horizontal,
        }}
        open={snackOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          className={`${getVariantClassName(variant)}`}
          onClose={handleClose}
          variant={variant}
          message={`${content}`}
        />
      </Snackbar>
    </div>
  );
}
