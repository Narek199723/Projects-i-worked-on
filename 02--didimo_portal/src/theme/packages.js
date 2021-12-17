const trialRGB = [219, 221, 223];
const indieRGB = [241, 237, 217];
const indieplusRGB = [224, 219, 194];
const proRGB = [198, 193, 168];
const enterpriseRGB = [187, 176, 199];
const progressBarBackgroundColor = [42, 6, 81];

export default {
  trial: {
    mainColor: `rgb(${trialRGB.join(',')})`,
    mainOpaqueColor: (opacity) => `rgba(${trialRGB.join(',')}, ${opacity})`,
  },
  basic: {
    mainColor: `rgb(${indieRGB.join(',')})`,
    mainOpaqueColor: (opacity) => `rgba(${indieRGB.join(',')}, ${opacity})`,
  },
  advanced: {
    mainColor: `rgb(${indieplusRGB.join(',')})`,
    mainOpaqueColor: (opacity) => `rgba(${indieplusRGB.join(',')}, ${opacity})`,
  },
  pro: {
    mainColor: `rgb(${proRGB.join(',')})`,
    mainOpaqueColor: (opacity) => `rgba(${proRGB.join(',')}, ${opacity})`,
  },
  enterprise: {
    mainColor: `rgb(${enterpriseRGB.join(',')})`,
    mainOpaqueColor: (opacity) =>
      `rgba(${enterpriseRGB.join(',')}, ${opacity})`,
  },
  defaultProgress: {
    colorPrimary: {
      backgroundColor: `rgba(${progressBarBackgroundColor.join(',')}, 0.3)`, //colors.green[200],
    },
    barColorPrimary: {
      backgroundColor: `rgb(${progressBarBackgroundColor.join(',')})`, //colors.green[600],
    },
  },
  warningProgress: {
    colorPrimary: {
      backgroundColor: `rgba(${progressBarBackgroundColor.join(',')}, 0.3)`, //colors.yellow[200],
    },
    barColorPrimary: {
      backgroundColor: `rgb(${progressBarBackgroundColor.join(',')})`, //colors.yellow[600],
    },
  },
  criticalProgress: {
    colorPrimary: {
      backgroundColor: `rgba(${progressBarBackgroundColor.join(',')}, 0.3)`, //colors.red[200],
    },
    barColorPrimary: {
      backgroundColor: `rgb(${progressBarBackgroundColor.join(',')})`, //colors.red[600],
    },
  },
};
