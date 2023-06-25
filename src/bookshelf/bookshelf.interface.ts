export interface BookShelf {
    id: number;
    name: string;
    volumes: number[];
    isPrivate: boolean;
    userId: number;
}