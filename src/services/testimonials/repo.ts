import type { QueryService } from "lib/query";
import type { Testimonial } from "types/testimonials.type";
import type { TestimonialsRepository } from "./types";

export class SanityTestimonialsRepo implements TestimonialsRepository {
	constructor(private readonly queryService: QueryService) {}

	getTestimonials(): Promise<Testimonial[]> {
		return this.queryService.get<Testimonial[]>(
			`*[_type == "testimonial"] | order(rank) {..., "id": _id}`
		);
	}
}
