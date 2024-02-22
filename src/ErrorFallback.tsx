export function ErrorFallback(props: any) {
  console.log(props);
  console.log('trying to show Error fallback');

  return <div>Something went terribly</div>;
}
