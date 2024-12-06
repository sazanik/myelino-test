// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeError = (error: any) => {
  const message: string =
    typeof error.response.data.message === 'string'
      ? error.response.data.message
      : error.response.data.message[0];

  return message;
};
