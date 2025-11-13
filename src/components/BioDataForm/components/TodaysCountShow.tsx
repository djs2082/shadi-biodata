import useBioDataFormViewModel from '../viewModel';

const TodaysCountShow: React.FC = () => {
  const viewModel = useBioDataFormViewModel();
  const todaysCount = viewModel.getTodaysBioDataCount();
  if (!todaysCount) return <></>;
  return (
    <p className="todays-count-show-wrapper">
      <div className="blinking-dot" />
      {`  ${todaysCount} biodatas created today`}
    </p>
  );
};
export default TodaysCountShow;
