// GET    /api/leads — list with filters + pagination
// POST   /api/leads — create
// GET    /api/leads/:id — single lead
// PUT    /api/leads/:id — update
// DELETE /api/leads/:id — delete (admin only)
// GET    /api/leads/export — CSV export

import { Router } from 'express';
import {
  getLeads, getLead, createLead,
  updateLead, deleteLead, exportCSV,
} from '../controllers/lead.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import { validateLead } from '../validators/lead.validator';

const router = Router();

router.use(verifyToken);

router.get('/export', exportCSV);
router.get('/',       getLeads);
router.post('/',      validateLead, createLead);
router.get('/:id',    getLead);
router.put('/:id',    validateLead, updateLead);
router.delete('/:id', authorizeRoles('admin'), deleteLead);

export default router;