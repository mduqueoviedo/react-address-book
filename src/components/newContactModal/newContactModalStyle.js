import { style } from 'typestyle';

export const modalStyle = {
  width: '60%',
  left: '20%',
  padding: 10,
  border: 0,
};

export const modalOverlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
};

export const modalContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const closeControlStyle = style({
  alignSelf: 'flex-end',
  cursor: 'pointer',
});

export const formGroupStyle = style({});
