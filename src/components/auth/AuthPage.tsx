interface props {
  children?: JSX.Element;
}

export function AuthPage({ children }: props) {
  // FIXME if no children provided?
  return <div>{children}</div>;
}
