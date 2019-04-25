import { style } from 'typestyle';

export const headerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  backgroundColor: '#1c88e5',
  color: 'white',
  fontSize: 20,
  fontWeight: 600,
  padding: '0 170px',
});

export const headerLinkStyle = style({
  cursor: 'pointer',
  textDecoration: 'underline',
});

export const appBodyStyle = style({
  margin: '0 auto',
  width: 'calc(100% - 380px)',
  position: 'relative',
  minHeight: 600,
  backgroundColor: 'lightGrey',
  padding: 20,
  marginTop: 10,
});

export const newContactElementStyle = style({
  position: 'absolute',
  bottom: 30,
  right: 30,
  fontSize: 30,
  cursor: 'pointer',
});
