import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../../ui/dialog";
import type { FC } from "react";
import { DialogFooter, DialogHeader } from "../../ui/dialog";
import { Button } from "../../ui/button";

interface IProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}

const QaModal: FC<IProps> = ({ isOpen, title, description, onCancel, onAccept }) => {
  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="py-5 text-center font-medium">{title ?? "آیا از انجام عملیات اطمینان دارید؟"}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="flex items-center !justify-center w-full gap-5 sm:gap-0">
          <Button className="mx-3 bg-red-700 text-white min-w-[100px] w-full sm:w-auto" onClick={onCancel}>
            انصراف
          </Button>
          <Button className="mx-3 bg-green-800 text-white min-w-[100px] w-full sm:w-auto" onClick={onAccept}>
            تائید
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QaModal;
