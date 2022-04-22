import { Button } from "@mantine/core";
import { HeaderAction } from "../components/navbar";

const IndexPage = () => {
  return (
    <div>
      <nav>
        <HeaderAction
          links={[
            {
              link: "https://www.google.it/",
              label: "Send me money",
              links: [
                { link: "https://www.google.it/", label: "I dont want it" },
              ],
            },
          ]}
        />
      </nav>
      <div>
        <h1>FOMOVault</h1>
        <Button>Too much fomo here</Button>
      </div>
    </div>
  );
};

export default IndexPage;
