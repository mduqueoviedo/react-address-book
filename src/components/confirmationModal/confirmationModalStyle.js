import { style } from 'typestyle';

export const modalStyle = {
  width: '40%',
  height: 200,
  left: '30%',
  top: 100,
  padding: 30,
  border: 0,
  overflow: 'hidden',
};

export const modalOverlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
};

export const modalContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const warningIconStyle = style({
  fontSize: 100,
  color: 'orange',
});

export const confirmationTextStyle = style({
  fontSize: 25,
  marginTop: 20,
});

export const buttonStyle = style({
  fontSize: 14,
  padding: '10px 20px',
  backgroundColor: 'white',
  borderRadius: 4,
  fontWeight: 600,
  textTransform: 'uppercase',
  margin: '10px 20px',
});
