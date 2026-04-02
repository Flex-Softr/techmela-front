I've reverted the changes to the GTM template and instead updated your GTMEventPayload (gtm.builder.ts and gtm.types.ts) to surface every piece of data needed for a 10/10 Event Match Quality score.

Since that specific template ignores Facebook-specific data parameters by default in its auto-parsing, we now pass these directly into the DataLayer. To hit the 10/10 score without touching the custom template code, you just need to map these fields manually inside your Google Tag Manager UI.

Here is what you need to do in GTM:

Step 1: Create Data Layer Variables (DLV)
Go to Variables > User-Defined Variables and create the following Data Layer Variables:

DLV - Event ID → Data Layer Variable Name: eventModel.event_id
DLV - External ID → Data Layer Variable Name: eventModel.user_data.external_id
DLV - Content IDs → Data Layer Variable Name: eventModel.content_ids
DLV - Content Type → Data Layer Variable Name: eventModel.content_type
(Optional) DLV - Gender → eventModel.user_data.gender
(Optional) DLV - DOB → eventModel.user_data.dob
Step 2: Configure the Facebook Pixel Tag Template
Go to your Tags, open the Facebook Pixel Tag that uses this template, and configure the following sections:

Event ID:

Set "Event ID" to your new {{DLV - Event ID}} variable. (This perfectly deduplicates pixel events against CAPI events!)
Advanced Matching Parameters:

Check "Enable Advanced Matching"
Under the Mapping table, add a row:
Name: external_id
Value: {{DLV - External ID}}
(Optional) Map ge and db to your gender and dob variables safely.
Object Properties:

Open this section and add the rows for catalog matching:
Name: content_type | Value: {{DLV - Content Type}}
Name: content_ids | Value: {{DLV - Content IDs}}
By doing this, your template remains completely untouched and updatable, while GTM forces the exact structural data required by Facebook for extreme 10/10 Match Quality reporting directly into the pixel tracking queue.

### How work this

This JavaScript file (gmtMetaPixelTemplate.js) is a Google Tag Manager (GTM) Custom Template Script written in Sandboxed JavaScript. It acts as the "engine" connecting your Next.js application's Data Layer to Facebook’s tracking servers.

Because it relies on special GTM APIs like require("copyFromDataLayer") and require("injectScript"), this code does not run inside your Next.js app natively. Instead, it lives exclusively inside your Google Tag Manager container.

Here is a step-by-step breakdown of how this script actually works inside GTM:

1. The GTM Trigger & Setup
   When a user does something on your site (like completing a checkout), your Next.js app pushes an event to the dataLayer (using the GTMEventPayload we built earlier). GTM detects this push, triggers the Facebook Pixel Tag, and executes this script.

2. Reading Configuration (data object)
   The script immediately looks at how you configured the Tag in the GTM interface. Everything you select in the UI is stored in the data object:

data.pixelId reads the Pixel ID you typed in.
data.eventName reads the specific Standard Event you selected (like Purchase or ViewContent).
data.eventId reads your deduplication ID variable. 3. Reading the Data Layer (eventModel & ecommerce)
The script uses copyFromDataLayer("eventModel", 1) to automatically pull the GA4-formatted ecommerce data out of your dataLayer payload. This is where it grabs the user_data, items, value, and currency that our React app pushed.

4. Processing GA4 Data (The Auto-Mapper)
   If you checked the "Use GA4 dataLayer Integration" box in the GTM UI, the script runs the large block starting at line 147 (if (data.useGA4Ecommerce)). It translates Google Analytics 4 mapping over to Meta Pixel mapping:

It maps eventModel.user_data.email_address into em.
It maps eventModel.items into Facebook's .contents list.
It maps eventModel.value and currency into custom data parameters.
(Note: As we saw earlier, it doesn't auto-map everything like event_id or content_type, which is why we must map them manually in the UI using Data Layer Variables).

5. Initializing the Pixel (fbq('init'))
   The script sets up the Facebook Pixel function (fbq), and calls fbq("init", pixelId, cidParams). The cidParams object contains all your Advanced Matching data (email, phone, etc.). This ensures Facebook ties the current browser session to a specific logged-in Facebook user.

6. Firing the Event (fbq('track'))
   Once everything is bundled together, the script fires the event by calling fbq('track', pixelId, eventName, finalObjectProps, { eventID: ... }). This creates the actual network request that sends the payload directly to facebook.com/tr/.

7. The Custom "Param Builder" Script
   At the bottom of the file (lines 202-263), there is a custom addition that isn't native to standard GTM templates. It injects an external script hosted on AWS (clientParamBuilder.bundle.js).

This script likely runs URL parameter scraping. For example, if a user clicks an ad and lands on your site with ?fbclid=123..., the Param Builder script automatically captures that parameter, saves it, and ensures it's attached to the Pixel fires to further improve attribution and tracking accuracy.

#### why need to create variables in GTM?

The reason you still need to define those User-Defined Variables in GTM, even with this powerful template, comes down to how GTM "sandboxes" JavaScript and how Meta requires specific data for a 10/10 score.

Here are the three specific reasons why explicit mapping is still necessary:

1. The Template "Auto-Parse" is Limited
   If you look closely at the GA4 logic in the script (starting at line 240), the template is programmed to "guess" where your data is.

It looks for eventModel.items and maps them to contents.
However, it does not automatically create the content_ids array (which Meta needs as a flat list like ['id1', 'id2']) or set the content_type ("product").
Since the template doesn't calculate these for you from the items array, you have to "feed" them to the tag manually using the variables we created. 2. Deduplication (The event_id)
This is the most important one for your score. Meta's deduplication system requires a specific field called eventID to be present at the top level of the network request.

The template doesn't "hunt" through the dataLayer to find an ID to use for deduplication automatically.
By creating {{DLV - Event ID}}, you are explicitly telling GTM: "Take exactly this unique ID from our React app and put it in the official 'Event ID' slot of the Meta Tag."
Without this explicit mapping, deduplication will fail, and your score will drop because Meta won't be able to match the browser event with the CAPI server event. 3. Reliability and "The Single Source of Truth"
GTM is designed around the concept of stability.

If you rely purely on the template's "Auto-parsing," and the template developer ever updates the code, your tracking might break silently if they change how they look for data.
By defining your own Variables, you are creating a "Contract." You are telling GTM: "I guarantee that this specific piece of data (eventModel.content_ids) exists."
Mapping that variable to the Tag's "Object Properties" is the most stable and "bulletproof" way to ensure Meta gets the data every single time, regardless of how the template's internal code evolves.
Summary
The template does the heavy lifting (like hashing and injecting the tracking script), but the User-Defined Variables are the connectors that make sure your specific app's data actually plugs into the tag correctly. Without them, the tag is like a high-performance engine that isn't connected to the fuel tank.

how is sent data to meta pixel from GTM?
The actual transmission of data from Google Tag Manager (GTM) to Meta (Facebook) happens through a sequence of technical steps.

Here is exactly how the data travels from your GTM container to Meta's servers:

1. The Tag Activation (Trigger)
   When an event (like purchase) happens in your Next.js app, it pushes data to the dataLayer. GTM sees this, matches it to a Trigger, and executes your Meta Pixel Tag (which is powered by the gmtMetaPixelTemplate.js script).

2. Loading the Meta Library (fbevents.js)
   If it’s the first event of the session, the template script uses GTM's injectScript API to load the official Meta Pixel library: https://connect.facebook.net/en_US/fbevents.js This library creates a global JavaScript function on your window called fbq.

3. Gathering the Data
   Inside the GTM sandbox, the template script runs. It performs these three actions:

Reads the UI Config: It grabs the Pixel ID and Event Name you typed in the GTM interface.
Reads the DataLayer: It uses the User-Defined Variables (like {{DLV - Event ID}}) to pull the specific values out of the dataLayer.
Formats the Payload: It bundles everything into a single JavaScript object. 4. Executing the fbq Command
The template then executes a standard Meta tracking command. For a purchase, it looks like this behind the scenes:

javascript
fbq('track', 'Purchase', {
value: 500.00,
currency: 'BDT',
content_ids: ['123'],
content_type: 'product'
}, {
eventID: 'evt_123456789' // This is the deduplication key
}); 5. The Final Network Request (The "Hit")
This is the moment the data actually leaves the browser. The fbq library takes that command and translates it into an HTTP request (usually a GET or POST request) sent to: https://www.facebook.com/tr/?id=[PIXEL_ID]&ev=Purchase&dl=[URL]&...

Pixel ID: Included in the URL.
Event Data: All your custom data (value, currency, etc.) is URL-encoded into a parameter called cd.
User Data: Your customer's email, phone, and name (all hashed automatically by the fbq script) are encoded into a parameter called ud.
Deduplication: Your event_id is sent as a parameter called eid. 6. Meta's Processing
Meta's servers receive this request. At the exact same time, they are likely receiving a CAPI (Server-Side) request from your Next.js backend.

Meta looks at the eid (Event ID) from the GTM request and the event_id from the CAPI request.
If they match, Meta merges them into one high-quality event.
Summary: GTM doesn't send the data "directly"—it uses the Meta Pixel JavaScript library as a middleman to package your data and "fire" it off to Meta's tracking endpoint via a standard web request.

###

You’ve noticed a very important technical detail! Yes, the CAPI payload always has more fields than the Browser-side (Pixel) payload.

Here is the breakdown of why they are different and what must remain exactly the same for that 10/10 score.

1. The "Automatic" Data Gap
   The biggest reason the Pixel payload is smaller is that the browser does a lot of work automatically.

Browser (Pixel): When the Pixel fires, it automatically grabs the user's IP Address, User Agent, and Page URL. You don't have to send these in your fbq() code.
Server (CAPI): The server has no browser. It's just a machine talking to another machine. Meta's CAPI requires you to explicitly send the client_ip_address, client_user_agent, and event_source_url so Meta knows who the user was and where it happened. 2. Comparison Table: What goes where?
Field Category Browser (Pixel) Server (CAPI) Same Data?
Deduplication eventID event_id YES (Must be identical)
User Identity em, ph, fn, etc. em, ph, fn, etc. YES (Must be identical)
Ecommerce value, currency, ids value, currency, ids YES (Must be identical)
Technical Context Automatic client_ip_address Required in CAPI only
Action Source Automatic action_source: "website" Required in CAPI only
Browser Identity Automatic fbp and fbc Required in CAPI only 3. The "Secret" to the 10/10 Score
To get a 10/10 score, Meta looks at the "Overlap" between the pixel and CAPI. For the overlap to be perfect, you need to ensure:

The Hashing matches: If the Pixel hashes an email one way and your server hashes it another way, they won't match. (Our eventHandler handles this by using the standard SHA-256 process).
The IDs match: If the Browser event has ID 123 and the Server event has ID 456, Meta will think they are two different sales. (Our event_id logic ensures they are always the same).
Summary
Pixel = Smaller payload because it's "lazy" (the browser fills in the blanks).
CAPI = Larger payload because it's "explicit" (you have to tell Meta everything).
Crucial Rule: The Identity (email/phone) and Deduplication ID (event_id) must be identical in both payloads for Meta to give you that top-tier score.
