import { z } from "zod";
import { checkCodeMeli } from "../utils/validateNationalCode";

export const personSchema = z.object({
  firstName: z.string().nonempty("نام را وارد نمائید").max(30),
  lastName: z.string().nonempty("نام خانوادگی را وارد نمائید").max(30),
  fatherName: z.string().nonempty("نام پدر را وارد نمائید").max(30),
  identificationNumber: z.string().nonempty("شماره شناسنامه را وارد نمائید"),
  birthPlace: z.string().nonempty(" محل تولد را وارد نمائید"),
  /*birthDate: z.date({
        // eslint-disable-next-line camelcase
        required_error: 'تاریخ تولد را وارد نمائید',
        // eslint-disable-next-line camelcase
        invalid_type_error: 'فرمت تاریخ تولد صحیح نمیباشد'
    }),*/
  birthDate: z.string({ message: "تاریخ تولد را وارد نمائید" }).nonempty("تاریخ تولد را وارد نمائید"),
  certificateIssuanceCity: z.string().nonempty("محل صدور را را وارد نمائید").max(30),
  nationalCode: z
    .string()
    .max(10, "کدملی باید حاوی 10 عدد باشد")
    .refine(
      (value) => {
        return checkCodeMeli(value);
      },
      { message: "فرمت کدملی صحیح نمیباشد" }
    ),
  address: z.string().nonempty("آدرس را وارد نمائید"),
  phoneNumber: z.string().nonempty("تلفن را وارد نمائید").startsWith("09", "فرمت شماره همراه صحیح نمیباشد").max(11, "شماره همراه باید 11 رقم باشد"),
  postalCode: z.string().nonempty(" کد پستی را وارد نمائید").max(10, "کد پستی باید 10 رقم باشد").min(10, "کد پستی باید 10 رقم باشد"),
  share: z
    .number({
      coerce: true,
      message: "فرمت وارد شده صحیح نمیباشد",
    })
    .positive("فرمت وارد شده صحیح نمیباشد")
    .min(1, "حداقل عدد مجاز 1 میباشد")
    .max(10, "حداکثر عدد مجاز 10 میباشد"),
  shareType: z.string({ message: "نوع سهم را وارد نمائید" }).nonempty("نوع سهم را وارد نمائید"),
});

export const contractInfoSchema = z.object({
  amount: z.string().nonempty("مبلغ را وارد نمائید").max(30),
  /* notaryDate: z.date({
         // eslint-disable-next-line camelcase
         required_error: 'تاریخ را وارد نمائید',
         // eslint-disable-next-line camelcase
         invalid_type_error: 'فرمت تاریخ صحیح نمیباشد'
     }),*/
  date: z.string({ message: "تاریخ را وارد نمائید" }).nonempty("تاریخ را وارد نمائید"),
  description: z.string().max(300),
});

export const pledgeInfoSchema = z.object({
  pledgeAmount: z.string().nonempty("مبلغ بیعانه را وارد نمائید").max(30),
  pledgeDate: z.string({ message: "تاریخ تولد را وارد نمائید" }).nonempty("تاریخ تولد را وارد نمائید"),
  /*pledgeDate: z.date({
        // eslint-disable-next-line camelcase
        required_error: 'تاریخ را وارد نمائید',
        // eslint-disable-next-line camelcase
        invalid_type_error: 'فرمت تاریخ صحیح نمیباشد'
    }),*/
  description: z.string().max(300),
});
