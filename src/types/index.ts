export type AnimeInfo = {
	mal_id: number;
	url: string;
	images: {
		jpg: {
			image_url: string;
			small_image_url: string;
			large_image_url: string;
		};
		webp: {
			image_url: string;
			small_image_url: string;
			large_image_url: string;
		};
	};
	trailer: {
		youtube_id: string;
		url: string;
		embed_url: string;
	};
	approved: boolean;
	titles: {
		type: string;
		title: string;
	}[];
	title: string;
	title_english: string;
	title_japanese: string;
	title_synonyms: string[];
	type: string;
	source: string;
	episodes: number;
	status: string;
	airing: boolean;
	aired: {
		from: string;
		to: string;
		prop: {
			from: {
				day: number;
				month: number;
				year: number;
			};
			to: {
				day: number;
				month: number;
				year: number;
			};
			string: string;
		};
	};
	duration: string;
	rating: string;
	score: number;
	scored_by: number;
	rank: number;
	popularity: number;
	members: number;
	favorites: number;
	synopsis: string;
	background: string;
	season: string;
	year: number;
	broadcast: {
		day: string;
		time: string;
		timezone: string;
		string: string;
	};
	producers: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
	licensors: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
	studios: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
	genres: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
	explicit_genres: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
	themes: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
	demographics: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
	relations: {
		relation: string;
		entry: {
			mal_id: number;
			type: string;
			name: string;
			url: string;
		}[];
	}[];
	theme: {
		openings: string[];
		endings: string[];
	};
	external: {
		name: string;
		url: string;
	}[];
	streaming: {
		name: string;
		url: string;
	}[];
};

export const propertiesToKeep = [
	"trailer",
	"title",
	"title_english",
	"mal_id",
	"score",
	"images",
	"genres",
] as const;

export type AnimeInfoFiltered = Partial<
	Pick<AnimeInfo, (typeof propertiesToKeep)[number]>
>;

export type PaginationInfoType = {
	last_visible_page: number;
	has_next_page: boolean;
	items: {
		count: number;
		total: number;
		per_page: number;
	};
};

export type SearchResult = {
	data: AnimeInfo[];
	pagination: PaginationInfoType;
};

export type AnimeCharacter = {
	character: {
		mal_id: number;
		url: string;
		images: {
			jpg: {
				image_url: string;
				small_image_url: string;
			};
			webp: {
				image_url: string;
				small_image_url: string;
			};
		};
		name: string;
	};
	role: string;
	favorites: number;
	voice_actors: {
		person: {
			mal_id: number;
			url: string;
			images: {
				jpg: {
					image_url: string;
				};
			};
			name: string;
		};
		language: string;
	}[];
};

type RecommendationEntry = {
	mal_id: number;
	url: string;
	images: {
		jpg: {
			image_url: string;
			small_image_url: string;
			large_image_url: string;
		};
		webp: {
			image_url: string;
			small_image_url: string;
			large_image_url: string;
		};
	};
	title: string;
};

export type Recommendation = {
	entry: RecommendationEntry;
	url: string;
	votes: number;
};
