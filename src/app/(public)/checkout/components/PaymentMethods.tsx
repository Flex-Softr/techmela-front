"use client";
import ErrorMessage from "@/components/shared/errorMessage/ErrorMessage";
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
    <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
        <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Banknote className="size-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Payment Method
          </h2>
          <p className="text-xs text-slate-500">
            Choose your preferred payment method
          </p>
        </div>
      </div>

      <div>
        {/* Hidden input for RHF registration */}
        <input
          type="hidden"
          {...register("paymentMethod", {
            required: "Please select a payment method",
          })}
        />
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-2.5">
            {paymentMethods.map((method) => {
              const isSelected = paymentMethodId === method._id;
              return (
                <div
                  key={method._id}
                  className={`flex items-center p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-xs ring-2 ring-primary/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
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
                    checked={isSelected}
                    onChange={() => {
                      setValue("paymentMethod", method._id, {
                        shouldValidate: true,
                      });
                      clearErrors("paymentDetails");
                      setValue("paymentDetails", {});
                    }}
                    className="w-4 h-4 text-primary accent-[#0F7641] focus:ring-primary cursor-pointer shrink-0"
                  />
                  <label
                    htmlFor={`${idPrefix}-${method._id}`}
                    className="ml-3 flex-grow flex justify-between items-center cursor-pointer select-none"
                  >
                    <span className="font-semibold text-sm text-slate-800">
                      {method.name}
                    </span>
                    {method.logo?.src && (
                      <div className="size-10 rounded-lg border border-slate-200/80 bg-white p-1 flex items-center justify-center shadow-2xs">
                        <Image
                          src={getImageSrc(method?.logo?.src)}
                          alt={method?.logo?.alt || method?.name}
                          width={36}
                          height={36}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </label>
                </div>
              );
            })}
            {errors.paymentMethod && (
              <ErrorMessage message={errors.paymentMethod.message as string} />
            )}
          </div>

          {/* Dynamic Required Inputs */}
          {selectedMethod && (
            <div className="mt-4">
              {selectedMethod.description && (
                <h3 className="font-bold text-sm mb-2 text-slate-800">
                  {selectedMethod.description}
                </h3>
              )}

              {(selectedMethod.isPaymentDetailsNeeded ||
                selectedMethod.instructions ||
                selectedMethod.merchantACInfo ||
                (selectedMethod.required_inputs &&
                  selectedMethod.required_inputs.length > 0)) && (
                <div className="p-4 sm:p-5 border border-slate-200 rounded-xl bg-slate-50/70 space-y-4">
                  {selectedMethod.merchantACInfo && (
                    <div className="text-sm bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                      <p>
                        <span className="font-semibold text-slate-500">
                          Account Type:
                        </span>{" "}
                        <span className="font-medium text-slate-800">
                          {selectedMethod.merchantACInfo.accountType}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold text-slate-500">
                          Account No:
                        </span>{" "}
                        <span className="font-bold text-slate-900">
                          {selectedMethod.merchantACInfo.accountNo}
                        </span>
                      </p>
                    </div>
                  )}

                  {selectedMethod.instructions && (
                    <p className="text-xs sm:text-sm text-slate-600 bg-amber-50/80 border border-amber-200/80 p-3 rounded-lg leading-relaxed">
                      <span className="font-semibold text-amber-800">Note:</span>{" "}
                      {selectedMethod.instructions}
                    </p>
                  )}

                  {selectedMethod.required_inputs &&
                    selectedMethod.required_inputs.length > 0 && (
                      <div className="grid grid-cols-1 gap-4 pt-1">
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
    </div>
  );
};

export default PaymentMethods;
