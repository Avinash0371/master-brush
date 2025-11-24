const faqs = [
  {
    question: 'How quickly can a project start?',
    answer:
      'Once the site is measured, we can begin in as little as 48 hours. Priority slots are available for repeat customers and Master Brush Care subscribers.'
  },
  {
    question: 'Do you handle surface preparation?',
    answer:
      'Absolutely. Every project includes crack filling, sanding, priming, and masking. We document all prep work so you know exactly what was done.'
  },
  {
    question: 'Can I track project progress remotely?',
    answer:
      'Yes. Our project tracker logs daily milestones, crew attendance, and site photos. You can approve finish checklists before handover.'
  }
];

const trustBadges = [
  'Background verified painters',
  'Health & safety compliant',
  'Eco-prime and low-VOC finishes',
  '100% customer satisfaction'
];

export function FaqTrust() {
  return (
    <section id="support" className="py-24 bg-brand-light">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <span className="text-brand-secondary font-bold uppercase tracking-wider text-sm">Support</span>
            <h2 className="text-4xl font-serif font-bold text-brand-dark mt-3">FAQs that matter before you paint</h2>
            <p className="mt-4 max-w-xl text-lg text-slate-600 leading-relaxed">
              We believe in setting clear expectations. If you need more help, our colour coaches are a chat away.
            </p>
            <dl className="mt-10 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-brand-primary/20">
                  <dt className="text-lg font-serif font-bold text-brand-dark">{faq.question}</dt>
                  <dd className="mt-3 text-base text-slate-600 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="rounded-3xl border border-white bg-white p-10 shadow-xl h-fit sticky top-24">
            <h3 className="text-2xl font-serif font-bold text-brand-dark">Why homeowners trust Master Brush</h3>
            <ul className="mt-8 space-y-5 text-base text-slate-700">
              {trustBadges.map((badge) => (
                <li key={badge} className="flex items-center gap-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-secondary text-xs font-bold text-white shadow-sm">
                    ✓
                  </span>
                  <span className="font-medium">{badge}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl bg-brand-light p-8 border border-brand-primary/10">
              <p className="text-lg font-serif font-bold text-brand-dark">Dedicated colour concierge</p>
              <p className="mt-2 text-sm text-slate-600">Available 7 days a week • 9 AM – 8 PM IST</p>
              <a href="tel:+916301313300" className="mt-6 inline-flex items-center justify-center w-full rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-dark transition-all">
                Call +91 63013 13300
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
