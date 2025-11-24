"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
const sampleColours = [
    {
        name: 'Sunlit Sand',
        slug: 'sunlit-sand',
        hex: '#F0D9B5',
        rgb: 'rgb(240,217,181)',
        family: 'Neutral',
        description: 'Warm beige tone perfect for calm, contemporary spaces.',
        themes: ['Calm Neutrals'],
        mood_tags: ['warm', 'cozy'],
        finish: 'Matte',
        popularity: 86,
        sample_images: ['https://images.masterbrush.ai/colours/sunlit-sand-livingroom.webp'],
        contrast_info: { recommended_trim: '#2D2A2B' }
    },
    {
        name: 'Ocean Drive',
        slug: 'ocean-drive',
        hex: '#2A7ABF',
        rgb: 'rgb(42,122,191)',
        family: 'Blue',
        description: 'Punchy azure blue that energises accent walls and creative spaces.',
        themes: ['Bold & Bright'],
        mood_tags: ['fresh', 'invigorating'],
        finish: 'Satin',
        popularity: 92,
        sample_images: ['https://images.masterbrush.ai/colours/ocean-drive-bedroom.webp'],
        contrast_info: { recommended_trim: '#F7F7F7' }
    }
];
const samplePalettes = [
    {
        name: 'Calm Neutrals',
        slug: 'calm-neutrals',
        description: 'Grounding neutrals curated for minimal homes.',
        tags: ['interior', 'minimal']
    },
    {
        name: 'Bold & Bright',
        slug: 'bold-and-bright',
        description: 'Vibrant palette for expressive interiors.',
        tags: ['accent', 'creative']
    }
];
const now = new Date();
const daysFromNow = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
const samplePainters = [
    {
        full_name: 'Rohan Mehta',
        phone: '+911234567891',
        email: 'rohan.mehta@example.com',
        city: 'Mumbai',
        years_experience: 6,
        skills: ['Interior Painting', 'Texture Finishes'],
        preferred_zones: ['Mumbai', 'Thane'],
        expected_rate: '₹25 / sq.ft',
        status: client_1.PainterStatus.approved,
        admin_notes: 'Certified Master Brush pro since 2023.'
    },
    {
        full_name: 'Sana Iqbal',
        phone: '+911234567892',
        email: 'sana.iqbal@example.com',
        city: 'Delhi',
        years_experience: 4,
        skills: ['Exterior Painting', 'Waterproofing'],
        preferred_zones: ['Delhi NCR'],
        expected_rate: '₹22 / sq.ft',
        status: client_1.PainterStatus.pending
    },
    {
        full_name: 'Amit Kumar',
        phone: '+911234567893',
        email: 'amit.kumar@example.com',
        city: 'Gurugram',
        years_experience: 8,
        skills: ['Interior Painting', 'Polish', 'Minor Repairs'],
        preferred_zones: ['Gurugram', 'South Delhi'],
        expected_rate: '₹27 / sq.ft',
        status: client_1.PainterStatus.approved,
        admin_notes: 'Lead painter for premium projects.'
    },
    {
        full_name: 'Neha Sethi',
        phone: '+911234567894',
        email: 'neha.sethi@example.com',
        city: 'Noida',
        years_experience: 3,
        skills: ['Interior Painting', 'Stencil Art'],
        preferred_zones: ['Noida'],
        expected_rate: '₹21 / sq.ft',
        status: client_1.PainterStatus.rejected,
        admin_notes: 'Pending re-application with portfolio updates.'
    }
];
const sampleLeads = [
    {
        name: 'Arjun Patel',
        phone: '+911234567890',
        email: 'arjun.patel@example.com',
        pincode: '400001',
        address: '4th Floor, Prime Towers, Mumbai',
        service_type: 'Express Painting, Kitchen Refresh',
        area_estimate: '3BHK',
        preferred_date: daysFromNow(1),
        status: client_1.LeadStatus.contacted,
        color_pref: ['MB-208 Sunrise Beige'],
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
        status: client_1.LeadStatus.scheduled,
        color_pref: ['MB-208 Sunrise Beige', 'MB-045 Cloud White'],
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
        status: client_1.LeadStatus.scheduled,
        color_pref: ['MB-312 Misty Mauve'],
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
        status: client_1.LeadStatus.contacted,
        color_pref: ['MB-006 Alpine White', 'MB-889 Brick Ember'],
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
        status: client_1.LeadStatus.completed,
        color_pref: ['MB-102 Terra Clay'],
        notes: 'Completed with satin finish; awaiting testimonial.'
    }
];
async function main() {
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL ?? 'admin@masterbrush.local';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD ?? 'ChangeMe123!';
    const passwordHash = await (0, bcryptjs_1.hash)(adminPassword, 10);
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
                preferred_zones: painter.preferred_zones ?? [],
                expected_rate: painter.expected_rate ?? null,
                status: painter.status,
                admin_notes: painter.admin_notes ?? null,
                portfolio_urls: [],
                doc_urls: []
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
                color_pref: lead.color_pref ?? [],
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
                metadata: { status: 'scheduled', assignedTo: 'Amit Kumar' }
            },
            {
                adminId: admin.id,
                action: 'Painter approved',
                entity: 'Painter',
                entityId: samplePainters[2].email,
                metadata: { region: 'NCR', experience: samplePainters[2].years_experience }
            },
            {
                adminId: admin.id,
                action: 'Site visit completed',
                entity: 'Lead',
                entityId: sampleLeads[4].email,
                metadata: { feedback: 'Client satisfaction 4.8/5' }
            }
        ]
    });
    await prisma.siteContent.upsert({
        where: { key: 'homepage.hero' },
        update: {},
        create: {
            key: 'homepage.hero',
            type: 'json',
            value: {
                heading: 'Master Brush — Painting Simplified with Perfection',
                subheading: 'End-to-end painting services, certified professionals, and smart colour tools.'
            }
        }
    });
    await prisma.siteContent.upsert({
        where: { key: 'visualiser.templates' },
        update: {},
        create: {
            key: 'visualiser.templates',
            type: 'json',
            value: [
                'https://images.masterbrush.ai/templates/livingroom-morning.webp',
                'https://images.masterbrush.ai/templates/bedroom-cozy.webp',
                'https://images.masterbrush.ai/templates/kitchen-modern.webp'
            ]
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
