const { z } = require('zod');

// Schema matches exact requirements:
// - electricity (kWh): >= 0
// - naturalGas (therms): >= 0
// - water (liters): >= 0
// - householdSize: integer >= 1, required
// - heatingFuel: "electric", "gas", "oil", "none" (required, no default)
// Reject unknown/extra fields (strict)
const inputSchema = z.object({
  electricity: z.number().min(0, "Electricity usage must be non-negative"),
  naturalGas: z.number().min(0, "Natural gas usage must be non-negative"),
  water: z.number().min(0, "Water usage must be non-negative"),
  householdSize: z.number().int().min(1, "Household size must be at least 1"),
  heatingFuel: z.enum(["electric", "gas", "oil", "none"], {
    errorMap: () => ({ message: 'Heating fuel must be one of: electric, gas, oil, none' })
  })
}).strict();

const validateInput = (req, res, next) => {
  try {
    const validatedData = inputSchema.parse(req.body);
    // Replace req.body with exactly what was validated
    req.body = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    return res.status(400).json({ success: false, error: "Invalid payload format" });
  }
};

module.exports = { validateInput, inputSchema };
