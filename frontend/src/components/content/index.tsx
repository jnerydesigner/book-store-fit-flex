import React from "react";
import { ContainerContent } from "./style";
import { Card } from "../card";

export const Content: React.FC = () => {
  return (
    <ContainerContent>
      <Card />
      <Card />
      <Card />
      <Card />
    </ContainerContent>
  );
};
