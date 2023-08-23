import { ComponentType } from "react";

export type TPreloadComponent<R> = R extends ComponentType<infer P> ? ComponentType<P & {
  onEnd?: () => void;
}> : any;