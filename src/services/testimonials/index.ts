import { query } from "lib/query";
import { urlFor } from "lib/sanity/client";
import { SanityTestimonialsRepo } from "./repo";
import type { TestimonialsRepository } from "./types";

export class TestimonialsService {
	constructor(private repo: TestimonialsRepository) {
		this.repo = repo;
	}

	async getTestimonials() {
		const testimonials = await this.repo.getTestimonials();
		return testimonials.map((testimonial) => ({
			...testimonial,
			avatar: urlFor(testimonial.avatar).url(),
		}));
	}
}

export const testimonialsService = new TestimonialsService(
	new SanityTestimonialsRepo(query)
);
