import { SnackbarProvider } from "notistack";
import React from "react";

const ClientSnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default ClientSnackbarProvider;
