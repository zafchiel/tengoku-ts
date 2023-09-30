import axios from "axios";
import { redirect } from "next/navigation";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export default async function PicsPage({ params }: Props) {
  const {
    data: { post },
  } = await axios.get(
    "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1",
    {
      params: {
        tags: params.id.replaceAll("-", "_"),
        limit: 100,
      },
    }
  );

  if (!post) redirect(`/${params.id}`);
  return (
    <main className="px-4 pb-14 md:pt-14 md:pb-0">
      <section className="flex flex-wrap gap-3">
        {post.map((obj: any) => (
          <div key={obj.id}>
            <Image
              src={obj.file_url}
              width={500}
              height={500}
              alt="img"
              className="w-full h-96"
            />
          </div>
        ))}
      </section>
    </main>
  );
}
