import { useEffect } from 'react';

function textAreaKeepFocusOnTab(event) {
  if (event.keyCode === 9) {
    event.preventDefault();

    event.target.setRangeText(
      '  ',
      event.target.selectionStart,
      event.target.selectionStart,
      'end'
    );
  }
}

/*
  react hook to prevent lossing focus on tab in textareas
*/
export default function useTextareaAllowTabKey(textareaRef) {
  useEffect(() => {
    if(textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.addEventListener('keydown', textAreaKeepFocusOnTab);

      return () => textarea.removeEventListener('keydown', textAreaKeepFocusOnTab)
    }
  }, [textareaRef]);
}
