type NameType = {
    title: string;
    first: string;
    last: string;
  };
  
  type ImgType = {
    large: string;
    medium: string;
    thumbnail: string;
  };
  
  type ResultType = {
    gender: string;
    name: NameType;
    email: string;
    phone: string;
    cell: string;
    picture: ImgType;
  };
  
  async function getData() {
    const url =process.env.ekorjuliewangywangyhuhahuhaha;
    const res = await fetch(`${url}`, { next: { revalidate: 1 } });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }
  
  export default async function CardTeams() {
    const res = await getData();
    const { results: person } = res;
    const positions = [
      "Kepala Eksekutif",
      "Kepala Teknologi",
      "Kepala Keuangan",
      "Kepala Penelitian",
    ];
  
    return (
      <>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10 px-4 bg-cover bg-center"
          style={{ backgroundImage: "url('/image/card_te.webp')" }}
        >
          <div className="col-span-1 md:col-span-2 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 drop-shadow-md text-center text-sky-50 underline outline-slate-50">
              Team Kami
            </h1>
            <br />
          </div>
          {person.map((p: ResultType, index: number) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-white/30 backdrop-blur-lg flex flex-col items-center cursor-pointer hover:-translate-y-2 transition-all relative"
            >
              <img
                src={p.picture.large}
                alt={`${p.name.first} ${p.name.last}`}
                className="w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-lg font-semibold mb-2 text-sky-50 drop-shadow-md outline-slate-50">
                {positions[index]}
              </h2>
              <p className="text-lg text-emerald-50 font-medium drop-shadow-md outline-slate-50">
                {p.name.title} {p.name.first} {p.name.last}
              </p>
              <p className="text-sm text-emerald-50 drop-shadow-md outline-slate-50">{p.phone}</p>
              <p className="text-sm text-emerald-50 drop-shadow-md outline-slate-50">{p.email}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
  