"use client";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
import Box from "@/components/ui/ec/Box";
import BoxHeading from "@/components/ui/ec/BoxHeading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getImageSrc } from "@/lib/utils";
import {
  setPaymentInfo,
  setPaymentInfoError,
} from "@/redux/features/order/paymentInfo";
import { useAppDispatch } from "@/redux/hooks";
import { TPaymentMethod } from "@/types/paymentMethod";
import { Banknote } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { FieldError, useFormContext } from "react-hook-form";

type TCheckoutFormData = {
  paymentMethod: string;
  paymentDetails: Record<string, string | number>;
};

const SinglePaymentInput = ({
  input,
}: {
  input: {
    name: string;
    type: string;
    is_required?: boolean;
    enums?: string; // Comma-separated options for select
  };
}) => {
  const {
    register,
    setValue,
    watch,
    clearErrors,
    unregister,
    formState: { errors },
  } = useFormContext<TCheckoutFormData>();

  useEffect(() => {
    register(`paymentDetails.${input.name}`, {
      required: input.is_required ? `${input.name} is required` : false,
      ...(input.name.toLowerCase().includes("phone")
        ? {
            pattern: {
              value: /^(?!.*[a-zA-Z])01\d{9}$/,
              message: "Please provide a valid 11-digit mobile number.",
            },
          }
        : {}),
    });
    return () => {
      unregister(`paymentDetails.${input.name}`);
    };
  }, [register, unregister, input.name, input.is_required]);

  const value = watch(`paymentDetails.${input.name}`) || "";

  return (
    <div className="space-y-1">
      <Label className="text-sm font-semibold">
        {input.name}{" "}
        {input.is_required && <span className="text-destructive">*</span>}
      </Label>
      {input.type === "select" ? (
        <select
          value={value}
          onChange={(e) => {
            setValue(`paymentDetails.${input.name}`, e.target.value, {
              shouldValidate: true,
            });
            clearErrors(`paymentDetails.${input.name}`);
          }}
          className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
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
          type={input.type === "number" ? "number" : "text"}
          value={value}
          onChange={(e) => {
            setValue(`paymentDetails.${input.name}`, e.target.value, {
              shouldValidate: true,
            });
            clearErrors(`paymentDetails.${input.name}`);
          }}
          placeholder={`Enter ${input.name}`}
          className="focus-visible:ring-primary"
        />
      )}
      {errors.paymentDetails &&
        (errors.paymentDetails as Record<string, FieldError>)[input.name] && (
          <ErrorMessage
            message={
              (errors.paymentDetails as Record<string, FieldError>)[input.name]
                ?.message
            }
          />
        )}
    </div>
  );
};

const PaymentMethods = ({
  paymentMethods,
  idPrefix = "payment",
}: {
  paymentMethods: TPaymentMethod[];
  idPrefix?: string;
}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext<TCheckoutFormData>();

  // Set default payment method when data is loaded
  useEffect(() => {
    if (paymentMethods.length > 0) {
      setValue("paymentMethod", paymentMethods[0]._id);
      dispatch(setPaymentInfo({ selectedPaymentMethod: paymentMethods[0] }));
    }
  }, [paymentMethods, setValue, dispatch]);

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

  // Sync selected method object to Redux whenever it changes
  useEffect(() => {
    if (selectedMethod) {
      dispatch(setPaymentInfo({ selectedPaymentMethod: selectedMethod }));
    }
  }, [selectedMethod, dispatch]);

  return (
    <Box className="p-0 md:p-4">
      <BoxHeading className="flex items-center gap-2">
        <Banknote className="text-lg text-primary" />
        <span className="text-lg">পেমেন্ট পদ্ধতি</span>
      </BoxHeading>

      <div className="mt-3">
        {/* Hidden input for RHF registration */}
        <input
          type="hidden"
          {...register("paymentMethod", {
            required: "অনুগ্রহ করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন",
          })}
        />
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {paymentMethods.map((method) => (
              <div
                key={method._id}
                className={`flex items-center p-3 rounded-md border transition-all cursor-pointer ${
                  paymentMethodId === method._id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                } ${method?.logo?.src && "py-1 pr-1"}`}
                onClick={() => {
                  setValue("paymentMethod", method._id, {
                    shouldValidate: true,
                  });
                  clearErrors("paymentDetails");
                  setValue("paymentDetails", {});
                }}
              >
                <input
                  type="radio"
                  id={`${idPrefix}-${method._id}`}
                  name={`payment_method_${idPrefix}`}
                  value={method._id}
                  checked={paymentMethodId === method._id}
                  onChange={() => {
                    setValue("paymentMethod", method._id, {
                      shouldValidate: true,
                    });
                    clearErrors("paymentDetails");
                    setValue("paymentDetails", {});
                  }}
                  className="w-4 h-4 text-primary focus:ring-primary cursor-pointer"
                />
                <label
                  htmlFor={`${idPrefix}-${method._id}`}
                  className="ml-3 flex-grow flex justify-between items-center cursor-pointer select-none"
                >
                  <span className="font-semibold text-sm">{method.name}</span>
                  {method.logo?.src && (
                    <Image
                      src={getImageSrc(method?.logo?.src)}
                      alt={method?.logo?.alt || method?.name}
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
                <div className="p-4 border rounded-md bg-muted/50 space-y-4">
                  {selectedMethod.merchantACInfo && (
                    <div className="text-sm bg-background p-2 rounded border border-border mb-2">
                      <p>
                        <span className="font-semibold text-muted-foreground">
                          Account Type:
                        </span>{" "}
                        {selectedMethod.merchantACInfo.accountType}
                      </p>
                      <p>
                        <span className="font-semibold text-muted-foreground">
                          Account No:
                        </span>{" "}
                        {selectedMethod.merchantACInfo.accountNo}
                      </p>
                    </div>
                  )}

                  {selectedMethod.instructions && (
                    <p className="text-sm text-muted-foreground italic">
                      Note: {selectedMethod.instructions}
                    </p>
                  )}

                  {selectedMethod.required_inputs &&
                    selectedMethod.required_inputs.length > 0 && (
                      <div className="grid grid-cols-1 gap-4">
                        {selectedMethod.required_inputs.map((input, idx) => (
                          <SinglePaymentInput key={idx} input={input} />
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
