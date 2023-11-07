export type TFiles = {
  name: string;
  children?: TFiles[];
};

export const files: TFiles = {
  name: "root",
  children: [
    {
      name: "pasta teste",
      children: [
        {
          name: "filecreation.txt",
        },
        {
          name: "filecreation.txt",
        },
        {
          name: "sampleName.txt",
        },
        {
          name: "sampleName.txt",
        },
      ],
    },
  ],
};
