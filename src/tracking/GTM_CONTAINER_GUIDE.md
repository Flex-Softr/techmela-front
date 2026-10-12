# Google Tag Manager (GTM) Web Container Setup & Troubleshooting Guide

This guide explains how to import and use the GTM container template file:  
`techmela-front/src/tracking/gtm-web-container-template.json`  
(also mirrored at `techmela-front/gtm-web-container-template.json`).

---

## 1. Resolution of Variables & `eventModel.*` Mapping

The application pushes all tracking and ecommerce payloads nested within `eventModel`, for example:
```javascript
{
  event: "add_to_cart",
  eventModel: {
    event_id: "add_to_cart_1791785742644_ox9ykav",
    event_time: 1791785742,
    content_name: "SX21 Magic Wireless Microphone",
    content_ids: ["6ac8ed651683995ddc216850"],
    content_type: "product",
    content_category: "Microphone",
    num_items: 1,
    value: 850,
    currency: "BDT",
    event_source_url: "https://techmela.com.bd/product/sx21-magic-wireless-microphone-lis9f",
    items: [
      {
        item_id: "6ac8ed651683995ddc216850",
        item_name: "SX21 Magic Wireless Microphone",
        item_category: "Microphone",
        price: 850,
        quantity: 1
      }
    ],
    user_data: {
      address: { country: "bd" },
      external_id: "guest_1791784281889_p5s5d5p",
      fbp: "fb.1.1791784281919.1907573395"
    }
  }
}
```

In Google Tag Manager, to read any nested property from `eventModel`, the **Data Layer Variable Name** MUST be prefixed with `eventModel.` (such as `eventModel.content_name` instead of `content_name`).

The regenerated container template configures:
1. **Explicit Full-Path Variables**: `DLV - eventModel.<property>` (pointing directly to `eventModel.<property>`).
2. **Short-Name Aliases**: `DLV - <property>` (such as `DLV - content_name`, `DLV - value`, `DLV - currency`, `DLV - event_id`, all pointing to `eventModel.<property>`).
3. **Legacy Aliases**: `DLV - custom_data.*` and `DLV - ecommerce.*` (updated to point directly to `eventModel.<property>` as well, so existing tags never resolve to `undefined`).

---

## 2. How to Import into Google Tag Manager

1. Open your [Google Tag Manager](https://tagmanager.google.com/) workspace.
2. Click **Admin** (in the top navigation bar).
3. Under the **Container** column (the right column), select **Import Container**.
4. Click **Choose container file** and select:
   ```
   techmela-front/gtm-web-container-template.json
   ```
   *(or `techmela-front/src/tracking/gtm-web-container-template.json`)*
5. Under **Choose workspace**:
   * Select **Existing** (choose your `Default Workspace`).
6. Under **Choose an import option**:
   * Select **Merge** > **Overwrite conflicting tags, triggers, and variables**.
   *(Merge will safely update the variables, tags, triggers, and custom template without deleting unrelated tags).*
7. Review the import summary and click **Confirm**.
8. In GTM under **Variables**, find the constant variable **`Meta Pixel =`** and update its value to your actual Facebook Pixel ID.
9. Click **Submit** > **Publish** to make your container live.

---

## 3. Container Components Overview

### A. Pre-Configured Meta Pixel Tags (Pre-wired with `eventModel.*` & `event_id`)
1. **`Meta Pixel page_view`**: Fires on **All Pages** (`PageView`).
2. **`Meta Pixel view_content`**: Fires on custom event **`view_content`**.
   * Sends `eventId`: `{{DLV - eventModel.event_id}}`
   * Object properties: `content_name`, `content_ids`, `content_type`, `content_category`, `value`, `currency`.
3. **`Meta Pixel add_to_cart`**: Fires on custom event **`add_to_cart`**.
   * Sends `eventId`: `{{DLV - eventModel.event_id}}`
   * Object properties: `content_name`, `content_ids`, `content_type`, `content_category`, `value`, `currency`, `num_items`.
4. **`Meta Pixel initiate_checkout`**: Fires on custom event **`initiate_checkout`**.
   * Sends `eventId`: `{{DLV - eventModel.event_id}}`
   * Object properties: `content_ids`, `content_type`, `value`, `currency`, `num_items`.
5. **`Meta Pixel purchase`**: Fires on custom event **`purchase`**.
   * Sends `eventId`: `{{DLV - eventModel.event_id}}`
   * Object properties: `value`, `currency`, `content_name`, `content_ids`, `content_type`, `num_items`, `order_id`.
6. **`Meta Pixel add_to_wishlist`**: Fires on custom event **`add_to_wishlist`**.
   * Sends `eventId`: `{{DLV - eventModel.event_id}}`
   * Object properties: `content_name`, `content_ids`, `value`, `currency`.
7. **`Meta Pixel search`**: Fires on custom event **`search`**.
   * Sends `eventId`: `{{DLV - eventModel.event_id}}`
   * Object properties: `search_string: {{DLV - eventModel.search_term}}`.

### B. Custom Event Triggers
* `CE - view_content` (`view_content`)
* `CE - add_to_cart` (`add_to_cart`)
* `CE - initiate_checkout` (`initiate_checkout`)
* `CE - purchase` (`purchase`)
* `CE - add_to_wishlist` (`add_to_wishlist`)
* `CE - remove_from_cart` (`remove_from_cart`)
* `CE - search` (`search`)
* `CE - contact` (`contact`)
* `CE - complete_registration` (`complete_registration`)

### C. Data Layer Variables Mapping Table

| GTM Variable Name | Data Layer Variable Path | Value Sample / Description |
| :--- | :--- | :--- |
| `DLV - eventModel.content_name` | `eventModel.content_name` | `"SX21 Magic Wireless Microphone"` |
| `DLV - eventModel.content_ids` | `eventModel.content_ids` | `["6ac8ed651683995ddc216850"]` |
| `DLV - eventModel.content_type` | `eventModel.content_type` | `"product"` |
| `DLV - eventModel.content_category` | `eventModel.content_category` | `"Microphone"` |
| `DLV - eventModel.value` | `eventModel.value` | `850` |
| `DLV - eventModel.currency` | `eventModel.currency` | `"BDT"` |
| `DLV - eventModel.num_items` | `eventModel.num_items` | `1` |
| `DLV - eventModel.items` | `eventModel.items` | `[{ item_id, price, quantity, ... }]` |
| `DLV - eventModel.event_id` | `eventModel.event_id` | `"add_to_cart_1791785742644_ox9ykav"` |
| `DLV - eventModel.event_time` | `eventModel.event_time` | `1791785742` |
| `DLV - eventModel.event_source_url` | `eventModel.event_source_url` | Page URL when event fired |
| `DLV - eventModel.order_id` | `eventModel.order_id` | Unique Order / Invoice ID |
| `DLV - eventModel.transaction_id` | `eventModel.transaction_id` | Transaction ID |
| `DLV - eventModel.shipping` | `eventModel.shipping` | Shipping cost |
| `DLV - eventModel.tax` | `eventModel.tax` | Tax fee |
| `DLV - eventModel.discount_value` | `eventModel.discount_value` | Discount applied |
| `DLV - eventModel.coupon` | `eventModel.coupon` | Promo code |
| `DLV - eventModel.payment_method` | `eventModel.payment_method` | Payment method (`cod`, `bkash`, etc.) |
| `DLV - eventModel.search_term` | `eventModel.search_term` | Search keyword string |
| `DLV - eventModel.status` | `eventModel.status` | Order / event status |
| `DLV - eventModel.user_data` | `eventModel.user_data` | Full user data object |
| `DLV - eventModel.user_data.email_address` | `eventModel.user_data.email_address` | Customer email |
| `DLV - eventModel.user_data.phone_number` | `eventModel.user_data.phone_number` | Customer phone |
| `DLV - eventModel.user_data.external_id` | `eventModel.user_data.external_id` | `"guest_1791784281889_p5s5d5p"` |
| `DLV - eventModel.user_data.fbp` | `eventModel.user_data.fbp` | `"fb.1.1791784281919.1907573395"` |
| `DLV - eventModel.user_data.fbc` | `eventModel.user_data.fbc` | Facebook Click ID |
| `DLV - eventModel.user_data.address.country` | `eventModel.user_data.address.country` | `"bd"` |
| `DLV - eventModel.user_data.address.city` | `eventModel.user_data.address.city` | City name |
| `DLV - eventModel.user_data.address.region` | `eventModel.user_data.address.region` | Division / State |
| `DLV - eventModel.user_data.address.postal_code` | `eventModel.user_data.address.postal_code` | Zip code |
| `DLV - eventModel.user_data.address.first_name` | `eventModel.user_data.address.first_name` | Customer first name |
| `DLV - eventModel.user_data.address.last_name` | `eventModel.user_data.address.last_name` | Customer last name |
