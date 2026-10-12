# Google Tag Manager (GTM) Web Container Setup & Troubleshooting Guide

This guide explains how to import the GTM container template file:  
`techmela-front/src/tracking/gtm-web-container-template.json`

---

## 1. Why Did GTM Show "File format is invalid"?

Google Tag Manager has strict internal schema validation when importing JSON files:
1. **Missing Container Metadata**: GTM requires version-2 metadata attributes including `container.features`, `container.tagIds`, `containerVersionId`, `tagManagerUrl`, and internal `fingerprint` hashes.
2. **Missing Variable & Trigger Properties**: Every variable must include `formatValue: {}` and `fingerprint`.
3. **Improper File Saving**: If a JSON file is copied and saved from a browser view or rich text editor, encoding characters (BOM, smart quotes, HTML wrappers) cause parser failure.

The updated `gtm-web-container-template.json` has been rebuilt to strictly comply with the official GTM Export Format (v2) schema with all required container features, folder categories, and internal hashes.

---

## 2. How to Import the Container into GTM

1. Open your [Google Tag Manager](https://tagmanager.google.com/) workspace.
2. Go to **Admin** (top navigation bar).
3. Under the **Container** column (right column), click **Import Container**.
4. Click **Choose container file** and select:
   ```
   techmela-front/src/tracking/gtm-web-container-template.json
   ```
5. Under **Choose workspace**:
   * Select **Existing** (choose your default workspace).
6. Under **Choose an import option**:
   * Select **Merge** > **Overwrite conflicting tags, triggers, and variables**.
     *(Using Merge ensures your existing tags or settings are safely preserved while adding the 70 DLVs and 10 triggers).*
7. Review the import summary preview and click **Confirm**.

---

## 3. Organized Folder Structure in GTM

To keep your GTM workspace clean, the variables and triggers are automatically organized into 5 folders:

1. **`DLV - Core & Transaction`**: Event ID, Event Time, Source URL, Order ID, Transaction ID, Status.
2. **`DLV - Ecommerce & Catalog`**: Value, Currency, Content IDs, Content Type, Content Name, Items array, Tax, Shipping, Coupon, Payment Method, Search Term.
3. **`DLV - Customer Identity & Matching`**: User Email, User Phone, External ID, Gender, DOB, FBP, FBC, FB Login ID.
4. **`DLV - Address & Location`**: First Name, Last Name, City, Region, Postal Code, Country.
5. **`Custom Event Triggers`**: Triggers for all application events.

---

## 4. Complete Variable Mapping Table (70 DLVs)

### Folder 1: Core & Transaction
| GTM Variable Name | Data Layer Variable Path | Purpose |
| :--- | :--- | :--- |
| `DLV - eventModel.event_id` | `eventModel.event_id` | Unique Event ID for Deduplication |
| `DLV - Event ID` | `eventModel.event_id` | Friendly alias for Event ID |
| `DLV - eventModel.event_time` | `eventModel.event_time` | Unix event timestamp |
| `DLV - Event Time` | `eventModel.event_time` | Friendly alias for event time |
| `DLV - eventModel.event_source_url` | `eventModel.event_source_url` | Page URL when event fired |
| `DLV - Event Source URL` | `eventModel.event_source_url` | Friendly alias for source URL |
| `DLV - eventModel.order_id` | `eventModel.order_id` | Internal store order ID |
| `DLV - Order ID` | `eventModel.order_id` | Friendly alias for Order ID |
| `DLV - eventModel.transaction_id` | `eventModel.transaction_id` | Ecommerce transaction ID |
| `DLV - Transaction ID` | `eventModel.transaction_id` | Friendly alias for transaction ID |
| `DLV - eventModel.status` | `eventModel.status` | Order / event status |
| `DLV - Status` | `eventModel.status` | Friendly alias for status |

### Folder 2: Ecommerce & Catalog
| GTM Variable Name | Data Layer Variable Path | Purpose |
| :--- | :--- | :--- |
| `DLV - eventModel.value` | `eventModel.value` | Total numeric purchase/cart value |
| `DLV - Value` | `eventModel.value` | Friendly alias for value |
| `DLV - eventModel.currency` | `eventModel.currency` | Currency code (`BDT`) |
| `DLV - Currency` | `eventModel.currency` | Friendly alias for currency |
| `DLV - eventModel.num_items` | `eventModel.num_items` | Total item count |
| `DLV - Num Items` | `eventModel.num_items` | Friendly alias for num items |
| `DLV - eventModel.content_type` | `eventModel.content_type` | Content type (`product`) |
| `DLV - Content Type` | `eventModel.content_type` | Friendly alias for content type |
| `DLV - eventModel.content_ids` | `eventModel.content_ids` | Array of product IDs |
| `DLV - Content IDs` | `eventModel.content_ids` | Friendly alias for content IDs |
| `DLV - eventModel.content_name` | `eventModel.content_name` | Title / name of item |
| `DLV - Content Name` | `eventModel.content_name` | Friendly alias for content name |
| `DLV - eventModel.content_category` | `eventModel.content_category` | Primary category |
| `DLV - Content Category` | `eventModel.content_category` | Friendly alias for category |
| `DLV - eventModel.items` | `eventModel.items` | Full items array for GA4 & Meta |
| `DLV - Items` | `eventModel.items` | Friendly alias for items array |
| `DLV - eventModel.shipping` | `eventModel.shipping` | Shipping fee |
| `DLV - Shipping Cost` | `eventModel.shipping` | Friendly alias for shipping fee |
| `DLV - eventModel.tax` | `eventModel.tax` | Tax fee |
| `DLV - Tax` | `eventModel.tax` | Friendly alias for tax fee |
| `DLV - eventModel.discount_value` | `eventModel.discount_value` | Discount amount |
| `DLV - Discount Value` | `eventModel.discount_value` | Friendly alias for discount |
| `DLV - eventModel.coupon` | `eventModel.coupon` | Coupon code applied |
| `DLV - Coupon` | `eventModel.coupon` | Friendly alias for coupon |
| `DLV - eventModel.payment_method` | `eventModel.payment_method` | Payment method (e.g. `cod`, `bkash`) |
| `DLV - Payment Method` | `eventModel.payment_method` | Friendly alias for payment method |
| `DLV - eventModel.search_term` | `eventModel.search_term` | Search keyword string |
| `DLV - Search Term` | `eventModel.search_term` | Friendly alias for search term |

### Folder 3: Customer Identity & Advanced Matching
| GTM Variable Name | Data Layer Variable Path | Purpose |
| :--- | :--- | :--- |
| `DLV - eventModel.user_data` | `eventModel.user_data` | Complete user data object |
| `DLV - eventModel.user_data.email_address` | `eventModel.user_data.email_address` | Customer email |
| `DLV - User Email` | `eventModel.user_data.email_address` | Friendly alias for email |
| `DLV - eventModel.user_data.phone_number` | `eventModel.user_data.phone_number` | Customer phone number |
| `DLV - User Phone` | `eventModel.user_data.phone_number` | Friendly alias for phone number |
| `DLV - eventModel.user_data.external_id` | `eventModel.user_data.external_id` | Persistent external / user ID |
| `DLV - External ID` | `eventModel.user_data.external_id` | Friendly alias for external ID |
| `DLV - eventModel.user_data.gender` | `eventModel.user_data.gender` | Gender (`m` or `f`) |
| `DLV - Gender` | `eventModel.user_data.gender` | Friendly alias for gender |
| `DLV - eventModel.user_data.dob` | `eventModel.user_data.dob` | Date of birth |
| `DLV - DOB` | `eventModel.user_data.dob` | Friendly alias for DOB |
| `DLV - eventModel.user_data.fbp` | `eventModel.user_data.fbp` | Meta `_fbp` browser cookie |
| `DLV - FBP` | `eventModel.user_data.fbp` | Friendly alias for FBP |
| `DLV - eventModel.user_data.fbc` | `eventModel.user_data.fbc` | Meta `_fbc` click cookie |
| `DLV - FBC` | `eventModel.user_data.fbc` | Friendly alias for FBC |
| `DLV - eventModel.user_data.fb_login_id` | `eventModel.user_data.fb_login_id` | Facebook login ID |
| `DLV - FB Login ID` | `eventModel.user_data.fb_login_id` | Friendly alias for FB login ID |

### Folder 4: Address & Location
| GTM Variable Name | Data Layer Variable Path | Purpose |
| :--- | :--- | :--- |
| `DLV - eventModel.user_data.address` | `eventModel.user_data.address` | Complete address object |
| `DLV - eventModel.user_data.address.first_name` | `eventModel.user_data.address.first_name` | First name |
| `DLV - First Name` | `eventModel.user_data.address.first_name` | Friendly alias for first name |
| `DLV - eventModel.user_data.address.last_name` | `eventModel.user_data.address.last_name` | Last name |
| `DLV - Last Name` | `eventModel.user_data.address.last_name` | Friendly alias for last name |
| `DLV - eventModel.user_data.address.city` | `eventModel.user_data.address.city` | City / District |
| `DLV - City` | `eventModel.user_data.address.city` | Friendly alias for city |
| `DLV - eventModel.user_data.address.region` | `eventModel.user_data.address.region` | Region / Division |
| `DLV - Region` | `eventModel.user_data.address.region` | Friendly alias for region |
| `DLV - eventModel.user_data.address.postal_code` | `eventModel.user_data.address.postal_code` | Zip / Postal code |
| `DLV - Postal Code` | `eventModel.user_data.address.postal_code` | Friendly alias for postal code |
| `DLV - eventModel.user_data.address.country` | `eventModel.user_data.address.country` | Country code (`bd`) |
| `DLV - Country` | `eventModel.user_data.address.country` | Friendly alias for country |

---

## 5. Custom Event Triggers (Folder 5)

| Trigger Name | Event Type | Matching Rule |
| :--- | :--- | :--- |
| `Custom Event - custom_page_view` | Custom Event | `{{_event}} equals custom_page_view` |
| `Custom Event - view_content` | Custom Event | `{{_event}} equals view_content` |
| `Custom Event - add_to_cart` | Custom Event | `{{_event}} equals add_to_cart` |
| `Custom Event - initiate_checkout` | Custom Event | `{{_event}} equals initiate_checkout` |
| `Custom Event - purchase` | Custom Event | `{{_event}} equals purchase` |
| `Custom Event - search` | Custom Event | `{{_event}} equals search` |
| `Custom Event - add_to_wishlist` | Custom Event | `{{_event}} equals add_to_wishlist` |
| `Custom Event - add_payment_info` | Custom Event | `{{_event}} equals add_payment_info` |
| `Custom Event - refund` | Custom Event | `{{_event}} equals refund` |
| `Custom Event - All App Events (Regex)` | Custom Event | Regex matching all 9 events above |
