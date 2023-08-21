export {};
import { ExposedCtx } from "./exposedCtx.cjs";
declare global {
    interface Window {
        electron: ExposedCtx;
    }
}
