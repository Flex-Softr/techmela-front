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
  shipping?: Partial<TShippingInfo>;
  showDivision?: boolean;
  basePath?: string;
};

const DivisionDistrictUpazilaSelector = <T extends FieldValues>({
  register,
  control,
  setValue,
  shipping,
  errors,
  lang = "bn",
  showDivision = true,
  basePath = "shipping",
}: TProps<T>) => {
  // Register fields for validation
  // Bind react-hook-form registers so they have access to their refs for focus mapping
  const divisionRegister = register(`${basePath}.division` as Path<T>, {
    required: "বিভাগ নির্বাচন করুন",
  });
  const districtRegister = register(`${basePath}.district` as Path<T>, {
    required: "জেলা নির্বাচন করুন",
  });
  const upazilaRegister = register(`${basePath}.upazila` as Path<T>, {
    required: "থানা / উপজেলা নির্বাচন করুন",
  });
  const division =
    useWatch({ control, name: `${basePath}.division` as Path<T> }) || "";
  const district =
    useWatch({ control, name: `${basePath}.district` as Path<T> }) || "";
  const upazila =
    useWatch({ control, name: `${basePath}.upazila` as Path<T> }) || "";

  const divisions = BdAddress.divisions(lang);
  const districts = showDivision
    ? BdAddress.districts(division, lang)
    : BdAddress.allDistricts();
  const upazilas = BdAddress.upazilas(district, lang);

  useEffect(() => {
    if (shipping?.division)
      setValue(`${basePath}.division` as Path<T>, shipping.division as any);
    if (shipping?.district)
      setValue(`${basePath}.district` as Path<T>, shipping.district as any);
    if (shipping?.upazila)
      setValue(`${basePath}.upazila` as Path<T>, shipping.upazila as any);
  }, [shipping, setValue, basePath]);

  const errorObj = (errors as any)[basePath];

  return (
    <div
      className={`grid ${showDivision ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"} gap-x-5 gap-y-4 mt-4`}
    >
      {showDivision && (
        <div className="flex flex-col gap-2">
          <Label
            htmlFor={`${basePath}.division`}
            className="font-semibold text-foreground"
          >
            বিভাগ <span className="text-destructive">*</span>
          </Label>
          <select
            id={`${basePath}.division`}
            ref={divisionRegister.ref}
            name={divisionRegister.name}
            onBlur={divisionRegister.onBlur}
            value={division}
            onChange={(e) => {
              divisionRegister.onChange(e);
              setValue(`${basePath}.district` as Path<T>, "" as any); // Reset dependent
              setValue(`${basePath}.upazila` as Path<T>, "" as any);
            }}
            className="w-full h-10 px-3 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-md transition-all text-sm"
          >
            <option value="">-- বিভাগ নির্বাচন করুন --</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errorObj?.division && (
            <span className="text-destructive text-xs">
              {(errorObj.division.message as string) ||
                "বিভাগ নির্বাচন করুন"}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor={`${basePath}.district`}
          className="font-semibold text-foreground"
        >
          জেলা <span className="text-destructive">*</span>
        </Label>
        <select
          id={`${basePath}.district`}
          ref={districtRegister.ref}
          name={districtRegister.name}
          onBlur={districtRegister.onBlur}
          value={district}
          onChange={(e) => {
            districtRegister.onChange(e);
            setValue(`${basePath}.upazila` as Path<T>, "" as any);
          }}
          disabled={showDivision && !division}
          className="w-full h-10 px-3 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-md transition-all text-sm disabled:bg-muted disabled:cursor-not-allowed"
        >
          <option value="">
            --{" "}
            {showDivision && !division
              ? "আগে বিভাগ নির্বাচন করুন"
              : "জেলা নির্বাচন করুন"}{" "}
            --
          </option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        {errorObj?.district && (
          <span className="text-destructive text-xs">
            {(errorObj.district.message as string) ||
              "জেলা নির্বাচন করুন"}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor={`${basePath}.upazila`}
          className="font-semibold text-foreground"
        >
          থানা / উপজেলা <span className="text-destructive">*</span>
        </Label>
        <select
          id={`${basePath}.upazila`}
          ref={upazilaRegister.ref}
          name={upazilaRegister.name}
          onBlur={upazilaRegister.onBlur}
          value={upazila}
          onChange={(e) => {
            upazilaRegister.onChange(e);
          }}
          disabled={!district}
          className="w-full h-10 px-3 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-md transition-all text-sm disabled:bg-muted disabled:cursor-not-allowed"
        >
          <option value="" className="lg:hidden">
            -- {district ? "থানা / উপজেলা নির্বাচন করুন" : "আগে জেলা নির্বাচন করুন"}{" "}
            --
          </option>
          <option value="" className="hidden lg:block">
            -- {district ? "থানা / উপজেলা" : "আগে জেলা নির্বাচন করুন"} --
          </option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        {errorObj?.upazila && (
          <span className="text-destructive text-xs">
            {(errorObj.upazila.message as string) ||
              "থানা / উপজেলা নির্বাচন করুন"}
          </span>
        )}
      </div>
    </div>
  );
};

export default DivisionDistrictUpazilaSelector;
