import classes from "./container.module.css";

function Container({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={[classes.container, className].join(" ")}>{children}</div>
  );
}

export default Container;
