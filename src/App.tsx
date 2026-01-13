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
const AgentWallet = lazy(() => import("./pages/Agent/AgentWallet"));
const BankingMembers = lazy(() => import("./pages/Administration/Members"));
const BankingAgents = lazy(() => import("./pages/Administration/Agents"));
const InterestRate = lazy(() => import("./pages/Admin-Pages/Interest/interest"));
const AdminReceipts = lazy(() => import("./pages/Admin-Pages/Banking/Receipts"));
const AdminPayments = lazy(() => import("./pages/Admin-Pages/Banking/Payments"));
const AdminCashTransaction = lazy(() => import("./pages/Admin-Pages/Banking/CashTransaction"));
const AdminBankTransaction = lazy(() => import("./pages/Admin-Pages/Banking/BankTransaction"));
const AdminJournalEntries = lazy(() => import("./pages/Admin-Pages/Banking/JournalEntries"));

// Account Form Components
const SBOpening = lazy(() => import("./pages/Admin-Pages/AccountForm/SBOpening"));
const CAOpening = lazy(() => import("./pages/Admin-Pages/AccountForm/CAOpening"));
const SBDetails = lazy(() => import("./pages/Admin-Pages/AccountDetails/SBDetails"));
const CADetails = lazy(() => import("./pages/Admin-Pages/AccountDetails/CADetails"));
const CloseSBTable = lazy(() => import("./pages/Admin-Pages/AccountClose/CloseSBTable"));
const CloseCATable = lazy(() => import("./pages/Admin-Pages/AccountClose/CloseCATable"));
const CloseLoanTable = lazy(() => import("./pages/Admin-Pages/AccountClose/CloseLoanTable"));
const CloseODTable = lazy(() => import("./pages/Admin-Pages/AccountClose/CloseODTable"));

// Banking view-all pages using reusable table
const RDViewAll = lazy(() => import("./pages/Admin-Pages/Banking/RD/RDViewAll"));
const FDViewAll = lazy(() => import("./pages/Admin-Pages/Banking/FD/FDViewAll"));
const PigmyViewAll = lazy(() => import("./pages/Admin-Pages/Banking/PIGMY/PigmyViewAll"));
const MISViewAll = lazy(() => import("./pages/Admin-Pages/Banking/MIS/MISViewAll"));

const RDOpening = lazy(() => import("./pages/Admin-Pages/Banking/RD/RDOpening"));
const FDOpening = lazy(() => import("./pages/Admin-Pages/Banking/FD/FDOpening"));
const PigmyOpening = lazy(() => import("./pages/Admin-Pages/Banking/PIGMY/PigmyOpening"));
const MISOpening = lazy(() => import("./pages/Admin-Pages/Banking/MIS/MISOpening"));

// Maturity Pages
const RDPreMaturity = lazy(() => import("./pages/Admin-Pages/Banking/RD/RDPreMaturity"));
const RDPayMaturity = lazy(() => import("./pages/Admin-Pages/Banking/RD/RDPayMaturity"));
const FDPreMaturity = lazy(() => import("./pages/Admin-Pages/Banking/FD/FDPreMaturity"));
const FDPayMaturity = lazy(() => import("./pages/Admin-Pages/Banking/FD/FDPayMaturity"));
const PigmyPreMaturity = lazy(() => import("./pages/Admin-Pages/Banking/PIGMY/PigmyPreMaturity"));
const PigmyPayMaturity = lazy(() => import("./pages/Admin-Pages/Banking/PIGMY/PigmyPayMaturity"));
const MISPreMaturity = lazy(() => import("./pages/Admin-Pages/Banking/MIS/MISPreMaturity"));
const MISPayMaturity = lazy(() => import("./pages/Admin-Pages/Banking/MIS/MISPayMaturity"));

const LoanViewAll = lazy(() => import("./pages/Admin-Pages/Loan/LoanViewAll"));
const ODViewAll = lazy(() => import("./pages/Admin-Pages/Overdraft/ODViewAll"));

// Agent Assignment Component
const AgentAssignment = lazy(() => import("./pages/Admin-Pages/AgentAssignment/AgentAssignment"));
// const AdminCollectedLoanReport = lazy(() => import("./pages/Admin-Pages/LoanRecovery").then(module => ({ default: module.CollectedLoanReport })));
const UserDashboard = lazy(() => import("./user/Dashboard/UserDashboard"));
const UserProfile = lazy(() => import("./pages/User/Profile"));
const UserCollections = lazy(() => import("./pages/User/Collections"));
const UserAddNew = lazy(() => import("./pages/User/AddNew"));
const UserReport = lazy(() => import("./pages/User/Report"));
const UserTransaction = lazy(() => import("./user/Transaction/UserTransaction"));
const Wallet = lazy(() => import("./pages/Shared/Wallet"));
const AccountWallet = lazy(() => import("./pages/Shared/AccountWallet"));
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

// public pages
// const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Navbar = lazy(() => import("./pages/Navbar/Navbar"));
const Sidebar = lazy(() => import("./pages/Sidebar/Sidebar"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));

// Cashfree Mandatory Pages
const AboutUs = lazy(() => import("./pages/Public/AboutUs"));
const ContactUs = lazy(() => import("./pages/Public/ContactUs"));
const PrivacyPolicy = lazy(() => import("./pages/Public/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/Public/TermsConditions"));
const RefundPolicy = lazy(() => import("./pages/Public/RefundPolicy"));

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
  const publicPaths = ["/", "/login", "/about", "/contact", "/privacy-policy", "/terms", "/refund-policy"];
  return publicPaths.includes(location.pathname);
};

function App() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);

  const toggelSideBar = () => {
    setIsOpen(!isOpen);
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // Retry once on failure (total 2 attempts: initial + 1 retry)
        refetchOnWindowFocus: false, // Disable refetch on window focus for better UX
      },
    },
  });

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
            marginLeft: window.innerWidth >= 900 && !shouldHide && isOpen ? "250px" : "0",
            transition: "margin-left 0.3s ease-in-out",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Routes key={location.pathname}>
            {/* public routes */}
            <Route index element={<Login />} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Cashfree Mandatory Public Pages */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            {/* agent routes */}
            <Route element={<ProtectedRoute allowedRoles={["AGENT"]} />}>

              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              {/* <Route path="/agent/list" element={<AgentList />} /> */}
              <Route path="/agent/profile" element={<AgentProfile />} />
              <Route path="/agent/collections" element={<AgentCollections />} />
              <Route path="/agent/add-new" element={<AgentAddNew />} />
              <Route path="/agent/report" element={<AgentReport />} />
            </Route>
            {/* admin routes */}

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              {/* Dashboard */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/agent/dashboard" element={<AdminAgentDashboard />} />
              <Route path="/admin/agent/list" element={<AdminAgentList />} />
              <Route path="/banking/members" element={<BankingMembers />} />
              <Route path="/banking/agents" element={<BankingAgents />} />
              <Route path="/banking/interestrate" element={<InterestRate />} />
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
              <Route path="/loan-close" element={<CloseLoanTable />} />
              <Route path="/od-close" element={<CloseODTable />} />

              {/* Banking - Reusable view-all pages */}
              <Route path="/banking/rd-viewall" element={<RDViewAll />} />
              <Route path="/banking/fd-viewall" element={<FDViewAll />} />
              <Route path="/banking/pigmy-viewall" element={<PigmyViewAll />} />
              <Route path="/banking/mis-viewall" element={<MISViewAll />} />

              {/* Maturity Pages */}
              <Route path="/banking/rd-prematurity" element={<RDPreMaturity />} />
              <Route path="/banking/rd-pay-maturity" element={<RDPayMaturity />} />
              <Route path="/banking/fd-prematurity" element={<FDPreMaturity />} />
              <Route path="/banking/fd-pay-maturity" element={<FDPayMaturity />} />
              <Route path="/banking/pigmy-prematurity" element={<PigmyPreMaturity />} />
              <Route path="/banking/pigmy-pay-maturity" element={<PigmyPayMaturity />} />
              <Route path="/banking/mis-prematurity" element={<MISPreMaturity />} />
              <Route path="/banking/mis-pay-maturity" element={<MISPayMaturity />} />
              <Route path="/loan-viewall" element={<LoanViewAll />} />
              <Route path="/od-viewall" element={<ODViewAll />} />

              {/* Opening pages for accounts */}
              <Route path="/banking/rd-opening" element={<RDOpening />} />
              <Route path="/banking/fd-opening" element={<FDOpening />} />
              <Route path="/banking/pigmy-opening" element={<PigmyOpening />} />
              <Route path="/banking/mis-opening" element={<MISOpening />} />
            </Route>

            {/* User routes */}
            <Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN", "AGENT"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/collections" element={<UserCollections />} />
              <Route path="/user/add-new" element={<UserAddNew />} />
              <Route path="/user/report" element={<UserReport />} />
              <Route path="/user/transaction" element={<UserTransaction />} />
              <Route path="/user/wallet" element={<Wallet />} />
              <Route path="/user/account-wallet" element={<AccountWallet />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin/wallet" element={<Wallet />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["AGENT"]} />}>
              <Route path="/agent/wallet" element={<AgentWallet />} />
            </Route>


            {/* not found route */}
            <Route
              element={<ProtectedRoute allowedRoles={["USER", "ADMIN", "AGENT"]} />}
            >
              <Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN", "AGENT"]} />}>
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
