import { z } from "zod";
import { checkCodeMeli } from "../utils/validateNationalCode";

export const loginFormSchema = z.object({
  phoneNumber: z
    .string()
    .nonempty("شماره همراه را وارد نمائید")
    .min(11, "شماره همراه باید یازده رقم باشد")
    .max(11, "شماره همراه باید یازده رقم باشد")
    .startsWith("09", "قالب شماره همراه صحیح نمیباشد"),
});

export const registerDataSchema = z.object({
  firstName: z.string().nonempty("نام را وارد نمائید").max(30),
  lastName: z.string().nonempty("نام خانوادگی را وارد نمائید").max(30),
  nationalCode: z
    .string()
    .max(10, "کدملی باید حاوی 10 عدد باشد")
    .refine(
      (value) => {
        return checkCodeMeli(value);
      },
      { message: "فرمت کدملی صحیح نمیباشد" }
    ),
});

export const greenPaperFormSchema = z.object({
  greenNumber: z.string().max(11, "شماره برگه سبز خودرو باید حاوی 11 رقم باشد"),
  qrCodeNumber: z.string().max(9, "شماره برگه سبز خودرو باید حاوی 9 رقم باشد"),
  sellerNationalCode: z
    .string()
    .max(10, "کدملی باید حاوی 10 رقم باشد")
    .refine(
      (value) => {
        return checkCodeMeli(value);
      },
      { message: "فرمت کدملی صحیح نمیباشد" }
    ),
  buyerNationalCode: z
    .string()
    .max(10, "کدملی باید حاوی 10 رقم باشد")
    .refine(
      (value) => {
        return checkCodeMeli(value);
      },
      { message: "فرمت کدملی صحیح نمیباشد" }
    ),
});
