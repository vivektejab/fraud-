export default {
    port : process.env.PORT ? process.env.PORT : 3000,
    dbUri : process.env.DB_URL ? process.env.DB_URL : 'mongodb://localhost:27017/FraudRules',
    whileListDomains : process.env.WHITELISTED_DOMAINS,
}