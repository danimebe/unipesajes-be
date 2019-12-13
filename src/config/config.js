module.exports = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    urldb: process.env.URLDB,
    token: process.env.TOKEN,
    awsPublicKey: process.env.AWS_PUBLIC_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY
}
