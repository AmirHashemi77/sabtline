import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

const NotAuthMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-20 px-4 gap-10">
      <p className="text-center text-gray-500 font-bold text-lg">برای مشاهده این صفحه باید وارد حساب کاربری خود شوید</p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Button asChild>
          <Link to="/">صفحه اصلی</Link>
        </Button>
        <Button asChild>
          <Link to="/register">ورود به حساب کاربری</Link>
        </Button>
      </div>
    </div>
  );
};
export default NotAuthMessage;
