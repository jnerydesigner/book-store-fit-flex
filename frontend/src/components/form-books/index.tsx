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
import { limitWord } from "../../utils/limit-word.helper";
import { IBook } from "../../types/book.types";
import axios from "axios";
import { useBooks } from "../../context/book.context";

const schema = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  author: yup.string().required("Campo obrigatório"),
  releaseDate: yup.string().required("Campo obrigatório"),
  description: yup.string().required("Campo obrigatório"),
  image: yup.mixed().test("fileSize", "O arquivo é muito grande", (value) => {
    if (!value || !Array.isArray(value) || value.length === 0) {
      return true;
    }
    return value[0].size <= 2000000;
  }),
});

export const FormBooks: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const { setShowModal } = useModal();
  const { setBooksContext } = useBooks();

  useEffect(() => {
    axios.get("http://localhost:3333/books/find-all").then((response) => {
      setBooks(response.data);
    });
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [_, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
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

  const onSubmit = async (data: any) => {
    const base64Image = await getBase64(data.image ? data.image[0] : null);
    const payload = {
      title: data.title,
      author: data.author,
      releaseDate: data.releaseDate,
      description: data.description,
      imageUrl: base64Image,
    };

    try {
      const res = await axios.post(
        "http://localhost:3333/books/create",
        payload
      );

      if (res.status === 201) {
        const newBookCreated = {
          ...res.data,
          description: limitWord(res.data.description, 20),
        };

        if (setBooksContext) {
          setBooksContext([...books, newBookCreated]);
        }

        setShowModal(false);
      } else {
        console.error("Form submission failed");
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
          <input type="text" placeholder="Título" {...register("title")} />
          <input type="text" placeholder="Autor" {...register("author")} />
          <input
            type="text"
            placeholder="Data de Publicação"
            {...register("releaseDate")}
          />
        </ContainerColumnInput>
        <ContainerColumnImage>
          {!watchedImage || watchedImage.length === 0 ? (
            <img src="/image_input.svg" alt="default" />
          ) : (
            <img src={URL.createObjectURL(watchedImage[0])} alt="uploaded" />
          )}

          <ContainerInputFile>
            {!watchedImage || watchedImage.length === 0 ? (
              <label className="custom-file-label" htmlFor="fileInput">
                Escolher Imagem
              </label>
            ) : (
              <label className="custom-file-label" htmlFor="fileInput">
                {watchedImage.item(0)?.name}
              </label>
            )}
            <input type="file" id="fileInput" {...register("image")} />
          </ContainerInputFile>
        </ContainerColumnImage>
      </ContainerRowInputGeneral>

      <ContainerRowInputDescription>
        <textarea
          placeholder="Descrição"
          {...register("description")}
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
