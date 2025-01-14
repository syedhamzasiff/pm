"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityLog from "@/components/project/ActivityLog";
import { ProjectHeader } from "@/components/project/header/project-header";

const sampleTeamMembers: TeamMember[] = [
    {
        id: "1",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "2",
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "3",
        name: "Charlie Brown",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "4",
        name: "Diana Ross",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "5",
        name: "Edward Norton",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: "6",
        name: "Fiona Apple",
        avatar: "/placeholder.svg?height=32&width=32",
    },
];

export default function ProjectLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { pid: string };
}) {
    const projectId = "2a";
    const handleProjectNameChange = (newName: string) => {
        console.log("Project name changed:", newName);
        // Here you would typically update the project name in your backend
    };

    const handleShare = () => {
        console.log("Share button clicked");
        // Here you would typically open a share dialog or perform a share action
    };

    return (
        <>
            <ProjectHeader
                initialProjectName="My Awesome Project"
                teamMembers={sampleTeamMembers}
                onProjectNameChange={handleProjectNameChange}
                onShare={handleShare}
            />
            <div className="container mx-auto p-6">
                <Tabs className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="kanban">Kanban</TabsTrigger>
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                        <TabsTrigger value="gantt">Gantt</TabsTrigger>
                        <TabsTrigger value="documentation">
                            Documentation
                        </TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>
                    {children}
                </Tabs>

                {/* Display activity log for the project */}
                <ActivityLog projectId={projectId} />
            </div>
        </>
    );
}
