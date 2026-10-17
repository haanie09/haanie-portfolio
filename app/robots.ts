import type { MetadataRoute } from "next";
import { isHidden, site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isHidden() ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
