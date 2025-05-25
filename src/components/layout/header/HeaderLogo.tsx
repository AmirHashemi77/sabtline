import { Link } from "react-router-dom";

const HeaderLogo = ({ className }: { className?: string }) => {
  return (
    <Link to="/" className={`text-primary font-bold text-xl ${className ? className : ""}`}>
      <img alt="logo" width={100} height={25} src="/images/logo-khodro.png" />
    </Link>
  );
};

export default HeaderLogo;
