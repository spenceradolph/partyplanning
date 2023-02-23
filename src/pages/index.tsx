import { type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";

const Home: NextPage = () => {
	const { data: statuses, isLoading, error } = api.status.getAll.useQuery();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error...</div>;

	return (
		<>
			<div>
				<h1>Party Planning App</h1>
				<Link href="/new">New Event</Link>
				<table>
					<tr>
						<td>Email</td>
						<td>Status</td>
						<td>Num Events</td>
					</tr>
					{statuses.map((plannerStatus) => {
						return (
							<tr key={plannerStatus.email}>
								<td>{plannerStatus.email}</td>
								<td>{plannerStatus.status ? "good" : "bad"}</td>
								<td>{plannerStatus.numEvents}</td>
							</tr>
						);
					})}
				</table>
			</div>
		</>
	);
};

export default Home;
