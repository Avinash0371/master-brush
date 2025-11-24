import { CatalogueBrowser } from '../../components/colour/catalogue-browser';

export const metadata = {
  title: 'Colour Catalogue | Master Brush',
  description: 'Filter and explore Master Brush colour collections by mood, finish, and family.'
};

export default function ColourCataloguePage() {
  return (
    <main>
      <CatalogueBrowser initial={{ data: [], meta: { page: 1, limit: 12, total: 0, totalPages: 1 } }} />
    </main>
  );
}
