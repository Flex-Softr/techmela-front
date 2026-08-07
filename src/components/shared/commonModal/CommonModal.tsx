import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TProps = {
  children: React.ReactNode;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOpen: (open: boolean) => void;
  modalTitle?: string;
  className?: string;
};
const CommonModal = ({
  children,
  open,
  handleOpen,
  modalTitle,
  className,
}: TProps) => {
  return (
    <div>
      <Dialog onOpenChange={handleOpen} open={open}>
        <DialogContent className={`${className}`}>
          <DialogHeader className="pr-10">
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription className="hidden">
              This modal contains content related to {modalTitle}.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommonModal;
