import { Button } from "../button";
import { useForm, SubmitHandler } from "react-hook-form";
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

type InputsModal = {
  title: string;
  author: string;
  releaseDate: string;
  description: string;
  image?: File;
};

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
  const { setShowModal } = useModal();
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

      // Cleanup the URL object when the component unmounts or the image changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [watchedImage]);

  const onSubmit = async (data: any) => {
    const base64Image = await getBase64(data.image ? data.image[0] : null);
    const payload = {
      title: data.title,
      authorId: "b125e328-81e7-4a5e-83e0-53add2bb42e2",
      releaseDate: data.releaseDate,
      description: data.description,
      imageUrl: base64Image,
    };

    try {
      const response = await fetch("http://localhost:3333/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        // Optionally close the modal or show a success message
        setShowModal(false);
      } else {
        console.error("Form submission failed");
        // Handle server errors
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
