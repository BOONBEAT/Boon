import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen  relative">
      <div className="relative top-0">
        <Header />
      </div>

      <section className="flex flex-col lg:flex-row items-center w-full h-[80vh] sm:h-[65vh] lg:h-[60vh] bg-black px-3 lg:px-6 justify-between  relative top-16 lg:top-6">
        <div className="pt-12 sm:pt-8 ">
          <div className="flex flex-col gap-8 sm:gap-6">
            <h1 className="text-xl font-semibold leading-7 text-center lg:text-4xl text-[#F7941E]/90 lg:pl-12">
              Decentralizing Music Discovery, One Song at a Time
            </h1>

            <p className="text-xs lg:text-xl text-center  leading-5 lg:pl-16">
              Identify songs, interact and help build the ultimate music library
              on solana, in a unique way
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-4 lg:gap-12  lg:pl-16">
              <button className="flex lg:w-1/4 items-center justify-center border border-[#F7941E] p-2 text-white font-semibold rounded-lg">
                Learn More
              </button>
              <button className="flex lg:w-1/4 items-center justify-center border border-[#341f07] bg-[#F7941E] p-2 text-black font-semibold rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <span className="absolute lg:right-24 top-[300px] sm:top-48 lg:top-36  ">
          <Image
            className="w-56 lg:w-72"
            width="1000"
            height="1000"
            src="/images/b-hero2.png"
            alt="Solana"
          />
        </span>
      </section>

      <section className="relative top-72  flex flex-col w-full h-[400vh] lg:h-[220vh] bg-black px-3 lg:px-6 justify-between rounded-bl-3xl rounded-br-3xl   py-24">
        <div className="">
          <div className="flex flex-col items-center gap-6 lg:gap-12">
            <h1 className="text-lg text-center lg:text-3xl text-[#F7941E] font-bold leading-8">
              Boon is a Decentralized Music Ecosystem
            </h1>
            <p className=" leading-5 lg:leading-9 text-center lg:text-justify text-xs lg:text-lg mx-2 sm:mx-12 lg:mx-44">
              We are building a revolutionary decentralized music ecosystem on
              Solana, empowering artists, creators, and fans. Boon offers music
              discovery features and a community-based marketplace for trading
              instrumentals, all led by the Bonk community.
            </p>
          </div>

          <div className="flex items-center justify-center ">
            <div className=" flex flex-col items-center  lg:grid lg:grid-cols-2 gap-12 py-24  w-full md:w-[60%] px-6">
              {/*  1*/}

              <div className="max-w-sm  border-r-4 border-l-4  border border-[#2e2e2f] bg-[#0e0e0f] flex flex-col items-center justify-center rounded-2xl p-4">
                <span className="relative lg:top-3">
                  <Image
                    className="w-64 h-64"
                    width="60"
                    height="60"
                    src="images/music-lg.svg"
                    alt="Solana"
                  />
                </span>
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <h1 className="lg:text-xl font-bold ">Music Discovery</h1>
                  <p className="text-white/50 text-xs lg:text-sm">
                    Hard to find the name of the music you just heard? Boon is
                    here to help you identify the music around you.
                  </p>
                </div>
              </div>

              {/* 2 */}

              <div className="max-w-sm  border-r-4 border-l-4  border border-[#2e2e2f] bg-[#0e0e0f] flex flex-col items-center justify-center rounded-2xl p-4">
                <span className="relative top-9">
                  <Image
                    className="w-72 h-72"
                    width="60"
                    height="60"
                    src="images/mrkt.svg"
                    alt="Solana"
                  />
                </span>
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <h1 className="lg:text-xl font-bold ">Music Marketplace</h1>
                  <p className="text-white/50 text-xs lg:text-sm">
                    Boon's ecosystem features an instrumentals marketplace with{" "}
                    <span className="font-bold">OPOS</span> tech enabled.
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div className="max-w-sm  border-r-4 border-l-4  border border-[#2e2e2f] bg-[#0e0e0f] flex flex-col items-center justify-between rounded-2xl  p-4  ">
                <span className="relative top-6">
                  <Image
                    className="w-64 h-64"
                    width="60"
                    height="60"
                    src="/images/comm.svg"
                    alt="Solana"
                  />
                </span>
                <div className="flex flex-col items-center gap-4 py-[22px] text-center">
                  <h1 className="lg:ext-xl font-bold ">Boon for Bonk</h1>
                  <p className="text-white/50 text-xs lg:text-sm">
                    Boon is designed to bridge the gap between the web2 music
                    world and web3, with the Bonk community leading the way.
                  </p>
                </div>
              </div>

              <div className="max-w-sm  border-r-4 border-l-4  border border-[#2e2e2f] bg-[#0e0e0f] flex flex-col items-center justify-between rounded-2xl  p-4  ">
                <span className="relative top-6">
                  <Image
                    className="w-64 h-64"
                    width="60"
                    height="60"
                    src="images/final.svg"
                    alt="Solana"
                  />
                </span>
                <div className="flex flex-col items-center gap-4 py-[22px] text-center">
                  <h1 className="lg:text-xl font-bold ">Entertainment</h1>
                  <p className="text-white/50 text-xs lg:text-sm">
                    Users of Boon can contribute to our music library built on
                    Solana and enjoy various other exciting features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative top-72  flex flex-col w-full h-[220vh] lg:h-[140vh] px-3 lg:px-6 justify-between overflow-hidden py-24">
        <div className=" flex flex-col items-center py-12">
          <div className="flex flex-col w-full items-center gap-9">
            <h1 className="text-lg lg:text-3xl font-bold text-center">
              A Fusion of Music, Entertainment and Blockchain
            </h1>

            <div
              className="w-full  flex flex-col items-center py-12 mt-16 border-2 border-b-4 border-t-4 border-r-4 lg:border-r-2 border-[#3d2f20]  rounded-tr-3xl rounded-br-3xl lg:rounded-br-none 
             lg:rounded-bl-3xl gap-6 bg-[#231606]"
            >
              <h1 className="text-sm lg:text-base text-[#F7941E] font-black">
                Be a part of the ecosystem
              </h1>
              <div className="w-full lg:grid lg:grid-cols-3">
                <div className="flex flex-col items-center justify-center">
                  <span className="">
                    <Image
                      className="w-56 h-56 lg:w-72 lg:h-72"
                      width="600"
                      height="600"
                      src="/images/search.svg"
                      alt="Solana"
                    />
                  </span>
                  <h1 className="text-sm lg:text-base relative bottom-10 font-bold">
                    Boon to discover music
                  </h1>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <span className="">
                    <Image
                      className="w-56 h-56 lg:w-72 lg:h-72"
                      width="600"
                      height="600"
                      src="/images/contri.svg"
                      alt="Solana"
                    />
                  </span>
                  <h1 className="text-sm lg:text-base relative bottom-10 font-bold">
                    Contritute to the ecosystem
                  </h1>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <span className="">
                    <Image
                      className="w-56 h-56 lg:w-72 lg:h-72"
                      width="600"
                      height="600"
                      src="/images/build.svg"
                      alt="Solana"
                    />
                  </span>
                  <h1 className="text-sm lg:text-base relative bottom-10 font-bold">
                    Build and ship to the marketplace
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative top-72 flex flex-col w-full h-[50vh] px-3 lg:px-6 justify-between bg-black overflow-hidden rounded-tl-3xl rounded-tr-3xl">
        <div className="flex flex-col lg:flex-row items-center">
          <span className="">
            <Image
              className="w-96 h-96"
              width="600"
              height="600"
              src="/images/Boon 2.svg"
              alt="Solana"
            />
          </span>
        </div>
      </footer>
    </main>
  );
}
