"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface TableSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  delay?: number
}

export function TableSearch({
  value,
  onChange,
  placeholder = "Search...",
  delay = 500,
}: TableSearchProps) {
  const [localValue, setLocalValue] = useState(value)

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, delay)

    return () => clearTimeout(timer)
  }, [localValue, delay, onChange])

  // Sync with external value
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleClear = () => {
    setLocalValue("")
    onChange("")
  }

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />

      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />

      {localValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={handleClear}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  )
}