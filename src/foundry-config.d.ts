import type { SystemConfig } from "./config";

declare global {
    interface CONFIG {
        VAGABOND_VTT_SYSTEM_CONFIG: SystemConfig;
    }
}

//Document.ModuleSubType

// declare global {
//     interface Document {
//         ModuleSubType: "base" | "hero" | foundry.abstract.Document.ModuleSubType;
//     }
// }

export {};