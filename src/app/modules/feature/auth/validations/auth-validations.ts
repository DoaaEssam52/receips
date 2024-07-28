export const AuthValidations = {
  password: {
    minLength: 4,
    pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?]).*',
  },
};
