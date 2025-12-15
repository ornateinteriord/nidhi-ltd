import { Suspense, lazy, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import { Dialog, DialogContent, CircularProgress } from "@mui/material";

// Admin Pages - Lazy Loaded
const AdminDashboard = lazy(() => import("./pages/Admin-Pages/AdminDashboard/Dashboard"));
const AdminPlans = lazy(() => import("./pages/Admin-Pages/Plans"));
const AdminTeam = lazy(() => import("./pages/Admin-Pages/Team"));
const AdminPayoutReport = lazy(() => import("./pages/Admin-Pages/Payout"));
const AdminPlanRecoveryReport = lazy(() => import("./pages/Admin-Pages/PlanRecovery"));
const AdminLoanRecoveryReport = lazy(() => import("./pages/Admin-Pages/LoanRecovery"));
const AssignMenuBranch = lazy(() => import("./pages/Admin-Pages/AssignMenu/AssignMenuBranch"));
const AdminAgentDashboard = lazy(() => import("./pages/Admin-Pages/Agent"));
const AdminAgentList = lazy(() => import("./pages/Admin-Pages/Agent/AgentList"));
const AgentDashboard = lazy(() => import("./pages/Agent/AgentDashboard"));
// const AgentList = lazy(() => import("./pages/Agent/AgentList"));
const AgentProfile = lazy(() => import("./pages/Agent/Profile"));
const AgentCollections = lazy(() => import("./pages/Agent/Collections"));
const AgentAddNew = lazy(() => import("./pages/Agent/AddNew"));
const AgentReport = lazy(() => import("./pages/Agent/Report"));
const BankingMembers = lazy(() => import("./pages/Administration/Members"));
const BankingAgents = lazy(() => import("./pages/Administration/Agents"));
const AdminReceipts = lazy(() => import("./pages/Admin-Pages/Banking/Receipts"));
const AdminPayments = lazy(() => import("./pages/Admin-Pages/Banking/Payments"));
const AdminCashTransaction = lazy(() => import("./pages/Admin-Pages/Banking/CashTransaction"));
const AdminBankTransaction = lazy(() => import("./pages/Admin-Pages/Banking/BankTransaction"));
const AdminJournalEntries = lazy(() => import("./pages/Admin-Pages/Banking/JournalEntries"));
const SBOpening = lazy(() => import("./pages/Admin-Pages/AccountForm/SBOpening"));
const CAOpening = lazy(() => import("./pages/Admin-Pages/AccountForm/CAOpening"));
const SBDetails = lazy(() => import("./pages/Admin-Pages/AccountDetails/SBDetails"));
const CADetails = lazy(() => import("./pages/Admin-Pages/AccountDetails/CADetails"));
const CloseSBTable = lazy(() => import("./pages/Admin-Pages/AccountClose/CloseSBTable"));
const CloseCATable = lazy(() => import("./pages/Admin-Pages/AccountClose/CloseCATable"));
// Agent Assignment Component
const AgentAssignment = lazy(() => import("./pages/Admin-Pages/AgentAssignment/AgentAssignment"));
// const AdminCollectedLoanReport = lazy(() => import("./pages/Admin-Pages/LoanRecovery").then(module => ({ default: module.CollectedLoanReport })));
const SelfLoan = lazy(() => import("./pages/Loans/SelfLoan"));
const AdvisedLoan = lazy(() => import("./pages/Loans/AdvisedLoan"));
import ProtectedRoute from "./routeProtecter/RouteProtecter";
import useAuth from "./hooks/use-auth";
import PublicRoute from "./routeProtecter/PublicRoutes";
import UserProvider from "./context/user/userContextProvider";
import AdminSettings from "./pages/Admin-Pages/AdminSettings";
import State from "./pages/Admin-Pages/MasterTables/StateMaster";
import City from "./pages/Admin-Pages/MasterTables/CityMaster";
import Branch from "./pages/Admin-Pages/MasterTables/BranchMaster";
import RankName from "./pages/Admin-Pages/MasterTables/RankName";
import RankWiseCommission from "./pages/Admin-Pages/MasterTables/RankWiseCommission";
import Plan from "./pages/Admin-Pages/MasterTables/Plan";
import Proof from "./pages/Admin-Pages/MasterTables/Proof";

import CompanyBank from "./pages/Admin-Pages/MasterTables/CompanyBank";
import Share from "./pages/Admin-Pages/MasterTables/Share";
import MemberFee from "./pages/Admin-Pages/MasterTables/MemberFee";
import AdvisorFee from "./pages/Admin-Pages/MasterTables/AdvisorFee";
// import MembersUpdateForm from "./pages/Admin-Pages/UpdateForms";




// public pages
// const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const RecoverPassword = lazy(() => import("./pages/Auth/RecoverPassword"))
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"))
const Navbar = lazy(() => import("./pages/Navbar/Navbar"));
const Sidebar = lazy(() => import("./pages/Sidebar/Sidebar"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));

// admin pages
// const UpdatePassword = lazy(()=>import("./pages/Admin-Pages/admin-panel/UpdatePassword"));
// const AdminDashboard = lazy(
//   () => import("./pages/Admin-Pages/AdminDashboard/Dashboard")
// );
// const AdminCashBack = lazy(
//   () => import("./pages/Admin-Pages/Incomes/CashBack")
// );
// const AdminDailyBenifitsPayouts = lazy(
//   () => import("./pages/Admin-Pages/Incomes/DailyBenifitsPayouts")
// );
// const AdminLevelBenifits = lazy(
//   () => import("./pages/Admin-Pages/Incomes/LevelBenifits")
// );
// const AdminPayout = lazy(() => import("./pages/Admin-Pages/Payout/Payout"));

// const AdminTransactions = lazy(
//   () => import("./pages/Admin-Pages/Transactions/Transactions")
// );
// const AdminSMSTransactions = lazy(
//   () => import("./pages/Admin-Pages/Transactions/SMS-Transactions")
// );
// const AdminSupportTickets = lazy(
//   () => import("./pages/Admin-Pages/SupportTicket/SupportTickets")
// );
// const AdminNews = lazy(() => import("./pages/Admin-Pages/News/News"));
// const AdminHolidays = lazy(
//   () => import("./pages/Admin-Pages/Holidays/Holidays")
// );
// const Activate = lazy(() => import("./pages/Admin-Pages/Activate/Activate"));
// const ActivatePackage = lazy(() => import("./pages/Admin-Pages/activatePackage/ActivatePackage"));

// // user pages
const UserDashboard = lazy(
  () => import("./pages/User-Pages/UserDashboard/Dashboard")
);
const UserPackageHistory = lazy(
  () => import("./pages/User-Pages/Packages/PackageHistory")
);
const UserTransaction = lazy(
  () => import("./pages/User-Pages/Transaction/WalletTransaction")
);
const UserLoanTransaction = lazy(
  () => import("./pages/User-Pages/Transaction/LoanTransaction")
);
const UserMailBox = lazy(() => import("./pages/User-Pages/MailBox/MailBox"));
const UserProfile = lazy(() => import("./pages/User-Pages/Profile/Profile"));
const UserKYC = lazy(() => import("./pages/User-Pages/KYC/KYC"));
const UserChangePassword = lazy(
  () => import("./pages/User-Pages/Change-Password/ChangePassword")
);
const UserActivate = lazy(() => import("./pages/User-Pages/Activate/Activate"));
const UserNewResgister = lazy(
  () => import("./pages/User-Pages/Team/NewResgister")
);
const UserUsedPackage = lazy(
  () => import("./pages/User-Pages/Packages/UsedPackage")
);
const UserUnUsedPackage = lazy(
  () => import("./pages/User-Pages/Packages/UnUsedPackage")
);
const UserTransferPackage = lazy(
  () => import("./pages/User-Pages/Packages/TransferPackage")
);
const UserDirect = lazy(() => import("./pages/User-Pages/Team/Direct"));
const UserLevelBenifits = lazy(
  () => import("./pages/User-Pages/Earnings/LeveBenifits")
);
const UserDailyPayout = lazy(
  () => import("./pages/User-Pages/Earnings/DailyPayout")
);
const UserWallet = lazy(() => import("./pages/User-Pages/Wallet/Wallet"));
const Tree = lazy(() => import("./pages/User-Pages/Team/Tree"));
const Team = lazy(() => import("./pages/User-Pages/Team/Team"));



const LoansMemberPending = lazy(() => import("./pages/Loans/Loanspending"));
const LoansMemberProcessed = lazy(() => import("./pages/Loans/Loansprocesssed"));
const LoansRepaymentsList = lazy(() => import("./pages/Loans/Repaymentlist"));

export const LoadingComponent = () => {
  return (
    <Dialog open={true}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

const ShouldHideSidebarComponent = () => {
  const location = useLocation();
  const publicPaths = ["/", "/login", "/register", "/recover-password", "/reset-password"];
  return publicPaths.includes(location.pathname);
};

function App() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);

  const toggelSideBar = () => {
    setIsOpen(!isOpen);
  };

  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          toastClassName="bg-white shadow-lg rounded-lg p-4"
          className="text-sm text-gray-800"
          style={{ width: 'auto', minWidth: '25rem' }} />
        <Router>
          <Suspense fallback={<LoadingComponent />}>
            <RoutesProvider
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toggelSideBar={toggelSideBar}
            />
          </Suspense>
        </Router>
      </QueryClientProvider>
    </UserProvider>
  );
}

const RoutesProvider = ({
  isOpen,
  setIsOpen,
  toggelSideBar,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggelSideBar: () => void;
}) => {
  const shouldHide = ShouldHideSidebarComponent();
  const { userRole } = useAuth()

  return (
    <>
      <Navbar toggelSideBar={toggelSideBar} shouldHide={shouldHide} />
      <div
        style={{
          display: "flex",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        {!shouldHide && (
          <Sidebar
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            role={userRole}
          />
        )}
        <div
          style={{
            flex: 1,
            marginLeft: !shouldHide && isOpen ? "250px" : "0",
            transition: "margin-left 0.3s ease-in-out",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Routes>
            {/* public routes */}
            <Route index element={<Login />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            {/* agent routes */}
            {/* <Route element={<ProtectedRoute allowedRoles={["AGENT"]} />}> */}
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              {/* <Route path="/agent/list" element={<AgentList />} /> */}
              <Route path="/agent/profile" element={<AgentProfile />} />
              <Route path="/agent/collections" element={<AgentCollections />} />
              <Route path="/agent/add-new" element={<AgentAddNew />} />
              <Route path="/agent/report" element={<AgentReport />} />
            {/* </Route> */}
            {/* admin routes */}

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              {/* Dashboard */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/agent/dashboard" element={<AdminAgentDashboard />} />
              <Route path="/admin/agent/list" element={<AdminAgentList />} />
              <Route path="/banking/members" element={<BankingMembers />} />
              <Route path="/banking/agents" element={<BankingAgents />} />
              <Route path="/agentassignemt/agent-assignment" element={<AgentAssignment />} />
              
              {/* Master Routes */}
              <Route path="/master/view_mainconfig" element={<AdminSettings />} />
              <Route path="/master/view_state" element={<State />} />
              <Route path="/master/view_city" element={<City />} />
              <Route path="/master/view_branch_master" element={<Branch />} />
              <Route path="/master/view_rank_master" element={<RankName />} />
              <Route path="/closing/closing_master" element={<RankWiseCommission />} />
              <Route path="/plan_master/view_sub_plan_type_master" element={<Plan />} />
              <Route path="/master/share" element={<Share />} />
              <Route path="/master/member-fee" element={<MemberFee />} />
              <Route path="/master/advisor-fee" element={<AdvisorFee />} />
              <Route path="/master/proof" element={<Proof />} />
              <Route path="/master/company-bank" element={<CompanyBank />} />
              
              {/* Plans */}
              <Route path="/admin/plans" element={<AdminPlans />} />
              
              {/* Team */}
              <Route path="/admin/team" element={<AdminTeam />} />
              
              {/* Loan - Self & Advised */}
              <Route path="/admin/loan/self" element={<SelfLoan />} />
              <Route path="/admin/loan/advised" element={<AdvisedLoan />} />
              
              {/* Payout */}
              <Route path="/admin/payout/report" element={<AdminPayoutReport />} />
              
              {/* Plan Recovery */}
              <Route path="/admin/plan/recovery" element={<AdminPlanRecoveryReport />} />
              <Route path="/admin/plan/recovery-report" element={<AdminPlanRecoveryReport />} />
              
              {/* Loan Recovery */}
              <Route path="/admin/loan/recovery" element={<AdminLoanRecoveryReport />} />
              <Route path="/admin/loan/recovery-report" element={<AdminLoanRecoveryReport />} />
              <Route path="/assign-menu/branch" element={<AssignMenuBranch />} />

              {/* Banking - Receipts / Payments / Transactions */}
              <Route path="/admin/banking/receipts" element={<AdminReceipts />} />
              <Route path="/admin/banking/payments" element={<AdminPayments />} />
              <Route path="/admin/banking/cash-transaction" element={<AdminCashTransaction />} />
              <Route path="/admin/banking/bank-transaction" element={<AdminBankTransaction />} />
              <Route path="/admin/banking/journal-entries" element={<AdminJournalEntries />} />
              <Route path="/SBaccount/sb-opening" element={<SBOpening />} />
              <Route path="/CAaccount/ca-opening" element={<CAOpening />} />
               <Route path="/SBaccount/search-sb-acc" element={<SBDetails />} />
               <Route path="/CAaccount/search-ca-acc" element={<CADetails />} />
               <Route path="/SBaccount/close-sb" element={<CloseSBTable />} />
               <Route path="/CAaccount/close-ca" element={<CloseCATable />} />
            </Route>
            {/* 
              <Route path="/admin/update-password" element={<UpdatePassword />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />{" "}
              <Route path="/admin/members" element={<Members />} />


              <Route
                path="/admin/members/pending"
                element={<PendingMembers />}
              />
              <Route path="/admin/Activate" element={<Activate />} />
              <Route path="/admin/ActivatePackage" element={<ActivatePackage />} />
              <Route path="/admin/members/active" element={<ActiveMembers />} />
              <Route
                path="/admin/members/inactive"
                element={<InActiveMembers />}
              />
              <Route
                path="/admin/package/generate"
                element={<GeneratePackages />}
              />
              <Route
                path="/admin/package/requests"
                element={<PackageRequests />}
              />
              <Route path="/admin/package/used" element={<UsedPackages />} />
              <Route
                path="/admin/package/unused"
                element={<UnusedPackages />}
              />
              <Route
                path="/admin/package/history"
                element={<PackageHistory />}
              />
              <Route
                path="/admin/income/cashback"
                element={<AdminCashBack />}
              />
              <Route
                path="/admin/income/level-benefits"
                element={<AdminLevelBenifits />}
              />
              <Route
                path="/admin/income/daily-payouts"
                element={<AdminDailyBenifitsPayouts />}
              />
              <Route path="/admin/payout" element={<AdminPayout />} />

              <Route
                path="/admin/transactions"
                element={<AdminTransactions />}
              />
              <Route
                path="/admin/transactions/sms"
                element={<AdminSMSTransactions />}
              />
              <Route
                path="/admin/support-tickets"
                element={<AdminSupportTickets />}
              />
              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/holidays" element={<AdminHolidays />} />
              <Route path="/admin/members/:memberId" element={<MembersUpdateForm />} />

            </Route> */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />}>
              <Route path="/admin/member/pending" element={<LoansMemberPending />} />
              <Route path="/admin/member/processed" element={<LoansMemberProcessed />} />
              <Route path="/admin/repayments/list" element={<LoansRepaymentsList />} />
            </Route>

            {/* user routes */}

            <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/account/profile" element={<UserProfile />} />
              <Route path="/user/account/kyc" element={<UserKYC />} />
              <Route
                path="/user/account/change-password"
                element={<UserChangePassword />}
              />
              <Route path="/user/activate" element={<UserActivate />} />
              <Route path="/user/package/used" element={<UserUsedPackage />} />
              <Route
                path="/user/package/unused"
                element={<UserUnUsedPackage />}
              />
              <Route
                path="/user/package/transfer"
                element={<UserTransferPackage />}
              />
              <Route
                path="/user/package/history"
                element={<UserPackageHistory />}
              />
              <Route path="/user/team/tree" element={<Tree />} />
              <Route path="/user/team" element={<Team />} />
              <Route
                path="/user/team/new-register"
                element={<UserNewResgister />}
              />
              <Route path="/user/team/direct" element={<UserDirect />} />
              <Route
                path="/user/earnings/level-benefits"
                element={<UserLevelBenifits />}
              />
              <Route
                path="/user/earnings/daily-payout"
                element={<UserDailyPayout />}
              />
              <Route path="/user/transactions" element={<UserTransaction />} />
              <Route path="/user/loantransactions" element={<UserLoanTransaction />} />
              <Route path="/user/mailbox" element={<UserMailBox />} />
              <Route path="/user/wallet" element={<UserWallet />} />

            </Route>



            {/* not found route */}
            <Route
              element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]} />}
            >
              <Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]} />}>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
