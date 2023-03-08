export function setAuthState(isAuth: boolean, status: string) {
  return {
    auth: {
      user: {
        id: "",
        email: "",
        isActivated: false,
      },
      isAuth: isAuth,
      status: status,
      message: "",
    },
  };
}