import contentfulClient from "@/components/contentful/contentfulClient";
import {
  IAsset,
  TypeEkorNimeTestimoniSkeleton,
} from "@/components/contentful/types/contentful.types";

const getTestimoniContentful = async () => {
  try {
    const data =
      await contentfulClient.getEntries<TypeEkorNimeTestimoniSkeleton>({
        content_type: "ekorNimeTestimoni",
      });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default async function TestiComponent() {
  const testi = await getTestimoniContentful();
  return (
    <>
      <div className="px-4 py-6 mb-6">
        <h2 className="text-4xl font-extrabold text-center text-slate-50 mb-3">
          Apa Kata para Sensei?
        </h2>
        <p className="text-lg text-slate-300 mb-6 text-center mb-10">
          Apakah Mereka Puas?
        </p>
        {testi && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:flex lg:flex-row">
            {testi.items?.map((ekorNimeTestimoni, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex-grow cursor-pointer hover:-translate-y-2 transition-all relative"
              >
                <div className="flex items-center px-6 py-4">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={`https:${
                      (ekorNimeTestimoni.fields.profile as IAsset)?.fields.file
                        .url
                    }`}
                    alt={ekorNimeTestimoni.fields.nama}
                  />
                  <div className="ml-4">
                    <p className="text-gray-800 text-lg font-semibold">
                      {ekorNimeTestimoni.fields.nama}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {ekorNimeTestimoni.fields.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
