import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const sampleColours = [
  {
    name: 'Sunlit Sand',
    slug: 'sunlit-sand',
    hex: '#F0D9B5',
    rgb: 'rgb(240,217,181)',
    family: 'Neutral',
    description: 'Warm beige tone perfect for calm, contemporary spaces.',
    themes: JSON.stringify(['Calm Neutrals']),
    mood_tags: JSON.stringify(['warm', 'cozy']),
    finish: 'Matte',
    popularity: 86,
    sample_images: JSON.stringify(['https://images.masterbrush.ai/colours/sunlit-sand-livingroom.webp']),
    contrast_info: JSON.stringify({ recommended_trim: '#2D2A2B' })
  },
  {
    name: 'Ocean Drive',
    slug: 'ocean-drive',
    hex: '#2A7ABF',
    rgb: 'rgb(42,122,191)',
    family: 'Blue',
    description: 'Punchy azure blue that energises accent walls and creative spaces.',
    themes: JSON.stringify(['Bold & Bright']),
    mood_tags: JSON.stringify(['fresh', 'invigorating']),
    finish: 'Satin',
    popularity: 92,
    sample_images: JSON.stringify(['https://images.masterbrush.ai/colours/ocean-drive-bedroom.webp']),
    contrast_info: JSON.stringify({ recommended_trim: '#F7F7F7' })
  }
];

const samplePalettes = [
  {
    name: 'Calm Neutrals',
    slug: 'calm-neutrals',
    description: 'Grounding neutrals curated for minimal homes.',
    tags: JSON.stringify(['interior', 'minimal'])
  },
  {
    name: 'Bold & Bright',
    slug: 'bold-and-bright',
    description: 'Vibrant palette for expressive interiors.',
    tags: JSON.stringify(['accent', 'creative'])
  }
];

const now = new Date();
const daysFromNow = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

type PainterSeed = {
  full_name: string;
  phone: string;
  email: string;
  city: string;
  years_experience: number;
  skills: string;
  preferred_zones?: string;
  expected_rate?: string;
  status: string;
  admin_notes?: string;
};

const samplePainters: PainterSeed[] = [
  {
    full_name: 'Rohan Mehta',
    phone: '+911234567891',
    email: 'rohan.mehta@example.com',
    city: 'Mumbai',
    years_experience: 6,
    skills: JSON.stringify(['Interior Painting', 'Texture Finishes']),
    preferred_zones: JSON.stringify(['Mumbai', 'Thane']),
    expected_rate: '₹25 / sq.ft',
    status: 'approved',
    admin_notes: 'Certified Master Brush pro since 2023.'
  },
  {
    full_name: 'Sana Iqbal',
    phone: '+911234567892',
    email: 'sana.iqbal@example.com',
    city: 'Delhi',
    years_experience: 4,
    skills: JSON.stringify(['Exterior Painting', 'Waterproofing']),
    preferred_zones: JSON.stringify(['Delhi NCR']),
    expected_rate: '₹22 / sq.ft',
    status: 'pending'
  },
  {
    full_name: 'Amit Kumar',
    phone: '+911234567893',
    email: 'amit.kumar@example.com',
    city: 'Gurugram',
    years_experience: 8,
    skills: JSON.stringify(['Interior Painting', 'Polish', 'Minor Repairs']),
    preferred_zones: JSON.stringify(['Gurugram', 'South Delhi']),
    expected_rate: '₹27 / sq.ft',
    status: 'approved',
    admin_notes: 'Lead painter for premium projects.'
  },
  {
    full_name: 'Neha Sethi',
    phone: '+911234567894',
    email: 'neha.sethi@example.com',
    city: 'Noida',
    years_experience: 3,
    skills: JSON.stringify(['Interior Painting', 'Stencil Art']),
    preferred_zones: JSON.stringify(['Noida']),
    expected_rate: '₹21 / sq.ft',
    status: 'rejected',
    admin_notes: 'Pending re-application with portfolio updates.'
  }
];

type LeadSeed = {
  name: string;
  phone: string;
  email: string;
  pincode: string;
  address: string;
  service_type: string;
  area_estimate?: string;
  preferred_date: Date | null;
  status: string;
  color_pref?: string;
  notes?: string;
};

const sampleLeads: LeadSeed[] = [
  {
    name: 'Arjun Patel',
    phone: '+911234567890',
    email: 'arjun.patel@example.com',
    pincode: '400001',
    address: '4th Floor, Prime Towers, Mumbai',
    service_type: 'Express Painting, Kitchen Refresh',
    area_estimate: '3BHK',
    preferred_date: daysFromNow(1),
    status: 'contacted',
    color_pref: JSON.stringify(['MB-208 Sunrise Beige']),
    notes: 'Prefers eco-friendly paints.'
  },
  {
    name: 'Khanna Residence',
    phone: '+911234567895',
    email: 'khanna.residence@example.com',
    pincode: '122002',
    address: 'DLF Phase 4, Gurugram',
    service_type: 'Interior Recoat, Texture Accent',
    area_estimate: '4BHK',
    preferred_date: daysFromNow(0),
    status: 'scheduled',
    color_pref: JSON.stringify(['MB-208 Sunrise Beige', 'MB-045 Cloud White']),
    notes: 'Touch-up coat scheduled for day 2 evening.'
  },
  {
    name: 'Sonia Verma',
    phone: '+911234567896',
    email: 'sonia.verma@example.com',
    pincode: '201301',
    address: 'Sector 50, Noida',
    service_type: 'Bedroom Repaint',
    area_estimate: '2BHK',
    preferred_date: daysFromNow(3),
    status: 'scheduled',
    color_pref: JSON.stringify(['MB-312 Misty Mauve']),
    notes: 'Needs painter mats delivered day 1 morning.'
  },
  {
    name: 'Taneja Residence',
    phone: '+911234567897',
    email: 'taneja.residence@example.com',
    pincode: '110027',
    address: 'Rajouri Garden, Delhi',
    service_type: 'Exterior Recoat, Balcony Railing',
    area_estimate: 'Villa',
    preferred_date: daysFromNow(5),
    status: 'contacted',
    color_pref: JSON.stringify(['MB-006 Alpine White', 'MB-889 Brick Ember']),
    notes: 'Scaffolding inspection required before start.'
  },
  {
    name: 'Sameer Goyal',
    phone: '+911234567898',
    email: 'sameer.goyal@example.com',
    pincode: '560001',
    address: 'Indiranagar, Bengaluru',
    service_type: 'Living Room Makeover',
    area_estimate: 'Duplex',
    preferred_date: daysFromNow(-4),
    status: 'completed',
    color_pref: JSON.stringify(['MB-102 Terra Clay']),
    notes: 'Completed with satin finish; awaiting testimonial.'
  }
];

async function main() {
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL ?? 'admin@masterbrush.local';
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD ?? 'ChangeMe123!';

  const passwordHash = await hash(adminPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Master Admin',
      email: adminEmail,
      password_hash: passwordHash,
      role: 'superadmin'
    }
  });

  for (const palette of samplePalettes) {
    await prisma.palette.upsert({
      where: { slug: palette.slug },
      update: {},
      create: {
        name: palette.name,
        slug: palette.slug,
        description: palette.description,
        tags: palette.tags
      }
    });
  }

  for (const colour of sampleColours) {
    await prisma.color.upsert({
      where: { slug: colour.slug },
      update: {},
      create: {
        ...colour,
        themes: colour.themes,
        mood_tags: colour.mood_tags,
        sample_images: colour.sample_images,
        contrast_info: colour.contrast_info,
        palette: {
          connect: { slug: colour.themes.includes('Calm Neutrals') ? 'calm-neutrals' : 'bold-and-bright' }
        }
      }
    });
  }

  for (const painter of samplePainters) {
    await prisma.painter.deleteMany({ where: { email: painter.email } });
    await prisma.painter.create({
      data: {
        full_name: painter.full_name,
        phone: painter.phone,
        email: painter.email,
        city: painter.city,
        years_experience: painter.years_experience,
        skills: painter.skills,
        preferred_zones: painter.preferred_zones ?? JSON.stringify([]),
        expected_rate: painter.expected_rate ?? null,
        status: painter.status,
        admin_notes: painter.admin_notes ?? null,
        portfolio_urls: JSON.stringify([]),
        doc_urls: JSON.stringify([])
      }
    });
  }

  for (const [index, lead] of sampleLeads.entries()) {
    await prisma.lead.deleteMany({ where: { email: lead.email } });
    await prisma.lead.create({
      data: {
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        pincode: lead.pincode,
        address: lead.address,
        service_type: lead.service_type,
        area_estimate: lead.area_estimate ?? null,
        preferred_date: lead.preferred_date,
        status: lead.status,
        color_pref: lead.color_pref ?? JSON.stringify([]),
        notes: lead.notes ?? null,
        adminId: index % 2 === 0 ? admin.id : null
      }
    });
  }

  await prisma.auditLog.deleteMany({ where: { adminId: admin.id } });
  await prisma.auditLog.createMany({
    data: [
      {
        adminId: admin.id,
        action: 'Lead moved to scheduled',
        entity: 'Lead',
        entityId: sampleLeads[1].email,
        metadata: JSON.stringify({ status: 'scheduled', assignedTo: 'Amit Kumar' })
      },
      {
        adminId: admin.id,
        action: 'Painter approved',
        entity: 'Painter',
        entityId: samplePainters[2].email,
        metadata: JSON.stringify({ region: 'NCR', experience: samplePainters[2].years_experience })
      },
      {
        adminId: admin.id,
        action: 'Site visit completed',
        entity: 'Lead',
        entityId: sampleLeads[4].email,
        metadata: JSON.stringify({ feedback: 'Client satisfaction 4.8/5' })
      }
    ]
  });

  await prisma.siteContent.upsert({
    where: { key: 'homepage.hero' },
    update: {},
    create: {
      key: 'homepage.hero',
      type: 'json',
      value: JSON.stringify({
        heading: 'Master Brush — Painting Simplified with Perfection',
        subheading: 'End-to-end painting services, certified professionals, and smart colour tools.'
      })
    }
  });

  await prisma.siteContent.upsert({
    where: { key: 'visualiser.templates' },
    update: {},
    create: {
      key: 'visualiser.templates',
      type: 'json',
      value: JSON.stringify([
        'https://images.masterbrush.ai/templates/livingroom-morning.webp',
        'https://images.masterbrush.ai/templates/bedroom-cozy.webp',
        'https://images.masterbrush.ai/templates/kitchen-modern.webp'
      ])
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.log('Seed completed ✅');
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
