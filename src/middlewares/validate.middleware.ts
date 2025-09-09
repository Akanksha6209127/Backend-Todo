import { Request, Response, NextFunction } from "express";
import { prettifyError, ZodError, ZodSchema } from "zod";

export const validate = (
	schema: ZodSchema,
	type: "body" | "query" | "params" = "body"
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const parsedData = schema.parse(req[type]);
			req[type] = parsedData;
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const formatted = prettifyError(error);
				return res
					.status(400)
					.json({ message: "Validation error", errors: formatted });
			}
      next(error);
		}
	};
};
