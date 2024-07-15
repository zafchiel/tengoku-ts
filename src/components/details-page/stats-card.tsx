type StatsCardProps = {
	title: string;
	value: string;
	additional?: string;
};

export default function StatsCard({
	title,
	value,
	additional,
}: StatsCardProps) {
	return (
		<div className="grow relative overflow-hidden border rounded-md min-w-[200px]">
			<div className="bg-card/60 backdrop-blur-3xl p-4 h-full">
				<div>
					<div className="text-muted-foreground font-light">{title}</div>
					<h4 className="text-xl font-bold uppercase">{value}</h4>
				</div>
				{additional && <div>{additional}</div>}
			</div>
			<div
				className={
					"absolute bottom-2 right-12 rounded-full h-32 w-32 -z-20 blur-xl bg-gray-500"
				}
			></div>
		</div>
	);
}
