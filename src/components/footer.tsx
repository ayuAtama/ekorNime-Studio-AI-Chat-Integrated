const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="mt-8 md:mt-0 text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Follow Kami</h2>
          <ul className="flex justify-center md:justify-start space-x-4">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Buka Halaman Facebook EkorNime Studio"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 6.016 4.432 10.987 10.125 11.854v-8.385h-3.047v-3.469h3.047v-2.633c0-3.012 1.792-4.688 4.533-4.688 1.312 0 2.686.235 2.686.235v2.953h-1.512c-1.49 0-1.953.925-1.953 1.874v2.259h3.328l-.531 3.469h-2.797v8.385c5.693-.868 10.125-5.839 10.125-11.854z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Buka Halaman Twitter EkorNime Studio"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.94 9.94 0 0 1-2.828.775 4.939 4.939 0 0 0 2.165-2.723 9.865 9.865 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.384 4.482c-4.09-.205-7.719-2.165-10.148-5.144a4.822 4.822 0 0 0-.665 2.475 4.92 4.92 0 0 0 2.188 4.102 4.903 4.903 0 0 1-2.229-.616v.062a4.926 4.926 0 0 0 3.946 4.827 4.935 4.935 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.417 9.864 9.864 0 0 1-6.102 2.104c-.396 0-.786-.023-1.17-.067a13.943 13.943 0 0 0 7.548 2.213c9.057 0 14.01-7.509 14.01-14.01 0-.214-.004-.426-.014-.637a10.025 10.025 0 0 0 2.457-2.548z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
                aria-label="Buka Halaman Instagram EkorNime Studio"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.34 3.608 1.314.975.975 1.252 2.243 1.314 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.34 2.633-1.314 3.608-.975.975-2.243 1.252-3.608 1.314-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.34-3.608-1.314-.975-.975-1.252-2.243-1.314-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.34-2.633 1.314-3.608.975-.975 2.243-1.252 3.608-1.314 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.271 0-3.67.015-4.947.072-1.48.065-2.966.373-4.077 1.484-1.111 1.111-1.419 2.597-1.484 4.077-.057 1.276-.072 1.676-.072 4.947s.015 3.67.072 4.947c.065 1.48.373 2.966 1.484 4.077 1.111 1.111 2.597 1.419 4.077 1.484 1.276.057 1.676.072 4.947.072s3.67-.015 4.947-.072c1.48-.065 2.966-.373 4.077-1.484 1.111-1.111 1.419-2.597 1.484-4.077.057-1.276.072-1.676.072-4.947s-.015-3.67-.072-4.947c-.065-1.48-.373-2.966-1.484-4.077-1.111-1.111-2.597-1.419-4.077-1.484-1.276-.057-1.676-.072-4.947-.072zm0 5.838c-3.402 0-6.162 2.76-6.162 6.162s2.76 6.162 6.162 6.162 6.162-2.76 6.162-6.162-2.76-6.162-6.162-6.162zm0 10.162c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.406-10.845c-.796 0-1.44-.644-1.44-1.44s.644-1.44 1.44-1.44 1.44.644 1.44 1.44-.644 1.44-1.44 1.44z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 md:mt-0 text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Hubungi Kami</h2>
          <p className="text-gray-400">Email: contact@ekornimestudio.com</p>
          <p className="text-gray-400">Telpon: +123 456 789</p>
          <p className="text-gray-400">Alamat: 123 Anime St, Palembang</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} EkorNime Studio. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
