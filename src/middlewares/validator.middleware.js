export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            zodError: error.errors.map(error => error.message) // muestra el error completo de Zod
        });
    }
}