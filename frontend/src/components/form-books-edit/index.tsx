import { Button } from "../button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ContainerRowInputGeneral,
  ContainerColumnInput,
  ContainerColumnImage,
  ContainerInputFile,
  ContainerRowInputDescription,
  ContainerRowButtons,
} from "./style";
import { useEffect, useState } from "react";
import { useModal } from "../../context/modalContext";
import { useParams } from "react-router-dom";
import { IBook, IBookContext } from "../../types/book.types";
import { useBooks } from "../../context/book.context";
import api from "../../api";

const schema = yup.object().shape({
  title: yup.string(),
  author: yup.string(),
  releaseDate: yup.string(),
  description: yup.string(),
  image: yup.mixed().test("fileSize", "O arquivo é muito grande", (value) => {
    if (!value || !Array.isArray(value) || value.length === 0) {
      return true;
    }
    return value[0].size <= 2000000;
  }),
});

export const FormBookEdit: React.FC = () => {
  const { bookResponse } = useBooks();
  const { book_id: bookId } = useParams() as { book_id: string };
  const [payload, setPayload] = useState<IBookContext>({
    id: bookResponse?.id || "",
    title: bookResponse?.title || "",
    releaseDate: bookResponse?.releaseDate || "",
    description: bookResponse?.description || "",
    authorId: bookResponse?.authorId || "",
    imageUrl: bookResponse?.imageUrl || "",
    author: bookResponse?.authorId || "",
  });
  const { setShowModalEdit } = useModal();
  const { setBooksContext, setBookResponse } = useBooks();

  const handleCloseModal = () => {
    setShowModalEdit(false);
  };
  const [_, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const watchedImage = watch("image") as FileList | undefined;
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const objectUrl = URL.createObjectURL(watchedImage[0]);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [watchedImage]);

  useEffect(() => {
    api.get<IBook>(`/books/${bookId}`).then((response) => {
      const bookData = response.data;
      setPayload({
        id: bookData.id,
        title: bookData.title,
        releaseDate: bookData.releaseDate,
        description: bookData.description,
        authorId: bookData.authorId,
        imageUrl: bookData.imageUrl,
        author: bookData.authorId as string,
      });
      setValue("title", bookData.title);
      setValue("author", bookData.authorId);
      setValue("releaseDate", bookData.releaseDate);
      setValue("description", bookData.description);
    });
  }, [bookId, setValue]);

  const onSubmit = async (data: any) => {
    const base64Image = await getBase64(data.image ? data.image[0] : null);
    let payloadData = {
      title: data.title,
      authorId: data.author,
      releaseDate: data.releaseDate,
      description: data.description,
      imageUrl: base64Image || payload.imageUrl,
    };

    try {
      const response = await api.patch<any>(`/books/${bookId}`, payloadData);

      if (response.data.id !== undefined || response.data.id !== null) {
        if (setBooksContext) {
          setBooksContext((prevBook) => [prevBook, response.data]);
        }

        if (setBookResponse) {
          setBookResponse(response.data);
        }

        setShowModalEdit(false);
      } else {
        console.error("Form submission failed", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getBase64 = (file: File | null): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContainerRowInputGeneral>
        <ContainerColumnInput>
          <input
            type="text"
            placeholder="Título"
            {...register("title")}
            defaultValue={payload.title}
          />
          <input
            type="text"
            placeholder="Autor"
            {...register("author")}
            defaultValue={payload.author}
          />
          <input
            type="text"
            placeholder="Data de Publicação"
            defaultValue={payload.releaseDate}
          />
        </ContainerColumnInput>
        <ContainerColumnImage>
          {!watchedImage || watchedImage.length === 0 ? (
            <img src={bookResponse?.imageUrl} alt="default" />
          ) : (
            <img src={URL.createObjectURL(watchedImage[0])} alt="uploaded" />
          )}

          <ContainerInputFile>
            <input type="file" id="fileInput" {...register("image")} />
          </ContainerInputFile>
        </ContainerColumnImage>
      </ContainerRowInputGeneral>

      <ContainerRowInputDescription>
        <textarea
          placeholder="Descrição"
          {...register("description")}
          defaultValue={payload.description}
        ></textarea>
      </ContainerRowInputDescription>
      <ContainerRowButtons>
        <Button type="button" status="cancel" onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button type="submit" status="save">
          Salvar
        </Button>
      </ContainerRowButtons>
    </form>
  );
};
