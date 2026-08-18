import type { Testimonial } from "types/testimonials.type";

export interface TestimonialsRepository {
	getTestimonials(): Promise<Testimonial[]>;
}
