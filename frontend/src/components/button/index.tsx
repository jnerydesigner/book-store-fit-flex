import { ContainerButton } from "./style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  status?: "save" | "cancel";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  status,
  ...rest
}) => {
  return (
    <ContainerButton status={status} {...rest}>
      {children}
    </ContainerButton>
  );
};
