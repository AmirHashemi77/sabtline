import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../page/loading";
import ShowOfflineContractPage from "../page/showOfflineContract/page";
import SignInCallbackPage from "../page/SignInCallback/page";
import SignOutCallbackPage from "../page/SignOutCallback/page";

const Home = lazy(() => import("../page/page"));
const ContractDetailsPage = lazy(() => import("../page/contractdetails/[contractId]/page"));
const GreenPaper = lazy(() => import("../page/greenpaper/page"));
const OfflineContract = lazy(() => import("../page/offlinecontract/page"));
const OfflineContractDetailsPage = lazy(() => import("../page/offlinecontractdetails/[contractId]/page"));
const OnlineContract = lazy(() => import("../page/onlinecontract/page"));
const ProfilePage = lazy(() => import("../page/profile/page"));
const Register = lazy(() => import("../page/register/page"));
const Services = lazy(() => import("../page/services/page"));
// const SignInCallbackPage = lazy(() => import("../page/SignInCallback/page"));
// const SignOutCallbackPage = lazy(() => import("../page/SignOutCallback/page"));
const ShowContractPage = lazy(() => import("../page/showOfflineContract/page"));
const NotFound = lazy(() => import("../page/not-found"));

const RoutesComponet = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contractdetails/:contractId" element={<ContractDetailsPage />} />
        <Route path="/greenpaper" element={<GreenPaper />} />
        <Route path="/inquirydetails/:inquiryId" element={<Home />} />
        <Route path="/offlinecontract" element={<OfflineContract />} />
        <Route path="/offlinecontractdetails/:contractId" element={<OfflineContractDetailsPage />} />
        <Route path="/onlinecontract" element={<OnlineContract />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/showcontract" element={<ShowContractPage />} />
        <Route path="/showOfflineContract" element={<ShowOfflineContractPage />} />
        <Route path="/SignInCallback" element={<SignInCallbackPage />} />
        <Route path="/SignOutCallback" element={<SignOutCallbackPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default RoutesComponet;
