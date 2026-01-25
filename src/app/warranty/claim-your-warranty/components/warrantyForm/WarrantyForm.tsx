"use client";
import EcButton from "@/components/EcButton/EcButton";
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
      validCodes: Array.from(
        new Set([
          ...(TableData?.flatMap((item) => item.warrantyCodes) || []),
          ...(Array.isArray(urlCodes) ? urlCodes : []),
        ])
      ).join(", "),
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
        className: "text-red-500",
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
              className="relative group border rounded-lg overflow-hidden bg-gray-50 aspect-square flex items-center justify-center"
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
                />
              ) : (
                <div className="flex flex-col items-center p-2 text-center">
                  <span className="text-gray-400 text-3xl mb-1">📄</span>
                  <span className="text-xs text-gray-600 truncate w-full">
                    {file.name}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleDeleteFile(index)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Remove file"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="my-10">
      <div>
        <h2 className=" xms:text-lg xls:text-lg sm:text-xl md:text-3xl text-center mb-4 md:mb-10 font-semibold">
          ওয়ারেন্টি দাবি ফর্ম
        </h2>
        <h3 className="xms:text-sm xls:text-sm sm:text-lg md:text-3xl my-1">
          ক্রয়ের তথ্যঃ-
        </h3>
      </div>
      <div className="border border-gray-200 p-2 md:p-4 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="mb-4">
              <label
                htmlFor="orderedPhoneNumber"
                className="block mb-2 xms:text-xs xls:text-xs sm:text-sm md:text-lg"
              >
                অডারকৃত মোবাইল নম্বর-
              </label>
              <input
                type="text"
                id="orderedPhoneNumber"
                {...register("orderedPhoneNumber")}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="warrantyCodes"
                className="block mb-2 xms:text-xs xls:text-xs sm:text-sm md:text-lg"
              >
                পন্যের ওয়ারেন্টি কোড -
              </label>
              <input
                type="text"
                id="warrantyCodes"
                {...register("validCodes")}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="issueDescription"
              className="block mb-2 xms:text-xs xls:text-xs sm:text-sm md:text-lg"
            >
              সমস্যাটি বর্ণনা করুন-
            </label>
            <textarea
              id="issueDescription"
              {...register("issueDescription", { required: true })}
              className="w-full border h-[150px] border-gray-300 rounded-md p-2"
              placeholder="আপনি যে সমস্যা দেখে পরিবর্তন করতে চাচ্ছেন   উক্ত সমস্যাটি বিস্তারিত ভাবে লিখুন"
            />
            {errors.issueDescription && (
              <p className="text-red-500 xms:text-xs xls:text-xs sm:text-sm md:text-lg">
                আপনি যে সমস্যা দেখে পরিবর্তন করতে চাচ্ছেন উক্ত সমস্যাটি
                বিস্তারিত ভাবে লিখুন
              </p>
            )}
          </div>

          <div
            className={`${
              fileDragged ? "border-blue-500" : "border-gray-300"
            } border border-dashed rounded-md p-4 mb-4 flex justify-center items-center cursor-pointer`}
            onDragOver={handleDragOver} // Trigger drag over
            onDrop={handleDrop} // Handle drop of files
            style={{
              minHeight: "160px",
              width: "100%",
              background: "#ffffff",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <input
              type="file"
              id="customerFile"
              {...register("customerFiles", {
                required: false,
                validate: () =>
                  selectedFiles.length > 0 ||
                  "Please select at least one file.",
              })}
              className="hidden"
              onChange={handleFileInputChange}
              multiple
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
            />
            <label
              htmlFor="customerFile"
              className="flex justify-center items-center text-black py-2 px-4 rounded-md cursor-pointer"
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
              style={{
                width: "100%", // Make label take full width of parent div
                height: "100%", // Ensure it takes full height of parent div
                borderRadius: "4px",
                transition: "background-color 0.3s ease-in-out",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AiOutlineCloudUpload
                size={30}
                className="mr-2 xms:text-[9px] xls:text-[9px] sm:text-sm md:text-lg"
              />
              নষ্ট পন্যের ছবি/ভিডিও নির্বাচন করুন
            </label>
          </div>

          {errors.customerFiles && (
            <p className="text-red-500 text-sm mb-4">
              {errors.customerFiles.message as string}
            </p>
          )}

          {renderSelectedFiles()}
          <div>
            <h2 className="xms:text-sm xls:text-sm sm:text-lg md:text-3xl sm:mb-1 md:mb-4">
              ক্রেতার তথ্য
            </h2>
            <div className="mb-4">
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
              />
              <label
                htmlFor="keepAddress"
                className="ml-2 xms:text-xs xls:text-xs sm:text-sm md:text-lg"
              >
                পূর্বের ঠিকানা রাখুন
              </label>
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
                className="ml-4"
              />
              <label
                htmlFor="changeAddress"
                className="ml-2 xms:text-xs xls:text-xs sm:text-sm md:text-lg"
              >
                ঠিকানা পরিবর্তন করুন
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="mb-1 md:mb-4">
                <label
                  htmlFor="fullName"
                  className="block mb-2 xms:text-xs xls:text-xs sm:text-sm md:text-lg"
                >
                  ক্রেতার নাম-
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName", { required: true })}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="ক্রেতার নাম"
                  readOnly={addressOption === "keep"}
                />
                {errors.fullName && (
                  <p className="text-red-500 xms:text-xs xls:text-xs sm:text-sm md:text-lg">
                    ক্রেতার নাম প্রয়োজন
                  </p>
                )}
              </div>
              <div className=" mb-1 md:mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 xms:text-xs xls:text-xs sm:text-sm md:text-lg"
                >
                  মোবাইল নম্বর-
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  {...register("phoneNumber", {
                    required: true,
                    pattern: /^[0-9]*$/,
                  })}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="মোবাইল নম্বর"
                  readOnly={addressOption === "keep"}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 xms:text-xs xls:text-xs sm:text-sm md:text-lg">
                    মোবাইল নম্বর প্রয়োজন
                  </p>
                )}
              </div>
            </div>
            <div className="mb-2 md:mb-4">
              <label
                htmlFor="fullAddress"
                className="block mb-2 xms:text-xs xls:text-xs sm:text-sm md:text-lg"
              >
                ঠিকানা-
              </label>
              <input
                type="text"
                id="fullAddress"
                {...register("fullAddress", { required: true })}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="ঠিকানা"
                readOnly={addressOption === "keep"}
              />
              {errors.fullAddress && (
                <p className="text-red-500 xms:text-xs xls:text-xs sm:text-sm md:text-lg">
                  ঠিকানা প্রয়োজন
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            {!isFormSubmitted && ( // Render the button only if the form is not submitted
              <EcButton
                type="submit"
                className="text-white"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </EcButton>
            )}
            {isFormSubmitted && (
              <EcButton type="submit" className="text-white" disabled>
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
                  অনুরোধ সফলভাবে গ্রহণ করা হয়েছে
                </DialogTitle>
                <DialogDescription className="text-center p-3 text-sm">
                  আপনার অনুরোধটি গ্রহণ করা হয়েছে। আমাদের টেকনিক্যাল টিম আপনার
                  সাথে যোগাযোগ করবে, ততক্ষণ পর্যন্ত অপেক্ষা করুন। ধন্যবাদ...
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mx-auto my-1">
                <Link href="/">
                  <EcButton className="text-white ">Go back home</EcButton>
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
