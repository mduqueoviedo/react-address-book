import { style } from 'typestyle';

export const rootStyle = style({
  margin: '0 auto',
  width: '80%',
  position: 'relative',
  minHeight: 800,
  backgroundColor: 'lightGrey',
  padding: 20,
});

export const newContactElementStyle = style({
  position: 'absolute',
  bottom: 30,
  right: 30,
  fontSize: 30,
  cursor: 'pointer',
});
