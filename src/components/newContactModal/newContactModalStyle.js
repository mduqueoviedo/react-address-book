import { style } from 'typestyle';

export const modalStyle = {
  width: '40%',
  height: 350,
  left: '30%',
  padding: 20,
  border: 0,
};

export const modalOverlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
};

export const modalContainerStyle = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
});

export const formStyle = style({
  flex: 2,
});

export const closeControlStyle = style({
  alignSelf: 'flex-start',
  cursor: 'pointer',
  fontSize: 20,
});

export const formGroupStyle = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '60%',
  marginBottom: 10,
  fontWeight: 600,
});

export const formInputStyle = style({
  padding: 5,
  width: '60%',
  fontSize: 14,
  border: '1px solid #111',
  outline: 'none',
});

export const invalidInputStyle = style({
  border: '1px solid red',
});

export const errorDescriptionStyle = style({
  color: 'red',
  fontSize: 12,
  marginTop: 5,
});

export const formSelectStyle = style({
  fontSize: 14,
  width: 215,
});

export const submitButtonStyle = style({
  fontSize: 14,
  padding: '10px 20px',
  backgroundColor: 'white',
  borderRadius: 4,
  fontWeight: 600,
  textTransform: 'uppercase',
  marginTop: 10,
  marginBottom: 20,
});

export const formNoteStyle = style({
  fontSize: 12,
  fontStyle: 'italic',
  color: '#111',
});

export const errorTextStyle = style({
  fontSize: 12,
});
