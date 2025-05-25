import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardActions from "../sso/claims/Claims";
import type { ReactNode } from "react";
import { useSSOLogin } from "../sso/useSSOLogin";
import ResponseLoading from "../components/common/responseLoading/ResponseLoading";

interface IProps {
  children: ReactNode;
}

const ClaimsProvider = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const { clearUserClaims } = bindActionCreators(dashboardActions, dispatch);
  const { isLogin } = useSSOLogin(clearUserClaims);

  if (!isLogin) {
    return <ResponseLoading isPending={true} />;
  }

  return children;
};

export default ClaimsProvider;
