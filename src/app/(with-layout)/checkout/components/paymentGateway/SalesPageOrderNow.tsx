/* eslint-disable @typescript-eslint/no-explicit-any */
import SalesPageQuantity from "@/app/sales/components/SalesPageQuantity/SalesPageQuantity";
import config from "@/config/config";
import { TSingleProduct } from "@/types/products/singleProduct";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const SalesPageOrderNow = ({
  setItemTotal,
  setQuantity,
  quantity,
  product,
  totalCost,
  setOrderedProducts,
}: {
  totalCost?: number;
  product?: TSingleProduct;
  quantity: number;
  setOrderedProducts: Dispatch<
    SetStateAction<{ quantity: number; product: string; variation: any }[]>
  >;
  setQuantity: Dispatch<SetStateAction<number>>;
  setItemTotal: Dispatch<SetStateAction<number>>;
}) => {
  const [selectedVariations, setSelectedVariations] = useState<
    {
      variation: any;
      quantity: number;
      totalPrice: number;
    }[]
  >([]);
  const [totalExpenseState, setTotalExpense] = useState<number>(totalCost || 0);

  // **Preselect first variation when product has variations**
  useEffect(() => {
    if (product?.variations && product.variations.length > 0) {
      const firstVariation = product.variations[0];
      setSelectedVariations([
        {
          variation: firstVariation,
          quantity: 1,
          totalPrice:
            firstVariation.price.salePrice || firstVariation.price.regularPrice,
        },
      ]);
    }
  }, [product]);

  useEffect(() => {
    const logData =
      product?.variations && product.variations.length > 0
        ? selectedVariations.map((item) => ({
            quantity: item.quantity,
            product: product._id || "",
            variation: item.variation._id,
          }))
        : [
            {
              quantity: quantity,
              product: product?._id || "",
              variation: "",
            },
          ];

    setOrderedProducts(logData);
    setQuantity(quantity);
  }, [
    selectedVariations,
    product?._id,
    setQuantity,
    quantity,
    setOrderedProducts,
    product?.variations,
  ]);

  useEffect(() => {
    if (product?.price) {
      const basePrice =
        product.price.salePrice || product.price.regularPrice || 0;
      const updatedTotal = basePrice * (quantity || 1);
      setTotalExpense(updatedTotal);
      setItemTotal(updatedTotal);
    }
  }, [product, setItemTotal, quantity]);

  useEffect(() => {
    const updatedTotal = selectedVariations.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    setItemTotal(updatedTotal);
  }, [selectedVariations, setItemTotal]);

  // const handleVariationClick = (variation: any) => {
  //   setSelectedVariations((prev) => {
  //     const exists = prev.find((item) => item.variation._id === variation._id);
  //     if (exists) return prev;

  //     const price = variation.price.salePrice || variation.price.regularPrice;
  //     return [...prev, { variation, quantity: 1, totalPrice: price }];
  //   });
  // };
  const handleVariationClick = (variation: any) => {
    setSelectedVariations((prev) => {
      const exists = prev.find((item) => item.variation._id === variation._id);

      if (exists) {
        // If the variation is already selected, remove it
        return prev.filter((item) => item.variation._id !== variation._id);
      } else {
        // Otherwise, add it
        const price = variation.price.salePrice || variation.price.regularPrice;
        return [...prev, { variation, quantity: 1, totalPrice: price }];
      }
    });
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    setSelectedVariations((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice:
                newQuantity *
                (item.variation.price.salePrice ||
                  item.variation.price.regularPrice),
            }
          : item
      )
    );

    setItemTotal(newQuantity);
  };

  const removeVariation = (index: number) => {
    setSelectedVariations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className=" text-lg text-gray-800 md:text-2xl  font-bold text-center md:text-start">
        প্রোডাক্ট ডিটেইল
      </div>

      {/* Variations Selection */}
      {product?.variations && product.variations.length > 0 && (
        <div className="py-4">
          {Object.keys(product.variations[0].attributes).map((key) => (
            <div key={key} className="w-full my-2">
              <p className="text-gray-800  mb-2 text-center text-lg md:text-start ">
                আপনার প্রয়োজন অনুযায়ি ওয়ার্ড সিলেক্ট করুন
              </p>
              <hr className="h-3 border-gray-300 border-t-1" />
              <div className="flex flex-wrap my-2 text-gray-900">
                {product.variations.map((variation) => (
                  <button
                    key={variation._id}
                    onClick={() => handleVariationClick(variation)}
                    className={`m-1 py-1  px-3 border rounded-md text-sm md:text-base uppercase cursor-pointer ${
                      selectedVariations.some(
                        (v) => v.variation._id === variation._id
                      )
                        ? "bg-primary text-white"
                        : "bg-gray-100 border border-primary"
                    }`}
                  >
                    {Object.values(variation.attributes).join(", ")} <br />
                    <span className=" text-sm">
                      ৳
                      {variation.price.salePrice ||
                        variation.price.regularPrice}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display without Variations product */}
      {!product?.variations || product.variations.length === 0 ? (
        <div className="flex items-center gap-4 p-4 bg-[#F8F7F7] rounded-xl shadow-md">
          <Image
            src={`${config.base_url}/${product?.thumbnail?.src || ""}`}
            alt={product?.thumbnail?.alt || "Product image"}
            width={80}
            height={80}
            className="w-20 md:w-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <p className="font-bold text-sm md:text-lg text-black">
                {product?.title}
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-semibold text-primary">
                {totalExpenseState}/=
              </p>
              <SalesPageQuantity
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          </div>
        </div>
      ) : (
        selectedVariations.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 md:gap-4 p-1.5 md:p-4 bg-gray-100 rounded-xl shadow-md mt-4"
          >
            <Image
              src={`${config.base_url}/${product?.thumbnail?.src || ""}`}
              alt={product?.thumbnail?.alt || "Product image"}
              width={80}
              height={80}
              className="xms:w-[70px] xls:w-[70px] sm:w-20 md:w-24 rounded-lg object-cover"
            />
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="font-bold text-sm md:text-lg pt-3 text-black">
                  {product?.title}
                </p>

                <div className="flex space-x-3 text-sm md:text-base">
                  <p className="text-gray-600 mt-1">
                    {Object.values(item.variation.attributes).join(", ")}
                  </p>
                  <p className="text-gray-400 mt-1">|</p>
                  <p className="font-semibold text-primary mt-1">
                    ৳{item.totalPrice}
                  </p>
                </div>
              </div>

              <div className="space-y-3 my-auto ml-auto">
                {" "}
                {/* Push content to the right */}
                <div className="text-end">
                  <button
                    onClick={() => removeVariation(index)}
                    className="text-red-500 mt-1.5 hover:text-red-700"
                  >
                    <FaTrashAlt size={23} />
                  </button>
                </div>
                <div className="mt-2">
                  <SalesPageQuantity
                    quantity={item.quantity}
                    setQuantity={(newQuantity: number) =>
                      updateQuantity(index, newQuantity)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SalesPageOrderNow;

// <div
//             key={index}
//             className="flex items-center gap-2 md:gap-4 p-1.5 md:p-4 bg-gray-100 rounded-xl shadow-md mt-4"
//           >
//             <Image
//               src={${config.base_url}/${product?.thumbnail?.src || ""}}
//               alt={product?.thumbnail?.alt || "Product image"}
//               width={80}
//               height={80}
//               className=" xms:w-[70px] xls:w-[70px] sm:w-20 md:w-24 rounded-lg object-cover"
//             />
//             <div className="flex justify-start items-center">
//               <div>
//                 <p className="font-bold text-sm md:text-lg pt-3 text-black">
//                   {product?.title}
//                 </p>

//                 <div className="flex space-x-3 text-sm md:text-base ">
//                   <p className="text-gray-600 mt-1">
//                     {Object.values(item.variation.attributes).join(", ")}
//                   </p>
//                   <p className="text-gray-400 mt-1">|</p>
//                   <p className="font-semibold text-primary mt-1">
//                     ৳{item.totalPrice}
//                   </p>
//                 </div>
//               </div>
//               <div className="space-y-3 my-auto  ml-auto">
//                 <div className="text-end">
//                   <button
//                     onClick={() => removeVariation(index)}
//                     className="text-red-500 mt-1.5 hover:text-red-700"
//                   >
//                     <FaTrashAlt size={23} />
//                   </button>
//                 </div>
//                 <div className="mt-2">
//                   <SalesPageQuantity
//                     quantity={item.quantity}
//                     setQuantity={(newQuantity: number) =>
//                       updateQuantity(index, newQuantity)
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
