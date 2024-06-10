import React from "react";
import { ContainerCard, ContainerCardImage, ContainerCardInfo } from "./style";
import { IBook } from "../../context/booksContext";

interface CardProps extends IBook {}

const Card: React.FC<CardProps> = ({
  imageUrl,
  Author,
  authorId,
  description,
  id,
  releaseDate,
  title,
}) => {
  return (
    <ContainerCard>
      <ContainerCardImage>
        <img src={imageUrl} alt={title} />
      </ContainerCardImage>
      <ContainerCardInfo>
        <h3>{title}</h3>
        <p>{description}</p>
      </ContainerCardInfo>
    </ContainerCard>
  );
};

export default Card;
