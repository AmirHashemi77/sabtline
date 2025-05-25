import type { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFound: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-10">
      <img alt="404" width={800} height={500} src="/images/404-error.svg" />
      <p className="text-primary font-bold text-lg">صفحه مورد نظر پیدا نشد</p>
      <div className="flex gap-2 items-center justify-center px-3">
        <Button asChild>
          <Link to="/">صفحه اصلی</Link>
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
