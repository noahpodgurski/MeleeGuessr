import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
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

export const statHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const pageSize = 10;
    console.log(event.queryStringParameters);
    let id;
    let page = 1;
    try {
        const params = event.queryStringParameters;
        id = params?.id
        page = parseInt(params?.page ?? "0")
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "id query is incorrect"
            }),
        };
    }
    if (page < 1) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "page query is incorrect"
            }),
        };
    }
    
    const stat = id ? await prisma.stat.findUnique({
        where: { userId: id }
    }) : await prisma.stat.findMany({
        skip: (page-1)*pageSize,
        take: pageSize
    })
    console.log(stat);
    if (stat){
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Success",
                data: stat
            }),
        };
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'Invalid request',
        }),
    };
};
