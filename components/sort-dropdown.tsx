"use client"

import { ArrowDownUp, Clock, Flame, MessageCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export type SortOption = "latest" | "popular" | "comments"

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions = [
  { value: "latest" as const, label: "最新发布", icon: Clock },
  { value: "popular" as const, label: "最多点赞", icon: Flame },
  { value: "comments" as const, label: "最多评论", icon: MessageCircle },
]

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const currentOption = sortOptions.find((opt) => opt.value === value) || sortOptions[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <ArrowDownUp className="h-4 w-4" />
          <span className="text-sm">{currentOption.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {sortOptions.map((option) => {
          const Icon = option.icon
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
              className={value === option.value ? "bg-accent" : ""}
            >
              <Icon className="mr-2 h-4 w-4" />
              {option.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
