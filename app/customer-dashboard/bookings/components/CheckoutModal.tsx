"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { paymentService } from "@/services/payment.service";
import { toast } from "sonner";
import { Loader2, X, CreditCard } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CheckoutFormProps {
  bookingId: string;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

function CheckoutForm({ bookingId, amount, onClose, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // ১. ব্যাকএন্ড থেকে পেমেন্ট ইনটেন্ট (clientSecret) নিয়ে আসা
      const intentRes = await paymentService.createPaymentIntent(bookingId);
      const clientSecret = intentRes?.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("Failed to create payment intent!");
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      // ২. স্ট্রাইপে কার্ড কনফার্ম করা
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed!");
        setIsProcessing(false);
        return;
      }

      if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // ৩. ব্যাকএন্ডে পেমেন্ট কনফার্মেশন পাঠানো
        const confirmRes = await paymentService.confirmPayment(
          bookingId,
          transactionId
        );

        if (confirmRes?.success) {
          toast.success("Payment completed successfully!");
          onSuccess();
          onClose();
        }
      }
    } catch (error: unknown) {
      const errMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || (error as Error).message || "Something went wrong!";
      toast.error(errMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center border-b pb-3 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" /> Pay for Booking
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-1">
        <p className="text-xs text-slate-500">Total Payable Amount:</p>
        <p className="text-xl font-bold text-emerald-600">৳{amount}</p>
      </div>

      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
        >
          {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
          Pay Now (৳{amount})
        </button>
      </div>
    </form>
  );
}

interface CheckoutModalProps {
  isOpen: boolean;
  bookingId: string;
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  bookingId,
  amount,
  onClose,
  onSuccess,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            bookingId={bookingId}
            amount={amount}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </Elements>
      </div>
    </div>
  );
}