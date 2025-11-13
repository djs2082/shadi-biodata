import { useUIStore } from '../../../stores/uiStore';

const TodaysCountShow: React.FC = () => {
  const todaysCount = useUIStore((state) => state.todaysBiodataCount);

  if (!todaysCount) return null;

  return (
    <p className="todays-count-show-wrapper">
      <div className="blinking-dot" />
      {`  ${todaysCount} biodatas created today`}
    </p>
  );
};

export default TodaysCountShow;
