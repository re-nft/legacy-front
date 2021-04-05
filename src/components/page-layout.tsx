import React from "react";
import BatchProvider from "../controller/batch-controller";
import PageProvider from "../controller/page-controller";

type PageLayoutProps = {
  onSwitch(): void;
  title: string;
  toggleValue: boolean;
};

const PageLayout: React.FC<PageLayoutProps> = ({
  onSwitch,
  toggleValue,
  title,
  children,
}) => {
  return (
    <div className="content">
      <div className="content__row content__navigation">
        <div className="switch">
          <div className="switch__title">{title}</div>
          <div className="switch__control" onClick={onSwitch}>
            <div className={`toggle ${toggleValue ? "toggle__active" : ""}`}>
              <div className="toggle__pin"></div>
            </div>
          </div>
        </div>
      </div>
      <PageProvider>
        <BatchProvider>{children}</BatchProvider>
      </PageProvider>
    </div>
  );
};

export default PageLayout;