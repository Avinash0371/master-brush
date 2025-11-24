import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { Colour } from '../../../lib/types';

type ColourDetailResponse = {
  success: boolean;
  data: {
    color: Colour;
    complementary: Colour[];
  };
};

type PageProps = {
  params: { slug: string };
};

async function getColour(slug: string): Promise<ColourDetailResponse | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
  try {
    const response = await fetch(`${baseUrl}/colors/${slug}`, { cache: 'no-store' });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as ColourDetailResponse;
  } catch (error) {
    console.error(`Failed to fetch colour ${slug}`, error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getColour(params.slug);

  if (!data) {
    return {
      title: 'Colour not available | Master Brush',
      description: 'We could not find the requested colour. Explore the full catalogue for more shades.'
    };
  }

  return {
    title: `${data.data.color.name} | Master Brush Colour`,
    description: data.data.color.description ?? 'Discover this curated Master Brush colour.'
  };
}

export default async function ColourDetailPage({ params }: PageProps) {
  const data = await getColour(params.slug);

  if (!data) {
    notFound();
  }

  const {
    data: { color, complementary }
  } = data;

  return (
    <main className="pb-16 pt-8">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <Link href="/colour-catalogue" className="text-sm font-semibold text-brand-primary hover:underline">
          ← Back to catalogue
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="h-64 rounded-t-3xl" style={{ backgroundColor: color.hex }} />
              <div className="space-y-4 p-6">
                <div>
                  <h1 className="text-3xl font-semibold text-slate-900">{color.name}</h1>
                  <p className="mt-2 text-slate-600">{color.description}</p>
                </div>
                <dl className="grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
                  <div>
                    <dt className="font-semibold text-slate-700">HEX</dt>
                    <dd>{color.hex}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-700">RGB</dt>
                    <dd>{color.rgb}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-700">Family</dt>
                    <dd>{color.family}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  {color.themes?.map((theme) => (
                    <span key={theme} className="rounded-full bg-slate-100 px-3 py-1">
                      {theme}
                    </span>
                  ))}
                  {color.mood_tags?.map((tag) => (
                    <span key={tag} className="rounded-full bg-brand-secondary/20 px-3 py-1 text-slate-900">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-3 text-sm font-semibold">
                  <button className="rounded-full bg-brand-secondary px-5 py-2 text-slate-900" type="button">
                    Add to Project
                  </button>
                  <button className="rounded-full border border-brand-primary px-5 py-2 text-brand-primary" type="button">
                    Request Sample
                  </button>
                  <button className="rounded-full border border-slate-200 px-5 py-2" type="button">
                    Download swatch PDF
                  </button>
                </div>
              </div>
            </div>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Suggested harmonies</h2>
              <p className="mt-2 text-sm text-slate-600">
                Pair {color.name} with these curated shades for a balanced palette.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {complementary.map((shade) => (
                  <div key={shade.id} className="overflow-hidden rounded-2xl border border-slate-200">
                    <div className="h-24" style={{ backgroundColor: shade.hex }} />
                    <div className="p-4 text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">{shade.name}</p>
                      <p>{shade.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Visualise instantly</h3>
              <p className="mt-2 text-sm text-slate-600">
                Upload a photo or choose from our curated rooms to test this shade under realistic lighting.
              </p>
              <Link
                href={`/visualiser?colour=${color.slug}`}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white"
              >
                Try in Room
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Contrast insights</h3>
              <p className="mt-2 text-sm text-slate-600">
                Ensure accessible combinations by checking contrast ratios for trims, ceilings, and accents.
              </p>
              <pre className="mt-4 overflow-auto rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
                {JSON.stringify(color.contrast_info ?? { recommended_trim: '#FFFFFF' }, null, 2)}
              </pre>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
