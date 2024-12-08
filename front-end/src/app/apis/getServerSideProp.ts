export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/Error",
      permanent: false,
    },
  };
}
