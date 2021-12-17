// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}
const ROOTS_AUTH = "/login";
const ROOTS_WELCOME = "/welcome";

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
};

export const WELCOME_PAGE = {
  root: ROOTS_WELCOME,
};
