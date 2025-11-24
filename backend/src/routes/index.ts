import { Router } from 'express';

import { adminRouter } from './admin.routes';
import { authRouter } from './auth.routes';
import { colorRouter } from './color.routes';
import { contactRouter } from './contact.routes';
import { contentRouter } from './content.routes';
import { leadRouter } from './lead.routes';
import { painterRouter } from './painter.routes';
import { visualiserRouter } from './visualiser.routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/colors', colorRouter);
apiRouter.use('/leads', leadRouter);
apiRouter.use('/painters', painterRouter);
apiRouter.use('/visualiser', visualiserRouter);
apiRouter.use('/contact', contactRouter);
apiRouter.use('/content', contentRouter);
apiRouter.use('/admin', adminRouter);
