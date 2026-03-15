import React from "react";

type TJsonLdProps = {
  data: Record<string, unknown>;
};

const JsonLd = ({ data }: TJsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;
