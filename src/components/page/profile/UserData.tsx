import type { FC } from "react";
import { Input } from "../../ui/input";
import { shareData } from "../../../sso/shareData";
import { Label } from "@radix-ui/react-label";

const UserData: FC = () => {
  const userData = typeof window !== "undefined" && localStorage.getItem(shareData.SSO_SABT_LINE) && JSON.parse(localStorage.getItem(shareData.SSO_SABT_LINE) as string)?.profile;

  return (
    <div className="md:w-full my-10 flex items-center justify-around max-md:flex-col flex-wrap gap-10">
      <div className="flex items-start flex-col">
        <Label className="mb-5">نام</Label>
        <Input className="w-[300px]" disabled placeholder="نام" value={userData?.firstName} />
      </div>

      <div className="flex items-start flex-col">
        <Label className="mb-5">نام خانوادگی</Label>
        <Input className="w-[300px]" disabled placeholder="نام خانوادگی" value={userData?.lastName} />
      </div>

      <div className="flex items-start flex-col">
        <Label className="mb-5">کدملی</Label>
        <Input className="w-[300px]" disabled placeholder="کدملی" value={userData?.nationalId} />
      </div>

      <div className="flex items-start flex-col">
        <Label className="mb-5">موبایل</Label>
        <Input className="w-[300px]" disabled placeholder="موبایل" value={userData?.postCode} />
      </div>

      <div className="flex items-start flex-col">
        <Label className="mb-5">جنسیت</Label>
        <Input className="w-[300px]" disabled placeholder="جنسیت" value={userData?.gender} />
      </div>
    </div>
  );
};

export default UserData;
