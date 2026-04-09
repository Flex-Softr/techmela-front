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
  useEffect(() => {
    register("shipping.division" as Path<T>, {
      required: "বিভাগ নির্বাচন করুন",
    });
    register("shipping.district" as Path<T>, {
      required: "জেলা নির্বাচন করুন",
    });
    register("shipping.upazila" as Path<T>, {
      required: "উপজেলা নির্বাচন করুন",
    });
  }, [register]);
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
      setValue("shipping.division" as Path<T>, shipping.division);
    if (shipping?.district)
      setValue("shipping.district" as Path<T>, shipping.district);
    if (shipping?.upazila)
      setValue("shipping.upazila" as Path<T>, shipping.upazila);
  }, [shipping, setValue]);

  return (
    <div
      className={`grid ${showDivision ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"} gap-x-5 gap-y-4 mt-4`}
    >
      {showDivision && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="division" className="font-semibold text-gray-700">
            বিভাগ
          </Label>
          <select
            id="division"
            value={division}
            onChange={(e) => {
              setValue("shipping.division" as Path<T>, e.target.value);
              setValue("shipping.district" as Path<T>, ""); // Reset dependent
              setValue("shipping.upazila" as Path<T>, "");
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
          {errors?.shipping?.division && (
            <span className="text-red-500 text-xs">
              {(errors.shipping.division.message as string) ||
                "বিভাগ সিলেক্ট করুন"}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="district" className="font-semibold text-gray-700">
          জেলা
        </Label>
        <select
          id="district"
          value={district}
          onChange={(e) => {
            setValue("shipping.district" as Path<T>, e.target.value);
            setValue("shipping.upazila" as Path<T>, "");
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
        {errors?.shipping?.district && (
          <span className="text-red-500 text-xs">
            {(errors.shipping.district.message as string) ||
              "জেলা সিলেক্ট করুন"}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="upazila" className="font-semibold text-gray-700">
          উপজেলা
        </Label>
        <select
          id="upazila"
          value={upazila}
          onChange={(e) =>
            setValue("shipping.upazila" as Path<T>, e.target.value)
          }
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
        {errors?.shipping?.upazila && (
          <span className="text-red-500 text-xs">
            {(errors.shipping.upazila.message as string) ||
              "উপজেলা সিলেক্ট করুন"}
          </span>
        )}
      </div>
    </div>
  );
};

export default DivisionDistrictUpazilaSelector;
