import { z } from "zod";

const passwordSuperRefine: (arg: {
    password: string,
    passwordRepeat: string,
}, ctx: z.RefinementCtx) => void = ({ password, passwordRepeat }, ctx) => {
    const zIssueObj = {
        code: z.ZodIssueCode.custom,
        message: "There was an error",
        path: [ "password" ],
    };

    // Password does not contain an uppercase letter
    if (password.search(new RegExp("[A-Z]")) === -1) {
        zIssueObj.message = "Password must contain an uppercase letter";
        ctx.addIssue(zIssueObj);
    }
    // Password does not contain a lowercase letter
    if (password.search(new RegExp("[a-z]")) === -1) {
        zIssueObj.message = "Password must contain a lowercase letter";
        ctx.addIssue(zIssueObj);
    }

    // Password does not contain a digit
    if (password.search(new RegExp("\\d")) === -1) {
        zIssueObj.message = "Password must contain a digit";
        ctx.addIssue(zIssueObj);
    }

    // Password does not contain a special character
    if (password.search(new RegExp("[^\\w\\s]")) === -1) {
        zIssueObj.message = "Password must contain a special character";
        ctx.addIssue(zIssueObj);
    }

    // Passwords do not match
    if (password !== passwordRepeat) {
        zIssueObj.message = "The passwords do not match";
        zIssueObj.path = [ "passwordRepeat" ];
        ctx.addIssue(zIssueObj);
    }
}

export const LoginFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string(),
})

export const RegisterFormSchema = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        birthDate: z.date().optional(),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        passwordRepeat: z.string(),
    })
    .superRefine(passwordSuperRefine);

export const CreateHouseholdFormSchema = z
    .object({
        householdName: z.string().min(1, "Please enter a household name"),
    })

export const ChangeNameFormSchema = z
    .object({
        firstName: z.string().min(1, "Please enter your first name"),
        lastName: z.string().min(1, "Please enter your last name"),
    })

export const ChangeEmailFormSchema = z
    .object({
        email: z.string().email("Please enter a valid email"),
    })

export const ChangePasswordFormSchema = z
    .object({
        currentPassword: z.string().min(0, "Please enter your password."),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        passwordRepeat: z.string(),
    })
    .superRefine(passwordSuperRefine);

export const FridgeItemFormSchema = z
    .object({
        name: z.string().min(1, "Item name is required."),
        quantity: z.coerce.number({ required_error: "Enter a number" }).int().min(1, "Enter a whole number."),
        expiryDate: z.date().optional(),
        owners: z.array(z.object({ label: z.string(), value: z.string(), disable: z.boolean().optional(), })).min(1),
    });
