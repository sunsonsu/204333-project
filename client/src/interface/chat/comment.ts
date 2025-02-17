export default interface CommentInfo {
    cid: number;
    uid: number;
    c: string;
    msg: string;
    createdAt: string;
    deletedAt: string | null;
    username: string;
}
