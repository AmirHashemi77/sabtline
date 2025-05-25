import { z } from "zod";
import { checkCodeMeli } from "../utils/validateNationalCode";

export const greenPaperFormSchema = z
  .object({
    greenNumber: z.string().nullish(),
    qrCodeNumber: z.string().nullish(),
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
  })
  .superRefine((data, ctx) => {
    if (data.sellerNationalCode === data.buyerNationalCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "کد ملی خریدار و فروشنده نمیتواند یکسان باشد",
        path: ["sellerNationalCode"],
      });
    }

    if (data.greenNumber && data.qrCodeNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "تنها یکی از مقادیر شماره کارت سبز یا شماره بارکد خودرو را وارد نمایید",
        path: ["qrCodeNumber"],
      });
    }

    if (!data.greenNumber && !data.qrCodeNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "وارد کردن شماره برگ سبز خودرو یا بارکد کارت خودرو اجباری میباشد",
        path: ["qrCodeNumber"],
      });
    }

    if (!data.qrCodeNumber && data.greenNumber && data.greenNumber.length < 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "شماره برگ سبز خودرو باید 11 رقم باشد",
        path: ["greenNumber"],
      });
    }

    if (data.qrCodeNumber && data.qrCodeNumber.length < 9 && !data.greenNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "شماره بارکد کارت خودرو باید 9 رقم باشد",
        path: ["qrCodeNumber"],
      });
    }
  });
