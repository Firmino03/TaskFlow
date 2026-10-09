export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'done';
  createdAt: string;
}

export interface CreateProjectData {
  name: string;
  description: string;
  status: 'active' | 'paused' | 'done';
  createdAt: string;
}