import contentfulClient from "@/components/contentful/contentfulClient";
import {
  IAsset,
  TypeAnimeFigureSkeleton,
} from "@/components/contentful/types/contentful.types";
import RichText from "@/components/richtext";

const getBlogContentful = async () => {
  try {
    const data = await contentfulClient.getEntries<TypeAnimeFigureSkeleton>({
      content_type: "animeFigure",
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default async function ProductsPage() {
  const blogs = await getBlogContentful();
  return (
    <div id="product">
      <div className="bg-gray-100 py-4 px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-3">
          Produk Premium Anime Figures Kami
        </h2>
        <p className="text-lg text-gray-700 text-center mb-10">
          Temukan Keajaiban dalam Setiap Ekornya
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {blogs &&
            blogs.items?.map((animeFigure, idx) => (
              <div
                key={idx}
                className="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative"
              >
                <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    className="fill-gray-800 inline-block"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>

                <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8 ">
                  <img
                    src={`https:${
                      (animeFigure.fields.image as IAsset)?.fields.file.url
                    }`}
                    alt={animeFigure.fields.name}
                    className="h-full w-full object-fill"
                  />
                </div>

                <div className="p-6 bg-slate-600 h-full">
                  <h3 className="text-lg font-bold text-gray-950">
                    {animeFigure.fields.name}
                  </h3>
                  <h4 className="text-lg text-gray-900 font-bold mt-2">
                    {animeFigure.fields.pricing}
                  </h4>
                  <RichText document={animeFigure.fields.description} />

                  <div className="flex space-x-2 mt-4 bg-slate-600">
                    <svg
                      className="w-4 fill-[#facc15]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#facc15]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#facc15]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#facc15]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      className="w-4 fill-[#facc15]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="">
                      {animeFigure.fields.terjual} Penilaian
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
