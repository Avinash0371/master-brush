import { Router } from 'express';

import {
	getAdminDashboard,
	listAdminLeads,
	listAdminPainters,
	updateAdminLeadStatus,
	updateAdminPainterStatus
} from '../controllers/admin.controller';

const adminRouter = Router();

adminRouter.get('/dashboard', getAdminDashboard);
adminRouter.get('/leads', listAdminLeads);
adminRouter.get('/painters', listAdminPainters);
adminRouter.patch('/leads/:id/status', updateAdminLeadStatus);
adminRouter.patch('/painters/:id/status', updateAdminPainterStatus);

export { adminRouter };
