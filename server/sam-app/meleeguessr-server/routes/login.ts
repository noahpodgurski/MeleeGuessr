import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

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

export const loginHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'No login info provided',
            }),
        };
    }

    let email, password;
    try {
        const body = JSON.parse(event.body);
        email = body.email;
        password = body.password;
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "No login info provided"
            }),
        };
    }
    if (!email || typeof email !== 'string' || !password || typeof password !== 'string'){
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Invalid email/password"
            }),
        };
    }
    
    const user = await prisma.users.findUnique({
        where: { email }
    })
    console.log(user);
    if (user && user.password && await bcrypt.compare(password, user.password)){
        //the user,pass combo is a match
        const token = jwt.sign(
        { 
            id: user.id,
            email: user.email,
            username: user.username
        }, 
        process.env.SECRET as string
        );
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Successfully logged in",
                data: token
            }),
        };
    }
    return {
        statusCode: 401,
        body: JSON.stringify({
            message: 'Invalid email/password',
        }),
    };
};
