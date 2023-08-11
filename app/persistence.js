'use server'
import {PrismaClient} from '@prisma/client'
import backup from "./dbbackup";
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

     /**for (let row of backup) {
         await prisma.FormData.create({
                 data: {
                     Name: row.Name,
                     Occupation: row.Occupation,
                     Description: row.Description,
                     image: row.image,
                     Role: row.Role
                 }
             }
         )
     }**/
}