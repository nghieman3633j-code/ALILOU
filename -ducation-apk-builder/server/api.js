const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// ============================================
// Mock Data Storage (In-Memory)
// ============================================
const store = {
  users: new Map(),
  conversions: new Map(),
  quizzes: new Map(),
  questions: new Map(),
  templates: new Map(),
  auditLogs: new Map(),
  sessions: new Map(), // For JWT tokens
};

// ============================================
// Middleware
// ============================================

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !store.sessions.has(token)) {
    return res.status(401).json({ error: 'غير مصرح' });
  }
  req.userId = store.sessions.get(token).userId;
  next();
};

const authorize = (roles) => (req, res, next) => {
  const user = store.users.get(req.userId);
  if (!user || !roles.includes(user.role)) {
    return res.status(403).json({ error: 'ممنوع' });
  }
  next();
};

const logAudit = (userId, action, resourceType, resourceId, changes = {}) => {
  const log = {
    id: uuidv4(),
    user_id: userId,
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    changes,
    ip_address: '127.0.0.1',
    created_at: new Date(),
  };
  store.auditLogs.set(log.id, log);
};

// ============================================
// Auth Endpoints
// ============================================

router.post('/api/auth/register', (req, res) => {
  const { email, password, full_name, language = 'ar', timezone = 'UTC' } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({ error: 'بيانات مفقودة' });
  }

  // Check if email exists
  const emailExists = Array.from(store.users.values()).some(u => u.email === email);
  if (emailExists) {
    return res.status(409).json({ error: 'البريد الإلكتروني موجود بالفعل' });
  }

  const userId = uuidv4();
  const user = {
    id: userId,
    email,
    password_hash: Buffer.from(password).toString('base64'), // Mock hashing
    full_name,
    language,
    timezone,
    role: 'user',
    api_keys: [],
    preferences: {},
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
  };

  store.users.set(userId, user);
  logAudit(userId, 'REGISTER', 'User', userId);

  res.status(201).json({
    message: 'تم التسجيل بنجاح',
    user: { id: user.id, email: user.email, full_name: user.full_name },
  });
});

router.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'بريد أو كلمة مرور مفقودة' });
  }

  const user = Array.from(store.users.values()).find(u => u.email === email);
  if (!user || user.password_hash !== Buffer.from(password).toString('base64')) {
    return res.status(401).json({ error: 'بيانات دخول غير صحيحة' });
  }

  const token = uuidv4();
  const refreshToken = uuidv4();

  store.sessions.set(token, { userId: user.id, refreshToken, expiresAt: Date.now() + 3600000 });
  logAudit(user.id, 'LOGIN', 'User', user.id);

  res.json({
    message: 'تسجيل دخول ناجح',
    access_token: token,
    refresh_token: refreshToken,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

router.post('/api/auth/refresh', (req, res) => {
  const { refresh_token } = req.body;

  const session = Array.from(store.sessions.values()).find(s => s.refreshToken === refresh_token);
  if (!session) {
    return res.status(401).json({ error: 'refresh token غير صالح' });
  }

  const newToken = uuidv4();
  store.sessions.set(newToken, { userId: session.userId, refreshToken: refresh_token, expiresAt: Date.now() + 3600000 });

  res.json({ access_token: newToken });
});

router.post('/api/auth/logout', authenticate, (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  store.sessions.delete(token);
  logAudit(req.userId, 'LOGOUT', 'User', req.userId);

  res.json({ message: 'تم تسجيل الخروج' });
});

// ============================================
// Conversion Endpoints
// ============================================

router.post('/api/convert', authenticate, (req, res) => {
  const { source_format, target_format } = req.body;

  if (!source_format || !target_format) {
    return res.status(400).json({ error: 'صيغة المصدر والهدف مطلوبة' });
  }

  const conversionId = uuidv4();
  const conversion = {
    id: conversionId,
    user_id: req.userId,
    source_format,
    target_format,
    source_file_path: `/uploads/${conversionId}_source`,
    output_file_path: `/uploads/${conversionId}_output`,
    file_size: 1024, // Mock
    status: 'pending',
    error_message: null,
    conversion_time_ms: null,
    metadata: {},
    created_at: new Date(),
    completed_at: null,
  };

  store.conversions.set(conversionId, conversion);
  logAudit(req.userId, 'CREATE_CONVERSION', 'Conversion', conversionId);

  // Simulate processing
  setTimeout(() => {
    conversion.status = 'completed';
    conversion.conversion_time_ms = Math.random() * 5000 + 1000;
    conversion.completed_at = new Date();
  }, 2000);

  res.status(202).json({
    message: 'بدأ التحويل',
    conversion_id: conversionId,
    status: 'pending',
  });
});

router.post('/api/convert/batch', authenticate, (req, res) => {
  const { conversions } = req.body;

  if (!Array.isArray(conversions) || conversions.length === 0) {
    return res.status(400).json({ error: 'قائمة تحويلات مطلوبة' });
  }

  const results = conversions.map(conv => {
    const conversionId = uuidv4();
    const conversion = {
      id: conversionId,
      user_id: req.userId,
      source_format: conv.source_format,
      target_format: conv.target_format,
      source_file_path: `/uploads/${conversionId}_source`,
      output_file_path: `/uploads/${conversionId}_output`,
      file_size: 1024,
      status: 'pending',
      error_message: null,
      conversion_time_ms: null,
      metadata: {},
      created_at: new Date(),
      completed_at: null,
    };
    store.conversions.set(conversionId, conversion);
    logAudit(req.userId, 'CREATE_BATCH_CONVERSION', 'Conversion', conversionId);
    return { id: conversionId, status: 'pending' };
  });

  res.status(202).json({
    message: 'بدأ التحويلات المتعددة',
    conversions: results,
  });
});

router.get('/api/convert/:conversionId', authenticate, (req, res) => {
  const conversion = store.conversions.get(req.params.conversionId);

  if (!conversion) {
    return res.status(404).json({ error: 'التحويل غير موجود' });
  }

  if (conversion.user_id !== req.userId) {
    return res.status(403).json({ error: 'ممنوع' });
  }

  res.json(conversion);
});

router.get('/api/convert/:conversionId/download', authenticate, (req, res) => {
  const conversion = store.conversions.get(req.params.conversionId);

  if (!conversion) {
    return res.status(404).json({ error: 'التحويل غير موجود' });
  }

  if (conversion.user_id !== req.userId || conversion.status !== 'completed') {
    return res.status(403).json({ error: 'الملف غير متاح للتحميل' });
  }

  res.json({
    message: 'رابط التحميل',
    download_url: conversion.output_file_path,
  });
});

router.get('/api/conversions', authenticate, (req, res) => {
  const { status, source_format, target_format, limit = 20, offset = 0 } = req.query;

  let conversions = Array.from(store.conversions.values()).filter(c => c.user_id === req.userId);

  if (status) conversions = conversions.filter(c => c.status === status);
  if (source_format) conversions = conversions.filter(c => c.source_format === source_format);
  if (target_format) conversions = conversions.filter(c => c.target_format === target_format);

  const paginated = conversions.slice(offset, offset + limit);

  res.json({
    total: conversions.length,
    limit: parseInt(limit),
    offset: parseInt(offset),
    data: paginated,
  });
});

router.delete('/api/conversions/:conversionId', authenticate, (req, res) => {
  const conversion = store.conversions.get(req.params.conversionId);

  if (!conversion) {
    return res.status(404).json({ error: 'التحويل غير موجود' });
  }

  if (conversion.user_id !== req.userId) {
    return res.status(403).json({ error: 'ممنوع' });
  }

  store.conversions.delete(req.params.conversionId);
  logAudit(req.userId, 'DELETE_CONVERSION', 'Conversion', req.params.conversionId);

  res.json({ message: 'تم حذف التحويل' });
});

// ============================================
// Quiz Endpoints
// ============================================

router.post('/api/quiz/generate', authenticate, (req, res) => {
  const { title, description, source_file, question_count = 10 } = req.body;

  if (!title || !source_file) {
    return res.status(400).json({ error: 'العنوان والملف المصدر مطلوبان' });
  }

  const quizId = uuidv4();
  const quiz = {
    id: quizId,
    user_id: req.userId,
    title,
    description: description || '',
    source_file,
    question_count,
    exported_formats: [],
    created_at: new Date(),
    updated_at: new Date(),
  };

  store.quizzes.set(quizId, quiz);

  // Generate mock questions
  for (let i = 0; i < question_count; i++) {
    const questionId = uuidv4();
    const question = {
      id: questionId,
      quiz_id: quizId,
      question_text: `السؤال ${i + 1}؟`,
      question_type: 'multiple_choice',
      options: [
        { id: uuidv4(), text: 'الخيار أ' },
        { id: uuidv4(), text: 'الخيار ب' },
        { id: uuidv4(), text: 'الخيار ج' },
      ],
      correct_answer: { option_id: 0 },
      points: 1,
      order: i,
    };
    store.questions.set(questionId, question);
  }

  logAudit(req.userId, 'CREATE_QUIZ', 'Quiz', quizId);

  res.status(201).json({
    message: 'تم إنشاء الاختبار',
    quiz_id: quizId,
    question_count,
  });
});

router.get('/api/quiz/:quizId', authenticate, (req, res) => {
  const quiz = store.quizzes.get(req.params.quizId);

  if (!quiz) {
    return res.status(404).json({ error: 'الاختبار غير موجود' });
  }

  if (quiz.user_id !== req.userId) {
    return res.status(403).json({ error: 'ممنوع' });
  }

  const questions = Array.from(store.questions.values()).filter(q => q.quiz_id === req.params.quizId);

  res.json({
    ...quiz,
    questions: questions.sort((a, b) => a.order - b.order),
  });
});

router.post('/api/quiz/:quizId/export', authenticate, (req, res) => {
  const { format } = req.body;
  const quiz = store.quizzes.get(req.params.quizId);

  if (!quiz) {
    return res.status(404).json({ error: 'الاختبار غير موجود' });
  }

  if (quiz.user_id !== req.userId) {
    return res.status(403).json({ error: 'ممنوع' });
  }

  if (!['pdf', 'docx', 'json', 'csv'].includes(format)) {
    return res.status(400).json({ error: 'صيغة غير مدعومة' });
  }

  quiz.exported_formats.push({ format, exported_at: new Date() });
  logAudit(req.userId, 'EXPORT_QUIZ', 'Quiz', req.params.quizId, { format });

  res.json({
    message: `تم تصدير الاختبار بصيغة ${format}`,
    export_url: `/exports/quiz_${req.params.quizId}.${format}`,
  });
});

// ============================================
// Templates Endpoints
// ============================================

router.get('/api/templates', (req, res) => {
  const { category, platform, is_public = true } = req.query;

  let templates = Array.from(store.templates.values());

  if (is_public === 'true') {
    templates = templates.filter(t => t.is_public);
  }
  if (category) {
    templates = templates.filter(t => t.category === category);
  }
  if (platform) {
    templates = templates.filter(t => t.platform === platform);
  }

  res.json({ templates });
});

router.get('/api/templates/:templateId', (req, res) => {
  const template = store.templates.get(req.params.templateId);

  if (!template) {
    return res.status(404).json({ error: 'القالب غير موجود' });
  }

  res.json(template);
});

// ============================================
// Formats Endpoints
// ============================================

router.get('/api/formats', (req, res) => {
  const formats = [
    { id: 'pdf', name: 'PDF', description: 'صيغة الملفات المحمولة', extensions: ['.pdf'] },
    { id: 'docx', name: 'Word', description: 'مستند مايكروسوفت وورد', extensions: ['.docx'] },
    { id: 'xlsx', name: 'Excel', description: 'جدول بيانات إكسل', extensions: ['.xlsx'] },
    { id: 'json', name: 'JSON', description: 'صيغة JSON', extensions: ['.json'] },
    { id: 'csv', name: 'CSV', description: 'قيم مفصولة بفواصل', extensions: ['.csv'] },
    { id: 'html', name: 'HTML', description: 'صفحة ويب', extensions: ['.html'] },
  ];

  res.json({ formats });
});

router.get('/api/formats/compatibility', (req, res) => {
  const compatibility = {
    pdf: ['docx', 'html', 'txt'],
    docx: ['pdf', 'html', 'txt', 'odt'],
    xlsx: ['csv', 'json', 'ods'],
    json: ['csv', 'xlsx', 'xml'],
    csv: ['json', 'xlsx', 'html'],
    html: ['pdf', 'docx', 'txt'],
  };

  res.json({ compatibility });
});

// ============================================
// User Profile Endpoints
// ============================================

router.get('/api/user/profile', authenticate, (req, res) => {
  const user = store.users.get(req.userId);

  if (!user) {
    return res.status(404).json({ error: 'المستخدم غير موجود' });
  }

  const { password_hash, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

router.put('/api/user/profile', authenticate, (req, res) => {
  const { full_name, timezone, language } = req.body;
  const user = store.users.get(req.userId);

  if (!user) {
    return res.status(404).json({ error: 'المستخدم غير موجود' });
  }

  const changes = {};
  if (full_name) {
    changes.full_name = user.full_name;
    user.full_name = full_name;
  }
  if (timezone) {
    changes.timezone = user.timezone;
    user.timezone = timezone;
  }
  if (language) {
    changes.language = user.language;
    user.language = language;
  }

  user.updated_at = new Date();
  logAudit(req.userId, 'UPDATE_PROFILE', 'User', req.userId, changes);

  const { password_hash, ...userWithoutPassword } = user;
  res.json({ message: 'تم تحديث الملف الشخصي', user: userWithoutPassword });
});

router.put('/api/user/settings', authenticate, (req, res) => {
  const { preferences } = req.body;
  const user = store.users.get(req.userId);

  if (!user) {
    return res.status(404).json({ error: 'المستخدم غير موجود' });
  }

  if (preferences) {
    user.preferences = { ...user.preferences, ...preferences };
  }

  user.updated_at = new Date();
  logAudit(req.userId, 'UPDATE_SETTINGS', 'User', req.userId, { preferences });

  res.json({ message: 'تم تحديث الإعدادات', settings: user.preferences });
});

// ============================================
// Admin Endpoints
// ============================================

router.get('/api/admin/stats', authenticate, authorize(['admin']), (req, res) => {
  const stats = {
    total_users: store.users.size,
    total_conversions: store.conversions.size,
    total_quizzes: store.quizzes.size,
    active_users: Array.from(store.users.values()).filter(u => u.is_active).length,
    conversions_completed: Array.from(store.conversions.values()).filter(c => c.status === 'completed').length,
    conversions_failed: Array.from(store.conversions.values()).filter(c => c.status === 'failed').length,
  };

  res.json(stats);
});

router.get('/api/admin/users', authenticate, authorize(['admin']), (req, res) => {
  const { limit = 20, offset = 0, role } = req.query;

  let users = Array.from(store.users.values());

  if (role) {
    users = users.filter(u => u.role === role);
  }

  const paginated = users.slice(offset, offset + limit).map(u => {
    const { password_hash, ...user } = u;
    return user;
  });

  res.json({
    total: users.length,
    limit: parseInt(limit),
    offset: parseInt(offset),
    users: paginated,
  });
});

router.put('/api/admin/users/:userId', authenticate, authorize(['admin']), (req, res) => {
  const { role, is_active } = req.body;
  const user = store.users.get(req.params.userId);

  if (!user) {
    return res.status(404).json({ error: 'المستخدم غير موجود' });
  }

  const changes = {};
  if (role && ['user', 'admin', 'moderator'].includes(role)) {
    changes.role = user.role;
    user.role = role;
  }
  if (typeof is_active === 'boolean') {
    changes.is_active = user.is_active;
    user.is_active = is_active;
  }

  user.updated_at = new Date();
  logAudit(req.userId, 'UPDATE_USER', 'User', req.params.userId, changes);

  const { password_hash, ...userWithoutPassword } = user;
  res.json({ message: 'تم تحديث المستخدم', user: userWithoutPassword });
});

router.delete('/api/admin/users/:userId', authenticate, authorize(['admin']), (req, res) => {
  const user = store.users.get(req.params.userId);

  if (!user) {
    return res.status(404).json({ error: 'المستخدم غير موجود' });
  }

  store.users.delete(req.params.userId);
  logAudit(req.userId, 'DELETE_USER', 'User', req.params.userId);

  res.json({ message: 'تم حذف المستخدم' });
});

module.exports = router;