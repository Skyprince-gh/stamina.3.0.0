interface ScrollContainerProps {
  children: React.ReactNode;
  className: string;
}

const ScrollContainer: React.FC<ScrollContainerProps> = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

export default ScrollContainer;
