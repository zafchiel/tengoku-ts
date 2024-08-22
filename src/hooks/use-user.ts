import axios from "axios";
import type { User } from "lucia";
import useSWR from "swr";

const fetcher = (url: string) => axios.get<User>(url).then((res) => res.data);

export default function useUser() {
	const { data, error, isLoading, mutate } = useSWR("/api/user", fetcher, {
		shouldRetryOnError: false,
	});

	return {
		user: data,
		isAuthenticating: isLoading,
		error,
		mutate,
	};
}
