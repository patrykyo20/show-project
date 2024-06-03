import React, { FC, useRef } from "react";
import Slider from "react-slick";
import Project from "@/types/Project";
import ProjectCard from "./ProjectCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../globals.css";
import SkeletonProjectCard from "./SkeletonProjectCard";

interface SliderProps {
  projects: Project[] | undefined;
}

const Carousel: FC<SliderProps> = ({projects}) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };
  return (
    <div className="slider-container max-w-[321px] md:max-w-[650px] lg:max-w-[900px] xl:max-w-[1100px] 2xl:max-w-[1500px]">
      <Slider ref={sliderRef} {...settings}>
        {projects ? (
          projects.map(project => (
            <div key={project.id} className="flex justify-center">
              <ProjectCard project={project} />
            </div>
          ))
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonProjectCard key={index} />
          ))
        )}
      </Slider>
    </div>
  );
};

export default Carousel;
