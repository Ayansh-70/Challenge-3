function formatZodError(res, error) {
  return res.status(400).json({
    success: false,
    error: "Validation failed",
    details: error.issues.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }))
  });
}

module.exports = { formatZodError };
