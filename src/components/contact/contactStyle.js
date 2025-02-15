import { style } from 'typestyle';

export const contactCardStyle = style({
  backgroundColor: 'lightYellow',
  margin: '10px 0',
  width: '30%',
  padding: 10,
  borderRadius: 5,
  lineHeight: '22px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  boxShadow: '3px 3px 5px 0px rgba(0, 0, 0, 0.3)',
});

export const contactInfoContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
});

export const editContactContainerStyle = style({
  display: 'flex',
  alignSelf: 'flex-end',
});

export const editContactIconStyle = style({
  marginLeft: 10,
  fontSize: 16,
  cursor: 'pointer',
});

export const contactCardIconStyle = style({
  marginRight: 10,
  fontSize: 11,
  color: 'darkGrey',
});

export const contactLineStyle = style({
  display: 'flex',
  alignItems: 'center',
});

export const mailLinkStyle = style({
  color: 'inherit',
});
