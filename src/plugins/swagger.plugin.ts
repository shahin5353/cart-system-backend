import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import basicAuth from 'express-basic-auth';


// Swagger used for Graphical Interface of API and interact with all request like postman 
export async function setupSwagger(app: INestApplication,configService): Promise<void> {
    const options = new DocumentBuilder()
        .setTitle('Diagnostic API')
        .setDescription('')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
}