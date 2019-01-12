declare enum NodeEnv {
    TEST = "test",
    DEVELOPMENT = "development",
    PRODUCTION = "production"
}
export declare function getEnv(): NodeEnv;
export declare function isTest(): boolean;
export declare function isProd(): boolean;
export {};
