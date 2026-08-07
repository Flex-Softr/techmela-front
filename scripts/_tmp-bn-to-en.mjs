import fs from "fs";
import path from "path";

const root = process.cwd();

const files = [
  "src/app/(customer)/dashboard/_components/DashboardClient.tsx",
  "src/app/(customer)/orders/_components/OrdersClient.tsx",
  "src/app/(customer)/orders/_components/ProductDetails.tsx",
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

// Longer / more specific strings first
const pairs = [
  // Dashboard
  ["মোট অর্ডার", "Total orders"],
  ["সফল ডেলিভারি", "Successful deliveries"],
  ["পেন্ডিং অর্ডার", "Pending orders"],
  ["আসসালামু আলাইকুম,", "Hello,"],
  ["সম্মানিত গ্রাহক", "valued customer"],
  ["ShajGhorতে আপনাকে স্বাগতম।", "Welcome to ShajGhor."],
  ["অ্যাক্টিভ অ্যাকাউন্ট", "Active account"],
  ["ব্যক্তিগত তথ্য", "Personal information"],
  ["এডিট করুন", "Edit"],
  ["তথ্য নেই", "Not available"],
  ["শিপিং এড্রেস", "Shipping address"],
  ["কোন ঠিকানা যুক্ত করা নেই", "No address added"],
  ["সাম্প্রতিক অর্ডার", "Recent orders"],
  ["সবগুলো দেখুন", "View all"],
  ["লোড হচ্ছে...", "Loading..."],
  ["অর্ডার ID", "Order ID"],
  ["তারিখ", "Date"],
  ["অবস্থা", "Status"],
  ["পরিমাণ", "Amount"],
  ["এখনও কোনো অর্ডার করা হয়নি।", "No orders yet."],
  ['toLocaleDateString("bn-BD")', 'toLocaleDateString("en-US")'],
  ['toLocaleDateString(\n                                  "bn-BD",', 'toLocaleDateString(\n                                  "en-US",'],
  ['"bn-BD"', '"en-US"'],
  ["bn-BD", "en-US"],
  ["bn_BD", "en_US"],

  // Orders
  ["দয়া করে ফোন নম্বর দিন", "Please enter a phone number"],
  ["সঠিক ফোন নম্বর দিন (১১ ডিজিট)", "Enter a valid phone number (11 digits)"],
  ["অর্ডার খুঁজে পাওয়া যায়নি", "Order not found"],
  ["অর্ডার হিস্টোরি", "Order history"],
  ["আপনার পূর্বের সকল অর্ডার এখানে দেখা যাবে।", "All your previous orders will appear here."],
  ["মোট অর্ডার:", "Total orders:"],
  ["গেস্ট অর্ডার ট্র্যাক", "Guest order tracking"],
  ["আপনার ফোন নম্বর দিয়ে অর্ডার হিস্টোরি দেখুন", "View order history with your phone number"],
  ["খুঁজুন", "Search"],
  ["অর্ডার লোড হচ্ছে...", "Loading orders..."],
  ["মোট পরিমাণ", "Total amount"],
  ["অ্যাকশন", "Action"],
  ["বিস্তারিত", "Details"],
  ["কোনো অর্ডার পাওয়া যায়নি", "No orders found"],
  [
    "আপনার কোনো অর্ডার খুঁজে পাওয়া যায়নি। শপ থেকে আপনার পছন্দের পণ্য\n            অর্ডার করুন।",
    "We couldn't find any orders. Browse the shop and order your favorite products.",
  ],
  ["কেনাকাটা শুরু করুন", "Start shopping"],

  // Product details
  ["অর্ডারের তথ্য লোড হচ্ছে...", "Loading order details..."],
  ["অর্ডারে ফিরুন", "Back to orders"],
  ["অর্ডার ID:", "Order ID:"],
  ["অর্ডার সারসংক্ষেপ", "Order summary"],
  ["পেমেন্ট পদ্ধতি", "Payment method"],
  ["সাবটোটাল", "Subtotal"],
  ["শিপিং চার্জ", "Shipping charge"],
  ["ফোন:", "Phone:"],
  ["ইমেইল:", "Email:"],
  ["অর্ডার অবস্থা", "Order status"],
  ["অর্ডার ট্র্যাক করুন", "Track order"],
  ["এই অর্ডারের পণ্যসমূহ", "Products in this order"],
  ["পণ্য", "Product"],
  ["একক মূল্য", "Unit price"],
  ["মোট", "Total"],
  ["ফিরে যান", "Go back"],

  // Contact form
  ["আপনার নাম লিখুন", "Please enter your name"],
  ["নাম কমপক্ষে ২ অক্ষরের হতে হবে", "Name must be at least 2 characters"],
  ["নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারবে", "Name can be at most 50 characters"],
  ["সঠিক ইমেল লিখুন", "Please enter a valid email"],
  ["আপনার ইমেল লিখুন", "Please enter your email"],
  ["ইমেল সর্বোচ্চ ১০০ অক্ষরের হতে পারবে", "Email can be at most 100 characters"],
  ["আপনার ফোন নম্বর লিখুন", "Please enter your phone number"],
  ["ফোন নম্বর কমপক্ষে ১০ সংখ্যার হতে হবে", "Phone number must be at least 10 digits"],
  ["ফোন নম্বর সর্বোচ্চ ১৫ সংখ্যার হতে পারবে", "Phone number can be at most 15 digits"],
  ["বিষয় লিখুন", "Please enter a subject"],
  ["বিষয় কমপক্ষে ৩ অক্ষরের হতে হবে", "Subject must be at least 3 characters"],
  ["বিষয় সর্বোচ্চ ২০০ অক্ষরের হতে পারবে", "Subject can be at most 200 characters"],
  ["আপনার বার্তা লিখুন", "Please enter your message"],
  ["বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে", "Message must be at least 10 characters"],
  ["বার্তা সর্বোচ্চ ২০০০ অক্ষরের হতে পারবে", "Message can be at most 2000 characters"],
  ["সফল হয়েছে", "Success"],
  [
    "আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    "Your message has been sent successfully. We will contact you soon.",
  ],
  ["ব্যর্থ হয়েছে", "Failed"],
  [
    "দুঃখিত, বার্তা পাঠানো সম্ভব হয়নি। দয়া করে ইবার চেষ্টা করুন।",
    "Sorry, we couldn't send your message. Please try again.",
  ],
  [
    "দুঃখিত, বার্তা পাঠানো সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন।",
    "Sorry, we couldn't send your message. Please try again.",
  ],
  ["আমাদের মেসেজ দিন", "Send us a message"],
  ["নাম *", "Name *"],
  ["আপনার নাম", "Your name"],
  ["ফোন নম্বর *", "Phone number *"],
  ["আপনার ফোন নম্বর", "Your phone number"],
  ["ইমেল *", "Email *"],
  ["আপনার ইমেল", "Your email"],
  ["বিষয় *", "Subject *"],
  ["মেসেজের বিষয়", "Message subject"],
  ["মেসেজ *", "Message *"],
  ["/২০০০", "/2000"],
  ["আপনার বার্তা এখানে লিখুন...", "Write your message here..."],
  ["পাঠানো হচ্ছে...", "Sending..."],
  ["মেসেজ পাঠান", "Send message"],

  // Landing
  [
    "সর্বোচ্চ ডিসকাউন্ট মিস করতে না চাইলে এখনই অর্ডার করুন - একদম সহজ\n            রিটার্ন পলিসি - ২ হাজার টাকার বেশি অর্ডারে ডেলিভারি চার্জ ফ্রি",
    "Order now to get the best discount — easy return policy — free delivery on orders over ৳2000",
  ],
  ["হোয়াটসঅ্যাপ", "WhatsApp"],
  ["অর্ডার করুন", "Order now"],
  ["এখনই অর্ডার করুন", "Order now"],
  ["বিস্তারিত দেখুন", "See details"],
  ["আপনি পাচ্ছেন {discount}% ডিসকাউন্ট!", "You're getting {discount}% off!"],
  ["আপনার অর্ডার", "Your order"],
  ["বিশাল ছাড় চলছে!", "Huge discount available!"],
  ["পরিমাণ:", "Quantity:"],
  ["সবগুলো তথ্য সঠিকভাবে পূরণ করুন।", "Please fill in all details correctly."],
  ["অর্ডার প্রক্রিয়া হচ্ছে...", "Processing order..."],
  ["অর্ডার কনফার্ম করুন —", "Confirm order —"],
  ["সরাসরি কথা বলুন", "Talk to us directly"],
  [
    "অর্ডার করতে কোনো সমস্যা হলে নিচের নাম্বারে সরাসরি কল করুন",
    "If you have trouble ordering, call the number below",
  ],

  // Warranty
  ["ফোন নম্বর অবশ্যই সংখ্যার অংশ হতে হবে", "Phone number must contain only digits"],
  ["ফোন নম্বর ১১ টি সংখ্যা হতে হবে", "Phone number must be 11 digits"],
  ["পন্যের ওয়ারেন্টি কোডগুলি লিখুন", "Enter the product warranty codes"],
  ["অর্ডারকৃত ফোন নম্বরটি লিখুন", "Enter the phone number used for the order"],
  ["কোনো তথ্য পাওয়া যায়নি", "No information found"],
  ["আপনার পন্য নির্বাচন করুন", "Select your product"],
  ["পন্যের গায়ে থাকা ওয়ারেন্টি কোড দিয়ে পন্য বাছাই করুন", "Find your product using the warranty code on the package"],
  ["পন্যের ওয়ারেন্টি কোড", "Product warranty code"],
  [
    'একাধিক কোড দিতে কমা (,) ব্যবহার করুন এবং "অনুসন্ধান করুন"\n                  বাটনে ক্লিক করুন',
    'Use commas (,) for multiple codes and click "Search"',
  ],
  ["অনুসন্ধান করুন", "Search"],
  ["উক্ত পন্যের ওয়ারেন্টি নেই", "This product has no warranty"],
  ["বুঝতে অসুবিধা হলে নিচের ভিডিও দেখুনঃ-", "If you need help, watch the video below:"],
  ["নিচের শর্ত গুলোর সাপেক্ষে ওয়ারেন্টি দাবি করা যাবেঃ", "Warranty claims are subject to the following conditions:"],
  [
    "পণ্য ক্রয়ের তারিখ ও ক্রেতার নাম, মোবাইল নম্বর, ঠিকানা সঠিকভাবে\n            প্রদান করা আবশ্যক।",
    "Purchase date and the buyer's name, mobile number, and address must be provided correctly.",
  ],
  ["সঠিক পণ্য আইডি প্রদান করতে হবে।", "A valid product ID must be provided."],
  ["সমস্যার বর্ণনা প্রদান করা আবশ্যক।", "A description of the issue is required."],
  ["পণ্যের কোনো অধিকার সরিয়ে নেওয়া বা পরিবর্তন করা অনুমোদিত নয়।", "Removing or altering any product rights is not allowed."],
  ["ওয়ারেন্টি সার্ভিস এর জন্য নির্দিষ্ট সময়সীমা প্রদান করা হবে।", "A specific timeline will be provided for warranty service."],
  [
    "সকল অ্যাক্সেসরিজ, ডকুমেন্টেশন এবং প্যাকেজিং সম্পূর্ণ ও সঠিকভাবে\n            সাবধানে সংরক্ষিত থাকতে হবে।",
    "All accessories, documentation, and packaging must be kept complete and carefully preserved.",
  ],
  ["ওয়ারেন্টি দাবি ফর্ম", "Warranty claim form"],
  ["আপনার পন্যের সমস্যা বিস্তারিত জানান", "Describe your product issue in detail"],
  ["ক্রয়ের তথ্য", "Purchase information"],
  ["অডারকৃত মোবাইল নম্বর", "Order phone number"],
  ["সমস্যাটি বর্ণনা করুন", "Describe the issue"],
  ["বিস্তারিত বর্ণনা লিখুন...", "Write a detailed description..."],
  ["সমস্যার বিবরণ আবশ্যক", "Issue description is required"],
  ["প্রমাণাদি (ছবি/ভিডিও)", "Evidence (photos/videos)"],
  ["ক্রেতার তথ্য", "Customer information"],
  ["পূর্বের ঠিকানা ব্যবহার করুন", "Use previous address"],
  ["নতুন ঠিকানা দিন", "Enter a new address"],
  ["নতুন ঠিকানা দিন", "Enter a new address"],
  ["নাম প্রয়োজন", "Name is required"],
  ["মোবাইল নম্বর", "Mobile number"],
  ["মোবাইল নম্বর প্রয়োজন", "Mobile number is required"],
  ["সম্পূর্ণ ঠিকানা", "Full address"],
  ["ঠিকানা প্রয়োজন", "Address is required"],
  ["অনুরোধ সফলভাবে গ্রহণ করা হয়েছে", "Request received successfully"],
  [
    "আপনার অনুরোধটি গ্রহণ করা হয়েছে। আমাদের টেকনিক্যাল টিম আপনার\n                  সাথে যোগাযোগ করবে, ততক্ষণ পর্যন্ত অপেক্ষা করুন। ধন্যবাদ...",
    "Your request has been received. Our technical team will contact you. Please wait. Thank you.",
  ],

  // Blog / QnA / free pdfs
  ["বিউটি গাইড", "Beauty guides"],
  [
    "ShajGhorর বিউটি গাইড বিভাগে স্বাগতম! এখানে আপনি স্কিনকেয়ার, মেকআপ ও হেয়ারকেয়ার বিষয়ক বিভিন্ন ফ্রি বিউটি গাইড ডাউনলোড করতে পারবেন।",
    "Welcome to ShajGhor beauty guides! Download free guides on skincare, makeup, and haircare.",
  ],
  ["ডাউনলোড করুন", "Download"],
  ["বিউটি গাইড সংগ্রহ", "Beauty guide collection"],
  [
    "ShajGhorর পক্ষ থেকে আপনাদের জন্য কিছু বিশেষ ফ্রি বিউটি গাইড।\n                এগুলো ডাউনলোড করে পড়তে পারেন এবং অন্যদের সাথে শেয়ার করতে\n                পারেন।",
    "Special free beauty guides from ShajGhor. Download, read, and share them with others.",
  ],
  ["পিডিএফ খুঁজুন...", "Search PDFs..."],
  ["কোনো পিডিএফ পাওয়া যায়নি।", "No PDFs found."],
  ["`${liveCount.toLocaleString()} বার দেখা হয়েছে`", "`${liveCount.toLocaleString()} views`"],
  ["প্রশ্নোত্তর", "Q&A"],
  ['|| "প্রশ্ন"', '|| "Question"'],
  ["ট্যাগ", "Tags"],
  ["সম্পর্কিত প্রবন্ধ", "Related articles"],
  ["সম্পর্কিত প্রশ্ন", "Related questions"],
  ["প্রশ্ন ও উত্তর", "Questions & answers"],
  [
    "ShajGhorর প্রশ্ন ও উত্তর বিভাগে স্বাগতম! এখানে আপনি কসমেটিক্স ও বিউটি প্রোডাক্ট বিষয়ক প্রশ্নের স্পষ্ট এবং সংক্ষিপ্ত উত্তর পাবেন, যা বিভিন্ন বিষয় এবং টপিক অনুযায়ী সংগঠিত। আমাদের প্রশ্ন ও উত্তর বিভাগটি সৌন্দর্যপ্রেমীদের জন্য একটি মূল্যবান সম্পদ, যেখানে তারা সাধারণ প্রশ্নগুলির উত্তর খুঁজে পেতে পারেন। নতুন প্রশ্ন এবং আপডেটের জন্য আমাদের এই বিভাগটি নিয়মিত চেক করুন।",
    "Welcome to ShajGhor Q&A! Find clear, concise answers about cosmetics and beauty products, organized by topic. Check back regularly for new questions and updates.",
  ],
  ["কোনো প্রশ্ন পাওয়া যায়নি।", "No questions found."],
  [
    "`${SITE.nameBn}র ব্লগে স্বাগতম! এখানে পাবেন স্কিনকেয়ার, মেকআপ, হেয়ারকেয়ার ও পারফিউম বিষয়ক বিউটি টিপস, প্রোডাক্ট রিভিউ এবং সৌন্দর্যচর্চার জ্ঞানভিত্তিক নিবন্ধ।`",
    "`Welcome to the ${SITE.nameBn} blog! Find beauty tips, product reviews, and informative articles on skincare, makeup, haircare, and perfume.`",
  ],
  ["`${SITE.nameBn} ব্লগ`", "`${SITE.nameBn} Blog`"],
  ['name: "স্কিনকেয়ার"', 'name: "Skincare"'],
  ['name: "মেকআপ"', 'name: "Makeup"'],
  ['name: "হেয়ারকেয়ার"', 'name: "Haircare"'],
  ['name: "পারফিউম"', 'name: "Perfume"'],
  ['name: "বিউটি টিপস"', 'name: "Beauty tips"'],
  ['title: "ব্লগ | বিউটি টিপস ও গাইড"', 'title: "Blog | Beauty tips & guides"'],
  ['"বিউটি ব্লগ"', '"Beauty blog"'],
  ['"কসমেটিক্স প্রবন্ধ"', '"Cosmetics articles"'],
  ['"প্রোডাক্ট রিভিউ"', '"Product reviews"'],
  ['"স্কিনকেয়ার টিপস"', '"Skincare tips"'],
  ['"মেকআপ গাইড"', '"Makeup guides"'],
  ['"হেয়ারকেয়ার প্রবন্ধ"', '"Haircare articles"'],
  ["`ব্লগ | ${SITE.nameBn}`", "`Blog | ${SITE.nameBn}`"],
  ['alt: `${SITE.nameBn} ব্লগ`', 'alt: `${SITE.nameBn} Blog`'],
  ["ব্লগ", "Blog"],
  ['|| "প্রবন্ধ"', '|| "Article"'],
  ["{post.readTime} মিনিট", "{post.readTime} min"],
  ["সাধারণ জিজ্ঞাসা", "FAQ"],
  [
    'description="ShajGhorর ব্লগে স্বাগতম! এখানে আপনি স্কিনকেয়ার, মেকআপ, হেয়ারকেয়ার, পারফিউম বিষয়ক টিপস, প্রোডাক্ট গাইড এবং সৌন্দর্যপ্রেমীদের জন্য বিভিন্ন বিষয়ের উপর তথ্যপূর্ণ আর্টিকেল পাবেন। আমাদের ব্লগে বিউটি ও স্কিনকেয়ার সম্পর্কে গভীর অন্তর্দৃষ্টি এবং প্রাসঙ্গিক তথ্য শেয়ার করা হয়। নতুন আর্টিকেল এবং আপডেটের জন্য আমাদের ব্লগটি নিয়মিত চেক করুন。"',
    'description="Welcome to the ShajGhor blog! Find tips, product guides, and informative articles on skincare, makeup, haircare, and perfume. Check back regularly for new posts and updates."',
  ],
  ["কোনো ব্লগ পোস্ট পাওয়া যায়নি।", "No blog posts found."],
  ['placeholder="খুঁজুন..."', 'placeholder="Search..."'],
  ['title="ক্যাটাগরি"', 'title="Category"'],
  ["সকল", "All"],
  ['title="ট্যাগ"', 'title="Tags"'],
  ["{post.readTime} মিনিট", "{post.readTime} min"],
  ["বিস্তারিত পড়ুন", "Read more"],
  ['|| "প্রশ্নোত্তর"', '|| "Q&A"'],
  ["উত্তর পড়ুন", "Read answer"],
  ["পূর্ববর্তী", "Previous"],
  ["পৃষ্ঠা {page} / {meta.totalPage}", "Page {page} / {meta.totalPage}"],
  ["পরবর্তী", "Next"],
  ["নাম", "Name"],
  ["ইমেইল", "Email"],
  ["ফোন নম্বর", "Phone number"],
  ["ঠিকানা", "Address"],

  // Font classes
  [" font-hind-siliguri", ""],
  ["font-hind-siliguri ", ""],
  ["font-hind-siliguri", ""],
  [" font-bengali", ""],
  ["font-bengali ", ""],
  ["font-bengali", ""],
];

// Policy / about / contact / store - add more specific content
const longContentPairs = [
  // about-us metadata & content
  ['title: "আমাদের সম্পর্কে"', 'title: "About us"'],
  [
    "`${SITE.nameBn} বাংলাদেশের একটি নির্ভরযোগ্য অনলাইন কসমেটিক্স ব্র্যান্ড। মানসম্পন্ন স্কিনকেয়ার, মেকআপ, হেয়ারকেয়ার, পারফিউম ও বিউটি অ্যাক্সেসরিজ সরবরাহে আমরা নিবেদিত।`",
    "`${SITE.nameBn} is a trusted online cosmetics brand in Bangladesh. We provide quality skincare, makeup, haircare, perfume, and beauty accessories.`",
  ],
  ['"কসমেটিক্স ব্র্যান্ড বাংলাদেশ"', '"Cosmetics brand Bangladesh"'],
  ['"বিউটি প্রোডাক্ট শপ"', '"Beauty product shop"'],
  ['name: "হোম"', 'name: "Home"'],
  ['name: "আমাদের সম্পর্কে"', 'name: "About us"'],
  [
    "`${SITE.nameBn} কোন ধরনের পণ্য বিক্রি করে?`",
    "`What types of products does ${SITE.nameBn} sell?`",
  ],
  [
    "`${SITE.nameBn} মানসম্পন্ন স্কিনকেয়ার, মেকআপ, হেয়ারকেয়ার, পারফিউম ও বিউটি অ্যাক্সেসরিজ বিক্রি করে।`",
    "`${SITE.nameBn} sells quality skincare, makeup, haircare, perfume, and beauty accessories.`",
  ],
  [
    "`${SITE.nameBn}র পণ্যগুলো কি অথেনটিক?`",
    "`Are ${SITE.nameBn} products authentic?`",
  ],
  [
    "`হ্যাঁ, ${SITE.nameBn} শুধুমাত্র নির্ভরযোগ্য উৎস থেকে সংগ্রহীত অথেনটিক ও মানসম্পন্ন কসমেটিক্স পণ্য সরবরাহ করে।`",
    "`Yes, ${SITE.nameBn} supplies only authentic, quality cosmetics sourced from trusted suppliers.`",
  ],
  ['alt="আমাদের সম্পর্কে"', 'alt="About us"'],
  ["আমাদের সম্পর্কে", "About us"],
  ["`${SITE.nameBn}র যাত্রা`", "`${SITE.nameBn}'s journey`"],
  ["আমাদের যাত্রা", "Our journey"],
  ["নির্ভেজাল সৌন্দর্য <br />", "Authentic beauty <br />"],
  ["সবার কাছে পৌঁছে দেয়া", "delivered to everyone"],
  [
    "{SITE.nameBn} বাংলাদেশের কসমেটিক্স ও বিউটি ইন্ডাস্ট্রির একটি\n                নির্ভরযোগ্য নাম। আমাদের লক্ষ্য হলো অথেনটিক ও মানসম্পন্ন\n                স্কিনকেয়ার, মেকআপ ও বিউটি প্রোডাক্ট সহজলভ্য করা এবং প্রতিটি\n                গ্রাহকের সৌন্দর্যচর্চাকে নিরাপদ ও আনন্দময় করে তোলা।",
    "{SITE.nameBn} is a trusted name in Bangladesh's cosmetics and beauty industry. Our goal is to make authentic, quality skincare, makeup, and beauty products accessible, and to make every customer's beauty routine safe and enjoyable.",
  ],
  ["আমাদের কথা", "Our story"],
  [
    'গ্রাহকের আস্থাকে সবচেয়ে বেশি গুরুত্ব দিয়ে{" "}\n                <span className="text-primary font-medium">মানসম্পন্ন</span> ও\n                অথেনটিক পণ্য সরবরাহে নিবেদিত।',
    'We put customer trust first and are dedicated to supplying{" "}\n                <span className="text-primary font-medium">quality</span> and\n                authentic products.',
  ],
  ["আমাদের লক্ষ্য", "Our mission"],
  [
    "প্রতিটি গ্রাহকের কাছে সাশ্রয়ী মূল্যে অথেনটিক কসমেটিক্স ও\n                  বিউটি প্রোডাক্ট পৌঁছে দেওয়াই আমাদের মূল উদ্দেশ্য।",
    "Our main purpose is to deliver authentic cosmetics and beauty products to every customer at affordable prices.",
  ],
  ["বিশুদ্ধতা ও নির্ভরযোগ্যতা", "Purity & reliability"],
  [
    "নির্ভরযোগ্য উৎস থেকে সংগ্রহ করে আমরা বিশুদ্ধ ও মানসম্মত\n                  কসমেটিক্স পণ্য সরবরাহ করে আসছি।",
    "We source from trusted suppliers and deliver pure, quality cosmetics.",
  ],
  ["বিশুদ্ধতা", "Purity"],
  [
    "আমরা ত্বক ও চুলের জন্য নিরাপদ ও মানসম্পন্ন উপাদানযুক্ত পণ্য\n                  নির্বাচনে আপোষহীন।",
    "We are uncompromising when selecting products with safe, quality ingredients for skin and hair.",
  ],
  ["গুণগত মান", "Quality"],
  ["বিশেষজ্ঞদের যাচাই-বাছাইয়ে আমাদের প্রতিটি পণ্য নির্বাচিত হয়।", "Every product is selected through expert review."],
  ["আস্থা", "Trust"],
  ["গ্রাহকের আস্থা অর্জন ও ধরে রাখাই আমাদের ব্যবসার মূল ভিত্তি।", "Earning and keeping customer trust is the foundation of our business."],
  ["উৎকর্ষ", "Excellence"],
  [
    "আধুনিক প্যাকেজিং ও নিরাপদ ডেলিভারিতে মানসম্মত সেবা নিশ্চিত\n                  করাই আমাদের লক্ষ্য।",
    "Our goal is quality service with modern packaging and safe delivery.",
  ],
  ["সৌন্দর্যের যাত্রায় আমাদের{", "Join us on your beauty{"],
  ["সঙ্গী হোন", "journey"],
  ["পণ্যগুলো দেখুন", "Browse products"],

  // contact-us
  ['title: "যোগাযোগ করুন"', 'title: "Contact us"'],
  [
    "`${SITE.nameBn}র সাথে যোগাযোগ করুন। আপনার যেকোনো জিজ্ঞাসা, পরামর্শ বা সহায়তার জন্য আমরা সর্বদা প্রস্তুত। আমাদের ঠিকানা, ফোন নম্বর এবং ইমেল এখানে পাবেন।`",
    "`Contact ${SITE.nameBn}. We're always ready for your questions, feedback, or support. Find our address, phone number, and email here.`",
  ],
  ["`যোগাযোগ ${SITE.nameBn}`", "`Contact ${SITE.nameBn}`"],
  ['name: "যোগাযোগ"', 'name: "Contact"'],
  [
    'name: "সরাসরি পণ্য কেনার জন্য শো-রুম কোথায়?"',
    'name: "Where is the showroom for in-person purchases?"',
  ],
  [
    'text: "আমাদের শো-রুম ঢাকার বক্সনগর, সারুলিয়া, ডেমরা এলাকায় অবস্থিত। বিস্তারিত ঠিকানার জন্য স্টোর লোকেশন পেজ দেখুন।"',
    'text: "Our showroom is in Boxnagar, Sarulia, Demra, Dhaka. See the store location page for the full address."',
  ],
  ['name: "আপনাদের হেল্পলাইন নম্বর কত?"', 'name: "What is your helpline number?"'],
  [
    'text: "আমাদের হেল্পলাইন নম্বর হলো 01710020030 এবং 01710020030। যেকোনো প্রয়োজনে আমাদের কল করতে পারেন।"',
    'text: "Our helpline numbers are 01710020030 and 01710020030. Call us whenever you need help."',
  ],
  ['alt="যোগাযোগ করুন"', 'alt="Contact us"'],
  ["যোগাযোগ করুন", "Contact us"],
  [
    "আপনার যেকোনো জিজ্ঞাসা বা পরামর্শ আমাদের জানান। আমরা আপনার সেবায়\n            সর্বদা নিয়োজিত।",
    "Share any questions or feedback with us. We're always here to help.",
  ],
  ["তথ্য ও সহযোগিতা", "Information & support"],
  [
    "{SITE.nameBn} আপনার সৌন্দর্যচর্চার অভিজ্ঞতাকে সমৃদ্ধ করতে\n                  প্রতিশ্রুতিবদ্ধ। যেকোনো প্রয়োজনে নির্দ্বিধায় আমাদের সাথে\n                  যোগাযোগ করুন।",
    "{SITE.nameBn} is committed to enriching your beauty routine. Feel free to contact us anytime.",
  ],
  ["ফোন", "Phone"],
  ["সকাল ১০টা - রাত ১০টা (২৪/৭ সেবা)", "10 AM – 10 PM (24/7 support)"],
  ["ইমেল", "Email"],
  ["অনলাইন সাপোর্ট", "Online support"],
  ["সুরমেলা গলি, পূর্ব বক্সনগর, সারুলিয়া, ডেমরা, ঢাকা-১৩৬১", "Surmela Goli, East Boxnagar, Sarulia, Demra, Dhaka-1361"],
  ["সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত হোন", "Connect with us on social media"],

  // delivery policy
  ['alt="ডেলিভারি পলিসি"', 'alt="Delivery policy"'],
  ["ডেলিভারি পলিসি", "Delivery policy"],
  [
    "দ্রুত ও নিরাপদ ডেলিভারি আমাদের অঙ্গীকার। আমাদের শিপিং নীতিমালা\n            সম্পর্কে বিস্তারিত জানুন।",
    "Fast and safe delivery is our promise. Learn more about our shipping policy.",
  ],
  ["ডেলিভারি এলাকা", "Delivery areas"],
  [
    "ShajGhor বর্তমানে সমগ্র বাংলাদেশে হোম ডেলিভারি সেবা প্রদান করছে।\n            ঢাকার ভিতরে এবং ঢাকার বাইরে যেকোনো প্রান্তে আমরা আমাদের পণ্য\n            বিশ্বস্ত কুরিয়ার সার্ভিসের মাধ্যমে নিরাপদভাবে পৌঁছে দিতে\n            প্রতিশ্রুতিবদ্ধ।",
    "ShajGhor currently offers home delivery across Bangladesh. Inside and outside Dhaka, we deliver products safely through trusted courier services.",
  ],
  ["ডেলিভারি চার্জ", "Delivery charges"],
  [
    "বিশেষ অফার বা প্রমোশনের ক্ষেত্রে ডেলিভারি চার্জ পরিবর্তিত হতে\n              পারে।",
    "Delivery charges may change during special offers or promotions.",
  ],
  ["ডেলিভারি সময়সীমা", "Delivery timeline"],
  ["ঢাকার ভিতরে:", "Inside Dhaka:"],
  ["২৪ - ৪৮ ঘণ্টা", "24 – 48 hours"],
  ["ঢাকার বাইরে:", "Outside Dhaka:"],
  ["৩ - ৫ কার্যদিবস", "3 – 5 business days"],
  [
    "অনিবার্য কারণে বা দুর্যোগপূর্ণ আবহাওয়াতে সময় কিছুটা বেশি লাগতে\n              পারে।",
    "Delivery may take longer due to unforeseen circumstances or severe weather.",
  ],
  ["সুরক্ষিত প্যাকেজিং", "Secure packaging"],
  [
    "আপনার পণ্য যেন সুরক্ষিত ও অক্ষত থাকে, সেজন্য আমরা আন্তর্জাতিক\n                মানের প্যাকেজিং নিশ্চিত করি। প্রতিটি পণ্য বাবল র‍্যাপ এবং মজবুত\n                বক্সে প্যাক করা হয়।",
    "We use international-standard packaging so your products arrive safe and intact. Every item is packed with bubble wrap in a sturdy box.",
  ],
  ["অর্ডার ট্র্যাকিং", "Order tracking"],
  [
    "আপনার অর্ডারের বর্তমান অবস্থা যেকোনো সময় জানতে আমাদের ট্র্যাকিং\n                সিস্টেম ব্যবহার করুন। বা আমাদের হেল্পলাইনে কল করুন।",
    "Use our tracking system anytime to check your order status, or call our helpline.",
  ],
  ["অর্ডার ট্র্যাক করুন →", "Track order →"],
  ["আরও তথ্যের জন্য আমাদের হেল্পলাইনে যোগাযোগ করুন", "Contact our helpline for more information"],

  // return policy
  ['alt="রিটার্ন পলিসি"', 'alt="Return policy"'],
  ["রিটার্ন পলিসি", "Return policy"],
  [
    "গ্রাহক সন্তুষ্টি আমাদের মূল লক্ষ্য। আমাদের পণ্য ফেরতের নিয়মাবলী\n            নিচে বিস্তারিত দেওয়া হলো।",
    "Customer satisfaction is our top priority. Our return rules are detailed below.",
  ],
  ["ভূমিকা", "Introduction"],
  [
    "প্রিয় গ্রাহক! ShajGhor গ্রাহকদের সর্বোত্তম সেবা নিশ্চিত করার জন্য\n            প্রতিশ্রুতিবদ্ধ। আমরা চাই আপনি আমাদের পণ্য কিনে সন্তুষ্ট হোন। তবে\n            কোনো কারণে যদি আপনাকে পণ্য ফেরত দিতে হয়, তাহলে এই নীতিমালা আপনাকে\n            সঠিক পদ্ধতি সম্পর্কে জানাবে।",
    "Dear customer! ShajGhor is committed to excellent service. We want you to be happy with your purchase. If you need to return a product, this policy explains the correct process.",
  ],
  ["রিটার্নের সময়সীমা", "Return window"],
  [
    'পণ্যটি পাওয়ার{" "}\n              <span className="text-primary font-bold">২৪ ঘণ্টার</span> মধ্যে\n              রিটার্নের জন্য আবেদন করতে হবে। সময়ের ব্যাপারে সচেতন থাকা জরুরি।',
    'You must request a return within{" "}\n              <span className="text-primary font-bold">24 hours</span> of\n              receiving the product. Please be mindful of the deadline.',
  ],
  ["পণ্য ফেরতের পদ্ধতি", "How to return"],
  [
    "পণ্য ফেরত দেওয়ার জন্য উপযুক্ত কারণ উল্লেখ করে আমাদের কাস্টমার\n              কেয়ারে দ্রুত যোগাযোগ করুন এবং আমাদের গাইডলাইন অনুসরণ করুন।",
    "Contact customer care promptly with a valid reason and follow our guidelines to return a product.",
  ],
  ["কখন পণ্য ফেরত নেয়া হবে:", "When we accept returns:"],
  [
    '"দোষপূর্ণ পণ্য: প্যাকেজিং বা প্রোডাক্টে উৎপাদনগত ত্রুটি থাকলে।"',
    '"Defective product: manufacturing faults in packaging or the product."',
  ],
  [
    '"ভুল পণ্য: অর্ডার করা পণ্যের বদলে অন্য পণ্য পাঠানো হলে।"',
    '"Wrong product: a different item was sent than what you ordered."',
  ],
  [
    '"ক্ষতিগ্রস্ত পণ্য: ডেলিভারির সময় প্যাকেট ছিঁড়ে গেলে বা পণ্য নষ্ট হলে।"',
    '"Damaged product: packaging torn or product damaged during delivery."',
  ],
  ["কখন ফেরত নেয়া হবে না:", "When we do not accept returns:"],
  [
    '"পণ্যের সিল বা মোড়ক খোলা কিংবা ব্যবহৃত হলে (হাইজিনের কারণে)।"',
    '"Seal or packaging opened, or product used (for hygiene reasons)."',
  ],
  [
    '"পণ্যের মূল প্যাকেজিং ক্ষতিগ্রস্ত বা হারানো গেলে।"',
    '"Original packaging damaged or missing."',
  ],
  [
    '"নির্ধারিত ২৪ ঘণ্টা সময় পার হওয়ার পর আবেদন করলে।"',
    '"Return requested after the 24-hour window."',
  ],
  [
    '"সেলের আইটেম বা বিশেষ অফারে কেনা পণ্য।"',
    '"Sale items or products purchased under special offers."',
  ],
  ["টাকা রিফান্ড প্রক্রিয়া", "Refund process"],
  [
    'রিটার্ন পণ্যটি আমাদের হাতে পৌঁছানোর পর পরীক্ষা করে{" "}\n              <span className="text-primary font-bold">\n                ৩ কার্যদিবসের\n              </span>{" "}\n              মধ্যে আপনার পেমেন্ট ফেরত দেওয়া হবে। রিফান্ডের জন্য আপনি যে পেমেন্ট\n              পদ্ধতি ব্যবহার করেছেন, সম্ভবত সেই মাধ্যমেই টাকা ফেরত দেয়া হবে।',
    'After we receive and inspect the returned product, your payment will be refunded within{" "}\n              <span className="text-primary font-bold">\n                3 business days\n              </span>\n              . Refunds are usually issued to the same payment method you used.',
  ],
  ["আরও তথ্যের জন্য", "For more information"],

  // store location
  ['title: "স্টোর লোকেশন"', 'title: "Store location"'],
  [
    "`${SITE.nameBn}র শোরুমের ঠিকানা এবং ম্যাপ লোকেশন। সরাসরি আমাদের শোরুম থেকে প্রিয় কসমেটিক্স ও বিউটি পণ্যগুলো সংগ্রহ করতে ডেমরা, ঢাকাস্থ আমাদের লোকেশনে চলে আসুন।`",
    "`${SITE.nameBn} showroom address and map location. Visit us in Demra, Dhaka to collect your favorite cosmetics and beauty products in person.`",
  ],
  ["`${SITE.nameBn} শোরুম`", "`${SITE.nameBn} showroom`"],
  ['"বক্সনগর সারুলিয়া ডেমরা ঢাকা"', '"Boxnagar Sarulia Demra Dhaka"'],
  ['name: "স্টোর লোকেশন"', 'name: "Store location"'],
  ['alt="স্টোর লোকেশন"', 'alt="Store location"'],
  ["স্টোর লোকেশন", "Store location"],
  [
    "{SITE.nameBn}র পণ্য সরাসরি সংগ্রহ করতে আমাদের ঠিকানায় চলে আসুন।",
    "Visit our address to collect {SITE.nameBn} products in person.",
  ],
  ["আমাদের ঠিকানা", "Our address"],
  ["শোরুমের ঠিকানা", "Showroom address"],
  ["হেল্পলাইন", "Helpline"],
  ["সোশ্যাল মিডিয়া", "Social media"],
];

const allPairs = [...longContentPairs, ...pairs].sort(
  (a, b) => b[0].length - a[0].length
);

let changed = 0;
for (const rel of files) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.log("MISSING", rel);
    continue;
  }
  let content = fs.readFileSync(full, "utf8");
  const before = content;
  for (const [from, to] of allPairs) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
    }
  }
  // tidy trailing spaces in classNames from font removal
  content = content.replace(/ className="([^"]*?)\s+"/g, (_, c) => {
    const trimmed = c.trim();
    return trimmed ? ` className="${trimmed}"` : "";
  });
  content = content.replace(/className=\{`([^`]*?)\s+`\}/g, "className={`$1`}");
  if (content !== before) {
    fs.writeFileSync(full, content, "utf8");
    changed++;
    console.log("UPDATED", rel);
  } else {
    console.log("NOCHANGE", rel);
  }
}
console.log("Done. Files changed:", changed);
