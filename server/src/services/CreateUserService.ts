import prismaClient from "../prisma";
interface UserRequest {
    name: string;
    bio: string; 
    phone: string;
    email: string;
    password: string;
}

    class CreateUserService {
    async execute({ name, bio, phone, email, password }: UserRequest) {

        //verificar se o usuário enviou o email
        if(!email) {
            throw new Error("Email incorrect")
        }

        //Verificar se esse email já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists) {
            throw new Error("User already exists")
           }

            const user = await prismaClient.user.create({
                data: {
                    name: name,
                    bio: bio,
                    phone: phone,
                    email: email,
                    password: password,
                }
            })
            return user;
        
    }
}

export { CreateUserService }