"use client";

import {
  MutationFunction,
  MutationKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useMutationData = (
  mutationKey: MutationKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFn: MutationFunction<any, any>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      console.log(data);
      if (onSuccess) {
        onSuccess();
      }
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { mutate, isPending };
};
