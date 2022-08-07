import { useState } from "react";
import { useForm } from "react-hook-form";

interface IFilterArticles {
  from: Date;
  to: Date;
  name: string;
  creator: string;
}

const ArticlesFilterModalLogic = () => {
  const [isExitHoverActive, setIsExitHoverActive] = useState<boolean>(false);
  const {
    register,
    setValue,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFilterArticles>();

  return { isExitHoverActive, setIsExitHoverActive, register, errors, control };
};

export default ArticlesFilterModalLogic;
