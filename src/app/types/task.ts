export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export const TASK_STATUSES: TaskStatus[] = ['BACKLOG', 'TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];

export const TASK_PRIORITIES: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  createdBy: string;
  assignedTo: string;
  status: string;
  priority: string;
  dueDate: string;
  project: string;
}

export interface TaskResponse {
  success: boolean;
  data?: Task;
  error?: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string | null;
  project: string;
  assigned_to: string;
  due_date: string;
  priority: string;
}
