import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
    async handle(req: Request, res:Response) {
        const { name, bio, phone, email, password } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            bio,
            phone,
            email,
            password
        });

        return res.json(user)
    }
}

export { CreateUserController }