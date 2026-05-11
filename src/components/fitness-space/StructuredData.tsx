import { buildHomeJsonLd } from "@/lib/structured-data";

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildHomeJsonLd()).replace(/</g, "\\u003c"),
      }}
    />
  );
}
