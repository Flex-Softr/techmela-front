/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import BdAddress from "@/utilities/bdAddress/bdAddress";
import { TShippingInfo } from "@/types/order/shippingInfo";

type TProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  lang?: "en" | "bn";
  showDivision?: boolean;
  shipping?: Partial<TShippingInfo>;
};

const DivisionDistrictUpazilaSelector = <T extends FieldValues>({
  register,
  control,
  setValue,
  shipping,
  errors,
  lang = "bn",
  showDivision = true,
}: TProps<T>) => {
  // Register fields for validation
  // Bind react-hook-form registers so they have access to their refs for focus mapping
  const divisionRegister = register("shipping.division" as Path<T>, {
    required: "বিভাগ সিলেক্ট করুন",
  });
  const districtRegister = register("shipping.district" as Path<T>, {
    required: "জেলা সিলেক্ট করুন",
  });
  const upazilaRegister = register("shipping.upazila" as Path<T>, {
    required: "উপজেলা সিলেক্ট করুন",
  });
  const division =
    useWatch({ control, name: "shipping.division" as Path<T> }) || "";
  const district =
    useWatch({ control, name: "shipping.district" as Path<T> }) || "";
  const upazila =
    useWatch({ control, name: "shipping.upazila" as Path<T> }) || "";

  const divisions = BdAddress.divisions(lang);
  const districts = showDivision
    ? BdAddress.districts(division, lang)
    : BdAddress.allDistricts();
  const upazilas = BdAddress.upazilas(district, lang);

  useEffect(() => {
    if (shipping?.division)
      setValue("shipping.division" as Path<T>, shipping.division as any);
    if (shipping?.district)
      setValue("shipping.district" as Path<T>, shipping.district as any);
    if (shipping?.upazila)
      setValue("shipping.upazila" as Path<T>, shipping.upazila as any);
  }, [shipping, setValue]);

  return (
    <div
      className={`grid ${showDivision ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"} gap-x-5 gap-y-4 mt-4`}
    >
      {showDivision && (
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="shipping.division"
            className="font-semibold text-gray-700"
          >
            বিভাগ <span className="text-red-600">*</span>
          </Label>
          <select
            id="shipping.division"
            ref={divisionRegister.ref}
            name={divisionRegister.name}
            onBlur={divisionRegister.onBlur}
            value={division}
            onChange={(e) => {
              divisionRegister.onChange(e);
              setValue("shipping.district" as Path<T>, "" as any); // Reset dependent
              setValue("shipping.upazila" as Path<T>, "" as any);
            }}
            className="w-full h-10 px-3 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-md transition-all text-sm"
          >
            <option value="">-- বিভাগ সিলেক্ট --</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {(errors.shipping as any)?.division && (
            <span className="text-red-500 text-xs">
              {((errors.shipping as any).division.message as string) ||
                "বিভাগ সিলেক্ট করুন"}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="shipping.district"
          className="font-semibold text-gray-700"
        >
          জেলা <span className="text-red-600">*</span>
        </Label>
        <select
          id="shipping.district"
          ref={districtRegister.ref}
          name={districtRegister.name}
          onBlur={districtRegister.onBlur}
          value={district}
          onChange={(e) => {
            districtRegister.onChange(e);
            setValue("shipping.upazila" as Path<T>, "" as any);
          }}
          disabled={showDivision && !division}
          className="w-full h-10 px-3 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-md transition-all text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
          <option value="">
            --{" "}
            {showDivision && !division ? "আগে বিভাগ সিলেক্ট" : "জেলা সিলেক্ট"}{" "}
            --
          </option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        {(errors.shipping as any)?.district && (
          <span className="text-red-500 text-xs">
            {((errors.shipping as any).district.message as string) ||
              "জেলা সিলেক্ট করুন"}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="shipping.upazila"
          className="font-semibold text-gray-700"
        >
          উপজেলা <span className="text-red-600">*</span>
        </Label>
        <select
          id="shipping.upazila"
          ref={upazilaRegister.ref}
          name={upazilaRegister.name}
          onBlur={upazilaRegister.onBlur}
          value={upazila}
          onChange={(e) => {
            upazilaRegister.onChange(e);
          }}
          disabled={!district}
          className="w-full h-10 px-3 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-md transition-all text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
          <option value="">
            -- {district ? "উপজেলা সিলেক্ট" : "আগে জেলা সিলেক্ট"} --
          </option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        {(errors.shipping as any)?.upazila && (
          <span className="text-red-500 text-xs">
            {((errors.shipping as any).upazila.message as string) ||
              "উপজেলা সিলেক্ট করুন"}
          </span>
        )}
      </div>
    </div>
  );
};

export default DivisionDistrictUpazilaSelector;
