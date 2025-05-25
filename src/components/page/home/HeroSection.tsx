import { Link } from "react-router-dom";
import { useThemeStore } from "../../../store/theme/store";
import { Button } from "../../ui/button";

const HeroSection = () => {
  const { theme } = useThemeStore();

  return (
    <div className="w-full md:pt-24 h-screen max-xl:h-[50rem] relative">
      {theme === "light" && <img src="/images/gradient.png" alt="gradient" className="absolute w-full h-full top-0 bottom-0 left-0 right-0 opacity-10 z-[-1]" />}
      {theme === "light" && <img src="/images/bg-hero2.jpg" alt="hero" className="hero-bg" />}
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col items-center pt-20">
          <h1 className="text-center text-5xl md:text-4xl lg:text-6xl my-8 font-bold relative leading-[60px] md:leading-0">
            <img alt="underline" src="/images/under.png" width="100" height="100" className="absolute hidden md:inline left-0 bottom-[-25px]" />
            سامانه رسمی معاملات آنلاین <span className="text-center text-5xl md:text-4xl lg:text-6xl my-8 font-bold text-primary">خودرو</span>
          </h1>
          <p className="text-center max-w-2xl md:text-lg my-8 md:!leading-[2.6] font-thin ">
            وبسایت ثبت لاین یک پلتفرم نوآورانه است که در زمینه قراردادهای آنلاین خرید و فروش خودرو فعالیت می‌کند. این وبسایت با هدف ساده‌سازی و تسهیل فرآیند خرید و فروش خودرو برای کاربران ایجاد شده
            است. ثبت لاین با ارائه یک سیستم جامع و کاربرپسند، این امکان را به خریداران و فروشندگان می‌دهد که بدون نیاز به حضور فیزیکی و با اطمینان کامل، معاملات خودروهای خود را به صورت آنلاین انجام
            دهند.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5 my-8 px-5 w-full md:w-auto ">
            <Button className="md:w-auto w-[80%]" size="xl">
              <Link className="w-full h-full flex items-center text-center justify-center" to="/greenpaper">
                ایجاد قرارداد
              </Link>
            </Button>
            <Button className="bg-white text-gray-800 hover:bg-white hover:text-black hover md:w-auto w-[80%]" size="xl" variant="outline">
              راهنمای استفاده
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-t from-background to white absolute bottom-[-10px] h-[100px] w-full" />
    </div>
  );
};
export default HeroSection;
