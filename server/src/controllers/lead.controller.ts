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
