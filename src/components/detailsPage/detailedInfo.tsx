import MutedText from "../ui/mutedText"

type Props = {
    info: any;
}

export default function DetailedInfo({info}: Props) {
    return (
        
        <div className="flex p-2 w-full min-h-full rounded-md shadow-sm">
          <div className="relative text-sm md:text-3xl overflow-hidden w-full">
            <p className="text-9xl absolute top-11 left-20 font-extrabold text-muted-foreground -z-10 opacity-30">
              {info.title_japanese}
            </p>
            <div className="">
              <MutedText>rating:</MutedText> {info.score}
            </div>
            <div className="">
              <MutedText>season:</MutedText> {info.season} -{" "}
              {info.year}
            </div>
            <div className="">
              <MutedText>episodes:</MutedText> {info.episodes}
            </div>
            <div className="flex gap-1">
              <MutedText>studios: </MutedText>

              {info.studios.map((obj: any) => (
                <p key={obj.name}>{obj.name + " "}</p>
              ))}
            </div>
          </div>
        </div>
    )
}