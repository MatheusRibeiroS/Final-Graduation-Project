"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useChat } from "ai/react";
import { GoogleToken } from "@/types/google";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";

export function Chat({ userProfilePicture }: { userProfilePicture: string }) {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    api: "/api/chat",
    onError: () => {
      toast.error(
        "Verifique se você possui créditos e se a chave de API inserida é válida.",
        {
          duration: 5000,
        }
      );
    },
  });
   
  messages.push(
    {
      id: "1",
      content: "Olá, tudo bem?",
      role: "assistant",
    },
    {
      id: "2",
      content: "Tudo bem, e você?",
      role: "user",
    },
    {
      id: "3",
      content: "Estou bem, obrigado por perguntar.",
      role: "assistant",
    },
    {
      id: "4",
      content: "Que bom!",
      role: "user",
    },
    {
      id: "5",
      content:
        "O que você está fazendo????????????",
      role: "assistant",
    }
  );
  return (
    <Card variant="outlined" className="w-[500px] h-[700px] mt-7 ml-12 bg-[#18181a]">
      <Box className="m-4">
        <Typography color="black">Chat Bot</Typography>
      </Box>
      <CardContent>
        <Box className="relative">
          {messages.map((message) => (
            <Stack
              key={message.id}
              direction="row"
              className="items-center mb-5"
            >
              {message.role === "user" && (
                <Avatar src={`${userProfilePicture}` || ""} />
              )}
              {message.role === "assistant" && (
                <Avatar>
                  <SmartToyIcon />
                </Avatar>
              )}
              <Box className="ml-3">
                <Typography color="white">{message.content}</Typography>
              </Box>
            </Stack>
          ))}
        </Box>
        <Box className="fixed mt-36">
          <form onSubmit={handleSubmit}>
            <TextField
            sx={{ border: "1px solid #fff" }}
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message"
            />
            <Button type="submit">Send</Button>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}
