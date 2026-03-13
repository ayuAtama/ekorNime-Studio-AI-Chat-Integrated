const Hero = () => {
  return (
    <section className="relative bg-[url('/image/hero_banner.webp')] bg-cover bg-center text-white py-28">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto text-left px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 drop-shadow-md">
          Menghidupkan Fantasi <br />
          Ekor Anime
        </h1>
        <p className="text-base sm:text-xl mb-6 drop-shadow-md text-justify text-blue-200 font-bold">
          EkorNime Studio – Fantasi Ekor Anime dalam Genggaman
        </p>

        <div className="flex flex-col sm:flex-row">
          <a
            href="/products"
            className="mb-4 sm:mb-0 sm:mr-3 text-pink bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Lihat Produk
          </a>
          <a
            href="#contact"
            className="text-blue-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
