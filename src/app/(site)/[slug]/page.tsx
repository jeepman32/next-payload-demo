import React from 'react';
import { notFound } from 'next/navigation'
import { getPayloadClient } from '../../../payload/payloadClient';
import Blocks from '../../../components/Blocks';
import { Hero } from '../../../components/Hero';
import { AdminBar } from '../../../components/AdminBar';

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const payload = await getPayloadClient();

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug || 'home',
      },
    }
  });

  const page = pages.docs[0];

  if (!page) return notFound()

  return (
    <React.Fragment>
      {/* @ts-ignore */}
      <AdminBar adminBarProps={{ collection: 'pages', id: page.id }} />
      {/* @ts-ignore */}
      <Hero {...page.hero} />
      {/* @ts-ignore */}
      <Blocks blocks={page.layout} />
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  const payload = await getPayloadClient();

  const pages = await payload.find({
    collection: 'pages',
    limit: 0,
  })

      {/* @ts-ignore */}
  return pages.docs.map(({ slug  }: { slug: string }) => ({ slug }))
}

export default Page;
