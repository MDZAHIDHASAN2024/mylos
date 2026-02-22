import { useEffect } from 'react';

type Title = {
  title: string;
  subtitle?: string;
};

const PageTitle = ({ title, subtitle }: Title) => {
  useEffect(() => {
    document.title = `${title} | MYLOS`;
  }, [title]);

  return (
    <div className="page-title-wrapper">
      <div className="page-title-inner">
        <div className="page-title-line" />
        <div className="page-title-content">
          <span className="page-title-label">MYLOS</span>
          <h1 className="page-title-heading">{title}</h1>
          {subtitle && <p className="page-title-sub">{subtitle}</p>}
        </div>
        <div className="page-title-line" />
      </div>
      <div className="page-title-glow" />
    </div>
  );
};

export default PageTitle;
