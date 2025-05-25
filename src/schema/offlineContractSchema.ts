import { z } from "zod";
import { checkCodeMeli } from "../utils/validateNationalCode";

export const offlineContractSchema = z.object({
  sellerName: z.string().nonempty("نام فروشنده را وارد نمائید").max(30),
  sellerFatherName: z.string().nonempty("نام پدر فروشنده را وارد نمائید").max(30),
  sellerIdNumber: z.string().nonempty("شماره شناسنامه را وارد نمایید"),
  sellerCity: z.string().nonempty("صادره از - را را وارد نمائید-").max(30),
  sellerBirthDate: z.string().nonempty("تاریخ تولد فروشنده را وارد نمائید").max(30),
  sellerNationalCode: z
    .string()
    .max(10, "کدملی باید حاوی 10 عدد باشد")
    .refine(
      (value) => {
        return checkCodeMeli(value);
      },
      { message: "فرمت کدملی صحیح نمیباشد" }
    ),
  sellerAddress: z.string().nonempty("آدرس فروشنده را وارد نمائید"),
  sellerPhone: z.string().nonempty("تلفن فروشنده را وارد نمائید"),

  buyerName: z.string().nonempty("نام خریدار را وارد نمائید").max(30),
  buyerFatherName: z.string().nonempty("نام پدر خریدار را وارد نمائید").max(30),
  buyerIdNumber: z.string().nonempty("شماره شناسنامه را وارد نمایید"),
  buyerCity: z.string().nonempty("صادره از - را را وارد نمائید-").max(30),
  buyerBirthDate: z.string().nonempty("تاریخ تولد خریدار را وارد نمائید").max(30),
  buyerNationalCode: z
    .string()
    .max(10, "کدملی باید حاوی 10 عدد باشد")
    .refine(
      (value) => {
        return checkCodeMeli(value);
      },
      { message: "فرمت کدملی صحیح نمیباشد" }
    ),
  buyerAddress: z.string().nonempty("آدرس خریدار را وارد نمائید"),
  buyerPhone: z.string().nonempty("تلفن خریدار را وارد نمائید"),

  carType: z.string().nonempty("نوع خودرو را وارد نمائید").max(30),
  carSystem: z.string().nonempty("سیستم را وارد نمائید").max(30),
  carModel: z.string().nonempty("مدل خودرو را وارد نمائید").max(30),
  carColor: z.string().nonempty("رنگ خودرو را وارد نمائید").max(30),
  carLicensePlate: z.string().nonempty("پلاک را وارد نمائید").max(30),
  carMotorNumber: z.string().nonempty("شماره موتور را وارد نمائید").max(30),
  chassisNumber: z.string().nonempty("شماره شاسی را وارد نمائید").max(30),

  priceNumber: z.string().nonempty("مبلغ را وارد نمائید").max(30),
  alphNumber: z.string().nonempty("مبلغ را به حروف را وارد نمائید").max(30),
  depositAmount: z.string().nonempty("مبلغ بیعانه را وارد نمائید").max(30),
  remainingAmount: z.string().nonempty("باقی مانده مبلغ را وارد نمائید").max(30),
  damageaAmount: z.string().nonempty("مبلغ خسارت را وارد نمائید").max(30),

  contractDate: z.string().nonempty("تاریخ را وارد نمائید").max(30),
  notaryNumber: z.string().nonempty("شماره محضر را وارد نمائید").max(30),

  notaryPrice: z.string().nonempty("یک گزینه را انتخاب کنید").max(30),

  parkingDate: z.string().nonempty("تاریخ را وارد نمائید").max(30),
  parkingClock: z.string().nonempty("ساعت را وارد نمائید").max(30),

  documents: z.string().nonempty("یک گزینه را انتخاب کنید").max(30),

  description: z.string().max(300),
});

export const carInfoSchema = z.object({
  carTypeBusinessId: z.string({ message: " نوع خودرو را وارد نمائید" }).nonempty(" نوع خودرو را وارد نمائید"),
  carSystemBusinessId: z.string({ message: "سیستم خودرو را وارد نمائید" }).nonempty("سیستم خودرو را وارد نمائید"),
  colorBusinessId: z.string({ message: "رنگ خودرو را وارد نمائید" }).nonempty("رنگ خودرو را وارد نمائید"),
  carManufactureYear: z
    .number({
      coerce: true,
      message: "فرمت وارد شده صحیح نمیباشد",
      // eslint-disable-next-line camelcase
      required_error: "سال تولید خودرو را وارد نمائید",
    })
    .gt(1300, "حداقل تاریخ تولید 1300 میباشد")
    .lte(1404, "حداکثر تاریخ تولید 1404 میباشد")
    .positive("فرمت وارد شده صحیح نمیباشد"),
  plateNumber: z.string().max(8, "پلاک را به درستی وارد کنید").min(8, "پلاک را به درستی وارد کنید.").optional(),
  motorNumber: z.string().nonempty("شماره موتور را وارد نمائید").min(3, "حداقل 3 رقم وارد کنید").max(9, "حداکثر 9 رقم وارد کنید"),
  chassisNumber: z.string().nonempty("شماره شاسی را وارد نمائید").min(17, "حداقل 17 رقم وارد نمائید").max(17, "حداکثر 17 رقم وارد نمائید"),
  amount: z
    .number({
      coerce: true,
      message: "فرمت وارد شده صحیح نمیباشد",
      // eslint-disable-next-line camelcase
      required_error: "قیمت را وارد نمائید",
    })
    .positive("فرمت وارد شده صحیح نمیباشد"),
  amountInWords: z.string().nonempty("مبلغ به حروف را وارد نمائید"),
  damageAmount: z
    .number({
      coerce: true,
      message: "فرمت وارد شده صحیح نمیباشد",
      // eslint-disable-next-line camelcase
      required_error: "مبلغ خسارت را وارد نمائید",
    })
    .positive("فرمت وارد شده صحیح نمیباشد"),
  notaryDate: z.string({ message: "تاریخ محضر را وارد نمائید" }).nonempty("تاریخ محضر را وارد نمائید"),
  notaryNumber: z
    .number({
      coerce: true,
      message: "فرمت وارد شده صحیح نمیباشد",
      // eslint-disable-next-line camelcase
      required_error: "شماره محضر را وارد نمائید",
    })
    .positive("فرمت وارد شده صحیح نمیباشد"),
  notaryFeePayer: z.string({ message: "هزینه محضر را وارد نمائید" }).nonempty("هزینه محضر را وارد نمائید"),
  vehicleDeliveryDate: z.string({ message: "تاریخ تحویل خودرو را وارد نمائید" }).nonempty("تاریخ تحویل خودرو را وارد نمائید"),
  carDocumentHolder: z.string({ message: "مدارک تحویل را وارد نمائید" }).nonempty("مدارک تحویل را وارد نمائید"),
  description: z.string({ message: "" }).optional(),
  date: z.string({ message: "تاریخ قرارداد را وارد نمائید" }).nonempty("تاریخ قرارداد را وارد نمائید"),
});

export const plateSchema = z.object({
  "section-one": z.string().nonempty("").max(2, ""),
  "section-two": z.string().nonempty("").max(3, ""),
  "section-three": z.string().nonempty(""),
  "section-four": z.string().nonempty("").max(2, ""),
});
