"use client";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import StyledBox from "./styles";
import { AxiosResponse } from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatIcon from "@mui/icons-material/Chat";
import { getCredentials } from "@/service/getCredentials";
import { useEffect, useState } from "react";
import { GoogleData } from "@/types/google";

export default function LeftSider() {
  const [credentials, setCredentials] =
    useState<AxiosResponse<GoogleData>>();

  useEffect(() => {
    if (!credentials) {
    getCredentials().then((response) => {
      setCredentials(response);
    });
  }
  }, [credentials]);

  return (
    <StyledBox>
      <List className="list-margin">
        <Button className="button-marging">
          <HomeIcon fontSize="large" />
        </Button>
        <Button className="button-marging">
          <Avatar
            alt="Remy Sharp"
            src={`${credentials?.data?.token?.picture}` || ""}
          />
        </Button>
        <Button className="button-marging">
          <EditNoteIcon fontSize="large" />
        </Button>
        <Button className="button-marging">
          <CalendarMonthIcon fontSize="large" />
        </Button>
        <Button className="button-marging">
          <ChatIcon fontSize="large" />
        </Button>
      </List>
    </StyledBox>
  );
}
