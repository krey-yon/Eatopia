"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createMenu } from "@/app/dashboard/restaurant/action"
// import { createMenu } from "@/lib/menu"

export function CreateMenuModal({ restaurantId }: { restaurantId: string }) {
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCreateMenu = async () => {
    setLoading(true)
    try {
      // await createMenu(restaurantId)
      await createMenu(restaurantId)
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Failed to create menu:", error)
    } finally {
      setLoading(false)
    }
  }

  // Prevent closing the modal by clicking outside or pressing escape
  // since creating a menu is required
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        // Only allow closing if we're not in the initial required state
        if (!newOpen && !loading) {
          setOpen(newOpen)
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Restaurant Menu</DialogTitle>
          <DialogDescription>
            You need to create a menu for your restaurant before you can add menu items.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            This will create a new menu for your restaurant with ID:{" "}
            <span className="font-mono text-sm">{restaurantId}</span>
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateMenu} disabled={loading}>
            {loading ? "Creating..." : "Create Menu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}