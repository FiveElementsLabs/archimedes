import { useRouter } from "next/router";
import Layout from "../../components/layout";

const Strategy = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Layout>Strategy: {id}</Layout>;
};

export default Strategy;
