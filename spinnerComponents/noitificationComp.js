import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";


import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      return <DoneAllRoundedIcon />;
    case "info":
      return <InfoRoundedIcon />;
    case "error":
      return <GppMaybeRoundedIcon />;
    case "warning":
      return <WarningAmberRoundedIcon />;
    default:
      return <AddTaskRoundedIcon />;
  }
};

const ToastMessage = ({ type, message }) =>
  toast[type](
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
    </div>
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
