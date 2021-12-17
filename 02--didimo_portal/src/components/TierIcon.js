import React from 'react';

const TierIcon = ({ tierCode, classData, className, styles, size }) => {
  const imageSize = size || 'small';
  return (
    <img
      alt="Tier logo"
      src={`/v2/tiers/${
        tierCode && tierCode.toLowerCase().replace(/[)( ]+/g, '')
      }_logo_${imageSize}.png`}
      className={className}
      styles={styles}
    />
  );
};

export default TierIcon;
