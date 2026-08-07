"use client";
import EcButton from "@/components/shared/EcButton/EcButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useClaimRequestMutation } from "@/redux/features/warrantyApi/warrantyApiSlice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
type FormData = {
  purchaseDate: string;
  validCodes: string;
  issueDescription: string;
  customerFiles: File[];
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  orderedPhoneNumber: string;
};

const WarrantyForm = () => {
  const TableData = useAppSelector((state) => state.tableData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCodesStr = searchParams.get("validCodes");
  let urlCodes: string[] = [];
  try {
    if (urlCodesStr) {
      urlCodes = JSON.parse(urlCodesStr);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error parsing validCodes from URL", e);
  }

  const [fileDragged, setFileDragged] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [addressOption, setAddressOption] = useState<"keep" | "change">("keep");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [claimRequest, { isLoading }] = useClaimRequestMutation();

  const {
    register,
    clearErrors,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      validCodes: (Array.isArray(urlCodes) ? urlCodes : []).join(", "),
      orderedPhoneNumber:
        TableData[0]?.shippingDetails?.phoneNumber ||
        searchParams.get("phoneNumber") ||
        "",
      fullName: TableData[0]?.shippingDetails?.fullName || "",
      phoneNumber: TableData[0]?.shippingDetails?.phoneNumber || "",
      fullAddress: TableData[0]?.shippingDetails?.fullAddress || "",
      purchaseDate: "",
      issueDescription: "",
      customerFiles: [],
    },
  });

  const formDataValues = watch();

  useEffect(() => {
    if (
      !formDataValues.fullName &&
      !formDataValues.phoneNumber &&
      !formDataValues.fullAddress &&
      addressOption !== "change"
    ) {
      router.push("/warranty/find-your-product");
    }
  }, [
    formDataValues.fullName,
    formDataValues.phoneNumber,
    formDataValues.fullAddress,
    addressOption,
    router,
  ]);

  const { toast } = useToast();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("phoneNumber", TableData[0]?.shippingDetails?.phoneNumber);
    formData.append("problemInDetails", data.issueDescription);

    // Append warranty codes as an array
    const warrantyCodesArray = data.validCodes
      .split(",")
      .map((code) => code.trim());
    warrantyCodesArray.forEach((code) =>
      formData.append("warrantyCodes[]", code)
    );

    // Append shipping details
    formData.append("shipping[fullName]", data.fullName);
    formData.append("shipping[fullAddress]", data.fullAddress);
    formData.append("shipping[phoneNumber]", data.phoneNumber);

    // Append selected files with the correct field name
    selectedFiles.forEach((file) => {
      formData.append("files", file, file.name);
    });

    try {
      await claimRequest(formData).unwrap();
      setIsModalOpen(true);
      setIsFormSubmitted(true);
    } catch (error: unknown) {
      toast({
        description: "Error submitting warranty claim request",
        className: "text-destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setFileDragged(true); // Highlight the drop area when dragging files
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileDragged(false); // Reset the border color after drop

    const files = Array.from(e.dataTransfer.files);

    // Ensure the files are added only once (to avoid duplicates)
    const uniqueFiles = files.filter(
      (newFile) =>
        !selectedFiles.some(
          (existingFile) => existingFile.name === newFile.name
        )
    );

    if (uniqueFiles.length > 0) {
      // Update the selected files and clear validation errors
      const updatedFiles = [...selectedFiles, ...uniqueFiles];
      setSelectedFiles(updatedFiles);
      setValue("customerFiles", updatedFiles, { shouldValidate: true });
      clearErrors("customerFiles"); // Clear validation errors for files
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    // Filter out any files that are already in selectedFiles
    const uniqueNewFiles = newFiles.filter(
      (newFile) =>
        !selectedFiles.some(
          (existingFile) => existingFile.name === newFile.name
        )
    );

    // Update the state with the new unique files
    const updatedFiles = [...selectedFiles, ...uniqueNewFiles];
    setSelectedFiles(updatedFiles);
    setValue("customerFiles", updatedFiles, { shouldValidate: true });

    if (uniqueNewFiles.length > 0) {
      clearErrors("customerFiles"); // Clear validation errors if files are selected
    }
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setValue("customerFiles", updatedFiles, { shouldValidate: true });
  };
  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
    router.push("/"); // Redirect to home page
  };

  const renderSelectedFiles = () => {
    if (selectedFiles.length === 0) return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {selectedFiles.map((file, index) => {
          const isImage = file.type.startsWith("image/");
          const isVideo = file.type.startsWith("video/");
          const fileUrl = URL.createObjectURL(file);

          return (
            <div
              key={index}
              className="relative group border rounded-lg overflow-hidden bg-muted aspect-square flex items-center justify-center"
            >
              {isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fileUrl}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  onLoad={() => URL.revokeObjectURL(fileUrl)}
                />
              ) : isVideo ? (
                <video
                  src={fileUrl}
                  className="w-full h-full object-cover"
                  onLoadedData={() => URL.revokeObjectURL(fileUrl)}
                  controls
                />
              ) : (
                <div className="flex flex-col items-center p-2 text-center">
                  <span className="text-muted-foreground text-3xl mb-1">
                    📄
                  </span>
                  <span className="text-xs text-muted-foreground truncate w-full">
                    {file.name}
                  </span>
                </div>
              )}

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleDeleteFile(index)}
                  className="p-1.5 bg-destructive/100 text-primary-foreground rounded-full hover:bg-destructive transition-colors shadow-sm"
                  title="Remove file"
                >
                  <FaTrashAlt size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="my-10 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
          Warranty claim form
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Describe your product issue in detail
        </p>
      </div>

      <div className="bg-background shadow-sm border border-border p-6 md:p-8 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-medium text-foreground mb-6 border-b pb-2">
            Purchase information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="orderedPhoneNumber"
                className="block mb-2 text-sm font-medium text-muted-foreground"
              >
                Order phone number
              </label>
              <input
                type="text"
                id="orderedPhoneNumber"
                {...register("orderedPhoneNumber")}
                className="w-full border border-border bg-muted/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="warrantyCodes"
                className="block mb-2 text-sm font-medium text-muted-foreground"
              >
                Product warranty code
              </label>
              <input
                type="text"
                id="warrantyCodes"
                {...register("validCodes")}
                className="w-full border border-border bg-muted/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                readOnly
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="issueDescription"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Describe the issue
            </label>
            <textarea
              id="issueDescription"
              {...register("issueDescription", { required: true })}
              className="w-full border border-border bg-muted/30 rounded-lg p-3 text-sm h-[120px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              placeholder="Write a detailed description..."
            />
            {errors.issueDescription && (
              <p className="text-destructive text-xs mt-1">
                Issue description is required
              </p>
            )}
          </div>

          <div className="mb-8">
            <span className="block mb-2 text-sm font-medium text-muted-foreground">
              Evidence (photos/videos)
            </span>
            <div
              className={`relative border-2 border-dashed ${
                fileDragged
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/50"
              } rounded-xl p-8 flex flex-col justify-center items-center transition-all hover:bg-muted cursor-pointer`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="customerFile"
                {...register("customerFiles", {
                  required: false,
                  validate: (value) =>
                    (value && value.length > 0) ||
                    "Please select at least one file.",
                })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileInputChange}
                multiple
              />
              <div className="flex flex-col items-center pointer-events-none">
                <div className="p-3 bg-background rounded-full shadow-sm mb-3">
                  <AiOutlineCloudUpload className="text-2xl text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Images or Videos
                </p>
              </div>
            </div>
            {errors.customerFiles && (
              <p className="text-destructive text-xs mt-1">
                {errors.customerFiles.message as string}
              </p>
            )}

            {renderSelectedFiles()}
          </div>

          <h3 className="text-lg font-medium text-foreground mb-6 border-b pb-2">
            Customer information
          </h3>

          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="keepAddress"
                  name="addressOption"
                  value="keep"
                  onChange={() => {
                    setAddressOption("keep");
                    setValue(
                      "fullName",
                      TableData[0]?.shippingDetails?.fullName || ""
                    );
                    setValue(
                      "phoneNumber",
                      TableData[0]?.shippingDetails?.phoneNumber || ""
                    );
                    setValue(
                      "fullAddress",
                      TableData[0]?.shippingDetails?.fullAddress || ""
                    );
                  }}
                  checked={addressOption === "keep"}
                  className="w-4 h-4 text-primary focus:ring-primary border-border"
                />
                <label
                  htmlFor="keepAddress"
                  className="ml-2 text-sm font-medium text-foreground cursor-pointer"
                >
                  Use previous address
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="changeAddress"
                  name="addressOption"
                  value="change"
                  onChange={() => {
                    setAddressOption("change");
                    setValue("fullName", "");
                    setValue("phoneNumber", "");
                    setValue("fullAddress", "");
                  }}
                  checked={addressOption === "change"}
                  className="w-4 h-4 text-primary focus:ring-primary border-border"
                />
                <label
                  htmlFor="changeAddress"
                  className="ml-2 text-sm font-medium text-foreground cursor-pointer"
                >
                  Enter a new address
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-muted-foreground"
              >
                Name
              </label>
              <input
                type="text"
                id="fullName"
                {...register("fullName", { required: true })}
                className="w-full border border-border bg-muted/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Your name"
                readOnly={addressOption === "keep"}
              />
              {errors.fullName && (
                <p className="text-destructive text-xs mt-1">
                  Name is required
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-muted-foreground"
              >
                Mobile number
              </label>
              <input
                type="text"
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
                className="w-full border border-border bg-muted/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="01xxxxxxxxx"
                readOnly={addressOption === "keep"}
              />
              {errors.phoneNumber && (
                <p className="text-destructive text-xs mt-1">
                  Mobile number is required
                </p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <label
              htmlFor="fullAddress"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Address
            </label>
            <input
              type="text"
              id="fullAddress"
              {...register("fullAddress", { required: true })}
              className="w-full border border-border bg-muted/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Full address"
              readOnly={addressOption === "keep"}
            />
            {errors.fullAddress && (
              <p className="text-destructive text-xs mt-1">
                Address is required
              </p>
            )}
          </div>
          <div className="flex justify-end">
            {!isFormSubmitted && ( // Render the button only if the form is not submitted
              <EcButton
                type="submit"
                className="text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </EcButton>
            )}
            {isFormSubmitted && (
              <EcButton
                type="submit"
                className="text-primary-foreground"
                disabled
              >
                Form Submitted
              </EcButton>
            )}
          </div>
        </form>

        <div>
          <Dialog
            open={isModalOpen}
            onOpenChange={(open) => {
              if (!open) handleModalClose();
            }}
          >
            <DialogContent className="w-11/12 max-w-[630px] mx-auto p-4">
              <DialogHeader>
                <DialogTitle className="text-center my-2 xms:text-xs xls:text-xs sm:text-sm md:text-lg font-bold">
                  Request received successfully
                </DialogTitle>
                <DialogDescription className="text-center p-3 text-sm">
                  Your request has been received. Our technical team will
                  contact you. Please wait. Thank you.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mx-auto my-1">
                <Link href="/">
                  <EcButton className="text-primary-foreground">
                    Go back home
                  </EcButton>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default WarrantyForm;
