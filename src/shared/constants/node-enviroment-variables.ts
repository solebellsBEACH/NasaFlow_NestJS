import { EnviromentVariables, NodeEnviromentVariables } from "@shared/interfaces/node-enviroment-variables.interface";

export const nodeEnviromentVariables = (): EnviromentVariables => {
    const {
        DATABASE_HOST,
        DATABASE_NAME,
        DATABASE_PASSWORD,
        DATABASE_PORT,
        DATABASE_TYPE,
        DATABASE_USERNAME
    } = process.env as unknown as NodeEnviromentVariables;

    if (
        !DATABASE_HOST ||
        !DATABASE_NAME ||
        !DATABASE_PASSWORD ||
        !DATABASE_PORT ||
        !DATABASE_TYPE ||
        !DATABASE_USERNAME
    ) {
        throw new Error("Missing required environment variables");
    }

    return {
        DATABASE_HOST,
        DATABASE_NAME,
        DATABASE_PASSWORD,
        DATABASE_PORT: parseInt(DATABASE_PORT) || 1234,
        DATABASE_TYPE,
        DATABASE_USERNAME
    };
}
