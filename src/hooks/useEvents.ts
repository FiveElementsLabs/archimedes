import { useEffect } from "react";

export const useEvents = () => {
  useEffect(() => {
    (window as any)?.ethereum?.on("chainChanged", chainChanged);
    (window as any)?.ethereum?.on("accountsChanged", accountsChanged);

    return () => {
      (window as any)?.ethereum?.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // *****************  Event handlers *****************

  const chainChanged = () => window.location.reload();

  const accountsChanged = () => window.location.reload();
};
