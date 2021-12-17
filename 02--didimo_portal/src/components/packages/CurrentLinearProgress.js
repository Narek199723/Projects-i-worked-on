import React from 'react';
import { LinearProgress } from '@material-ui/core';
import '../dashboard/ActivePackages/ActivePackages.css';
import { withStyles } from '@material-ui/styles';

const CurrentLinearProgress = (props) => {
  const { activePackage, ...restProps } = props;
  const progress = props.value;
  const progressBar = progress >= 50 ? 'rgb(0, 128, 0)' : progress >= 25 ? 'rgb(255, 255, 0)' : 'rgb(255, 0, 0)';

  const BorderLinearProgress = withStyles((theme) => ({
    bar: {
      borderRadius: 8,
      backgroundColor: progressBar,
    }
  }))(LinearProgress);

  return (
    <div className="CurrentLinerProgress">
      <BorderLinearProgress variant="determinate" value={restProps.value} />
    </div>
  );
};

export default CurrentLinearProgress;
