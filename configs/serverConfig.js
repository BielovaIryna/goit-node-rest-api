const serverConfig = {
    mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017',
    port: process.env.PORT ?? 4000,
    environment: process.env.NODE_ENV ?? 'development',
    jwtSecret: process.env.JWT_SECRET ?? 'super-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES ?? '10m',
    baseURL:process.env.BASE_URL??'',
    metaPort:process.env.META_PORT??100,
    metaHost:process.env.META_HOST??'',
    metaUser:process.env.META_USER??'',
    metaPassword:process.env.META_PASSWOR??'',
    mailtrapHost:process.env.MAILTRAP_HOST??'',
    mailtrapPort:process.env.MAILTRAP_PORT??100,
    mailtrapUser:process.env.MAILTRAP_USER??'',
    mailtrapPassword:process.env.MAILTRAP_PASSWORD??''


  };
  
  export { serverConfig };
  