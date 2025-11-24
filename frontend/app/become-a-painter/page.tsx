import { Metadata } from 'next';

import { PageHeader } from '../../components/page-header';
import { PainterApplicationForm } from '../../components/painters/painter-application-form';

export const metadata: Metadata = {
  title: 'Become a Painter Partner | Master Brush',
  description: 'Join Master Brush as a certified painter partner. Get steady projects, fast payouts, and premium tools to elevate your craft.'
};

const stats = [
  { value: '500+', label: 'Active Painters' },
  { value: '2,000+', label: 'Projects Completed' },
  { value: '₹45K', label: 'Avg. Monthly Earnings' },
  { value: '4.8★', label: 'Partner Rating' }
];

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Steady, high-value projects',
    description: 'Get matched with homeowners and businesses that value professional workmanship and timely delivery.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'On-time payments',
    description: 'Transparent payout schedules with digital tracking so your crew is always paid without delays.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Training & certification',
    description: 'Access Master Brush surface prep, finish quality, and safety modules to upgrade your skillset.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Site logistics support',
    description: 'We coordinate material deliveries, safety gear, and quality audits so you can focus on the job.'
  }
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Painter Partner, Mumbai',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    quote: 'Master Brush has transformed my business. Steady work, fair rates, and they handle all the client coordination. I can focus on what I do best.',
    rating: 5
  },
  {
    name: 'Amit Sharma',
    role: 'Painter Partner, Delhi',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    quote: 'The training programs helped me learn new techniques. My crew is now certified and we get premium projects regularly.',
    rating: 5
  },
  {
    name: 'Suresh Patel',
    role: 'Painter Partner, Bangalore',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    quote: 'Fast payments and professional support. Master Brush treats painters with respect and values quality work.',
    rating: 5
  }
];

const requirements = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Minimum 2 years of professional painting experience'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    text: 'Ability to share previous work references or photos'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    text: 'Registered GST number for commercial projects (preferred)'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    text: 'Commitment to on-site hygiene and safety processes'
  }
];

const onboardingSteps = [
  {
    step: '1',
    title: 'Share your profile',
    description: 'Tell us about your crew, experience, and preferred service areas.'
  },
  {
    step: '2',
    title: 'Ops review & demo job',
    description: 'Our team reviews your work samples and may schedule a supervised pilot project.'
  },
  {
    step: '3',
    title: 'Start receiving projects',
    description: 'Once approved, you get access to Master Brush job allocations and digital tools.'
  }
];

const faqs = [
  {
    question: 'Do I need to bring my own crew?',
    answer: 'Yes. We work with independent contractors and painting firms who already have trained crew members.'
  },
  {
    question: 'How do payouts work?',
    answer: 'Milestones and completion reports unlock digital payouts to your registered bank account within 48 hours.'
  },
  {
    question: 'Can I choose my projects?',
    answer: 'You set your preferred service zones, job sizes, and availability. Our planner sends requests that match your profile.'
  },
  {
    question: 'Is there a joining fee?',
    answer: 'No. We only expect adherence to Master Brush quality standards and transparent communication with clients.'
  }
];

export default function BecomePainterPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-primary to-brand-dark">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-brand-secondary">Painter Partner Program</p>
            <h1 className="mt-4 text-4xl font-bold text-white lg:text-6xl">
              Grow your painting business
              <br />
              <span className="bg-gradient-to-r from-brand-secondary via-yellow-400 to-brand-secondary bg-clip-text text-transparent">
                with Master Brush
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200">
              Join a network of certified professionals, access premium projects, and let our operations team handle the paperwork, audits, and customer coordination.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#apply"
                className="rounded-xl bg-gradient-to-r from-brand-secondary to-yellow-400 px-8 py-4 text-base font-bold text-brand-dark shadow-xl shadow-brand-secondary/30 transition-all hover:shadow-2xl hover:scale-105"
              >
                Apply Now
              </a>
              <a
                href="#benefits"
                className="rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/20"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 text-center">
                <p className="text-3xl font-bold text-white lg:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-slate-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Benefits Section */}
        <section id="benefits" className="scroll-mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">Why partner with us?</h2>
            <p className="mt-4 text-lg text-slate-600">Everything you need to grow your painting business</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md transition-all hover:border-brand-primary hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark text-white shadow-lg group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">What our painters say</h2>
            <p className="mt-4 text-lg text-slate-600">Join hundreds of satisfied painter partners</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md"
              >
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-700 italic">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="mt-20 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {/* Requirements */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900">Who we are looking for</h2>
              <ul className="mt-6 space-y-4">
                {requirements.map((item) => (
                  <li key={item.text} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                      {item.icon}
                    </div>
                    <span className="text-slate-700 pt-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900">Onboarding timeline</h2>
              <ol className="mt-6 space-y-6">
                {onboardingSteps.map((item, index) => (
                  <li key={item.step} className="relative flex gap-6">
                    {index !== onboardingSteps.length - 1 && (
                      <div className="absolute left-6 top-12 h-full w-0.5 bg-slate-200" />
                    )}
                    <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-dark text-lg font-bold text-white shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-lg font-bold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-slate-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQs */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900">Questions from fellow painters</h2>
              <div className="mt-6 space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-brand-primary"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                      {faq.question}
                      <svg
                        className="h-5 w-5 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <aside id="apply" className="scroll-mt-20">
            <div className="sticky top-4 rounded-2xl border-2 border-brand-primary/20 bg-gradient-to-br from-white to-brand-light p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-900">Apply now</h2>
              <p className="mt-2 text-sm text-slate-600">
                Share your details and our operations team will reach out with next steps. We respond within one business day.
              </p>
              <div className="mt-6">
                <PainterApplicationForm />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
