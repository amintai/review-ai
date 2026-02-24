'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { waitlistSchema, type WaitlistFormData } from '@/lib/schemas/waitlist';
import { Loader2 } from 'lucide-react';

interface WaitlistFormProps {
  source?: string;
  onSuccess?: () => void;
}

export function WaitlistForm({ source, onSuccess }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          source: source || 'homepage',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Successfully joined the waitlist!');
        reset();
        onSuccess?.();
      } else {
        toast.error(result.message || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Waitlist signup error:', error);
      toast.error('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-3">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600 text-center">
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="aminsait57@gmail.com"
          {...register('email')}
          disabled={isSubmitting}
          className={`w-full px-4 py-3.5 text-sm bg-white border ${errors.email ? 'border-red-300' : 'border-gray-200'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 placeholder:text-gray-400 shadow-sm`}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-500 text-center" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        id='waitlist'
        disabled={isSubmitting}
        className="w-full px-6 py-3.5 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Joining...
          </>
        ) : (
          'Join Waitlist'
        )}
      </button>
    </form>
  );
}
