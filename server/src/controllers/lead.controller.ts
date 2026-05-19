// GET /api/leads — Advanced Filtering Logic:
// Query params: status, source, search, sort, page, limit

// Build dynamic Mongoose query object
// search → regex on name OR email
// sort: latest → -createdAt, oldest → createdAt
// Pagination: skip = (page - 1) * limit, limit = 10
// Return: { data, total, page, totalPages }

// Role rules:

// admin → sees all leads
// sales → sees only their own leads (createdBy: req.user._id)

// DELETE:

// admin only (use authorizeRoles('admin'))

// Apply same filters as list endpoint
// Use json2csv or manual CSV string builder
// Set headers: Content-Type: text/csv, Content-Disposition: attachment

export const getLeads = async (req, res, next) => {
    const { status, source, search, sort, page=1, limit=10 } = req.query;
    const query: LeadQuery = {};
  
    if (req.user?.role === 'sales') query.createdBy = req.user.id;
    if (status) query.status = status as LeadStatus;
    if (source) query.source = source as LeadSource;
    if (search) {
      const re = new RegExp(search as string, 'i');
      query.$or = [{ name: re }, { email: re }];
    }
  
    const sortOrder = sort === 'oldest' ? 'createdAt' : '-createdAt';
    const skip = (Number(page) - 1) * Number(limit);
  
    const [data, total] = await Promise.all([
      Lead.find(query).sort(sortOrder).skip(skip).limit(Number(limit)),
      Lead.countDocuments(query),
    ]);
  
    sendSuccess(res, 200, {
      data,
      pagination: { total, page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)) }
    });
  };
  
  export const createLead = async (req, res, next) => {
    const lead = await Lead.create({ ...req.body, createdBy: req.user?.id });
    sendSuccess(res, 201, { lead });
  };
  
  export const exportCSV = async (req, res, next) => {
    const { status, source, search } = req.query;
    const query: LeadQuery = {};
    if (req.user?.role === 'sales') query.createdBy = req.user.id;
    if (status) query.status = status as LeadStatus;
    if (source) query.source = source as LeadSource;
    if (search) {
      const re = new RegExp(search as string, 'i');
      query.$or = [{ name: re }, { email: re }];
    }
    const leads = await Lead.find(query).lean();
    const csv = leadsToCSV(leads);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition',
      'attachment; filename="leads.csv"');
    res.send(csv);
  };