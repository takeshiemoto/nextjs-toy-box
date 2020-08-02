import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { History } from "history";

import uuid4 from "uuidv4";

import Index from "./pages/Index";
import Edit from "./pages/Edit";

const RouterContext = React.createContext<History | null>(null);

const useCurrentPath = (history: History) => {
  const [pathname, setPathname] = useState(history.location.pathname);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setPathname(location.pathname);
    });
    return unlisten;
  }, [history]);
  return pathname;
};

const useEditorRouting = (pathname: string) => {
  return useMemo(() => {
    if (pathname === "/") {
      return <Index />;
    } else if (uuid4.is(pathname.slice(1))) {
      return <Edit textId={pathname.slice(1)} />;
    } else {
      return <div>404 not found</div>;
    }
  }, [pathname]);
};

type RouterProps = { history: History };
export const Router: React.FC<RouterProps> = ({ history }) => {
  const pathname = useCurrentPath(history);
  const content = useEditorRouting(pathname);
  return (
    <RouterContext.Provider value={history}>{content}</RouterContext.Provider>
  );
};

type LinkProps = { href: string; as?: string };
export const Link: React.FC<LinkProps> = ({ href, as = "a", children }) => {
  const history = useContext(RouterContext);
  const onClick = useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      ev.preventDefault();
      history!.push(href);
    },
    [history, href]
  );
  return React.createElement(as, { onClick, href }, children);
};
