import { Controller, useForm } from "react-hook-form";
import { NumberInput } from "../input/NumberInput";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IPlate } from "../../../type/general.types";
import { plateSchema } from "../../../schema/offlineContractSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

const alphabetArr = [
  { value: "الف", label: "الف" },
  { value: "ب", label: "ب" },
  { value: "پ", label: "پ" },
  { value: "ت", label: "ت" },
  { value: "ث", label: "ث" },
  { value: "ج", label: "ج" },
  { value: "چ", label: "چ" },
  { value: "ح", label: "ح" },
  { value: "خ", label: "خ" },
  { value: "د", label: "د" },
  { value: "ذ", label: "ذ" },
  { value: "ر", label: "ر" },
  { value: "ز", label: "ز" },
  { value: "ژ", label: "ژ" },
  { value: "س", label: "س" },
  { value: "ش", label: "ش" },
  { value: "ص", label: "ص" },
  { value: "ض", label: "ض" },
  { value: "ط", label: "ط" },
  { value: "ظ", label: "ظ" },
  { value: "ع", label: "ع" },
  { value: "غ", label: "غ" },
  { value: "ف", label: "ف" },
  { value: "ق", label: "ق" },
  { value: "ک", label: "ک" },
  { value: "گ", label: "گ" },
  { value: "ل", label: "ل" },
  { value: "م", label: "م" },
  { value: "ن", label: "ن" },
  { value: "و", label: "و" },
  { value: "ه", label: "ه" },
  { value: "ی", label: "ی" },
];

export default function CarLicensePlateInput({ getFinalValue }: { getFinalValue?: (values: any) => void }) {
  const { control } = useForm<IPlate>({
    resolver: zodResolver<IPlate, unknown, IPlate>(plateSchema),
  });

  return (
    <div className="grid grid-cols-12 grid-rows-1 items-center justify-center gap-x-1">
      <div className="grid grid-cols-10 relative col-span-3 row-span-1">
        <div className="flex items-center justify-center h-full col-span-2">
          <p className="rotate-90 text-xs w-full text-center">ایران</p>
        </div>
        <Controller
          name="section-one"
          control={control}
          render={({ field: { value, onChange } }) => (
            <NumberInput
              name="section-one"
              customClassName="col-span-8 placeholder:text-center placeholder:text-xl dark:bg-card"
              value={value}
              isRequired={true}
              onChange={(e: any) => {
                if (!/^\d{0,2}$/.test(e.target.value)) {
                  e.target.value = e.target.value.slice(0, 2);
                }
                onChange(e);
                if (getFinalValue) {
                  getFinalValue({
                    inputKey: "section-one",
                    inputValue: e.target.value,
                  });
                }
              }}
              typeOfTitle="Placeholder"
              placeHolder={"- -"}
            />
          )}
        ></Controller>
      </div>
      <Controller
        name="section-two"
        control={control}
        render={({ field: { value, onChange } }) => (
          <NumberInput
            name="section-two"
            customClassName="col-span-3 row-span-1 placeholder:text-center placeholder:text-xl dark:bg-card"
            value={value}
            isRequired={true}
            onChange={(e: any) => {
              if (!/^\d{0,3}$/.test(e.target.value)) {
                e.target.value = e.target.value.slice(0, 3);
              }
              onChange(e);
              if (getFinalValue) {
                getFinalValue({
                  inputKey: "section-two",
                  inputValue: e.target.value,
                });
              }
            }}
            typeOfTitle="Placeholder"
            placeHolder={"- - -"}
          />
        )}
      ></Controller>
      <Controller
        name="section-three"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            value={value}
            onValueChange={(value) => {
              onChange(value);
              if (getFinalValue) {
                getFinalValue({
                  inputKey: "section-three",
                  inputValue: value,
                });
              }
            }}
          >
            <SelectTrigger
              dir="rtl"
              className="col-span-2 row-span-1 placeholder:text-center placeholder:text-xl shadow-none focus:shadow-none active:shadow-none ring-0 h-[45px] border-gray-300  dark:bg-card"
            >
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {alphabetArr &&
                alphabetArr.map((apl, index) => (
                  <SelectItem dir="rtl" key={index} value={apl.value}>
                    {apl.value}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          /* <SelectInput
                                   name="section-three"
                                   customClassName="col-span-2 row-span-1 placeholder:text-center placeholder:text-xl"
                                   value={value}
                                   isRequired={true}
                                   onChange={(e: any) => {
                                       console.log(e);
                                       onChange(e);
                                       if (getFinalValue) {
                                           getFinalValue({
                                               inputKey: 'section-three',
                                               inputValue: e.target.value
                                           })
                                       }
                                   }}
                                   option={alphabetArr}
                                   placeHolder={"- -"}
                                   typeOfTitle="Placeholder"
                               />*/
        )}
      ></Controller>

      <Controller
        name="section-four"
        control={control}
        render={({ field: { value, onChange } }) => (
          <NumberInput
            name="section-four"
            customClassName="col-span-3 row-span-1 placeholder:text-center placeholder:text-xl dark:bg-card"
            value={value}
            isRequired={true}
            onChange={(e: any) => {
              if (!/^\d{0,2}$/.test(e.target.value)) {
                e.target.value = e.target.value.slice(0, 2);
              }
              onChange(e);
              if (getFinalValue) {
                getFinalValue({
                  inputKey: "section-four",
                  inputValue: e.target.value,
                });
              }
            }}
            typeOfTitle="Placeholder"
            placeHolder={"- -"}
          />
        )}
      ></Controller>

      <div className="col-span-1 row-span-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="48" fill="none">
          <path fill="#004A96" d="M0 12C0 5.37258 5.37258 0 12 0h17v48H12C5.37258 48 0 42.6274 0 36V12Z"></path>
          <path
            fill="#fff"
            d="M6.69405 28.0899h-.53303V24h.53303v4.0899Zm1.10627-.1011c-.06848-.0712-.10272-.1564-.10272-.2557 0-.1011.03424-.1863.10272-.2556.07033-.0693.15546-.1048.25541-.1067.09994.0019.18415.0374.25263.1067.07033.0693.1055.1545.1055.2556 0 .0993-.03517.1845-.1055.2557-.06848.0693-.15176.1039-.24986.1039-.10179 0-.18785-.0346-.25818-.1039Zm3.05518-1.5534h-.94948v1.6545h-.53581V24h1.33809c.4553 0 .8051.1049 1.0494.3146.2462.2097.3693.515.3693.9157 0 .2547-.0685.4766-.2055.6658-.1351.1891-.3238.3305-.5663.4241l.9495 1.736v.0337h-.5719l-.8773-1.6545Zm-.94948-.441h.81898c.1444 0 .2702-.0197.3776-.059.1092-.0412.1999-.0955.272-.1629.0722-.0693.1259-.1498.1611-.2416.037-.0936.0555-.1938.0555-.3006 0-.1179-.0176-.2247-.0528-.3202-.0333-.0974-.086-.1807-.1582-.25-.0722-.0693-.1638-.1226-.2749-.1601-.111-.0375-.2433-.0562-.397-.0562h-.80228v1.5506Zm3.09958 1.9944c-.0685-.0712-.1027-.1564-.1027-.2557 0-.1011.0342-.1863.1027-.2556.0703-.0693.1555-.1048.2554-.1067.1.0019.1842.0374.2526.1067.0704.0693.1055.1545.1055.2556 0 .0993-.0351.1845-.1055.2557-.0684.0693-.1517.1039-.2498.1039-.1018 0-.1879-.0346-.2582-.1039ZM6.53303 36H6v-4.0899h.53303V36Zm2.51658-1.6545h-.94946V36h-.53581v-4.0899h1.33813c.4553 0 .8051.1049 1.04941.3146.24612.2098.36922.515.36922.9157 0 .2547-.0685.4766-.2054.6658-.13513.1891-.32392.3305-.56637.4241l.94947 1.736V36h-.57191l-.87728-1.6545Zm-.94946-.441h.81898c.14436 0 .27022-.0197.37756-.059.1092-.0412.19989-.0955.27207-.1629.07218-.0693.12586-.1498.16102-.2416.03702-.0936.05553-.1938.05553-.3006 0-.1179-.01759-.2247-.05275-.3202-.03332-.0974-.08606-.1807-.15824-.25-.07219-.0693-.1638-.1226-.27485-.1601-.11105-.0374-.24338-.0562-.397-.0562h-.80232v1.5506Zm5.25945 1.0281h-1.6935L11.2858 36h-.5497l1.5436-4.0899h.4664L14.2924 36h-.5469l-.3859-1.0674Zm-1.5324-.4438h1.3742l-.6885-1.913-.6857 1.913ZM18 36h-.5358l-2.035-3.1517V36h-.5358v-4.0899h.5358l2.0405 3.1657v-3.1657H18V36Z"
          ></path>
          <path fill="#00A03C" d="M6 11.334c0-.8284.67157-1.50002 1.5-1.50002H21V12.334H6v-1Z"></path>
          <path fill="#fff" d="M6 12.334h15v4.16667H6z"></path>
          <path fill="#FC000B" d="M6 16.501h15v2.5H7.5c-.82843 0-1.5-.6716-1.5-1.5v-1Z"></path>
          <g clipPath="url(#a)">
            <path
              fill="#FC000B"
              fillRule="evenodd"
              d="M12.9795 13.539c-.2964.2013-.4926.5118-.5073.8656-.0192.4651.2808.8754.7279 1.0692-.1751.0475-.3606.0605-.5424.038-.0102-.0012-.0203-.0026-.0303-.0041.1708.061.3551.0896.5402.0837.0478-.0015.0955-.0053.1428-.0113l.1398.1875.1398-.1875c.0474.006.095.0098.1428.0113.1852.0059.3697-.0226.5405-.0837-.01.0015-.0201.0029-.0303.0041-.1818.0225-.3673.0095-.5424-.038.4472-.1938.7471-.6039.7279-1.0692-.0149-.3538-.2111-.6644-.5075-.8656.2098.2509.3094.5814.2477.9263-.0616.3449-.2726.6368-.5609.8259l.0373-1.6937c-.0831-.0194-.1462-.0686-.1949-.1205-.0484.0519-.1117.1011-.1948.1205l.0373 1.6938c-.2885-.1892-.4993-.4811-.561-.826-.0617-.345.0381-.6754.2478-.9263Zm.836-.3212c.0045.018.0067.0364.0067.0549 0 .1217-.0964.2204-.2154.2204-.0621 0-.1183-.027-.1574-.0701-.0393.0431-.0953.0701-.1574.0701-.1189 0-.2151-.0987-.2151-.2204-.0001-.0185.0022-.0369.0067-.0549.0111.089.0939.1581.1944.1581.074 0 .1384-.0374.1717-.0928.0331.0554.0976.0928.1714.0928.1004 0 .1832-.0691.1944-.1581Zm-1.2709 2.1219c-.1776-.0872-.3252-.2127-.4276-.3639-.1025-.1512-.1563-.3226-.1561-.4971 0-.4695.3819-.8629.8939-.9657-.3687.1685-.6276.5634-.6276 1.0237 0 .3156.1219.6007.3173.803h.0001Zm1.8113 0c.1777-.0872.3252-.2127.4276-.3639.1025-.1512.1563-.3226.1561-.4971 0-.4695-.3816-.8629-.8938-.9657.3686.1685.6275.5634.6275 1.0237 0 .3156-.1219.6007-.3173.803h-.0001Z"
              clipRule="evenodd"
            ></path>
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M11.834 13.167h3.33333v2.5H11.834z"></path>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
