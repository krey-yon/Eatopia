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
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  MessageSquare,
  Star,
} from "lucide-react";

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
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = selectedItems.reduce((sum, item) => sum + item?.price, 0);
  const deliveryFee = subtotal > 25 ? 0 : 2.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const handleSubmit = async () => {
    setIsProcessing(true);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onPlaceOrder(address);
    setAddress("");
    setNotes("");
    setIsProcessing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-orange-50 border-0 shadow-2xl">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Review Your Order
            </DialogTitle>
          </div>

          {/* Order Summary Badge */}
          <div className="flex justify-center">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              {selectedItems.length} item
              {selectedItems.length > 1 ? "s" : ""} selected
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Star className="h-5 w-5 text-orange-500 mr-2" />
              Your Items
            </h3>

            <div className="space-y-3">
              {selectedItems.map((item, index) => (
                <div
                  key={item?.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                      {item?.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">
                        {item?.name}
                      </span>
                      <p className="text-sm text-gray-500">Fresh & delicious</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-800">
                      ${item?.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 text-orange-500 mr-2" />
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      FREE
                    </Badge>
                  )}
                </div>
                <span className="font-medium">
                  {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>

              {subtotal < 25 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    💡 Add ${(25 - subtotal).toFixed(2)} more for free delivery!
                  </p>
                </div>
              )}

              <Separator className="bg-gradient-to-r from-orange-200 to-red-200" />

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <MapPin className="h-5 w-5 text-orange-500 mr-2" />
              Delivery Details
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Delivery Address *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your delivery address"
                    className="pl-10 border-2 border-gray-200 focus:border-orange-500 transition-colors duration-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="notes"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Special Instructions
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions for your order (optional)"
                  rows={3}
                  className="border-2 border-gray-200 focus:border-orange-500 transition-colors duration-300 rounded-xl resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-6">
          <div className="w-full space-y-3">
            <Button
              onClick={handleSubmit}
              disabled={!address || isProcessing}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Order...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Place Order • ${total.toFixed(2)}</span>
                </div>
              )}
            </Button>

            <p className="text-center text-sm text-gray-500">
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
