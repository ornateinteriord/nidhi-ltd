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
        icon: <MuiIcons.Lock />,
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
    path: "/agentassignemt/agent-assignment",
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
      { name: "Receipts", path: "/admin/banking/receipts", icon: <MuiIcons.Receipt /> },
      { name: "Payments", path: "/admin/banking/payments", icon: <MuiIcons.Payments /> },
      { name: "Cash Transaction", path: "/admin/banking/cash-transaction", icon: <LucideIcons.IndianRupee /> },
      { name: "Bank Transaction", path: "/admin/banking/bank-transaction", icon: <MuiIcons.AccountBalance /> },
      { name: "Journal Entries", path: "/admin/banking/journal-entries", icon: <MuiIcons.Book /> },
    ],
  },
  {
    name: "SB Account",
    icon: <LucideIcons.Wallet />,
    isExpandable: true,
    subItems: [
      { name: "SB Opening", path: "/SBaccount/sb-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "Search SB A/C", path: "/SBaccount/search-sb-acc", icon: <LucideIcons.Search /> },
      { name: "Close SB", path: "/SBaccount/close-sb", icon: <LucideIcons.XCircle /> },
    ],
  },
  {
    name: "CA Account",
    icon: <LucideIcons.CreditCard />,
    isExpandable: true,
    subItems: [
      { name: "CA Opening", path: "/CAaccount/ca-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "Search CA A/C", path: "/CAaccount/search-ca-acc", icon: <LucideIcons.Search /> },
      { name: "Close CA", path: "/CAaccount/close-ca", icon: <LucideIcons.XCircle /> },
    ],
  },
  {
    name: "Recurring Deposit",
    icon: <LucideIcons.RefreshCcw />,
    isExpandable: true,
    subItems: [
      { name: "RD Opening", path: "/banking/rd-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "ViewAll / Search", path: "/banking/rd-viewall", icon: <LucideIcons.Search /> },
      { name: "RD Prematurity", path: "/banking/rd-prematurity", icon: <LucideIcons.Undo2 /> },
      { name: "Pay Maturity", path: "/banking/rd-pay-maturity", icon: <MuiIcons.Payments /> },
      { name: "RD Calculator", path: "/banking/rd-calculator", icon: <LucideIcons.Calculator /> },
    ],
  },
  {
    name: "Fixed Deposit",
    icon: <MuiIcons.Lock />,
    isExpandable: true,
    subItems: [
      { name: "FD Opening", path: "/banking/fd-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "ViewAll / Search", path: "/banking/fd-viewall", icon: <LucideIcons.Search /> },
      { name: "FD Prematurity", path: "/banking/fd-prematurity", icon: <LucideIcons.Undo2 /> },
      { name: "Pay Maturity", path: "/banking/fd-pay-maturity", icon: <MuiIcons.Payments /> },
      { name: "FD Calculator", path: "/banking/fd-calculator", icon: <LucideIcons.Calculator /> },
    ],
  },
  {
    name: "PIGMY",
    icon: <MuiIcons.PiggyBank />,
    isExpandable: true,
    subItems: [
      { name: "Account Opening", path: "/banking/pigmy-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "ViewAll / Search", path: "/banking/pigmy-viewall", icon: <LucideIcons.Search /> },
      { name: "Pre Maturity", path: "/banking/pigmy-prematurity", icon: <LucideIcons.Undo2 /> },
      { name: "Pay Maturity", path: "/banking/pigmy-pay-maturity", icon: <MuiIcons.Payments /> },
      { name: "Calculator", path: "/banking/pigmy-calculator", icon: <LucideIcons.Calculator /> },
    ],
  },
  {
    name: "MIS",
    icon: <MuiIcons.BarChart />,
    isExpandable: true,
    subItems: [
      { name: "MIS Opening", path: "/banking/mis-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "ViewAll / Search", path: "/banking/mis-viewall", icon: <LucideIcons.Search /> },
      { name: "Pre Maturity", path: "/banking/mis-prematurity", icon: <LucideIcons.Undo2 /> },
      { name: "Pay Maturity", path: "/banking/mis-pay-maturity", icon: <MuiIcons.Payments /> },
      { name: "Calculator", path: "/banking/mis-calculator", icon: <LucideIcons.Calculator /> },
    ],
  },
  {
    name: "Loan",
    icon: <LucideIcons.HandCoins />,
    isExpandable: true,
    subItems: [
      { name: "Opening", path: "/loan-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "ViewAll / Search", path: "/loan-viewall", icon: <LucideIcons.Search /> },
      { name: "Disbursement", path: "/loan-disbursement", icon: <MuiIcons.Payments /> },
      { name: "Receive Payments", path: "/loan-recieve-payments", icon: <MuiIcons.Receipt /> },
      { name: "Close", path: "/loan-close", icon: <LucideIcons.XCircle /> },
    ],
  },
  {
    name: "Overdraft",
    icon: <MuiIcons.FileCopy />,
    isExpandable: true,
    subItems: [
      { name: "Opening", path: "/od-opening", icon: <LucideIcons.PlusCircle /> },
      { name: "ViewAll / Search", path: "/od-viewall", icon: <LucideIcons.Search /> },
      { name: "Disbursement", path: "/od-disbursement", icon: <MuiIcons.Payments /> },
      { name: "Receive Payments", path: "/od-recieve-payments", icon: <MuiIcons.Receipt /> },
      { name: "Close", path: "/od-close", icon: <LucideIcons.XCircle /> },
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
