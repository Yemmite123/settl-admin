import async from "../components/Async";

//React Feathers Logo
import {
  Bell as Bellicon,
  BookOpen as BookOpenIcon,
  Calendar as CalendarIcon,
  CheckSquare as CheckSquareIcon,
  Grid as GridIcon,
  Heart as HeartIcon,
  Layout as LayoutIcon,
  List as ListIcon,
  MapPin as MapPinIcon,
  Monitor as MonitorIcon,
  PieChart as PieChartIcon,
  // BarChart as ReportIcon,
  // Gift as ReferralIcon,
  // Sliders as SlidersIcon,
  Settings as AdminManagementIcon,
  Users as UsersIcon,
  // Home as HomeIcon,
} from "react-feather";

// Settl Icon Logo
import { ReactComponent as IssueLogo } from "../assets/img/icons/issue.svg";
import { ReactComponent as ReportLogo } from "../assets/img/icons/report.svg";
import { ReactComponent as ReferralLogo } from "../assets/img/icons/referral.svg";
import { ReactComponent as HomeLogo } from "../assets/img/icons/homeicon.svg";
import { ReactComponent as CardManagementLogo } from "../assets/img/icons/card.svg";
import { ReactComponent as WalletSavingsLogo } from "../assets/img/icons/walletsavings.svg";
// import { ReactComponent as VendorsLogo } from "../assets/img/icons/vendors.svg";
import { ReactComponent as VendorsVendor } from "../assets/img/icons/settlevendor.svg";

import { ReactComponent as AdminIcon } from "../assets/img/icons/AdminIcon.svg";
import { ReactComponent as customerIcon } from "../assets/img/icons/customerIcon.svg";
import { ReactComponent as messagingIcon } from "../assets/img/icons/messagingIcon.svg";
import { ReactComponent as reconciliationLogo } from "../assets/img/icons/reconciliationLogo.svg";
import { ReactComponent as AnalyticsLogo } from "../assets/img/icons/analytics.svg";

// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword1";
import NewPassword from "../pages/auth/ResetPassword";
import PasswordChanged from "../pages/auth/PasswordChanged";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Layouts
import Boxed from "../pages/layouts/Boxed";
import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";
import SidebarSticky from "../pages/layouts/SidebarSticky";
import ThemeClassic from "../pages/layouts/ThemeClassic";
import ThemeCorporate from "../pages/layouts/ThemeCorporate";
import ThemeModern from "../pages/layouts/ThemeModern";

// Misc
import Blank from "../pages/misc/Blank";

// UI Elements
import Alerts from "../pages/ui-elements/Alerts";
import Buttons from "../pages/ui-elements/Buttons";
import Cards from "../pages/ui-elements/Cards";
import Carousel from "../pages/ui-elements/Carousel";
import EmbedVideo from "../pages/ui-elements/EmbedVideo";
import General from "../pages/ui-elements/General";
import Grid from "../pages/ui-elements/Grid";
import Modals from "../pages/ui-elements/Modals";
import Tabs from "../pages/ui-elements/Tabs";
import Typography from "../pages/ui-elements/Typography";

/*##########SKT###############*/

// Admin Management
import AdminManagement from "../pages/admin-management/AdminManagement";

//Customer
import SettlCustomers from "../pages/customers/settl-customers/Index";
import SettlAgents from "../pages/customers/settl-agents/Index";
import CustomerDetails from "../pages/customers/settl-customers/CustomerDetails";
// Messaging
import Messaging from "../pages/messaging/Index";

/*##########SKT###############*/

// Messaging

// Notifications
import Notifications from "../pages/notifications/Notifications";

// Pages
import Profile from "../pages/pages/Profile";
import Settings from "../pages/pages/Settings";
import Clients from "../pages/pages/Clients";
import Projects from "../pages/pages/Projects";
import Invoice from "../pages/pages/Invoice";
import Pricing from "../pages/pages/Pricing";
import Tasks from "../pages/pages/Tasks";
import Chat from "../pages/pages/Chat";

// Documentation
import Introduction from "../pages/docs/Introduction";
import GettingStarted from "../pages/docs/GettingStarted";
import EnvironmentVariables from "../pages/docs/EnvironmentVariables";
import Deployment from "../pages/docs/Deployment";
import StateManagement from "../pages/docs/StateManagement";
import Plugins from "../pages/docs/Plugins";
import Changelog from "../pages/docs/Changelog";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
const AgentsReports = async(() => import("../pages/dashboards/Reports/Agents"));
const CustomerReports = async(() =>
  import("../pages/dashboards/Reports/Customers")
);
const IssueLogs = async(() =>
  import("../pages/dashboards/Issue Resolution/Logs")
);
const IssueAnalytics = async(() =>
  import("../pages/dashboards/Issue Resolution/Analytics")
);
const Referral = async(() => import("../pages/dashboards/Referral"));
const CardManagement = async(() =>
  import("../pages/dashboards/Card Management")
);
const WalletSavings = async(() =>
  import("../pages/dashboards/Wallet Savings /Home")
);
const Vendors = async(() => import("../pages/dashboards/Vendors"));

const SettlAnalytics = async(() => import("../pages/settl-analytics"));
const Reconciliation = async(() => import("../pages/reconciliation"));
const Customer = async(() =>
  import("../pages/dashboards/Card Management/CustomerDetails")
);
const SavingsDetails = async(() =>
  import("../pages/dashboards/Wallet Savings /CustomerDetails")
);

// const Analytics = async(() => import("../pages/dashboards/Analytics"));
// const Ecommerce = async(() => import("../pages/dashboards/Ecommerce"));
// const Crypto = async(() => import("../pages/dashboards/Crypto"));
// const Social = async(() => import("../pages/dashboards/Social"));

// Forms
const Layouts = async(() => import("../pages/forms/Layouts"));
const BasicInputs = async(() => import("../pages/forms/BasicInputs"));
const AdvancedInputs = async(() => import("../pages/forms/AdvancedInputs"));
const InputGroups = async(() => import("../pages/forms/InputGroups"));
const Editors = async(() => import("../pages/forms/Editors"));
const Validation = async(() => import("../pages/forms/Validation"));
const Wizard = async(() => import("../pages/forms/Wizard"));

// Tables
const BootstrapTables = async(() => import("../pages/tables/Bootstrap"));
const PaginationTables = async(() => import("../pages/tables/Pagination"));
const RowSelectionTables = async(() => import("../pages/tables/RowSelection"));
const ExportCsvTables = async(() => import("../pages/tables/ExportCsv"));
const ExpandableRowsTables = async(() =>
  import("../pages/tables/ExpandableRows")
);

// Charts
const Chartjs = async(() => import("../pages/charts/Chartjs"));
const ApexCharts = async(() => import("../pages/charts/ApexCharts"));

// Icons
const FontAwesome = async(() => import("../pages/icons/FontAwesome"));
const Feather = async(() => import("../pages/icons/Feather"));

// Calendar
const Calendar = async(() => import("../pages/calendar/Calendar"));

// Maps
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));

const customerRoutes = {
  path: "/customers",
  name: "Customers",
  icon: customerIcon,
  children: [
    {
      path: "/customers/settl-customers",
      name: "Settl Customers",
      component: SettlCustomers,
    },
    {
      path: "/customers/settl-agents",
      name: "Settl Agents",
      component: SettlAgents,
    },
  ],
};
const customerDetails = {
  path: "/customers/details/:id",
  name: "Customer Details",
  icon: "",
  component: CustomerDetails,
  children: null,
};
const adminManagementRoutes = {
  path: "/admin-management",
  name: "Admin Management",
  icon: AdminIcon,
  component: AdminManagement,
  children: null,
};
const messageRoutes = {
  path: "/messages",
  name: "Messaging",
  icon: messagingIcon,
  component: Messaging,
  children: null,
};

// Routes
// const landingRoutes = {
//   path: "/ffff",
//   name: "Landing Page",
//   component: Landing,
//   children: null
// };

const dashboardRoutes = {
  path: "/",
  name: "Home",
  icon: HomeLogo,
  containsHome: false,
  component: Default,
  children: null,
};

const reportsRoutes = {
  path: "/reports",
  name: "Transaction Reports",
  icon: ReportLogo,
  children: [
    {
      path: "/reports/customers",
      name: "Settl Customers",
      component: CustomerReports,
    },
    {
      path: "/reports/agents",
      name: "Agent Customer",
      component: AgentsReports,
    },
  ],
};
const issueResolutionsRoutes = {
  path: "/issue-reports",
  name: "Issue Reports",
  icon: IssueLogo,
  children: [
    {
      path: "/issue-reports/logs",
      name: "Issue Logs",
      component: IssueLogs,
    },
    {
      path: "/issue-reports/analytics",
      name: "Issue Analytics",
      component: IssueAnalytics,
    },
  ],
};
const referralRoutes = {
  path: "/referrals",
  name: "Referrals",
  icon: ReferralLogo,
  component: Referral,
  children: null,
};
const cardManagementRoutes = {
  path: "/card-management",
  name: "Card Management",
  icon: CardManagementLogo,
  component: CardManagement,
  children: null,
};
const walletSavingsRoutes = {
  path: "/wallet-savings",
  name: "Wallet Savings",
  icon: WalletSavingsLogo,
  component: WalletSavings,
  children: null,
};
const vendorsRoutes = {
  path: "/vendors",
  name: "Settl Vendors",
  icon: VendorsVendor,
  component: Vendors,
  children: null,
};

const settlAnalytics = {
  path: "/settl-analytics",
  name: "Analytics",
  icon: AnalyticsLogo,
  component: SettlAnalytics,
  children: null,
};
const reconciliationRoutes = {
  path: "/reconciliation",
  name: "Reconciliation",
  icon: reconciliationLogo,
  component: Reconciliation,
  children: null,
};
const calendarRoutes = {
  path: "/calendar",
  name: "Calendar",
  icon: CalendarIcon,
  component: Calendar,
  children: null,
};

const pageRoutes = {
  path: "/pages",
  name: "Pages",
  icon: LayoutIcon,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings,
    },
    {
      path: "/pages/clients",
      name: "Clients",
      component: Clients,
    },
    {
      path: "/pages/projects",
      name: "Projects",
      component: Projects,
    },
    {
      path: "/pages/invoice",
      name: "Invoice",
      component: Invoice,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing,
    },
    {
      path: "/pages/tasks",
      name: "Tasks",
      component: Tasks,
    },
    {
      path: "/pages/chat",
      name: "Chat",
      component: Chat,
      badgeColor: "primary",
      badgeText: "New",
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank,
    },
  ],
};

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "Special",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
       path: "/auth/set-new-password",
       name: "New password",
       component: NewPassword,
    },
    {
      path: "/auth/successfully-changed",
      name: "Changed Password Message",
      component: PasswordChanged,
   },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
};
const inner = [
  {
    path: "/card-management/card-request",
    component: Customer,
  },
  {
    path: "/wallet-savings/transaction-details",
    component: SavingsDetails,
  },
];
const layoutRoutes = {
  path: "/layouts",
  name: "Layouts",
  icon: MonitorIcon,
  children: [
    {
      path: "/layouts/sidebar-sticky",
      name: "Sticky Sidebar",
      component: SidebarSticky,
    },
    {
      path: "/layouts/sidebar-collapsed",
      name: "Sidebar Collapsed",
      component: SidebarCollapsed,
    },
    {
      path: "/layouts/boxed",
      name: "Boxed Layout",
      component: Boxed,
    },
    {
      path: "/layouts/theme-classic",
      name: "Classic Theme",
      component: ThemeClassic,
    },
    {
      path: "/layouts/theme-corporate",
      name: "Corporate Theme",
      component: ThemeCorporate,
      badgeColor: "primary",
      badgeText: "New",
    },
    {
      path: "/layouts/theme-modern",
      name: "Modern Theme",
      component: ThemeModern,
      badgeColor: "primary",
      badgeText: "New",
    },
  ],
};

const documentationRoutes = {
  path: "/docs",
  name: "Documentation",
  icon: BookOpenIcon,
  children: [
    {
      path: "/docs/introduction",
      name: "Introduction",
      component: Introduction,
    },
    {
      path: "/docs/getting-started",
      name: "Getting Started",
      component: GettingStarted,
    },
    {
      path: "/docs/environment-variables",
      name: "Environment Variables",
      component: EnvironmentVariables,
    },
    {
      path: "/docs/deployment",
      name: "Deployment",
      component: Deployment,
    },
    {
      path: "/docs/state-management",
      name: "State Management",
      component: StateManagement,
    },
    {
      path: "/docs/plugins",
      name: "Plugins",
      component: Plugins,
    },
    {
      path: "/docs/changelog",
      name: "Changelog",
      component: Changelog,
    },
  ],
};

const uiRoutes = {
  path: "/ui",
  name: "UI Elements",
  header: "Tools & Components",
  icon: GridIcon,
  children: [
    {
      path: "/ui/alerts",
      name: "Alerts",
      component: Alerts,
    },
    {
      path: "/ui/buttons",
      name: "Buttons",
      component: Buttons,
    },
    {
      path: "/ui/cards",
      name: "Cards",
      component: Cards,
    },
    {
      path: "/ui/carousel",
      name: "Carousel",
      component: Carousel,
    },
    {
      path: "/ui/embed-video",
      name: "Embed Video",
      component: EmbedVideo,
    },
    {
      path: "/ui/general",
      name: "General",
      component: General,
      badgeColor: "info",
      badgeText: "10+",
    },
    {
      path: "/ui/grid",
      name: "Grid",
      component: Grid,
    },
    {
      path: "/ui/modals",
      name: "Modals",
      component: Modals,
    },
    {
      path: "/ui/tabs",
      name: "Tabs",
      component: Tabs,
    },
    {
      path: "/ui/typography",
      name: "Typography",
      component: Typography,
    },
  ],
};

const iconRoutes = {
  path: "/icons",
  name: "Icons",
  icon: HeartIcon,
  badgeColor: "info",
  badgeText: "1500+",
  children: [
    {
      path: "/icons/feather",
      name: "Feather",
      component: Feather,
    },
    {
      path: "/icons/font-awesome",
      name: "Font Awesome",
      component: FontAwesome,
    },
  ],
};

const formRoutes = {
  path: "/forms",
  name: "Forms",
  icon: CheckSquareIcon,
  children: [
    {
      path: "/forms/layouts",
      name: "Layouts",
      component: Layouts,
    },
    {
      path: "/forms/basic-inputs",
      name: "Basic Inputs",
      component: BasicInputs,
    },
    {
      path: "/forms/input-groups",
      name: "Input Groups",
      component: InputGroups,
    },
  ],
};

const tableRoutes = {
  path: "/tables",
  name: "Tables",
  icon: ListIcon,
  component: BootstrapTables,
  children: null,
};

const formPluginsRoutes = {
  path: "/form-plugins",
  name: "Form Plugins",
  icon: CheckSquareIcon,
  header: "Plugin & Addons",
  children: [
    {
      path: "/form-plugins/advanced-inputs",
      name: "Advanced Inputs",
      component: AdvancedInputs,
    },
    {
      path: "/form-plugins/editors",
      name: "Editors",
      component: Editors,
    },
    {
      path: "/form-plugins/validation",
      name: "Validation",
      component: Validation,
    },
    {
      path: "/form-plugins/wizard",
      name: "Wizard",
      component: Wizard,
    },
  ],
};

const advancedTablesRoutes = {
  path: "/advanced-tables",
  name: "Advanced Tables",
  icon: ListIcon,
  children: [
    {
      path: "/advanced-tables/pagination",
      name: "Pagination",
      component: PaginationTables,
    },
    {
      path: "/advanced-tables/row-selection",
      name: "Row Selection",
      component: RowSelectionTables,
    },
    {
      path: "/advanced-tables/expandable-rows",
      name: "Expandable Rows",
      component: ExpandableRowsTables,
    },
    {
      path: "/advanced-tables/export-csv",
      name: "Export CSV",
      component: ExportCsvTables,
    },
  ],
};

const chartRoutes = {
  path: "/charts",
  name: "Charts",
  icon: PieChartIcon,
  badgeColor: "primary",
  badgeText: "New",
  children: [
    {
      path: "/charts/chartjs",
      name: "Chart.js",
      component: Chartjs,
    },
    {
      path: "/charts/apexcharts",
      name: "ApexCharts",
      component: ApexCharts,
      badgeColor: "primary",
      badgeText: "New",
    },
  ],
};

const notificationsRoutes = {
  path: "/notifications",
  name: "Notifications",
  icon: Bellicon,
  component: Notifications,
  children: null,
};

const mapRoutes = {
  path: "/maps",
  name: "Maps",
  icon: MapPinIcon,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps,
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps,
    },
  ],
};

// const calendarRoutes = {
//   path: "/calendar",
//   name: "Calendar",
//   icon: CalendarIcon,
//   component: Calendar,
//   children: null
// };

// This route is not visisble in the sidebar
const privateRoutes = {
  path: "/private",
  name: "Private",
  children: [
    {
      path: "/private/blank",
      name: "Blank Page",
      component: Blank,
    },
  ],
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  reportsRoutes,
  issueResolutionsRoutes,
  referralRoutes,

  settlAnalytics,

  customerRoutes,
  adminManagementRoutes,
  messageRoutes,
  reconciliationRoutes,
  cardManagementRoutes,
  walletSavingsRoutes,
  vendorsRoutes,
  pageRoutes,
  layoutRoutes,
  documentationRoutes,
  uiRoutes,
  iconRoutes,
  formRoutes,
  tableRoutes,
  formPluginsRoutes,
  advancedTablesRoutes,
  chartRoutes,
  notificationsRoutes,
  mapRoutes,
  calendarRoutes,
  privateRoutes,
];

// Auth specific routes
export const page = [authRoutes];

export const customer = [customerDetails];
// All routes
export default [
  dashboardRoutes,
  reportsRoutes,
  issueResolutionsRoutes,
  referralRoutes,

  settlAnalytics,
  cardManagementRoutes,
  walletSavingsRoutes,
  vendorsRoutes,

  customerRoutes,
  adminManagementRoutes,
  messageRoutes,
  reconciliationRoutes,
  // pageRoutes,
  // authRoutes,
  // layoutRoutes,
  // documentationRoutes,
  // uiRoutes,
  // iconRoutes,
  // formRoutes,
  // tableRoutes,
  // formPluginsRoutes,
  //advancedTablesRoutes,
  // chartRoutes,
  // notificationsRoutes,
  // mapRoutes,
  // calendarRoutes,
];
