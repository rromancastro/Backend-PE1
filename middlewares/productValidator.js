export const productValidator = (req, res, next) => {
    if (
        req.body.title === undefined ||
        typeof req.body.title !== "string" ||
        req.body.description === undefined ||
        typeof req.body.description !== "string" ||
        req.body.code === undefined ||
        typeof req.body.code !== "string" ||
        req.body.price === undefined ||
        typeof req.body.price !== "number" ||
        req.body.status === undefined ||
        typeof req.body.status !== "boolean" ||
        req.body.stock === undefined ||
        typeof req.body.stock !== "number" ||
        req.body.category === undefined ||
        typeof req.body.category !== "string"
    ) {
        return res.status(400).send("Bad request - Invalid Body");
    }
    return next();
};