// import {useEffect} from "react";

import { useNavigate } from "react-router-dom";
import { useRegisterStepStore } from "../store/register/store";
import { shareData } from "./shareData";

const SsoLogin = () => {
  // const setRegisterStep = useRegisterStepStore((state) => state.setRegisterStep);
  const setSelectedSso = useRegisterStepStore((state) => state.setSelectedSso);
  const navigate = useNavigate();

  const handleSelectSso = () => {
    sessionStorage.setItem(shareData.SSO_APPROACH_SELECTED, "true");
    setSelectedSso(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
    // setRegisterStep(RegisterSteps.SELECT_APPROACH);
    // window.location.reload();
  };

  /*  useEffect(() => {
          localStorage.clear();
      }, []);*/

  return (
    <div className="p-5 my-auto w-full">
      <img className=" mb-4 mx-auto" src="/images/logo-khodro.png" height={150} width={150} alt="Arm" />
      <div className="mt-6">
        {/*<button
                    onClick={() => setRegisterStep(RegisterSteps.PHONE_NUMBER)}
                    className=" w-full py-2 mt-4 bg-primary rounded-lg hover:bg-blue-800 text-white transition duration-300"
                >
                    ورود از طریق ثبت لاین
                </button>*/}
        <button onClick={handleSelectSso} className=" w-full py-2 mt-4 bg-primary rounded-lg hover:bg-blue-800 text-white transition duration-300">
          ورود از طریق درگاه SSO
        </button>
      </div>
    </div>
  );
};

export default SsoLogin;
