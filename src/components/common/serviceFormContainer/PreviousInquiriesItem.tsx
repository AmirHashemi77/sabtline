import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface IProps {
  title: string;
  subTitle: string;
}

const PreviousInquiriesItem = ({ title, subTitle }: IProps) => {
  return (
    <div className="flex items-center w-full rounded-lg justify-between bg-gray-100 px-4">
      <div className="flex flex-col items-start gap-2">
        <p className="text-center text-gray-700 text-sm">{title}</p>
        <p className="text-center text-gray-400 text-xs">{subTitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <FaRegEdit className="text-gray-700 hover:text-blue-500 transition-all" />
        <MdDelete className="text-gray-700 hover:text-red-500 transition-all" />
      </div>
    </div>
  );
};

export default PreviousInquiriesItem;
