"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { Route } from 'next';
import { Fragment, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useModalStore } from '../stores/modal-store';

type AnchorLink = {
  name: string;
  anchor: `#${string}`;
};

type RouteLink = {
  name: string;
  href: Route;
};

type NavLink = AnchorLink | RouteLink;

const primaryLinks: NavLink[] = [
  { name: 'Services', anchor: '#services' },
  { name: 'Explore Colours', href: '/colour-catalogue' },
  { name: 'Visualiser', href: '/visualiser' },
  { name: 'Become a Painter', href: '/become-a-painter' },
  { name: 'Contact', href: '/contact' }
];

const secondaryLinks: RouteLink[] = [
  { name: 'Admin', href: '/admin/dashboard' },
  { name: 'Painter Portal', href: '/painter-workflow' }
];

export function Navigation() {
  const pathname = usePathname();
  const { openLead } = useModalStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-3' : 'bg-white/80 backdrop-blur-md py-4'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Master Brush home">
            <div className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark text-white font-serif font-bold text-lg shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                MB
              </span>
              <div className="absolute -inset-1 bg-gradient-to-br from-brand-secondary to-brand-primary rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-xl font-serif font-bold bg-gradient-to-r from-brand-dark to-brand-primary bg-clip-text text-transparent">
                Master Brush
              </span>
              <span className="block text-[10px] font-medium text-slate-500 -mt-1 tracking-wider uppercase">
                Premium Painting
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryLinks.map((link) => (
              'href' in link ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${pathname === link.href
                    ? 'text-brand-primary'
                    : 'text-slate-700 hover:text-brand-primary'
                    }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className={`absolute inset-0 rounded-lg bg-brand-primary/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${pathname === link.href ? 'opacity-100' : ''
                    }`} />
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.anchor}
                  className="group relative rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:text-brand-primary"
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 rounded-lg bg-brand-primary/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </a>
              )
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2 text-slate-500 transition hover:bg-brand-primary/5 hover:text-brand-primary"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <a href="tel:+916301313300" className="text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors">
            +91 63013 13300
          </a>
          <button
            onClick={openLead}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-brand-primary to-brand-dark px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/30 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Get a Free Quote</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-yellow-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Transition show={mobileOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileOpen}>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in duration-150"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="flex w-full max-w-sm flex-col gap-6 bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-xl font-serif font-bold text-brand-primary">
                    Master Brush
                  </Dialog.Title>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-col gap-2" aria-label="Primary mobile">
                  {primaryLinks.map((link) => {
                    if ('href' in link) {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-brand-primary/10 text-brand-primary' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                          {link.name}
                        </Link>
                      );
                    }

                    return (
                      <a
                        key={link.name}
                        href={link.anchor}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        {link.name}
                      </a>
                    );
                  })}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                  <button
                    onClick={() => {
                      openLead();
                      setMobileOpen(false);
                    }}
                    className="w-full rounded-full bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-lg"
                  >
                    Book Painting Service
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition show={searchOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setSearchOpen}>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-start justify-center px-4 py-20">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-150"
              enterFrom="-translate-y-6 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transform transition ease-in duration-100"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="-translate-y-6 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-2xl rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-serif font-semibold text-slate-900">
                    Search Master Brush
                  </Dialog.Title>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                    aria-label="Close search"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div>
                  <label className="visually-hidden" htmlFor="global-search">
                    Search
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus-within:border-brand-primary focus-within:bg-white focus-within:ring-1 focus-within:ring-brand-primary transition-all">
                    <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    <input
                      id="global-search"
                      type="search"
                      placeholder={'Try "Royal Blue" or "Exterior Waterproofing"'}
                      className="w-full border-0 bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                      autoFocus
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header >
  );
}
