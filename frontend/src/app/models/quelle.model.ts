import { Clip } from "./clip.model";

export interface Quelle {
    id: number;
    name: string;
    url: string;
    // config options
    viewport_width?: number;
    viewport_height?: number;
    fullPage?: boolean;
    clip?: Clip;
    multipleClips?: boolean;
    targetNumberOfClipsX?: number;
    targetNumberOfClipsY?: number;
    //exclude clips at (x, y)
    
    optimizeSpeed?: boolean;
}