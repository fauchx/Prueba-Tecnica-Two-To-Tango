
export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    userId: number; 
  }
  