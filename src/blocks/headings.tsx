export const Headings = ({ type, children, ...rest }) => {
  let Tag;

  switch (type) {
    case 'heading_1':
      Tag = 'h1';
      break;
    case 'heading_2':
      Tag = 'h2';
      break;
    case 'heading_3':
      Tag = 'h3';
      break;
    default:
      break;
  }

  return <Tag {...rest}>{children}</Tag>;
};
