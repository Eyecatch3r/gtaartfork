'use server'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function listAllNPCs(){
    return await prisma.FormData.findMany();
}

 export async function addNPC(formData) {
     await prisma.FormData.create({
         data: {
             Name: formData.field1,
             Occupation: formData.field2,
             Description: formData.bigTextField,
             image: formData.image,
             Role: formData.role,
         },
     });
}