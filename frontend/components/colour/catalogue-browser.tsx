"use client";

import { useMemo, useState, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { COLOUR_CATALOGUE, TRENDING_COLLECTIONS } from '../../lib/colour-data';
import type { Colour } from '../../lib/types';
import { ColorCard } from './color-card';

const COLOR_FAMILIES = [
  { name: 'White', icon: '⚪', description: 'Pure & Off-Whites' },
  { name: 'Beige', icon: '🟤', description: 'Beiges, Tans & Creams' },
  { name: 'Grey', icon: '⚫', description: 'Light to Dark Greys' },
  { name: 'Blue', icon: '🔵', description: 'Blues & Teals' },
  { name: 'Green', icon: '🟢', description: 'Greens & Olives' },
  { name: 'Yellow', icon: '🟡', description: 'Yellows & Golds' },
  { name: 'Orange', icon: '�', description: 'Oranges & Corals' },
  { name: 'Red', icon: '🔴', description: 'Reds & Pinks' },
  { name: 'Purple', icon: '🟣', description: 'Purples & Lavenders' },
  { name: 'Brown', icon: '🟫', description: 'Browns & Woods' },
  { name: 'Black', icon: '⚫', description: 'Blacks & Dark Tones' }
];

const moods = ['Calm', 'Cozy', 'Bold', 'Fresh'];
const finishes = ['Matte', 'Satin', 'Gloss'];

export type CatalogueResponse = {
  data: Colour[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type Props = {
  initial: CatalogueResponse;
};

export function CatalogueBrowser({ initial }: Props) {
  const [search, setSearch] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('White');
  const [mood, setMood] = useState('');
  const [finish, setFinish] = useState('');

  // Filter logic using static data
  const filteredData = useMemo(() => {
    return COLOUR_CATALOGUE.filter((colour) => {
      const matchesSearch = colour.name.toLowerCase().includes(search.toLowerCase()) || colour.hex.toLowerCase().includes(search.toLowerCase());
      const matchesFamily = selectedFamily ? colour.family === selectedFamily : true;
      const matchesMood = mood ? colour.mood === mood : true;
      const matchesFinish = finish ? colour.finish === finish : true;
      return matchesSearch && matchesFamily && matchesMood && matchesFinish;
    });
  }, [search, selectedFamily, mood, finish]);

  // Group colors by family for sidebar counts
  const colorsByFamily = useMemo(() => {
    const grouped: Record<string, number> = {};
    COLOR_FAMILIES.forEach(family => {
      grouped[family.name] = COLOUR_CATALOGUE.filter(c => c.family === family.name).length;
    });
    return grouped;
  }, []);

  const suggestions = useMemo(() => {
    if (!search) return [] as string[];
    return COLOUR_CATALOGUE
      .filter((colour) => colour.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5)
      .map((colour) => colour.name);
  }, [search]);

  const currentFamily = COLOR_FAMILIES.find(f => f.name === selectedFamily);
  const totalColors = COLOUR_CATALOGUE.length;

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header & Trending Collections */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-serif font-bold text-brand-dark">Explore Colours</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Browse {totalColors}+ professional paint colors organized by family to find the perfect shade for your space.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {TRENDING_COLLECTIONS.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/5 to-brand-primary/5" />
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-serif font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{collection.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{collection.description}</p>
                  <div className="flex gap-2 mt-4">
                    {collection.colors.map((cid) => {
                      const c = COLOUR_CATALOGUE.find(x => x.id === cid);
                      return c ? (
                        <div key={cid} className="w-8 h-8 rounded-full border border-white shadow-sm" style={{ backgroundColor: c.hex }} title={c.name} />
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="sticky top-4 z-40 mb-8 rounded-3xl border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="relative w-full md:w-96">
              <label htmlFor="colour-search" className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Search
              </label>
              <input
                id="colour-search"
                type="search"
                value={search}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setSearch(event.target.value);
                }}
                placeholder="Try 'Sage' or 'Blue'..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-slate-100 bg-white p-2 shadow-lg z-50">
                  <ul className="space-y-1">
                    {suggestions.map((item) => (
                      <li key={item} className="cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-primary" onClick={() => setSearch(item)}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 flex-1 md:justify-end">
              <FilterSelect label="Mood" value={mood} onChange={(value) => { setMood(value); }} options={moods} />
              <FilterSelect label="Finish" value={finish} onChange={(value) => { setFinish(value); }} options={finishes} />
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setMood('');
                  setFinish('');
                }}
                className="mt-auto h-[42px] rounded-xl border border-slate-200 px-6 text-sm font-semibold text-slate-500 hover:border-brand-dark hover:text-brand-dark transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Layout */}
        <div className="flex gap-6">
          {/* Left Sidebar - Color Families */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-32 bg-white rounded-2xl shadow-lg p-4 space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto">
              <h2 className="text-lg font-serif font-bold text-brand-dark px-3 py-2 sticky top-0 bg-white z-10">Color Families</h2>
              {COLOR_FAMILIES.map((family) => {
                const isSelected = selectedFamily === family.name;
                const count = colorsByFamily[family.name] || 0;

                return (
                  <button
                    key={family.name}
                    onClick={() => setSelectedFamily(family.name)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${isSelected
                        ? 'bg-brand-primary text-white shadow-md'
                        : 'hover:bg-slate-50 text-slate-700'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{family.icon}</span>
                        <div>
                          <div className="font-semibold">{family.name}</div>
                          <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                            {family.description}
                          </div>
                        </div>
                      </div>
                      <span className={`text-sm font-bold px-2 py-1 rounded-full ${isSelected ? 'bg-white/20' : 'bg-slate-100'
                        }`}>
                        {count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content - Color Shades */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Family Header */}
              {currentFamily && (
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{currentFamily.icon}</span>
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-brand-dark">{currentFamily.name}</h2>
                      <p className="text-slate-600 mt-1">{currentFamily.description}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {filteredData.length} {filteredData.length === 1 ? 'shade' : 'shades'} available
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Color Grid */}
              {filteredData.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredData.map((colour, index) => (
                    <motion.div
                      key={colour.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ColorCard colour={colour} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">No colours found</p>
                  <p className="mt-2 text-slate-500">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FilterProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function FilterSelect({ label, options, value, onChange }: FilterProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-normal text-slate-600 focus:border-brand-primary focus:outline-none"
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
