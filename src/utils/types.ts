import { TaskStatus, TaskPriority, ProjectRole, ActivityType, FinancialItemType, Frequency } from "@prisma/client";
import type { DateRange } from "react-day-picker"

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Task {
    id: string;
    title: string;
    type: string;
    status: string;
    priority: string;
    dueDate: string | null;
    description: string | null;
}

export interface ProjectData {
    name: string;
    progress: number;
    tasks: {
        byStatus: {
            total: number;
            completed: number;
            inProgress: number;
            notStarted: number;
        };
        byType: {
            FEATURE: number;
            BUG: number;
            TASK: number;
        };
        list: Task[];
    };
    team: {
        name: string;
        avatar: string | null;
    }[];
    timeTracked: string;
    currentSprint: {
        name: string;
        endDate: string;
    };
}

export interface ProjectItem {
    id: string
    name: string
    pinned: boolean
}
 
export interface TeamMember {
    id: string;
    name: string;
    avatar: string;
}

export interface Project {
    name: string;
    description: string; 
    startDate: string; 
}

export interface DashboardData {
  progress: {
    overall: number
    completedTasks: number
    totalTasks: number
    tasksByStatus: Record<TaskStatus, number>
  }
  team: {
    name: string | null
    role: ProjectRole
    image: string | null
    email: string
  }[]
  priorityItems: {
    id: string
    title: string
    dueDate: string | null
    status: TaskStatus
    priority: TaskPriority
    assigneeName: string | null
  }[]
  activityFeed: {
    id: string
    type: ActivityType
    timestamp: Date
    userName: string | null
  }[]
  tasksByStatus: {
    status: TaskStatus
    count: number
  }[]
  financialData: FinancialData
}

export interface ActivityLogItem {
  id: string
  type: string
  userId: string
  taskId?: string
  timestamp: string
  user?: {
    name: string
  }
  task?: {
    title: string
  }
}

export interface FetchActivitiesFilters {
  searchTerm: string
  dateRange?: DateRange
  selectedUser: string
}

export interface DocumentData {
  id: string;
  title: string;
  content: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialItem {
  id: string
  projectId: string
  type: FinancialItemType
  category: string
  description: string
  amount: number
  frequency: Frequency
  linkedTo?: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export interface FinancialData {
  budget: number | null
  items: FinancialItem[]
}

export interface NewFinancialItem {
  projectId: string
  type: FinancialItemType
  category: string
  description: string
  amount: number
  frequency: Frequency
  linkedTo?: string
  date: string
}

export interface UpdateBudgetData {
  projectId: string
  budget: number
}






export { Frequency };
  