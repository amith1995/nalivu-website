import Link from "next/link";

export default function Impact() {
  const stats = [
    { label: "Families Supported", value: "2,500+" },
    { label: "Children Educated", value: "1,200+" },
    { label: "Health Camps", value: "45+" },
    { label: "Villages Reached", value: "12+" },
  ];

  return (
    <section className="py-20 px-12 bg-ngo-background">
      <div className="text-center mb-12">
        <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">Our Impact</span>
        <h2 className="text-3xl font-semibold text-ngo-dark">Real change, measured in lives.</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-bold text-ngo-green mb-2">{s.value}</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/impact-stories" className="text-ngo-green font-medium hover:underline transition">
          Read Impact Stories &rarr;
        </Link>
      </div>
    </section>
  );
}
