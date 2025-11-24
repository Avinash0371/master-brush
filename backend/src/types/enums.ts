// Enums for type safety (SQLite doesn't support native enums in Prisma)

export enum Role {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    SUPPORT_AGENT = 'support_agent'
}

export enum LeadStatus {
    NEW = 'new',
    CONTACTED = 'contacted',
    SITE_VISIT_SCHEDULED = 'site_visit_scheduled',
    QUOTATION_SENT = 'quotation_sent',
    NEGOTIATION = 'negotiation',
    WON = 'won',
    LOST = 'lost'
}

export enum PainterStatus {
    PENDING = 'pending',
    VERIFIED = 'verified',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    SUSPENDED = 'suspended'
}
