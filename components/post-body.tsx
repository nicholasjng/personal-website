import DOMPurify from "isomorphic-dompurify";

type Props = {
  content: string
}

export default function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="prose prose-blue lg:prose-xl"
        // IMPORTANT: DOMPurify sanitizing on server-side
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </div>
  );
}
