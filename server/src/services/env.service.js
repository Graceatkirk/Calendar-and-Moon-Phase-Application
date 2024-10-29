class EnvService {
    constructor(jwtSecret) {
        this.JWT_SECRET = jwtSecret;

        //put database stuff here

        if (this.JWT_SECRET === undefined) {
            process.exit(1);
        }
    }
}

const envService = new EnvService(
    process.env.JWT_SECRET
);

export default envService;