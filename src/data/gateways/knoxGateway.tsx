export const configureKnox = () => {

}


export const obtainAccessToken = async (code: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("mock-access-token");
    }, 1000);
  });
}

export const handleSignUp = async (email: string, password: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export const handleSignIn = async (email: string, password: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export const handleConfirmSignUp = async (email: string, code: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export const handleSignOut = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export const handleChangePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}   
