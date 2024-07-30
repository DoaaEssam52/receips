export interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}
