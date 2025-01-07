export const getGoogleLoginRedirectUri = (): string => {
  return `${process.env.NEXT_PUBLIC_REDIRECT_URI}/login/google/callback`;
};
