import { MapPin, Phone, Mail } from "lucide-react";

const INFO = [
  { icon: MapPin, label: "Address",  value: "123 Business Bay, Dubai, UAE" },
  { icon: Phone,  label: "Phone",    value: "+971 4 000 0000" },
  { icon: Mail,   label: "Email",    value: "hello@edifyemc.com" },
];

export default function ContactInfoSection() {
  return (
    <section id="contact-info" className="section-padding bg-[#0F0F1A]">
      <div className="container-custom">
        <h2 className="font-heading text-4xl font-bold text-white mb-10">Find Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INFO.map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E8C97A]/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-[#E8C97A]" />
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
