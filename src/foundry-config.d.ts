import type { SystemConfig } from "./config";

declare global {
    interface CONFIG {
        VAGABOND_VTT_SYSTEM_CONFIG: SystemConfig;
    }

    interface DataModelConfig {
        Actor: {
            hero: typeof import("./module/actor/Hero/model").default;
            nonhero: typeof import("./module/actor/Nonhero/model").default;
        };
    }
}

export {};