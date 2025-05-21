import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z
        .string({
            required_error: "required title"
        }),
    description: z
        .string({
            required_error: "required description"
        }),
    date: z.string().datetime().optional(),
});