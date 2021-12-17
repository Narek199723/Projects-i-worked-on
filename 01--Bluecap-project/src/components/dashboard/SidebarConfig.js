// routes
//import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  // <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
  <SvgIconStyle
    src={`/icons/navbar/${name}.svg`}
    sx={{ width: "100%", height: "100%" }}
  />
);

const ICONS = {
  user: getIcon("ic_user"),
  ecommerce: getIcon("ic_ecommerce"),
  contacts: getIcon("contacts"),
  dashboard: getIcon("dashboard"),
  meetings: getIcon("meetings"),
  analytics: getIcon("analytics"),
  teams: getIcon("teams"),
  settings: getIcon("settings"),
  help: getIcon("help"),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "",
    items: [
      { title: "Dashboard", path: "/dashboard", icon: ICONS.dashboard },
      { title: "Meetings", path: "/meetings/past", icon: ICONS.meetings },
      // { title: "Analytics", path: "/wds", icon: ICONS.analytics },
      // { title: "Teams", path: "/wds", icon: ICONS.teams },
      { title: "Contacts", path: "/contacts", icon: ICONS.contacts },
      { title: "Settings", path: "/settings", icon: ICONS.settings },
      { title: "Help", path: "/help", icon: ICONS.help },
    ],
  },
];

export default sidebarConfig;
