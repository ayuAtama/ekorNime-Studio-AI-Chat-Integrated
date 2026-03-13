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
    <>
      <div className="bg-gray-100 py-4 px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-3">
          Produk Premium Anime Figures Kami
        </h2>
        <p className="text-lg text-gray-700 text-center mb-10">
          Temukan Keajaiban dalam Setiap Ekornya
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 ">
          {blogs &&
            blogs.items?.map((animeFigure, idx) => (
              <div
                key={idx}
                className="border rounded-lg shadow-md overflow-hidden cursor-pointer hover:-translate-y-2 transition-all relative"
              >
                <img
                  src={`https:${
                    (animeFigure.fields.image as IAsset)?.fields.file.url
                  }`}
                  alt={animeFigure.fields.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 bg-slate-950 bg-opacity-30 backdrop-blur-md h-full">
                  <h2 className="text-xl font-semibold mb-2 text-justify">
                    {animeFigure.fields.name}
                    <hr></hr>
                  </h2>
                  <div>
                    <h2 className="text-justify">
                      <RichText document={animeFigure.fields.description} />
                    </h2>
                  </div>

                  <div>
                    <p className="text-lg font-bold mt-4">
                      {animeFigure.fields.pricing}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
