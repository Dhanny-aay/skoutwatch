import styled, { keyframes, css } from "styled-components";
import midas from "./assets/midas.svg";
import fate from "./assets/fate.svg";
import sit from "./assets/sit.svg";
import kuda from "./assets/kuda.svg";

const Carousel = () => {
  return (
    <AppContainer>
      <Wrapper>
        <Marquee>
          <MarqueeGroup>
            <div className=" bg-[#F8F9FB] rounded-[5px] w-full py-3 flex items-center h-[48px] md:h-[54px] px-5 md:px-0 justify-center">
              <img
                src={midas}
                alt="Midas"
                className=" h-[32px] w-full md:w-auto"
              />
            </div>
            <div className=" bg-[#F8F9FB] rounded-[5px] w-full py-3 flex items-center h-[48px] md:h-[54px] px-5 md:px-0 justify-center">
              <img
                src={fate}
                alt="Fate"
                className=" h-[32px] w-full md:w-auto"
              />
            </div>
            <div className=" bg-[#F8F9FB] rounded-[5px] w-full py-3 flex items-center h-[48px] md:h-[54px] px-5 md:px-0 justify-center">
              <img
                src={sit}
                alt="SIT Consulting"
                className=" h-[32px] w-full md:w-auto"
              />
            </div>
            <div className=" bg-[#F8F9FB] rounded-[5px] w-full py-3 flex items-center h-[48px] md:h-[54px] px-5 md:px-0 justify-center">
              <img
                src={kuda}
                alt="Kuda"
                className=" h-[24px] w-full md:w-auto"
              />
            </div>
          </MarqueeGroup>
          <MarqueeGroup>
            <div className=" bg-[#F8F9FB] rounded-[5px] w-full py-3 flex items-center h-[48px] md:h-[54px] px-5 md:px-0 justify-center">
              <img
                src={midas}
                alt="Midas"
                className=" h-[32px] w-full md:w-auto"
              />
            </div>
            <div className=" bg-[#F8F9FB] rounded-[5px] w-full py-3 flex items-center h-[48px] md:h-[54px] px-5 md:px-0 justify-center">
              <img
                src={fate}
                alt="Fate"
                className=" h-[32px] w-full md:w-auto"
              />
            </div>
            <div className=" bg-[#F8F9FB] rounded-[5px] w-full py-3 flex items-center h-[48px] md:h-[54px] px-5 md:px-0 justify-center">
              <img
                src={sit}
                alt="SIT Consulting"
                className=" h-[32px] w-full md:w-auto"
              />
            </div>
            <div className=" bg-[#F8F9FB] rounded-[5px] w-full py-3 flex items-center h-[48px] md:h-[54px] px-5 md:px-0 justify-center">
              <img
                src={kuda}
                alt="Kuda"
                className=" h-[24px] w-full md:w-auto"
              />
            </div>
          </MarqueeGroup>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
};

export default Carousel;

const AppContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Marquee = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  user-select: none;
  gap: 16px;
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 20s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
  gap: 16px; // Adjust the value to control spacing
`;
