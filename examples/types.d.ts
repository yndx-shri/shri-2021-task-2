/** UUID-like unique key */
export type UUID = string
/** 32 or 40 chars */
export type HASH = string

export type IssueId = HASH;
export type ProjectId = UUID;
export type CommentId = UUID;
export type CommitId = UUID;
export type UserId = number;
export type SprintId = number;
export type SummaryId = number;

/** Epoch in ms */
export type Timestamp = number

/** Проект (пакет/сервис/репозиторий) */
export interface Project {
    id: ProjectId;
    type: 'Project';
    name: string;
    dependencies: (Project | ProjectId)[]; // другие проекты
    issues: (Issue | IssueId)[]; // заведенные issue
    commits: (Commit | CommitId)[]; // коммиты
}

/** Пользователь */
export interface User {
    id: UserId;
    type: 'User';
    name: string;
    login: string;
    avatar: string;
    friends: (User | UserId)[];
    commits?: (Commit | CommitId)[];
    comments?: (Comment | CommentId)[];
}

/** Проблема */
export interface Issue {
    id: IssueId;
    type: 'Issue';
    name: string;
    status: 'open' | 'inProgress' | 'closed';
    resolution?: 'fixed' | 'cancelled' | 'duplicate';
    resolvedBy?: User | UserId;
    comments: (Comment | CommentId)[];
    createdAt: Timestamp;
    finishedAt?: Timestamp;
}

/** Комментарий */
export interface Comment {
    id: CommentId;
    type: 'Comment';
    author: User | UserId;
    message: string;
    likes: (User | UserId)[];
    createdAt: Timestamp;
}

/** Коммит */
export interface Commit {
    id: CommitId;
    type: 'Commit';
    author: User | UserId;
    message: string;
    summaries: Summary | SummaryId[];
    timestamp: Timestamp;
}

/** Файл внутри коммита ? */
export interface Summary {
    id: SummaryId;
    type: 'Summary';
    path: string;
    added: number;
    removed: number;
    comments?: (Comment | CommentId)[];
}

/** Спринт */
export interface Sprint {
    id: SprintId;
    type: 'Sprint';
    name: string;
    startAt: Timestamp;
    finishAt: Timestamp;
}

export type Entity =
    | Project
    | User
    | Issue
    | Comment
    | Commit
    | Summary
    | Sprint;

export type EntityId = Entity['id'];
export type EntityType = Entity['type'];
