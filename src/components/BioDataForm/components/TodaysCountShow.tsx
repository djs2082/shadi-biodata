import useBioDataFormViewModel from "../viewModel";

const TodaysCountShow: React.FC = () => {
  const viewModel = useBioDataFormViewModel();
  const todaysCount = viewModel.getTodaysBioDataCount();
  if (!todaysCount) return <></>;
  return (
    <p>
      <div className="blinking-dot" />
      {`  ${todaysCount} biodatas created today`}
    </p>
  );
};
export default TodaysCountShow;
