import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  schema?: object;
}

export default function SEO({
  title = "Buildora | Custom Web Design & Local SEO Agency",
  description = "Buildora builds high-converting custom websites for local businesses, contractors, salons, and professional services starting at $399 setup.",
  keywords = "web design, local web design, website builder, SEO agency, small business web design, Buildora",
  canonical,
  schema
}: SEOProps) {
  const location = useLocation();
  const currentUrl = canonical || `https://buildoradesigning.com${location.pathname}`;

  useEffect(() => {
    // Update Title
    document.title = title.endsWith("Buildora") ? title : `${title} | Buildora`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords);

    // Update Open Graph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", currentUrl);

    // Update Canonical
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", currentUrl);

    // Update Dynamic Page Schema if provided
    let dynamicSchemaScript = document.getElementById("dynamic-page-schema");
    if (schema) {
      if (!dynamicSchemaScript) {
        dynamicSchemaScript = document.createElement("script");
        dynamicSchemaScript.id = "dynamic-page-schema";
        dynamicSchemaScript.setAttribute("type", "application/ld+json");
        document.head.appendChild(dynamicSchemaScript);
      }
      dynamicSchemaScript.textContent = JSON.stringify(schema);
    } else if (dynamicSchemaScript) {
      dynamicSchemaScript.remove();
    }
  }, [title, description, keywords, currentUrl, schema]);

  return null;
}
