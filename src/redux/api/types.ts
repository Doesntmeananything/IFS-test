interface Pages {
    current: number;
    items_count: number;
    total: number;
    total_items_number: number;
}

/**
 * Common interface for Maculosa API responses. Provides `api_version` and `pages` response fields.
 */
interface MaculosaResponse {
    api_version: string;
    pages: Pages;
    warning?: string;
    error?: string;
}

interface Pictures {
    logos?: string[];
    thumbnails?: string[];
    backdrops?: string[];
}

interface Rights {
    recordable: boolean;
    shareable: boolean;
    start_over: boolean;
}

export interface Channel {
    id: number;
    platform_id: string;
    name: string;
    description: string;
    category: string;
    number: number;
    type: string;
    pictures: Pictures;
    rating_id?: number;
    subscription_id?: string;
    rights?: Rights;
}

export interface ChannelsResponse extends MaculosaResponse {
    channels: Channel[];
}

export interface Program {
    id: number;
    source_id: string;
    title: string;
    short_description: string;
    description: string;
    subtitle: string;
    picture: boolean;
    duration: number;
    video_definition: number;
    filters: number[];
    broadcast_datetime: string;
    broadcast_end_datetime: string;
    category: string;
    channel_id: Channel['id'];
    dataset: string;
    pictures: Pictures;
    runtime: number;
    subcategory: string;
    metatype: string;
}

export interface ProgramsResponse extends MaculosaResponse {
    contents: Program[];
}

export interface ProgramResponse extends MaculosaResponse {
    content: Program;
}

export interface VOD {
    id: number;
    runtime: number;
    release_date: string;
    title: string;
    summary: string;
    genre: string;
    pictures: Pictures;
    directors: string[];
}

export interface VODsResponse extends MaculosaResponse {
    contents: VOD[];
}
export interface VODResponse extends MaculosaResponse {
    content: VOD;
}
