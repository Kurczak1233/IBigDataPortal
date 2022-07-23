import MenuComponentTitle from "../MenuComponentTitle/MenuComponentTitle";
import AdvancedFiltersLogic from "./AdvancedFiltersLogic";
import styles from "./AdvancedFilters.module.scss";
import SeparationSmallBar from "components/common/SeparationSmallGreenBar/SeparationSmallGreenBar";
import SmallButton from "components/common/Buttons/SmallButtons/SmallButton";
import { AvailableIntensiveColors } from "enums/AvailableIntensiveColors";
import InputWithLabel from "components/common/Forms/InputWithLabel/InputWithLabel";
import { ArticlesVm } from "interfaces/Models/Articles/ViewModels/ArticlesVm";

interface IAdvancedFilters {
  setArticles: React.Dispatch<React.SetStateAction<ArticlesVm | undefined>>;
  initialArticlesModel: ArticlesVm | undefined;
  showSeparationBar?: boolean;
  marginTop?: string;
  marginBottom?: string;
}

const AdvancedFilters = ({
  setArticles,
  initialArticlesModel,
  showSeparationBar = true,
  marginTop,
  marginBottom,
}: IAdvancedFilters) => {
  const { errors, register, handleSubmit, filterByText } = AdvancedFiltersLogic(
    { setArticles, initialArticlesModel }
  );
  return (
    <div
      className={styles.menu}
      style={{ marginBottom: marginBottom, marginTop: marginTop }}
    >
      <MenuComponentTitle name={"Advanced filters"} />
      <div>Text filtration</div>
      <InputWithLabel
        label={""}
        height={"78px"}
        placeholder={"Filter by text..."}
        registerName={"description"}
        register={register}
        errors={errors}
        registerOptions={{ required: true }}
        errorMessage={"Filter cannot be left empty"}
        marginBottom={"16px"}
        justifyContent={"flex-end"}
      />
      <div className={styles.buttonWrapper}>
        <SmallButton
          text={"Apply"}
          onClick={handleSubmit(filterByText)}
          color={AvailableIntensiveColors.IntensiveGreen}
        />
      </div>
      {showSeparationBar && (
        <SeparationSmallBar marginBottom="16px" marginTop="16px" />
      )}
    </div>
  );
};

export default AdvancedFilters;
