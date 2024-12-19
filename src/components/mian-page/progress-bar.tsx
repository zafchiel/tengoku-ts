export default function Progressbar({ barWidth }: { barWidth: number }) {
  return (
    <div
      className="bg-white fixed bottom-0 left-0 w-1 z-50"
      style={{ height: barWidth + "%" }}
    ></div>
  );
}
