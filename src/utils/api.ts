import { ProjectItem, TeamMember, Project, DashboardData, FetchActivitiesFilters, DocumentData, FinancialData, NewFinancialItem, UpdateBudgetData } from "./types";

export const createProject = async (project: Project) => {
    const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create project");
    }

    return response.json();
};

export const createInviteToken = async ({
    projectId,
    expirationTime,
    maxUses,
    accessLevel,
}: {
    projectId: string;
    expirationTime: number;
    maxUses: number;
    accessLevel: string;
}) => {
    const response = await fetch(`/api/projects/${projectId}/invite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ expirationTime, maxUses, accessLevel }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create invite token");
    }

    return response.json();
};

export const fetchTokenData = async (token: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/invite/${token}`
    );
    if (res.status === 404) {
        return null; // Invalid token
    }
    if (!res.ok) {
        throw new Error("Failed to fetch project data");
    }
    return res.json();
};

export const acceptInvitation = async (token: string, projectId: string) => {
    const response = await fetch(`/api/invite/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId }),
    });

    if (!response.ok) {
        throw new Error("Failed to accept invitation");
    }

    return response.json();
};

export const declineInvitation = async () => {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    throw new Error("Invitation declined");
};

export const fetchDashboardData = async () => {
    const res = await fetch("api/tasks");
    if (res.status === 404) {
        return null;
    }
    if (!res.ok) {
        throw new Error("Failed to fetch dashboard data");
    }
    return res.json();
};

export const getProjects = async (): Promise<ProjectItem[]> => {
    const response = await fetch("/api/projects");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const fetchProjectData = async (projectId: string) => {
    const response = await fetch(`/api/projects/${projectId}`);
    if (!response.ok) throw new Error("Failed to fetch project data");
    return response.json();
};

export const fetchAssignableUsers = async (
    projectId: string
): Promise<TeamMember[]> => {
    const response = await fetch(`/api/projects/${projectId}/assignable-users`);
    if (!response.ok) throw new Error("Failed to fetch assignable users");
    return response.json();
};

export async function updateUserProfile(data: { name: string }): Promise<any> {
    const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
    }

    return response.json();
}

export async function fetchProjectDashboardData(projectId: string): Promise<DashboardData> {
    const response = await fetch(`/api/projects/${projectId}/dashboard`)
  
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data")
    }
  
    return response.json()
}

export async function fetchActivities(projectId: string, filters: FetchActivitiesFilters) {
  const { searchTerm, dateRange, selectedUser } = filters
  const url = `/api/projects/${projectId}/activity-log?`

  const params = new URLSearchParams()
  if (searchTerm) params.append("search", searchTerm)
  if (selectedUser && selectedUser !== "all") params.append("userId", selectedUser)
  if (dateRange?.from) params.append("startDate", dateRange.from.toISOString())
  if (dateRange?.to) params.append("endDate", dateRange.to.toISOString())

  const response = await fetch(`${url}${params.toString()}`)
  if (!response.ok) throw new Error("Failed to fetch activities")
  return response.json()
}

export async function fetchDocument(projectId: string): Promise<DocumentData> {
    const res = await fetch(`/api/projects/${projectId}/documentation`);
    if (!res.ok) throw new Error("Failed to fetch documentation");
    const data = await res.json();
    return data.document;
}

export async function fetchFinancialData(projectId: string): Promise<FinancialData> {
    const response = await fetch(`/api/projects/${projectId}/finance`)
    if (!response.ok) {
      throw new Error("Failed to fetch financial data")
    }
    return response.json()
}
  
export async function addFinancialItem(data: NewFinancialItem): Promise<FinancialData> {
    const response = await fetch(`/api/projects/${data.projectId}/finance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  
    if (!response.ok) {
      throw new Error("Failed to add financial item")
    }
  
    return response.json()
}
  
  export async function updateBudget(data: UpdateBudgetData): Promise<FinancialData> {
    const response = await fetch(`/api/projects/${data.projectId}/budget`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget: data.budget }),
    })
  
    if (!response.ok) {
      throw new Error("Failed to update budget")
    }
  
    return response.json()
}