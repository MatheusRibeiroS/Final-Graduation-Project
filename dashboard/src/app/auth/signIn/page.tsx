"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useSession, signIn, signOut } from "next-auth/react";


export default function SignIn() {
  return (
    <Container component="main" maxWidth="xs">
      <Button
        onClick={() => {
          signIn("google");
        }}
      >
        entrar
      </Button>
    </Container>
  );
}