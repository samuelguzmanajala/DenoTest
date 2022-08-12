import { augmentConfiguration } from '../../../../../dependencies/deps.ts';
export const Config ={
    url: {
        doc: 'The Mongo connection URL',
        format: String,
        env: 'MONGO_URL',
        default: 'mongodb://admin:admin@localhost:27017'
    },
    cors: {
        allowed: false,
        allowedHost:[]
    }
};
augmentConfiguration(Config);