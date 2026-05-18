export default function About() {
  const services = [
    { title: "Education", desc: "Providing quality schooling and vocational training to marginalized youth." },
    { title: "Healthcare", desc: "Implementing community-led health camps and maternal care programs." },
    { title: "Sustainability", desc: "Teaching sustainable farming and water management techniques." },
  ];

  return (
    <section className="py-20 px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">Our Mission</span>
          <h2 className="text-3xl font-semibold text-ngo-dark mb-4">Dedicated to rural development and social equity.</h2>
          <p className="text-ngo-text leading-relaxed mb-8">
            Nalivu focuses on holistic community growth by addressing the root causes of poverty. 
            We don&apos;t just provide aid; we build systems that enable communities to thrive independently.
          </p>
        </div>
        <div className="bg-ngo-lightGreen h-72 rounded-2xl flex items-center justify-center text-ngo-green font-medium">
          [Image: Community Engagement]
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {services.map((s, i) => (
          <div key={i} className="p-6 border border-gray-200 rounded-xl hover:border-ngo-green transition group">
            <div className="w-10 h-10 bg-ngo-lightGreen rounded-lg flex items-center justify-center mb-4 text-ngo-green group-hover:scale-110 transition">
              ✦
            </div>
            <h3 className="font-semibold text-ngo-dark mb-2">{s.title}</h3>
            <p className="text-sm text-ngo-text leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
