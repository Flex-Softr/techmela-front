"use client";
import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import Box from "@/components/ui/ec/Box";
import BoxHeading from "@/components/ui/ec/BoxHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import config from "@/config/config";
import { setPaymentInfoError } from "@/redux/features/order/paymentInfo";
import { useAppDispatch } from "@/redux/hooks";
import { TPaymentMethod } from "@/types/paymentMethod";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { FieldError, useFormContext } from "react-hook-form";

type TCheckoutFormData = {
  paymentMethod: string;
  paymentDetails: Record<string, string | number>;
};

const PaymentMethods = ({
  paymentMethods,
}: {
  paymentMethods: TPaymentMethod[];
}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<TCheckoutFormData>();

  // Set default payment method when data is loaded
  useEffect(() => {
    if (paymentMethods.length > 0) {
      setValue("paymentMethod", paymentMethods[0]._id);
    }
  }, [paymentMethods, setValue]);

  const paymentMethodId = watch("paymentMethod");

  useEffect(() => {
    // We can clear errors here if needed, or rely on RHF
    if (Object.keys(errors).length) {
      // Since we are using RHF errors now, we don't strictly need to sync to Redux errors
      // unless we want to use the Redux error state for something else.
      // The original code synced errors to Redux.
      // We can keep clearing it to be safe.
    } else {
      dispatch(setPaymentInfoError({ errors: null }));
    }
  }, [errors, dispatch]);

  const selectedMethod = useMemo(() => {
    return paymentMethods?.find((m) => m._id === paymentMethodId);
  }, [paymentMethodId, paymentMethods]);

  return (
    <Box className="px-0">
      <BoxHeading className="text-center md:text-start">
        Payment Method
      </BoxHeading>

      <div className="mt-3">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {paymentMethods.map((method) => (
              <div
                key={method._id}
                className={`flex items-center p-3 rounded-md border transition-all cursor-pointer ${
                  paymentMethodId === method._id
                    ? "border-secondary bg-secondary/5"
                    : "border-gray-200 hover:border-secondary/30"
                }`}
                onClick={() => {
                  setValue("paymentMethod", method._id);
                }}
              >
                <input
                  type="radio"
                  id={method._id}
                  value={method._id}
                  {...register("paymentMethod", {
                    required: "Please select a payment method",
                  })}
                  className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer"
                />
                <label
                  htmlFor={method._id}
                  className="ml-3 flex-grow flex justify-between items-center cursor-pointer select-none"
                >
                  <span className="font-semibold text-sm">{method.name}</span>
                  {method.image?.src && (
                    <Image
                      src={`${config.base_url}/${method.image.src}`}
                      alt={method.image.alt || method.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-md object-contain"
                    />
                  )}
                </label>
              </div>
            ))}
            {errors.paymentMethod && (
              <ErrorMessage message={errors.paymentMethod.message as string} />
            )}
          </div>

          {/* Dynamic Required Inputs */}
          {selectedMethod && (
            <div className="mt-4">
              {selectedMethod.description && (
                <h2 className="font-bold text-sm mb-2">
                  {selectedMethod.description}
                </h2>
              )}

              {(selectedMethod.isPaymentDetailsNeeded ||
                selectedMethod.instructions ||
                selectedMethod.merchantACInfo ||
                (selectedMethod.required_inputs &&
                  selectedMethod.required_inputs.length > 0)) && (
                <div className="p-4 border rounded-md bg-gray-50/50 space-y-4">
                  {selectedMethod.merchantACInfo && (
                    <div className="text-sm bg-white p-2 rounded border border-gray-100 mb-2">
                      <p>
                        <span className="font-semibold text-gray-600">
                          Account Type:
                        </span>{" "}
                        {selectedMethod.merchantACInfo.accountType}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-600">
                          Account No:
                        </span>{" "}
                        {selectedMethod.merchantACInfo.accountNo}
                      </p>
                    </div>
                  )}

                  {selectedMethod.instructions && (
                    <p className="text-sm text-gray-600 italic">
                      Note: {selectedMethod.instructions}
                    </p>
                  )}

                  {selectedMethod.required_inputs &&
                    selectedMethod.required_inputs.length > 0 && (
                      <div className="grid grid-cols-1 gap-4">
                        {selectedMethod.required_inputs.map((input, idx) => (
                          <div key={idx} className="space-y-1">
                            <Label className="text-sm font-semibold">
                              {input.name}{" "}
                              {input.is_required && (
                                <span className="text-red-600">*</span>
                              )}
                            </Label>
                            {input.type === "select" ? (
                              <select
                                {...register(`paymentDetails.${input.name}`, {
                                  required: input.is_required
                                    ? `${input.name} is required`
                                    : false,
                                })}
                                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondary text-sm"
                              >
                                <option value="">Select {input.name}</option>
                                {input.enums?.split(",").map((opt) => (
                                  <option key={opt.trim()} value={opt.trim()}>
                                    {opt.trim()}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <Input
                                type={
                                  input.type === "number" ? "number" : "text"
                                }
                                {...register(`paymentDetails.${input.name}`, {
                                  required: input.is_required
                                    ? `${input.name} is required`
                                    : false,
                                  ...(input.name.toLowerCase().includes("phone")
                                    ? {
                                        pattern: {
                                          value: /^(?!.*[a-zA-Z])01\d{9}$/,
                                          message:
                                            "Please provide a valid 11-digit mobile number.",
                                        },
                                      }
                                    : {}),
                                })}
                                placeholder={`Enter ${input.name}`}
                                className="focus-visible:ring-secondary"
                              />
                            )}
                            {errors.paymentDetails &&
                              (
                                errors.paymentDetails as Record<
                                  string,
                                  FieldError
                                >
                              )[input.name] && (
                                <ErrorMessage
                                  message={
                                    (
                                      errors.paymentDetails as Record<
                                        string,
                                        FieldError
                                      >
                                    )[input.name]?.message
                                  }
                                />
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default PaymentMethods;
