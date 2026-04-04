import prisma from "../../config/db.config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../../utils/asyncHandler"
import { RegisterUserInput } from "./auth.types"
import { Request, Response } from "express"
import { ApiError } from "../../utils/ApiError"
import { ApiResponse } from "../../utils/ApiResponse"


export const registerUser = asyncHandler(async(req: Request<{}, unknown, RegisterUserInput>, res:Response)=>{
    const {email, password, username, bio, avatarUrl } = req.body

    if(!email || !password || !username){
        throw new ApiError(400, "Please fill out all the fields")
    }
    const existingUser = await prisma.user.findFirst({
        where:{
            OR:[{email}, {password}]
        }
    })

    if(existingUser)
        throw new ApiError(400, "User already exists!!!")

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data:{
            email:email,
            password:hashedPassword,
            username:username,
            bio: bio,
            avatarUrl:avatarUrl
        }
    })

    const createdUser = await prisma.user.findUnique({
        where: {email: email},
        select: {email: true, username:true, password:false, bio:true, avatarUrl:true}
    })

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating the user")
    }

    res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"))
})
