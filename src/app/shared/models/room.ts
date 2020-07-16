export interface IRoom {
    roomName: string;
    user?: {
        socketID: string;
        name?: string;
    };
}
