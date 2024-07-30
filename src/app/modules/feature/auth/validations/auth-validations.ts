export const AuthValidations = {
  userName: {
    minLength: 4,
    pattern: '[a-zA-Z]+[0-9]+',
  },
  phoneNumber: {
    pattern: '^(010|011|012|015){1}[0-9]{8}$',
  },
  password: {
    minLength: 6,
    pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?]).*',
  },
};
