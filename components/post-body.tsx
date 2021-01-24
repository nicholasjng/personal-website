import DOMPurify from "isomorphic-dompurify";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string
}

export default function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles.markdown}
        // IMPORTANT: DOMPurify sanitizing on server-side
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </div>
  );
}
