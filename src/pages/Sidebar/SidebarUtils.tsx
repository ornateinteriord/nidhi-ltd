import { SideBarMenuItemType } from "../../store/store";
import {
  LucideIcons,
  MuiIcons,
} from "../Icons";

export const UserSideBarMenuItems: SideBarMenuItemType[] = [
  {
    name: "Dashboard",
    icon: <MuiIcons.Dashboard />,
    path: "/user/dashboard",
    isExpandable: false,
  },
  {
    name: "Account Info",
    icon: <MuiIcons.AccountCircle />,
    isExpandable: true,
    subItems: [
      { name: "Profile", path: "/user/account/profile", icon: <MuiIcons.Person /> },
      { name: "KYC", path: "/user/account/kyc", icon: <MuiIcons.VerifiedUser /> },
      {
        name: "Change Password",
        path: "/user/account/change-password",
        icon: <MuiIcons.LockIcon />,
      },
    ],
  },
  {
    name: "Team",
    icon: <MuiIcons.Group />,
    isExpandable: true,
    subItems: [
      { name: "Direct", path: "/user/team/direct", icon: <MuiIcons.People /> },
      { name: "Team", path: "/user/team", icon: <MuiIcons.Group /> },
      { name: "Tree", path: "/user/team/tree", icon: <MuiIcons.AccountTree /> },
      { name: "New Register", path: "/user/team/new-register", icon: <MuiIcons.PersonAdd /> },
    ],
  },
  {
    name: "Earnings",
    icon: <MuiIcons.MonetizationOn />,
    isExpandable: true,
    subItems: [
      { name: "Level Benefits", path: "/user/earnings/level-benefits", icon: <MuiIcons.ShowChart /> },
      { name: "Daily Payout", path: "/user/earnings/daily-payout", icon: <MuiIcons.Payments /> },
    ],
  },
  {
    name: "Transactions",
    icon: <MuiIcons.ShowChart />,
    isExpandable: true,
    subItems: [
      { name: "Wallet", path: "/user/transactions", icon: <MuiIcons.CreditCardIcon /> },
      { name: "Loan", path: "/user/loantransactions", icon: <MuiIcons.AccountBalance /> },
    ],
  },
  {
    name: "Wallet Balance",
    icon: <MuiIcons.CreditCardIcon />,
    path: "/user/wallet",
    isExpandable: false,
  },
  {
    name: "Mail Box",
    icon: <MuiIcons.MailOutline />,
    path: "/user/mailbox",
    isExpandable: false,
  },
];


export const AdminSideBarMenuItems: SideBarMenuItemType[] = [
  {
    name: "Administration",
    icon: <LucideIcons.Settings />,
    isExpandable: true,
    subItems: [
      { name: "Members", path: "/banking/members", icon: <MuiIcons.People /> },
      { name: "Agents", path: "/banking/agents", icon: <MuiIcons.Person /> },
    ],
  },
  {
    name: "Agent Assignment",
    icon: <LucideIcons.ClipboardCheck />,
    path: "/banking/agent-assignment",
    isExpandable: false,
  },
  {
    name: "Shares",
    icon: <LucideIcons.TrendingUp />,
    isExpandable: true,
    subItems: [
      { name: "Share", path: "/banking/share", icon: <LucideIcons.IndianRupee /> },
      { name: "Share Deposits", path: "/banking/share-deposits", icon: <MuiIcons.Savings /> },
    ],
  },
  {
    name: "Banking",
    icon: <LucideIcons.Landmark />,
    isExpandable: true,
    subItems: [
      { name: "Receipts", path: "/banking/receipts", icon: <MuiIcons.Receipt /> },
      { name: "Payments", path: "/banking/payments", icon: <MuiIcons.Payments /> },
      { name: "Cash Transaction", path: "/banking/cash-transaction", icon: <LucideIcons.IndianRupee /> },
      { name: "Bank Transaction", path: "/banking/bank-transaction", icon: <MuiIcons.AccountBalance /> },
      { name: "Journal Entries", path: "/banking/journal-entries", icon: <MuiIcons.Book /> },
    ],
  },
  {
    name: "SB Account",
    icon: <LucideIcons.Wallet />,
    isExpandable: true,
    subItems: [
      { name: "SB Opening", path: "/banking/sb-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "Search SB A/C", path: "/banking/search-sb-acc", icon: <LucideIcons.Search /> },
      { name: "Close SB", path: "/banking/close-sb", icon: <LucideIcons.XCircle /> },
    ],
  },
  {
    name: "CA Account",
    icon: <LucideIcons.CreditCard />,
    isExpandable: true,
    subItems: [
      { name: "CA Opening", path: "/banking/ca-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "Search CA A/C", path: "/banking/search-ca-acc", icon: <LucideIcons.Search /> },
      { name: "Close CA", path: "/banking/close-ca", icon: <LucideIcons.XCircle /> },
    ],
  },
  {
    name: "Loan",
    icon: <LucideIcons.HandCoins />,
    isExpandable: true,
    subItems: [
      { name: "Opening", path: "/banking/loan-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "ViewAll / Search", path: "/banking/loan-viewall", icon: <LucideIcons.Search /> },
      { name: "Disbursement", path: "/banking/loan-disbursement", icon: <MuiIcons.Payments /> },
      { name: "Receive Payments", path: "/banking/loan-recieve-payments", icon: <MuiIcons.Receipt /> },
      { name: "Close", path: "/banking/loan-close", icon: <LucideIcons.XCircle /> },
    ],
  },
];



export const AdviserSideBarMenuItems: SideBarMenuItemType[] = [
  {
    name: "Home",
    icon: <MuiIcons.Dashboard />,
    path: "/admin/dashboard",
    isExpandable: false,
  },
  {
    name: "Plans",
    icon: <LucideIcons.ClipboardCheck />,
    path: "/admin/plans",
    isExpandable: false,
  },
  {
    name: "Team",
    icon: <MuiIcons.Group />,
    path: "/admin/team",
    isExpandable: false,
  },
];


export const AgentSideBarMenuItems: SideBarMenuItemType[] = [
  {
    name: "Dashboard",
    icon: <MuiIcons.Dashboard />,
    path: "/agent/dashboard",
    isExpandable: false,
  },
  {
    name: "Profile",
    icon: <MuiIcons.AccountCircle />,
    path: "/agent/profile",
    isExpandable: false,
  },
  {
    name: "Collections",
    icon: <MuiIcons.ListAlt />,
    path: "/agent/collections",
    isExpandable: false,
  },
  {
    name: "Add New",
    icon: <MuiIcons.AddCircle />,
    path: "/agent/add-new",
    isExpandable: false,
  },
  {
    name: "Report",
    icon: <MuiIcons.Assessment />,
    path: "/agent/report",
    isExpandable: false,
  },
  {
    name: "Logout",
    icon: <LucideIcons.Info />,
    path: "/",
    isExpandable: false,
  },
];
