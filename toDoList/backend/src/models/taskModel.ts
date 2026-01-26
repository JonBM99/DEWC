export interface Task {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'in_progress' | 'done';
    created_at: Date;
    updated_at: Date;
}

export interface TaskCreate {
    title: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'done';
}

export interface TaskUpdate {
    title?: string;
    description?: string;
    status?: 'pending' | 'in_progress' | 'done';
}

export interface TaskStats {
    total: number;
    pending: number;
    in_progress: number;
    done: number;
}