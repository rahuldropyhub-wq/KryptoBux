import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Krypto Bux is the best platform to earn crypto online. Instant payments and lowest withdrawal minimum!",
    author: "Alex Morgan",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    id: 2,
    content: "I love the daily bonuses and challenges. Consistent earnings and very trusted platform!",
    author: "Jessica Lee",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=jessica"
  },
  {
    id: 3,
    content: "Great support team and very fast withdrawals. Highly recommended for everyone!",
    author: "Robert Williams",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=robert"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 lg:py-16 bg-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 bg-purple-100 rounded-full mb-4">
            <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider">WHAT OUR USERS SAY</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#030514]">Trusted by Thousands of Users</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white border border-slate-100 p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col"
            >
              <Quote size={32} className="text-[#7C3AED] mb-6 opacity-80" />
              <p className="text-slate-600 text-[14px] leading-relaxed mb-8 flex-1 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <img src={testimonial.avatar} alt={testimonial.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="text-[#030514] font-bold text-[14px]">{testimonial.author}</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#FBBF24] text-[#FBBF24]" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-10">
          <div className="w-2 h-2 rounded-full bg-[#7C3AED]"></div>
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
