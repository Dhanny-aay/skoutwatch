import click from "./assets/click.svg";

const Home = () => {
  return (
    <>
      <div className="absolute lg:left-[20%] top-[80px] p-6 w-[80%] h-[calc(100vh-80px)] overflow-y-auto">
        <div className=" w-full flex flex-col items-center justify-center h-full">
          <img src={click} alt="" />
          <p className=" text-center mt-6 font-LatoBold font-bold text-2xl text-[#272D37]">
            No Feature Selected Yet
          </p>
          <p className=" max-w-[350px] w-full font-LatoNormal font-normal text-base text-center text-[#5F6D7E] mt-2">
            Get started by choosing a feature from the list on the left to
            upload your video and begin processing with Skoutwatch's advanced
            tools.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
