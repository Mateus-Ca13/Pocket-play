import z from "zod";

export const editPlayerProfileSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Nome é obrigatório').max(16, 'Nome deve ter entre 1 e 16 caracteres').optional(),
    avatarKey: z.string().optional(),
});

export type EditPlayerProfileParams = z.infer<typeof editPlayerProfileSchema>;

