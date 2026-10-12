# Google Tag Manager (GTM) Web Container Setup & Troubleshooting Guide

This guide explains how to import and use the GTM container template file:  
`techmela-front/src/tracking/gtm-web-container-template.json`  
(also mirrored at `techmela-front/gtm-web-container-template.json`).

---

## 1. Resolution of Import Errors ("File format is invalid" & "Container to import is incompatible")

Google Tag Manager strictly enforces schema validation and internal fingerprinting when importing JSON containers:
1. **Schema Integrity**: GTM container exports require an authentic container structure with matching `exportFormatVersion: 2`, `usageContext: ["WEB"]`, and valid internal object types.
2. **Custom Template Requirement**: Tags that use Facebook/Meta Pixel rely on the sandboxed Custom Template (`cvt_5RM3Q` / `Meta Pixel`). If tags reference this type without the corresponding embedded `customTemplate` definition, GTM's import validator rejects the container as incompatible or invalid.
3. **Template Sourcing**: The current template has been constructed directly from the live, production-proven export structure (`pixlcart.demo.json`). It contains the complete official Meta Pixel sandboxed template, genuine tags, custom event triggers, built-in variables, and data layer variable mappings.

---

## 2. How to Import into Google Tag Manager

1. Open your [Google Tag Manager](https://tagmanager.google.com/) workspace.
2. Click **Admin** (in the top navigation bar).
3. Under the **Container** column (the right column), select **Import Container**.
4. Click **Choose container file** and select:
   ```
   techmela-front/src/tracking/gtm-web-container-template.json
   ```
5. Under **Choose workspace**:
   * Select **Existing** (choose your `Default Workspace`).
6. Under **Choose an import option**:
   * Select **Merge** > **Overwrite conflicting tags, triggers, and variables**.
   *(Merge will safely bring in the custom template, tags, triggers, and all DLVs without deleting any unrelated custom tags you might have created).*
7. Review the import summary and click **Confirm**.
8. In GTM under **Variables**, find the constant variable **`Meta Pixel =`** and update its value to your actual Facebook Pixel ID.
9. Click **Submit** > **Publish** to make your container live.

---

## 3. Container Components Overview

### A. Embedded Custom Template
* **`Meta Pixel`** (`cvt_5RM3Q`): Official sandboxed JavaScript template by Meta (Facebook Incubator), supporting automatic event parameter extraction, client-side consent, and Meta CAPI opt-in.

### B. Pre-Configured Meta Pixel Tags
1. **`Meta Pixel page_view`**: Fires on **All Pages** (Initial page load).
2. **`Meta Pixel view_content`**: Fires on custom event **`view_content`**.
3. **`Meta Pixel add_to_cart`**: Fires on custom event **`add_to_cart`**.
4. **`Meta Pixel initiate_checkout`**: Fires on custom event **`initiate_checkout`**.
5. **`Meta Pixel purchase`**: Fires on custom event **`purchase`** (extracts purchase value and currency).

### C. Custom Event Triggers
* `CE - view_content` (`view_content`)
* `CE - add_to_cart` (`add_to_cart`)
* `CE - initiate_checkout` (`initiate_checkout`)
* `CE - purchase` (`purchase`)
* `CE - add_to_wishlist` (`add_to_wishlist`)
* `CE - remove_from_cart` (`remove_from_cart`)
* `CE - search` (`search`)
* `CE - contact` (`contact`)
* `CE - complete_registration` (`complete_registration`)

### D. Data Layer Variables (All prefixed with `DLV - `)
The template includes 41 Data Layer Variables categorized into:

#### 1. Core & Transaction Variables
| GTM Variable Name | Data Layer Path | Description |
| :--- | :--- | :--- |
| `DLV - event_id` | `event_id` | Unique ID for Meta CAPI / Pixel deduplication |
| `DLV - event_time` | `event_time` | Timestamp when event occurred |
| `DLV - event_source_url` | `event_source_url` | Browser location URL |
| `DLV - action_source` | `action_source` | Set to `"website"` |
| `DLV - session_id` | `session_id` | User session identifier |
| `DLV - external_id` | `external_id` | Visitor/Customer unique ID |

#### 2. Custom Data Variables (Meta E-Commerce)
| GTM Variable Name | Data Layer Path | Description |
| :--- | :--- | :--- |
| `DLV - custom_data.order_id` | `custom_data.order_id` | Order / invoice ID |
| `DLV - custom_data.value` | `custom_data.value` | Numeric transaction value |
| `DLV - custom_data.currency` | `custom_data.currency` | ISO currency (`BDT`) |
| `DLV - custom_data.content_name` | `custom_data.content_name` | Product / content name |
| `DLV - custom_data.content_ids` | `custom_data.content_ids` | Array of product IDs |
| `DLV - custom_data.contents` | `custom_data.contents` | Detailed product items array |

#### 3. Standard E-Commerce Variables (GA4 Compatibility)
| GTM Variable Name | Data Layer Path | Description |
| :--- | :--- | :--- |
| `DLV - ecommerce.value` | `ecommerce.value` | Cart or order value |
| `DLV - ecommerce.currency` | `ecommerce.currency` | Currency code |
| `DLV - ecommerce.transaction_id` | `ecommerce.transaction_id` | Transaction identifier |
| `DLV - ecommerce.items` | `ecommerce.items` | Array of ecommerce items |

#### 4. Customer Identity & Advanced Matching Variables
| GTM Variable Name | Data Layer Path | Description |
| :--- | :--- | :--- |
| `DLV - user_data.email` | `user_data.email` | Customer email |
| `DLV - user_data.phone_number` | `user_data.phone_number` | Customer phone number |
| `DLV - user_data.first_name` | `user_data.first_name` | Customer first name |
| `DLV - user_data.last_name` | `user_data.last_name` | Customer last name |
| `DLV - user_data.address.city` | `user_data.address.city` | City |
| `DLV - user_data.address.region` | `user_data.address.region` | State / Region |
| `DLV - user_data.address.postal_code` | `user_data.address.postal_code` | Postal / Zip code |
| `DLV - user_data.address.country` | `user_data.address.country` | Country code (`bd`) |
| `DLV - user_data.address.street` | `user_data.address.street` | Street address |
| `DLV - user_data.fbc` | `user_data.fbc` | Facebook Click ID cookie |
| `DLV - user_data.fbp` | `user_data.fbp` | Facebook Browser ID cookie |
| `DLV - user_data.external_id` | `user_data.external_id` | External user ID |
| `DLV - user_data.em.0` ... `zp.0` | `user_data.*.0` | Hashed fallback arrays for Advanced Matching |

---

## 4. Frontend Code Alignment

The frontend builder (`techmela-front/src/tracking/gtm/gtm.builder.ts`) automatically formats every dataLayer push to supply **both**:
1. Top-level keys (`custom_data`, `ecommerce`, `user_data`, `event_id`, `event_time`, `event_source_url`, `action_source`) for the `pixlcart` container variables.
2. Nested `eventModel` for any native GA4 configuration.
