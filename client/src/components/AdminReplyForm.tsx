import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const replySchema = z.object({
  adminReply: z.string().min(1, "Reply cannot be empty").max(500, "Reply too long"),
});

type ReplyData = z.infer<typeof replySchema>;

interface AdminReplyFormProps {
  reviewId: string;
  onCancel: () => void;
  existingReply?: string | null;
}

const AdminReplyForm: React.FC<AdminReplyFormProps> = ({ reviewId, onCancel, existingReply }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ReplyData>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      adminReply: existingReply || "",
    },
  });

  const replyMutation = useMutation({
    mutationFn: async (data: ReplyData) => {
      const response = await fetch('/api/reviews/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewId,
          adminReply: data.adminReply,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save reply');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: "Reply saved",
        description: "Your reply has been posted successfully.",
      });
      onCancel();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save reply",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReplyData) => {
    replyMutation.mutate(data);
  };

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-blue-900">
          {existingReply ? "Edit Admin Reply" : "Reply as Admin"}
        </h4>
        <Button
          onClick={onCancel}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="adminReply"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write your reply to this review..."
                    className="bg-white resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <div className="text-xs text-gray-500 text-right">
                  {field.value?.length || 0}/500 characters
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={replyMutation.isPending}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {replyMutation.isPending ? (
                "Saving..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {existingReply ? "Update Reply" : "Post Reply"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminReplyForm;