import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_SLUGS, getServiceDetail } from "@/data/service-details";
import ServiceDetailClient from "@/components/sections/services/detail/ServiceDetailClient";

// Pre-render every service page at build time.
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

// Unknown slugs serve the 404 instead of a dynamic render.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) return {};
  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
    openGraph: {
      title: detail.metaTitle,
      description: detail.metaDescription,
      images: [{ url: detail.cardImage }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) notFound();
  return <ServiceDetailClient detail={detail} />;
}
