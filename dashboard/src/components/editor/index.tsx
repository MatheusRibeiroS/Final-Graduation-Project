/* eslint-disable react-hooks/exhaustive-deps */
import { default as React, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "@/app/constants";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createReactEditorJS } from "react-editor-js";

const DEFAULT_INITIAL_DATA = () => {
  return {
    // time: new Date().getTime(),
    // blocks: [
    // {
    //   type: "text",
    //   data: {
    //     text: "This is my awesome editor!",
    //     level: 1,
    //   },
    // },
    // ],
  };
};

const Editor = (props: any) => {
  const ejInstance = useRef();
  const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  useEffect(() => {
    console.log("editorData", editorData);
  }, [editorData]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: EDITOR_JS_TOOLS,
      logLevel: "ERROR",
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        try {
          const textData = await editor.save();
          console.log("textData", textData);
        } catch (error) {
          console.log(error);
        }
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: true,
    });
  };

  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#202123",
          height: "725px",
          width: "900px",
          border: "10px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
        maxWidth="xl"
      >
        <Box
          m={5}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            border: "7px solid #cccccc",
            height: "650px",
            width: "700px",
            padding: "15px",
          }}
        >
          <div id="editorjs" spellCheck="false" className="z-0" />
        </Box>
      </Container>
    </>
  );
};

export default Editor;
