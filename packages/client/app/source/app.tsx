import { useEffect } from "react";
import { Logger } from "@pnpm-vite/logger";

const logger = new Logger();

const App = (): JSX.Element => {
  useEffect(() => {
    logger.log("App first render");
  }, []);
  return <div>App</div>;
};

export default App;
