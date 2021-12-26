import { CommentItem } from "../utils/api/types";
import React, { useEffect, useState } from "react";
import { Api } from "../utils/api";

type UseCommentsProps = {
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>;
  comments: CommentItem[];
}

export const useComments = (postId?: number): UseCommentsProps => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const array = await Api().comment.getAll(postId);
        setComments(array);
      } catch (err) {
        console.warn('Fetch comments', err)
      }
    })();
  }, [])

  return { comments, setComments };
}