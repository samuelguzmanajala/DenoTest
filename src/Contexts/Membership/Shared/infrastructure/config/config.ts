import { augmentConfiguration } from '../../../../../dependencies/deps.ts';
export const Config ={
    url: {
        doc: 'The Mongo connection URL',
        format: String,
        env: 'MONGO_URL',
        default: 'mongodb+srv://samuel:contrasena@cluster0.hechiqz.mongodb.net/?authMechanism=SCRAM-SHA-1'
    },
    cors: {
        allowed: false,
        allowedHost:[]
    }
};
//default: 'mongodb+srv://samuel:contrasena@cluster0.hechiqz.mongodb.net/?authMechanism=SCRAM-SHA-1?retryWrites=true&w=majority'
augmentConfiguration(Config);