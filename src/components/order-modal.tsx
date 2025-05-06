"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItems: {
    id: string;
    name: string;
    price: number;
  }[];
  onPlaceOrder: (address: string) => void;
}

export function OrderModal({
  open,
  onOpenChange,
  selectedItems,
  onPlaceOrder,
}: OrderModalProps) {
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const subtotal = selectedItems.reduce((sum, item) => sum + item?.price, 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const handleSubmit = () => {
    onPlaceOrder(address);
    setAddress("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="space-y-2">
            {selectedItems.map((item) => (
              <div key={item?.id} className="flex justify-between">
                <span>{item?.name}</span>
                <span>${item?.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Instructions</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions for your order"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!address} className="w-full">
            Place Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
