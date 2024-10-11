import TodaysCountShow from "./TodaysCountShow";

const LandingPage = () => {
  return (
    <div className="landing-page-wrapper">
      <div className="hero-image-wrapper">
        <a href="/">
          {" "}
          <h3>ShadiBiodata.com</h3>
        </a>

        <div className="hero-image">
          <div datatype="h1">The Ultimate Marriage Biodata Maker</div>
          <div datatype="p">
            Create beautiful biodata for marriage with just a few clicks! Easy
            to use, fully customizable, elegantly designed marriage biodata
            formats
          </div>
        </div>

        <TodaysCountShow />
      </div>
      <div className="hero-information">
        <div datatype="h1">
          Beautifully Handcrafted Marriage Biodata Templates
        </div>
        <div datatype="p1">
          We have designed the best looking, well formatted marriage biodata
          formats for you to just choose and make biodata without any hassle. No
          need to invest time on layouts, designs and getting that perfect
          biodata for marriage.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
