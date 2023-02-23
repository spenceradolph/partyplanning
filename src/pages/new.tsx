import { type NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

type FormValues = {
	plannerEmail: string;
	eventName: string;
	kindOfParty: "adult" | "kid";
	hadBalloons: "yes" | "no";
	hadCake: "yes" | "no";
	hadCandy: "yes" | "no";
	hadPresents: "yes" | "no";
};

const NewEvent: NextPage = () => {
	const newEventMutation = api.events.new.useMutation({
		onSuccess(data) {
			alert(JSON.stringify(data));
		},
	});

	const { register, handleSubmit } = useForm<FormValues>();

	const onSubmit = handleSubmit((data) => {
		newEventMutation.mutate({
			...data,
			hadBalloons: data.hadBalloons === "yes",
			hadCake: data.hadCake === "yes",
			hadCandy: data.hadCandy === "yes",
			hadPresents: data.hadPresents === "yes",
		});
	});

	return (
		<>
			<div>
				<h1>New Event Form</h1>

				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<form onSubmit={onSubmit}>
					<label>
						Email <input {...register("plannerEmail")} />
					</label>

					<label>
						EventName <input {...register("eventName")} />
					</label>

					<label>
						Kind of Party
						<select {...register("kindOfParty")}>
							<option value="kid">kid</option>
							<option value="adult">adult</option>
						</select>
					</label>

					<label>
						Had Balloons
						<select {...register("hadBalloons")}>
							<option value="no">no</option>
							<option value="yes">yes</option>
						</select>
					</label>

					<label>
						Had Cake
						<select {...register("hadCake")}>
							<option value="no">no</option>
							<option value="yes">yes</option>
						</select>
					</label>

					<label>
						Had Candy
						<select {...register("hadCandy")}>
							<option value="no">no</option>
							<option value="yes">yes</option>
						</select>
					</label>

					<label>
						Had Presents
						<select {...register("hadPresents")}>
							<option value="no">no</option>
							<option value="yes">yes</option>
						</select>
					</label>

					<input type="submit" value="submit" />
				</form>
			</div>
			<Link href="/">Homepage</Link>
		</>
	);
};

export default NewEvent;
