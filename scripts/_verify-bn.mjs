import fs from "fs";

const files = [
  "src/app/(customer)/auth/login/components/LoginForm.tsx",
  "src/app/(customer)/auth/registration/component/RegisterForm.tsx",
  "src/app/(customer)/auth/forget-password/component/ForgetPassForm.tsx",
  "src/app/(customer)/auth/reset-password/component/ResetPasswordForm.tsx",
  "src/app/(customer)/auth/change-password/component/ChangePassForm.tsx",
  "src/app/(customer)/_components/Sidebar.tsx",
  "src/app/(customer)/_components/CustomerProtection.tsx",
  "src/app/(customer)/my-account/page.tsx",
  "src/app/(customer)/my-account/components/DefaultShippingAddress.tsx",
  "src/app/(customer)/my-account/components/ContactInformation.tsx",
  "src/app/(customer)/edit-account/components/EditAccountForm.tsx",
  "src/app/(customer)/dashboard/_components/DashboardClient.tsx",
  "src/app/(customer)/orders/_components/OrdersClient.tsx",
  "src/app/(customer)/orders/_components/ProductDetails.tsx",
  "src/app/(customer)/layout.tsx",
  "src/app/(customer)/orders/[id]/page.tsx",
  "src/app/(public)/about-us/page.tsx",
  "src/app/(public)/contact-us/page.tsx",
  "src/app/(public)/contact-us/components/ContactForm.tsx",
  "src/app/(public)/delivery-policy/page.tsx",
  "src/app/(public)/return-policy/page.tsx",
  "src/app/(public)/store-location/page.tsx",
  "src/app/(public)/free-pdfs/page.tsx",
  "src/app/(public)/blog/page.tsx",
  "src/app/(public)/blog/metadata.ts",
  "src/app/(public)/blog/[categorySlug]/[topicSlug]/[slug]/page.tsx",
  "src/app/(public)/questions/page.tsx",
  "src/app/(public)/questions/[topicSlug]/[slug]/page.tsx",
  "src/app/(public)/_components/blog-qna/BlogQnaCards.tsx",
  "src/app/(public)/_components/blog-qna/ViewCount.tsx",
  "src/app/(public)/warranty/find-your-product/components/searchProduct/SearchProduct.tsx",
  "src/app/(public)/warranty/find-your-product/components/productsTable/ProductsTable.tsx",
  "src/app/(public)/warranty/find-your-product/components/conditions/Conditions.tsx",
  "src/app/(public)/warranty/find-your-product/components/ProductRow/productRow.tsx",
  "src/app/(public)/warranty/find-your-product/components/instructionVideo/InstructionVideo.tsx",
  "src/app/(public)/warranty/claim-your-warranty/components/WarrantyForm.tsx",
  "src/app/(landing-page)/_components/AnnouncementBar.tsx",
  "src/app/(landing-page)/_components/SalesHeader.tsx",
  "src/app/(landing-page)/_components/CTAButtonGroup.tsx",
  "src/app/(landing-page)/_components/SalesOrderForm.tsx",
  "src/app/(landing-page)/_components/PricingDisplay.tsx",
];

let issues = 0;
for (const f of files) {
  if (!fs.existsSync(f)) {
    console.log("MISSING", f);
    issues++;
    continue;
  }
  let c = fs.readFileSync(f, "utf8");
  const cleaned = c.replace(/ className="([^"]*?)\s+"/g, (_, inner) => {
    const t = inner.trim();
    return t ? ` className="${t}"` : "";
  });
  if (cleaned !== c) {
    fs.writeFileSync(f, cleaned);
    c = cleaned;
  }
  const bn = [...c.matchAll(/[\u0980-\u09FF]/g)]
    .map((m) => m[0])
    .filter((ch) => ch !== "৳");
  if (bn.length) {
    console.log("BENGALI", f, bn.slice(0, 12).join(""));
    issues++;
  }
  if (/font-hind-siliguri|font-bengali/.test(c)) {
    console.log("FONT", f);
    issues++;
  }
}
console.log(issues === 0 ? "ALL CLEAR" : `ISSUES ${issues}`);
