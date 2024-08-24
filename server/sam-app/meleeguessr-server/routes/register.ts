import { PrismaClient } from '@prisma/client';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import bcrypt from 'bcryptjs';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */


const prisma = new PrismaClient();

export const registerHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'No login info provided',
            }),
        };
    }

    let email, password, username;
    try {
        const body = JSON.parse(event.body);
        email = body.email;
        password = body.password;
        username = body.username;
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "No login info provided"
            }),
        };
    }
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string' || !username || typeof username !== 'string'){
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Invalid email/username/password"
            }),
        };
    }

    if (password.length < 8){
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Password too short. Should be at least 8 characters"
            }),
        }
    }
    
    try {
        const hashedPass = await bcrypt.hash(password, 12);
        
        await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPass
            }
        });
    } catch(err: any) {
        //duplicate email
        if (err.code === 'P2002'){
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Email already in use"
                }),
            }
        }
      }
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Successfully registered"
        }),
    }
};
