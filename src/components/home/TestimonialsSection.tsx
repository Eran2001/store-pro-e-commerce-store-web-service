import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "Absolutely love the quality of products! Fast shipping and excellent customer service. Will definitely shop here again.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Buyer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "The headphones I bought exceeded my expectations. Crystal clear sound and comfortable to wear for hours. Highly recommend!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Verified Buyer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "Great selection and amazing prices. The return process was also hassle-free. This is my go-to online store now!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="text-sm font-medium text-accent">Testimonials</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of satisfied customers
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-4 text-muted-foreground">{testimonial.text}</p>

              <div className="mt-6 flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
