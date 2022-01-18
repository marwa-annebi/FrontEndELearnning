import React, { useState}from "react";
import styled from "styled-components";
import course1 from "./../../../assets/images/episodes/1.png";
import course2 from "./../../../assets/images/episodes/2.png";
import course3 from "./../../../assets/images/episodes/3.png";
import course4 from "./../../../assets/images/episodes/4.png";
import course5 from "./../../../assets/images/episodes/5.png";
import course6 from "./../../../assets/images/episodes/6.png";
import  {useMediaQuery} from "@material-ui/core";
import { AutoRotatingCarousel } from "material-auto-rotating-carousel";
import { Slide } from "material-auto-rotating-carousel";
const slideItems = [
  {
    media: course1,
    title: "This is a very cool feature",
    subtitle: "Just using this will blow your mind.",
  },
  {
    media: course2,
    title: "Ever wanted to be popular?",
    subtitle: "Well just mix two colors and your are good to go!",
  },
  {
    media: course3,
    title: "May the force be with you",
    subtitle:
      "The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.",
  },
  {
    media: course4,
    title: "May the force be with you",
    subtitle:
      "The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.",
  },
  {
    media: course5,
    title: "May the force be with you",
    subtitle:
      "The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.",
  },
  {
    media: course6,
    title: "May the force be with you",
    subtitle:
      "The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.",
  },
];
const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile }) => {
  return (
    <div>
      <AutoRotatingCarousel
        label="Get started"
        open={handleOpen.open}
        onClose={() => setHandleOpen({ open: false })}
        onStart={() => setHandleOpen({ open: false })}
        autoplay={false}
        hideArrows={false}
        mobile={isMobile}
      >
        {slideItems.map((item) => (
          <Slide
            key={item.title}
            media={<img src={item.media} alt={item.title} />}
            title={item.title}
            subtitle={item.subtitle}
            mediaBackgroundStyle={{
              background: `linear-gradient(120deg, #81d1ff,#EBCBDC)`,
            }}
            style={{ background: `linear-gradient(120deg, #81d1ff,#EBCBDC)` }}
          />
        ))}
      </AutoRotatingCarousel>
    </div>
  );
};

const HeroText = () => {
    const handleClick = () => {
      setHandleOpen({ open: true });
  };
  const matchSM = useMediaQuery("(min-width:600px)");
  const [handleOpen, setHandleOpen] = useState({ open: false });
  return (
    <Container>
      <h5>Online education </h5>
      <h1>Learn</h1>
      <h1>Anything.</h1>
      <h1>Anytime.</h1>
      <h1>Anywhere.</h1>
      <BtnContainer>
        <button variant="contained" color="primary" onClick={handleClick}>
          make a tour
        </button>
        <AutoRotatingCarouselModal
          isMobile={matchSM}
          handleOpen={handleOpen}
          setHandleOpen={setHandleOpen}
        />
      </BtnContainer>
    </Container>
  );
};

const BtnContainer = styled.div`
  margin-top: 2rem;
  button {
    background: #81d1ff;
    border: none;
    padding: 0.9rem 1.1rem;
    color: #fff;
    border-radius: 1rem;
    box-shadow: 0px 13px 24px -7px #81d1ff;
    transition: all 0.3s ease-in-out;
    margin: 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 17px 16px -11px #81d1ff;
      transform: translateY(-5px);
    }
  }

  .readmore {
    color: #81d1ff;
    background: transparent;
    border: 3px solid #81d1ff;
    &:hover {
      box-shadow: 0px 17px 16px -11px #81d1ff;
      transform: translateY(-5px);
    }
  }
`;

const Container = styled.div`
  padding: 1rem;
  h5 {
    color: #515151;
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  h1 {
    font-size: 3.5rem;
    font-weight: 900;

    &:nth-of-type(1) {
      color: #af60ff;
      font-weight: 700;
    }
    &:nth-of-type(2) {
      color: #8849c7;
    }
    &:nth-of-type(3) {
      color: #651fac;
    }
    &:nth-of-type(4) {
      color: #3c0473;
    }
  }
`;

export default HeroText;
