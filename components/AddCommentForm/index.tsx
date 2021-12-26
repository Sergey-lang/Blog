import React from 'react';
import Input from '@material-ui/core/Input';
import styles from './AddCommentForm.module.scss';
import { Button } from "@material-ui/core";
import { Api } from "../../utils/api";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { CommentItem } from "../../utils/api/types";

interface AddCommentFormProps {
  postId: number;
  onSuccessAdd: (obj: CommentItem) => void;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, onSuccessAdd }) => {
  const [clicked, setClicked] = React.useState(false);
  const [text, setText] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onAddComment = async () => {
    try {
      setLoading(true)
      const comment = await Api().comment.create({
        postId,
        text,
      })
      onSuccessAdd(comment);
      setClicked(false);
      setText('');
    } catch (err) {
      console.warn('Add comment', err);
      alert('Ошибка при отправке комментария')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.form}>
      <Input onChange={e => setText(e.target.value)}
             value={text}
             onFocus={() => setClicked(true)}
             minRows={clicked ? 5 : 1}
             classes={{ root: styles.fieldRoot }}
             placeholder="Написать комментарий..."
             fullWidth multiline />
      {clicked && <Button onClick={onAddComment}
                          disabled={isLoading}
                          className={styles.addButton}
                          variant="contained"
                          color="primary">
        Опубликовать
      </Button>}
    </div>
  );
};
