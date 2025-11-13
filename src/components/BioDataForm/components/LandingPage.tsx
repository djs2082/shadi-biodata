import { useNavigate } from 'react-router-dom';

import PrimaryButton from '../../UtilComponents/Buttons/PrimaryButton';

import TodaysCountShow from './TodaysCountShow';

import './../index.scss';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page-wrapper">
      <div className="hero-image-wrapper">
        <a href="/">
          {' '}
          <h3>ShadiBiodata.com</h3>
        </a>

        <div className="hero-image">
          <div data-type="h1">The Ultimate Marriage Biodata Maker</div>
          <div data-type="p">
            Create beautiful biodata for marriage with just a few clicks! Easy
            to use, fully customizable, elegantly designed marriage biodata
            formats
          </div>
          <PrimaryButton
            className="create-biodata-btn"
            onClick={() => {
              navigate('/form');
            }}
          >
            Create My Biodata
          </PrimaryButton>
        </div>

        <TodaysCountShow />
      </div>
      <div className="hero-information">
        <div data-type="h1">
          Beautifully Handcrafted Marriage Biodata Templates
        </div>
        <div data-type="p1">
          We have designed the best looking, well formatted marriage biodata
          formats for you to just choose and make biodata without any hassle. No
          need to invest time on layouts, designs and getting that perfect
          biodata for marriage.
        </div>
      </div>
      {/* <div className="form-add-title"></div> */}
    </div>
  );
};

export default LandingPage;
