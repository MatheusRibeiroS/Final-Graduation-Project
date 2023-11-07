"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useChat } from "ai/react";
import { GoogleToken } from "@/types/google";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";
import { IconCircleArrowDown } from "@tabler/icons-react";

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
      content: "Olá, em que posso te ajudar?",
      role: "assistant",
    },
    {
      id: "2",
      content: "Me explique em poucas palavras o que é javascript",
      role: "user",
    },
    {
      id: "3",
      content:
        "JavaScript é uma linguagem de programação usada para criar interatividade em páginas da web, tornando-as dinâmicas e capazes de responder a ações do usuário. Ela é executada no navegador e é fundamental para o desenvolvimento de aplicativos web.",
      role: "assistant",
    }
  );

  return (
    <Card
      variant="outlined"
      className="w-[500px] h-[700px] mt-7 ml-12 bg-[#18181a] z-10"
    >
      <CardContent className="bg-[#18181a] z-10">
        <Box className="m-4">
          <Typography color="white">ChatBot</Typography>
        </Box>
        <Box
          sx={{
            width: "450px",
            height: "520px",
            backgroundColor: "#18181a",
          }}
        >
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
        <Stack direction="row" className="flex mt-4 items-center">
          <form onSubmit={handleSubmit}>
            <TextField
              className="rounded"
              sx={{ border: "1px solid #fff" }}
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message"
            />
            <Button type="submit">Enviar</Button>
          </form>
        </Stack>
      </CardContent>
    </Card>
  );
}
