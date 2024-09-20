import midas from "./assets/midas.svg";
import fate from "./assets/fate.svg";
import sit from "./assets/sit.svg";
import kuda from "./assets/kuda.svg";
import Carousel from "./carousel";
import SecondCarousel from "./secondCarousel";

const Partners = () => {
  const partners = [
    { logo: midas, name: "Midas" },
    { logo: fate, name: "Fate" },
    { logo: sit, name: "SIT Consulting" },
    { logo: kuda, name: "Kuda" },
  ];
  return (
    <>
      <div className=" w-full py-16 px-4 md:px-14 lg:px-24 flex justify-center items-center flex-col bg-black">
        <p className=" text-[#D99A26] font-semibold text-lg md:text-2xl font-LatoNormal">
          Our Partners
        </p>
        {/* <div className=" w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {partners.map((item, index) => (
            <div
              key={index}
              className=" bg-[#F8F9FB] rounded-[5px] w-full py-3 flex items-center justify-center"
            >
              <img
                src={item.logo}
                alt={item.name}
                className=" h-[32px] md:h-auto"
              />
            </div>
          ))}
        </div> */}
        <Carousel />
        <SecondCarousel />
      </div>
    </>
  );
};

export default Partners;
