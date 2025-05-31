import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../page/loading";
import SignInCallbackPage from "../page/SignInCallback/page";
import SignOutCallbackPage from "../page/SignOutCallback/page";
import { useRegisterStore } from "../store/register/store";

const Home = lazy(() => import("../page/page"));
const ContractDetailsPage = lazy(() => import("../page/contractdetails/[contractId]/page"));
const GreenPaper = lazy(() => import("../page/greenpaper/page"));
const OfflineContract = lazy(() => import("../page/offlinecontract/page"));
const OfflineContractDetailsPage = lazy(() => import("../page/offlinecontractdetails/[contractId]/page"));
const OnlineContract = lazy(() => import("../page/onlinecontract/page"));
const ProfilePage = lazy(() => import("../page/profile/page"));
const Register = lazy(() => import("../page/register/page"));
const Services = lazy(() => import("../page/services/page"));
const InquiryIdDatailsPage = lazy(() => import("../page/inquirydetails/[inquiryId]/page"));
// const SignInCallbackPage = lazy(() => import("../page/SignInCallback/page"));
// const SignOutCallbackPage = lazy(() => import("../page/SignOutCallback/page"));
const NotFound = lazy(() => import("../page/not-found"));

const RoutesComponet = () => {
  const verifyToken = useRegisterStore((state) => state.verifyToken);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contractdetails/:contractId" element={verifyToken ? <ContractDetailsPage /> : <Register />} />
        <Route path="/greenpaper" element={verifyToken ? <GreenPaper /> : <Register />} />
        <Route path="/inquirydetails/:inquiryId" element={verifyToken ? <InquiryIdDatailsPage /> : <Register />} />
        <Route path="/offlinecontract" element={verifyToken ? <OfflineContract /> : <Register />} />
        <Route path="/offlinecontractdetails/:contractId" element={verifyToken ? <OfflineContractDetailsPage /> : <Register />} />
        <Route path="/onlinecontract" element={verifyToken ? <OnlineContract /> : <Register />} />
        <Route path="/profile" element={verifyToken ? <ProfilePage /> : <Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/SignInCallback" element={<SignInCallbackPage />} />
        <Route path="/signout-callback-oidc" element={<SignOutCallbackPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default RoutesComponet;
