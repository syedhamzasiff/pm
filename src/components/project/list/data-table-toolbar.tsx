"use client"

import type { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/project/list/data-table-view-options"

import { priorities, statuses } from "./data/data"
import { DataTableFacetedFilter } from "@/components/project/list/data-table-faceted-filter"
import type { TeamMember } from "@/utils/types" 

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  assignableUsers: TeamMember[] // Updated interface
}

export function DataTableToolbar<TData>({ table, assignableUsers }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter column={table.getColumn("priority")} title="Priority" options={priorities} />
        )}
        {table.getColumn("assignedTo") && (
          <DataTableFacetedFilter
            column={table.getColumn("assignedTo")}
            title="Assigned To"
            options={[
              { value: "unassigned", label: "Unassigned" },
              ...assignableUsers.map((user) => ({
                value: user.id,
                label: user.name,
              })),
            ]}
          />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

